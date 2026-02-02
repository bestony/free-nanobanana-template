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

export async function POST(request: Request) {
  let body: GenerateRequest = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  console.log(body);

  const prompt = body.prompt?.trim();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  const apiKey = process.env.ZENMUX_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ZENMUX_API_KEY is not set." },
      { status: 500 },
    );
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      vertexai: true,
      httpOptions: {
        apiVersion: ZENMUX_API_VERSION,
        baseUrl: process.env.ZENMUX_BASE_URL || ZENMUX_BASE_URL,
      },
    });
    const model = body.model?.trim() || MODEL_ID;
    const response = await ai.models.generateContent({
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

    console.log(response);
    let inlineData:
      | {
          mimeType?: string;
          data?: string;
        }
      | undefined;
    let textOutput = "";

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        inlineData = part.inlineData;
        break;
      }
      if (typeof part.text === "string") {
        textOutput += part.text;
      }
    }

    if (!inlineData?.data) {
      return NextResponse.json(
        {
          error: "No image returned from model.",
          text: textOutput || undefined,
        },
        { status: 502 },
      );
    }

    const mimeType = inlineData.mimeType || "image/png";
    const dataUrl = `data:${mimeType};base64,${inlineData.data}`;

    const payload = await getPayload({ config });
    const imageBuffer = Buffer.from(inlineData.data, "base64");
    const extension = mimeExtensionMap[mimeType] || "png";
    const filename = `generated-${Date.now()}.${extension}`;
    const title = buildTitle(prompt);
    const description = normalizePrompt(textOutput || prompt);

    let stored = false;
    let imageRecordId: string | number | undefined;

    try {
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

    return NextResponse.json({
      image: dataUrl,
      mimeType,
      text: textOutput || undefined,
      stored,
      imageRecordId,
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Failed to generate image." },
      { status: 500 },
    );
  }
}
