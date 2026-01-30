"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";

const presets = [
  {
    label: "Cyberpunk Neon Cityscape",
    prompt:
      "A cinematic cyberpunk skyline at night, neon reflections on wet streets, ultra-detailed.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw3zazyz6uu7DzILxGs0ZBBk3-1YcB5BIn-R6bzyTgoLRds90LhMGdq8eQVs-m9LbAoqrpjzlfry6pwT2iHFFvnwiqaGIHZSW-VOP0ixPLD63tQhCAFtXli-84XJoHfK-o1Epw9CwbS_Zwx50BpJOFSuroc6aV6mjzQbP0-JAoO3-gGmEImAHJOjr-_8cloQCZ8xpJmBIOOKpmqlwLVyfJQo7OAlkb6Gp7HinPTqIASpazS9K_6F7Sl0K065GLa20pt6DMIKGZUxM",
  },
  {
    label: "Fantasy Dragon Portrait",
    prompt:
      "A regal dragon portrait with iridescent scales, soft rim light, painterly fantasy style.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj8r0sbIHFdPH-NioFqWrOUnXRwz023BuwfG5QoBQ3nfhhNAyjSzVLLgYEJKvNDbNAcAr-tIV7RB7NwGrxTXv3X5ov6bS3S_S09j7bj7EdaYgR7VPgNGA3gUIZuQulHb0-_ktoLDsW8cJ1lGOd87c0q_lh1fF4WIgvUFPRS3vRhe4pbarCjozMAYDRw0g7jW1hmMT5QL8-LYAP_Q8xFID_K9r1iHgo-ssrP6GXVwX_5CGtcWWlvsdV-57hkl_-zAy3_QH5ovfQXEg",
  },
  {
    label: "Minimalist Product Photography",
    prompt:
      "Minimalist product shot on a soft gradient backdrop, crisp reflections, studio lighting.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMqtcKun7dwwURzwqexDlXtcmhupfurRbCcrVYZ_lKoG8bAIvHcFP70mayjtZYGsPhMc2miboUU5zCn7OlvyE8UlUwQfm66JXAP1_xIN_5wl4XHShwexJaZEfnP_MYJF_ZeTle4GH88uDSBsT6cuLmOoiK_7xVi1u8vNP0uUlH83GnrA4a7ysIoF_n4Ow24EwXej2MucMUUweDIrsTiaL_jEiF6ZxMK0U_cF30Wemvt2HGQcMBungle_OHL-2O4TpsGP2oSHmYPyE",
  },
];

const modelName = "Nanobanana";

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [generatedImage, setGeneratedImage] = useState(presets[0].image);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const helperText = useMemo(() => {
    if (selectedPreset === null)
      return "Describe the image you want to generate.";
    return `Preset: ${presets[selectedPreset].label}`;
  }, [selectedPreset]);

  const handlePresetClick = (index: number) => {
    setSelectedPreset(index);
    setPrompt(presets[index].prompt);
    setGeneratedImage(presets[index].image);
  };

  const handleGenerate = async () => {
    if (isGenerating) return;
    setErrorMessage(null);
    setIsGenerating(true);

    const trimmedPrompt = prompt.trim();
    const fallbackPrompt = presets[0].prompt;
    const finalPrompt = trimmedPrompt || fallbackPrompt;

    if (!trimmedPrompt) {
      setPrompt(fallbackPrompt);
      setSelectedPreset(0);
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: finalPrompt,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        setErrorMessage(errorPayload?.error || "Generation failed.");
        return;
      }

      const data = await response.json();
      if (data?.image) {
        setGeneratedImage(data.image);
      } else {
        setErrorMessage("No image returned. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="bg-white px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-nano-text md:text-4xl">
            Start Your Creative Journey
          </h2>
          <p className="mt-3 text-nano-gray">
            Enter your creative description, select models and parameters, and
            generate unique images.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-gray-50/40 p-4">
                <textarea
                  className="min-h-[160px] w-full resize-none bg-transparent text-sm text-nano-text outline-none placeholder:text-nano-gray/70"
                  placeholder="Describe the image you want to generate, the more detailed the better..."
                  value={prompt}
                  onChange={(event) => {
                    setPrompt(event.target.value);
                    setSelectedPreset(null);
                  }}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-nano-gray shadow-sm">
                  <span className="inline-flex h-2 w-2 rounded-full bg-nano-yellow" />
                  <span>Model</span>
                </div>
                <span className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-nano-text shadow-sm">
                  {modelName}
                </span>
                <span className="text-xs text-nano-gray">
                  {modelName} • 1024×1024
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset, index) => (
                    <button
                      key={preset.label}
                      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                        selectedPreset === index
                          ? "border-nano-yellow bg-nano-yellow/40 text-nano-text"
                          : "border-gray-200 text-nano-gray hover:border-gray-300"
                      }`}
                      onClick={() => handlePresetClick(index)}
                      type="button"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-nano-gray">{helperText}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-nano-gray">
                  1 Credit
                </span>
                <button
                  className="rounded-full bg-nano-yellow px-6 py-2 text-sm font-semibold text-black shadow-sm transition-all hover:brightness-95"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  type="button"
                >
                  {isGenerating ? "Generating..." : "Generate Image"}
                </button>
              </div>
              {errorMessage ? (
                <p className="text-sm text-red-500">{errorMessage}</p>
              ) : null}
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-nano-yellow/20 via-white to-gray-100 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white">
                <div className="aspect-square w-full">
                  <img
                    alt="Generated preview"
                    className="h-full w-full object-cover"
                    src={generatedImage}
                  />
                </div>
                {isGenerating ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                    <div className="rounded-full bg-nano-yellow/80 px-4 py-2 text-xs font-semibold text-nano-text">
                      Rendering your image...
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
