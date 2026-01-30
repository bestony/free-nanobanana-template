import { GoogleGenAI, Modality } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL_ID = "google/gemini-3-pro-image-preview";
const ZENMUX_BASE_URL = "https://zenmux.ai/api/vertex-ai";
const ZENMUX_API_VERSION = "v1";

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

    return NextResponse.json({
      image: dataUrl,
      mimeType,
      text: textOutput || undefined,
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Failed to generate image." },
      { status: 500 },
    );
  }
}
