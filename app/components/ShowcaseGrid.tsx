/* eslint-disable @next/next/no-img-element */
"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const showcaseItems = [
  {
    id: "showcase-1",
    title: "Neon Market Drift",
    prompt:
      "A neon-lit market street at dusk, rain-soaked pavement, cinematic lighting, 35mm film grain, reflective umbrellas, shallow depth of field.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw3zazyz6uu7DzILxGs0ZBBk3-1YcB5BIn-R6bzyTgoLRds90LhMGdq8eQVs-m9LbAoqrpjzlfry6pwT2iHFFvnwiqaGIHZSW-VOP0ixPLD63tQhCAFtXli-84XJoHfK-o1Epw9CwbS_Zwx50BpJOFSuroc6aV6mjzQbP0-JAoO3-gGmEImAHJOjr-_8cloQCZ8xpJmBIOOKpmqlwLVyfJQo7OAlkb6Gp7HinPTqIASpazS9K_6F7Sl0K065GLa20pt6DMIKGZUxM",
    tag: "Cinematic",
  },
  {
    id: "showcase-2",
    title: "Emerald Canopy",
    prompt:
      "A misty fantasy forest with towering trees, soft volumetric light, bioluminescent plants, tranquil atmosphere, ultra-detailed.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj8r0sbIHFdPH-NioFqWrOUnXRwz023BuwfG5QoBQ3nfhhNAyjSzVLLgYEJKvNDbNAcAr-tIV7RB7NwGrxTXv3X5ov6bS3S_S09j7bj7EdaYgR7VPgNGA3gUIZuQulHb0-_ktoLDsW8cJ1lGOd87c0q_lh1fF4WIgvUFPRS3vRhe4pbarCjozMAYDRw0g7jW1hmMT5QL8-LYAP_Q8xFID_K9r1iHgo-ssrP6GXVwX_5CGtcWWlvsdV-57hkl_-zAy3_QH5ovfQXEg",
    tag: "Fantasy",
  },
  {
    id: "showcase-3",
    title: "Studio Pulse",
    prompt:
      "Premium product shot of headphones on a gradient backdrop, softbox lighting, glossy reflections, minimal styling, 8k render.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMqtcKun7dwwURzwqexDlXtcmhupfurRbCcrVYZ_lKoG8bAIvHcFP70mayjtZYGsPhMc2miboUU5zCn7OlvyE8UlUwQfm66JXAP1_xIN_5wl4XHShwexJaZEfnP_MYJF_ZeTle4GH88uDSBsT6cuLmOoiK_7xVi1u8vNP0uUlH83GnrA4a7ysIoF_n4Ow24EwXej2MucMUUweDIrsTiaL_jEiF6ZxMK0U_cF30Wemvt2HGQcMBungle_OHL-2O4TpsGP2oSHmYPyE",
    tag: "Product",
  },
  {
    id: "showcase-4",
    title: "Mecha Banana",
    prompt:
      "A playful mechanical banana with intricate gears, studio lighting, high contrast, glossy metal, playful sci-fi mood.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhjmKRxmtfGsxFv9ivmNZX7_zUpyMY5WqzEumhVGm3W1AOwxOShnp6VrBofOWylUbW8L1HoUVfXVDXIiCJJPZ0BpZj_O3Gr6vDAkPTlB5_i3FfjpLVbX3-Um2NEiu3sOZF45-0xXKyds2qscEnQFQV3xmxv_UlfylKm8CuPULIUk4DRpdz2CFpt69_I4lbfTzREJdGmrpo94FrSjPMZjxilH2FwIezKcEQ-z3UOauDlPG4sHLeF6h_AXGv1BlBvXGAdoahndj8t9g",
    tag: "Sci-Fi",
  },
  {
    id: "showcase-5",
    title: "Neon Skyline",
    prompt:
      "A futuristic skyline above the clouds, glowing signage, neon reflections, moody twilight, ultra-wide composition.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw3zazyz6uu7DzILxGs0ZBBk3-1YcB5BIn-R6bzyTgoLRds90LhMGdq8eQVs-m9LbAoqrpjzlfry6pwT2iHFFvnwiqaGIHZSW-VOP0ixPLD63tQhCAFtXli-84XJoHfK-o1Epw9CwbS_Zwx50BpJOFSuroc6aV6mjzQbP0-JAoO3-gGmEImAHJOjr-_8cloQCZ8xpJmBIOOKpmqlwLVyfJQo7OAlkb6Gp7HinPTqIASpazS9K_6F7Sl0K065GLa20pt6DMIKGZUxM",
    tag: "Cityscape",
  },
  {
    id: "showcase-6",
    title: "Aurora Grove",
    prompt:
      "A serene woodland clearing under aurora lights, soft fog, warm fireflies, pastel palette, dreamy atmosphere.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj8r0sbIHFdPH-NioFqWrOUnXRwz023BuwfG5QoBQ3nfhhNAyjSzVLLgYEJKvNDbNAcAr-tIV7RB7NwGrxTXv3X5ov6bS3S_S09j7bj7EdaYgR7VPgNGA3gUIZuQulHb0-_ktoLDsW8cJ1lGOd87c0q_lh1fF4WIgvUFPRS3vRhe4pbarCjozMAYDRw0g7jW1hmMT5QL8-LYAP_Q8xFID_K9r1iHgo-ssrP6GXVwX_5CGtcWWlvsdV-57hkl_-zAy3_QH5ovfQXEg",
    tag: "Dreamy",
  },
];

const copyFallback = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const success = document.execCommand("copy");
  document.body.removeChild(textarea);
  return success;
};

const copyToClipboard = async (text: string) => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Ignore and fall back to legacy copy.
  }

  try {
    return copyFallback(text);
  } catch {
    return false;
  }
};

export default function ShowcaseGrid() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleCopy = async (id: string, prompt: string) => {
    const success = await copyToClipboard(prompt);
    if (!success) {
      return;
    }

    setCopiedId(id);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setCopiedId(null);
    }, 1600);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nano-text md:text-4xl">
            Showcase
          </h1>
          <p className="mt-4 text-nano-gray">
            Curated generations from the community. Click any card to copy the
            prompt.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {showcaseItems.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <button
                key={item.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nano-yellow/70"
                onClick={() => handleCopy(item.id, item.prompt)}
                type="button"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={item.image}
                  />
                  <div className="absolute inset-0 flex items-end justify-between p-4">
                    <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                      {item.tag}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
                        isCopied
                          ? "bg-nano-yellow text-black"
                          : "bg-white/90 text-black"
                      }`}
                    >
                      {isCopied ? (
                        <CheckIcon className="h-3.5 w-3.5" />
                      ) : (
                        <CopyIcon className="h-3.5 w-3.5" />
                      )}
                      {isCopied ? "Copied" : "Copy"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-nano-text">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-nano-gray">
                    {item.prompt}
                  </p>
                  <span className="mt-auto text-xs font-semibold uppercase tracking-wide text-nano-gray">
                    Click to copy prompt
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
