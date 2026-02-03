import { randomUUID } from "crypto";
import { GoogleGenAI, Modality } from "@google/genai";
import { put } from "@vercel/blob";
import config from "@payload-config";
import { and, eq, gte, lt, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getPayload } from "payload";

import db from "@/db";
import { generation } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getSubscriptionByUserId } from "@/lib/billing";

export const runtime = "nodejs";

const MODEL_ID = "google/gemini-3-pro-image-preview";
const VERTEX_AI_BASE_URL = "https://zenmux.ai/api/vertex-ai";
const ZENMUX_API_VERSION = "v1";
const DAILY_LIMIT_FREE = 3;
const DAILY_LIMIT_PRO = 30;

const mimeExtensionMap: Record<string, string> = {
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};

const normalizePrompt = (value: string) => value.replace(/\s+/g, " ").trim();

const buildTitle = (value: string) => {
  const normalized = normalizePrompt(value);
  if (normalized.length <= 80) return normalized;
  return `${normalized.slice(0, 77)}...`;
};

type GenerateRequest = {
  prompt?: string;
  model?: string;
};

type InlineData = {
  mimeType?: string;
  data?: string;
};

type CandidatePart = {
  inlineData?: InlineData;
  text?: string;
};

type GenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: CandidatePart[];
    };
  }>;
};

type ParseBodyResult =
  | { ok: true; body: GenerateRequest }
  | { ok: false; response: NextResponse };

type PromptResult =
  | { ok: true; prompt: string }
  | { ok: false; response: NextResponse };

type ApiKeyResult =
  | { ok: true; apiKey: string }
  | { ok: false; response: NextResponse };

type ExtractResult =
  | { ok: true; inlineData: InlineData; textOutput: string }
  | { ok: false; response: NextResponse };

type ImageInfo = {
  dataUrl: string;
  mimeType: string;
  imageBuffer: Buffer;
  blobPathname: string;
};

type StorageResult = {
  stored: boolean;
  imageRecordId?: string | number;
  blobUrl?: string;
};

const jsonError = (
  message: string,
  status: number,
  extra?: Record<string, unknown>,
) =>
  NextResponse.json(
    {
      error: message,
      ...(extra ?? {}),
    },
    { status },
  );

const parseRequestBody = async (request: Request): Promise<ParseBodyResult> => {
  try {
    return { ok: true, body: (await request.json()) as GenerateRequest };
  } catch {
    return { ok: false, response: jsonError("Invalid JSON body.", 400) };
  }
};

const getPromptFromBody = (body: GenerateRequest): PromptResult => {
  const prompt = body.prompt?.trim();
  if (!prompt) {
    return { ok: false, response: jsonError("Prompt is required.", 400) };
  }
  return { ok: true, prompt };
};

const getApiKey = (): ApiKeyResult => {
  const apiKey = process.env.VERTEX_AI_APIKEY;
  if (!apiKey) {
    return {
      ok: false,
      response: jsonError("VERTEX_AI_APIKEY is not set.", 500),
    };
  }
  return { ok: true, apiKey };
};

const createClient = (apiKey: string) =>
  new GoogleGenAI({
    apiKey,
    vertexai: true,
    httpOptions: {
      apiVersion: ZENMUX_API_VERSION,
      baseUrl: process.env.VERTEX_AI_BASE_URL || VERTEX_AI_BASE_URL,
    },
  });

const getModelId = (body: GenerateRequest) => body.model?.trim() || MODEL_ID;

const generateContent = async (
  ai: GoogleGenAI,
  model: string,
  prompt: string,
) =>
  ai.models.generateContent({
    model,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

const getCandidateParts = (response: GenerateContentResponse) =>
  response.candidates?.[0]?.content?.parts ?? [];

const findInlineData = (parts: CandidatePart[]) => {
  for (const part of parts) {
    if (part.inlineData?.data) {
      return part.inlineData;
    }
  }

  return undefined;
};

const collectTextOutput = (parts: CandidatePart[]) => {
  let textOutput = "";
  for (const part of parts) {
    if (typeof part.text === "string") {
      textOutput += part.text;
    }
  }

  return textOutput;
};

const buildTextValue = (textOutput: string) =>
  textOutput ? textOutput : undefined;

const extractInlineData = (
  response: GenerateContentResponse,
): ExtractResult => {
  const parts = getCandidateParts(response);
  const inlineData = findInlineData(parts);
  const textOutput = collectTextOutput(parts);

  if (!inlineData?.data) {
    return {
      ok: false,
      response: jsonError("No image returned from model.", 502, {
        text: buildTextValue(textOutput),
      }),
    };
  }

  return { ok: true, inlineData, textOutput };
};

const buildImageInfo = (inlineData: InlineData): ImageInfo => {
  const mimeType = inlineData.mimeType || "image/png";
  const dataUrl = `data:${mimeType};base64,${inlineData.data}`;
  const imageBuffer = Buffer.from(inlineData.data ?? "", "base64");
  const extension = mimeExtensionMap[mimeType] || "png";
  const blobPathname = `nanobanana/${Date.now()}.${extension}`;

  return {
    dataUrl,
    mimeType,
    imageBuffer,
    blobPathname,
  };
};

const storeGeneratedImage = async (options: {
  prompt: string;
  textOutput: string;
  imageBuffer: Buffer;
  mimeType: string;
  blobPathname: string;
}): Promise<StorageResult> => {
  const { prompt, textOutput, imageBuffer, mimeType, blobPathname } = options;
  const title = buildTitle(prompt);
  const description = normalizePrompt(textOutput || prompt);

  let stored = false;
  let imageRecordId: string | number | undefined;
  let blobUrl: string | undefined;

  try {
    const imageBlob = new Blob([new Uint8Array(imageBuffer)], {
      type: mimeType,
    });
    const blob = await put(blobPathname, imageBlob, {
      access: "public",
      addRandomSuffix: true,
    });
    blobUrl = blob.url;

    const payload = await getPayload({ config });
    const imageRecord = await payload.create({
      collection: "image-records",
      data: {
        title,
        imageUrl: blob.url,
        description,
      },
    });

    stored = true;
    imageRecordId = imageRecord.id;
  } catch (storageError) {
    console.error("Failed to store generated image:", storageError);
  }

  return { stored, imageRecordId, blobUrl };
};

const getUtcDayWindow = (date: Date) => {
  const startOfDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const endOfDay = new Date(startOfDay);
  endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);
  return { startOfDay, endOfDay };
};

const getDailyGenerationCount = async (
  userId: string,
  startOfDay: Date,
  endOfDay: Date,
) => {
  const [record] = await db
    .select({ count: sql<number>`count(*)` })
    .from(generation)
    .where(
      and(
        eq(generation.userId, userId),
        gte(generation.createdAt, startOfDay),
        lt(generation.createdAt, endOfDay),
      ),
    )
    .limit(1);

  return Number(record?.count ?? 0);
};

export async function POST(request: Request) {
  const parsedBody = await parseRequestBody(request);
  if (!parsedBody.ok) return parsedBody.response;
  console.log(parsedBody.body);

  const promptResult = getPromptFromBody(parsedBody.body);
  if (!promptResult.ok) return promptResult.response;

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user?.id) {
    return jsonError("Please sign in to generate images.", 401);
  }

  const subscription = await getSubscriptionByUserId(session.user.id);
  const isPro =
    subscription?.status === "active" || subscription?.status === "trialing";
  const dailyLimit = isPro ? DAILY_LIMIT_PRO : DAILY_LIMIT_FREE;
  const { startOfDay, endOfDay } = getUtcDayWindow(new Date());
  const dailyCount = await getDailyGenerationCount(
    session.user.id,
    startOfDay,
    endOfDay,
  );

  if (dailyCount >= dailyLimit) {
    return jsonError(
      `Daily generation limit reached (${dailyLimit}/day).`,
      429,
      {
        limit: dailyLimit,
        remaining: 0,
        plan: isPro ? "pro" : "free",
        resetAt: endOfDay.toISOString(),
      },
    );
  }

  const apiKeyResult = getApiKey();
  if (!apiKeyResult.ok) return apiKeyResult.response;

  try {
    const ai = createClient(apiKeyResult.apiKey);
    const response = await generateContent(
      ai,
      getModelId(parsedBody.body),
      promptResult.prompt,
    );

    console.log(response);
    const extracted = extractInlineData(response as GenerateContentResponse);
    if (!extracted.ok) return extracted.response;

    const imageInfo = buildImageInfo(extracted.inlineData);
    const storageResult = await storeGeneratedImage({
      prompt: promptResult.prompt,
      textOutput: extracted.textOutput,
      imageBuffer: imageInfo.imageBuffer,
      mimeType: imageInfo.mimeType,
      blobPathname: imageInfo.blobPathname,
    });

    if (session?.user?.id && storageResult.blobUrl) {
      try {
        await db.insert(generation).values({
          id: randomUUID(),
          userId: session.user.id,
          prompt: promptResult.prompt,
          imageUrl: storageResult.blobUrl,
          imageRecordId: storageResult.imageRecordId
            ? String(storageResult.imageRecordId)
            : null,
          createdAt: new Date(),
        });
      } catch (storeError) {
        console.error("Failed to store generation record:", storeError);
      }
    }

    return NextResponse.json({
      image: imageInfo.dataUrl,
      mimeType: imageInfo.mimeType,
      text: buildTextValue(extracted.textOutput),
      stored: storageResult.stored,
      imageRecordId: storageResult.imageRecordId,
      blobUrl: storageResult.blobUrl,
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return jsonError("Failed to generate image.", 500);
  }
}
