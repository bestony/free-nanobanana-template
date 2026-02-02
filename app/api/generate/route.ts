import { GoogleGenAI, Modality } from "@google/genai";
import config from "@payload-config";
import { NextResponse } from "next/server";
import { getPayload } from "payload";

export const runtime = "nodejs";

const MODEL_ID = "google/gemini-3-pro-image-preview";
const ZENMUX_BASE_URL = "https://zenmux.ai/api/vertex-ai";
const ZENMUX_API_VERSION = "v1";

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
  filename: string;
};

type StorageResult = {
  stored: boolean;
  imageRecordId?: string | number;
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
  const apiKey = process.env.ZENMUX_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      response: jsonError("ZENMUX_API_KEY is not set.", 500),
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
      baseUrl: process.env.ZENMUX_BASE_URL || ZENMUX_BASE_URL,
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
  const filename = `generated-${Date.now()}.${extension}`;

  return {
    dataUrl,
    mimeType,
    imageBuffer,
    filename,
  };
};

const storeGeneratedImage = async (options: {
  prompt: string;
  textOutput: string;
  imageBuffer: Buffer;
  mimeType: string;
  filename: string;
}): Promise<StorageResult> => {
  const { prompt, textOutput, imageBuffer, mimeType, filename } = options;
  const title = buildTitle(prompt);
  const description = normalizePrompt(textOutput || prompt);

  let stored = false;
  let imageRecordId: string | number | undefined;

  try {
    const payload = await getPayload({ config });
    const mediaDoc = await payload.create({
      collection: "media",
      data: {
        alt: title,
        ...(textOutput?.trim()
          ? {
              caption: textOutput.trim(),
            }
          : {}),
      },
      file: {
        data: imageBuffer,
        mimetype: mimeType,
        name: filename,
        size: imageBuffer.length,
      },
    });

    const imageRecord = await payload.create({
      collection: "image-records",
      data: {
        title,
        image: mediaDoc.id,
        description,
      },
    });

    stored = true;
    imageRecordId = imageRecord.id;
  } catch (storageError) {
    console.error("Failed to store generated image:", storageError);
  }

  return { stored, imageRecordId };
};

export async function POST(request: Request) {
  const parsedBody = await parseRequestBody(request);
  if (!parsedBody.ok) return parsedBody.response;
  console.log(parsedBody.body);

  const promptResult = getPromptFromBody(parsedBody.body);
  if (!promptResult.ok) return promptResult.response;

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
      filename: imageInfo.filename,
    });

    return NextResponse.json({
      image: imageInfo.dataUrl,
      mimeType: imageInfo.mimeType,
      text: buildTextValue(extracted.textOutput),
      stored: storageResult.stored,
      imageRecordId: storageResult.imageRecordId,
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return jsonError("Failed to generate image.", 500);
  }
}
