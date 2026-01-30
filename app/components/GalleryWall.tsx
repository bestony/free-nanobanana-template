/* eslint-disable @next/next/no-img-element */
const galleryItems = [
  {
    id: "gallery-1",
    title: "Skyline Drift",
    prompt: "Neon skyline with floating transit lanes, cinematic mood.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw3zazyz6uu7DzILxGs0ZBBk3-1YcB5BIn-R6bzyTgoLRds90LhMGdq8eQVs-m9LbAoqrpjzlfry6pwT2iHFFvnwiqaGIHZSW-VOP0ixPLD63tQhCAFtXli-84XJoHfK-o1Epw9CwbS_Zwx50BpJOFSuroc6aV6mjzQbP0-JAoO3-gGmEImAHJOjr-_8cloQCZ8xpJmBIOOKpmqlwLVyfJQo7OAlkb6Gp7HinPTqIASpazS9K_6F7Sl0K065GLa20pt6DMIKGZUxM",
    user: {
      name: "Lena Carter",
      handle: "@lenacreates",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAY3ai4di01Ldr5ffnYrK-NggiNBf17__gxQdMk7FMWYci-om2agTacyh7yfsHJIwkUFnd4_iduvWxfGV3-n1uEGiBrkurO9T24khf_CkA_Gz3E6XDrIRfSkqUvadMg3nkw0ZocxwfLUwKsXIiX3ivbAYdktEgsgiqru--d1IO7MQ6l1fyRjvecPwpw3Uc3o33vMUtO9GNH91IIJ89Lh-pcfg1-srrTKyFg8rxL8wTzu-MZKkds6A22M7vL_sx9FgGiY7BSjRkH6o8",
    },
  },
  {
    id: "gallery-2",
    title: "Verdant Gate",
    prompt: "Misty forest gateway with bioluminescent flora.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj8r0sbIHFdPH-NioFqWrOUnXRwz023BuwfG5QoBQ3nfhhNAyjSzVLLgYEJKvNDbNAcAr-tIV7RB7NwGrxTXv3X5ov6bS3S_S09j7bj7EdaYgR7VPgNGA3gUIZuQulHb0-_ktoLDsW8cJ1lGOd87c0q_lh1fF4WIgvUFPRS3vRhe4pbarCjozMAYDRw0g7jW1hmMT5QL8-LYAP_Q8xFID_K9r1iHgo-ssrP6GXVwX_5CGtcWWlvsdV-57hkl_-zAy3_QH5ovfQXEg",
    user: {
      name: "Jules Park",
      handle: "@julespark",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDE78U8KJbMy_s82mVuoGkEOCKIT_bE8-YIxomB6IOUnJNyJZoW29nVc5VwjxQ8InrIgyepzaprYhK3WTuc3R0MjkklP9nBokYv67cHocM9zHePhFS8XnqL52c42w7xeKXgYtwNoBb0j4IqYmypaFc_JjKpb0hCe2z41-X6fTfpAOT01Cnvg34DOiEmwovSgchUztwq1jOA29RAmFMYzoae2ofAaJlGPUkpE_zVXLnlOrC_nfkmMruuPfPEFt-5MTToyuXSQQbz9i4",
    },
  },
  {
    id: "gallery-3",
    title: "Studio Echo",
    prompt: "Minimal product set for audio gear, soft gradients.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMqtcKun7dwwURzwqexDlXtcmhupfurRbCcrVYZ_lKoG8bAIvHcFP70mayjtZYGsPhMc2miboUU5zCn7OlvyE8UlUwQfm66JXAP1_xIN_5wl4XHShwexJaZEfnP_MYJF_ZeTle4GH88uDSBsT6cuLmOoiK_7xVi1u8vNP0uUlH83GnrA4a7ysIoF_n4Ow24EwXej2MucMUUweDIrsTiaL_jEiF6ZxMK0U_cF30Wemvt2HGQcMBungle_OHL-2O4TpsGP2oSHmYPyE",
    user: {
      name: "Priya Noel",
      handle: "@priya.noel",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB3dU4aOkjS5DfVNzTgxC_D6hq2fAx0Nn_F7j3FWAQvyn--pfyz1pnOQNCMLO-m9_P5KGC4J4eRkzboTBr5ThJ3V7fBJaLm4Yb40jYW_TOVsXc4ydTs4NQ_UugpG3jix93Na-Vla_1ZcAnPXz_LFy2UnT8n8Yq-R7HCfAplBF0JPv2E336BdrR-aFwOibmU7dae-D9dRkjRNRj1dxhFALOFuihVPW7R3nGXHPU6jvH2RKS0k-Waqojeljl4J2aokxin9QCT1OvvbNY",
    },
  },
  {
    id: "gallery-4",
    title: "Mecha Peel",
    prompt: "Mechanical banana prototype with exposed gears.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhjmKRxmtfGsxFv9ivmNZX7_zUpyMY5WqzEumhVGm3W1AOwxOShnp6VrBofOWylUbW8L1HoUVfXVDXIiCJJPZ0BpZj_O3Gr6vDAkPTlB5_i3FfjpLVbX3-Um2NEiu3sOZF45-0xXKyds2qscEnQFQV3xmxv_UlfylKm8CuPULIUk4DRpdz2CFpt69_I4lbfTzREJdGmrpo94FrSjPMZjxilH2FwIezKcEQ-z3UOauDlPG4sHLeF6h_AXGv1BlBvXGAdoahndj8t9g",
    user: {
      name: "Marco Finch",
      handle: "@finchworks",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAY3ai4di01Ldr5ffnYrK-NggiNBf17__gxQdMk7FMWYci-om2agTacyh7yfsHJIwkUFnd4_iduvWxfGV3-n1uEGiBrkurO9T24khf_CkA_Gz3E6XDrIRfSkqUvadMg3nkw0ZocxwfLUwKsXIiX3ivbAYdktEgsgiqru--d1IO7MQ6l1fyRjvecPwpw3Uc3o33vMUtO9GNH91IIJ89Lh-pcfg1-srrTKyFg8rxL8wTzu-MZKkds6A22M7vL_sx9FgGiY7BSjRkH6o8",
    },
  },
  {
    id: "gallery-5",
    title: "Shadow City",
    prompt: "High-rise city in moody fog, neon signage, rain.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw3zazyz6uu7DzILxGs0ZBBk3-1YcB5BIn-R6bzyTgoLRds90LhMGdq8eQVs-m9LbAoqrpjzlfry6pwT2iHFFvnwiqaGIHZSW-VOP0ixPLD63tQhCAFtXli-84XJoHfK-o1Epw9CwbS_Zwx50BpJOFSuroc6aV6mjzQbP0-JAoO3-gGmEImAHJOjr-_8cloQCZ8xpJmBIOOKpmqlwLVyfJQo7OAlkb6Gp7HinPTqIASpazS9K_6F7Sl0K065GLa20pt6DMIKGZUxM",
    user: {
      name: "Asha Malik",
      handle: "@asha_m",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDE78U8KJbMy_s82mVuoGkEOCKIT_bE8-YIxomB6IOUnJNyJZoW29nVc5VwjxQ8InrIgyepzaprYhK3WTuc3R0MjkklP9nBokYv67cHocM9zHePhFS8XnqL52c42w7xeKXgYtwNoBb0j4IqYmypaFc_JjKpb0hCe2z41-X6fTfpAOT01Cnvg34DOiEmwovSgchUztwq1jOA29RAmFMYzoae2ofAaJlGPUkpE_zVXLnlOrC_nfkmMruuPfPEFt-5MTToyuXSQQbz9i4",
    },
  },
  {
    id: "gallery-6",
    title: "Whispering Grove",
    prompt: "Forest clearing with aurora glow and floating spores.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj8r0sbIHFdPH-NioFqWrOUnXRwz023BuwfG5QoBQ3nfhhNAyjSzVLLgYEJKvNDbNAcAr-tIV7RB7NwGrxTXv3X5ov6bS3S_S09j7bj7EdaYgR7VPgNGA3gUIZuQulHb0-_ktoLDsW8cJ1lGOd87c0q_lh1fF4WIgvUFPRS3vRhe4pbarCjozMAYDRw0g7jW1hmMT5QL8-LYAP_Q8xFID_K9r1iHgo-ssrP6GXVwX_5CGtcWWlvsdV-57hkl_-zAy3_QH5ovfQXEg",
    user: {
      name: "Theo Navarro",
      handle: "@theon",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB3dU4aOkjS5DfVNzTgxC_D6hq2fAx0Nn_F7j3FWAQvyn--pfyz1pnOQNCMLO-m9_P5KGC4J4eRkzboTBr5ThJ3V7fBJaLm4Yb40jYW_TOVsXc4ydTs4NQ_UugpG3jix93Na-Vla_1ZcAnPXz_LFy2UnT8n8Yq-R7HCfAplBF0JPv2E336BdrR-aFwOibmU7dae-D9dRkjRNRj1dxhFALOFuihVPW7R3nGXHPU6jvH2RKS0k-Waqojeljl4J2aokxin9QCT1OvvbNY",
    },
  },
  {
    id: "gallery-7",
    title: "Console Glow",
    prompt: "Premium headphone close-up, soft gradients, sharp focus.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMqtcKun7dwwURzwqexDlXtcmhupfurRbCcrVYZ_lKoG8bAIvHcFP70mayjtZYGsPhMc2miboUU5zCn7OlvyE8UlUwQfm66JXAP1_xIN_5wl4XHShwexJaZEfnP_MYJF_ZeTle4GH88uDSBsT6cuLmOoiK_7xVi1u8vNP0uUlH83GnrA4a7ysIoF_n4Ow24EwXej2MucMUUweDIrsTiaL_jEiF6ZxMK0U_cF30Wemvt2HGQcMBungle_OHL-2O4TpsGP2oSHmYPyE",
    user: {
      name: "Sora Kim",
      handle: "@soraviews",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAY3ai4di01Ldr5ffnYrK-NggiNBf17__gxQdMk7FMWYci-om2agTacyh7yfsHJIwkUFnd4_iduvWxfGV3-n1uEGiBrkurO9T24khf_CkA_Gz3E6XDrIRfSkqUvadMg3nkw0ZocxwfLUwKsXIiX3ivbAYdktEgsgiqru--d1IO7MQ6l1fyRjvecPwpw3Uc3o33vMUtO9GNH91IIJ89Lh-pcfg1-srrTKyFg8rxL8wTzu-MZKkds6A22M7vL_sx9FgGiY7BSjRkH6o8",
    },
  },
  {
    id: "gallery-8",
    title: "Circuit Peel",
    prompt: "Mechanical banana assembly in a clean lab setting.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhjmKRxmtfGsxFv9ivmNZX7_zUpyMY5WqzEumhVGm3W1AOwxOShnp6VrBofOWylUbW8L1HoUVfXVDXIiCJJPZ0BpZj_O3Gr6vDAkPTlB5_i3FfjpLVbX3-Um2NEiu3sOZF45-0xXKyds2qscEnQFQV3xmxv_UlfylKm8CuPULIUk4DRpdz2CFpt69_I4lbfTzREJdGmrpo94FrSjPMZjxilH2FwIezKcEQ-z3UOauDlPG4sHLeF6h_AXGv1BlBvXGAdoahndj8t9g",
    user: {
      name: "Riley Zhou",
      handle: "@rzhodesign",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDE78U8KJbMy_s82mVuoGkEOCKIT_bE8-YIxomB6IOUnJNyJZoW29nVc5VwjxQ8InrIgyepzaprYhK3WTuc3R0MjkklP9nBokYv67cHocM9zHePhFS8XnqL52c42w7xeKXgYtwNoBb0j4IqYmypaFc_JjKpb0hCe2z41-X6fTfpAOT01Cnvg34DOiEmwovSgchUztwq1jOA29RAmFMYzoae2ofAaJlGPUkpE_zVXLnlOrC_nfkmMruuPfPEFt-5MTToyuXSQQbz9i4",
    },
  },
];

export default function GalleryWall() {
  return (
    <section className="bg-gray-50/50 px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nano-text md:text-4xl">
            Gallery
          </h1>
          <p className="mt-4 text-nano-gray">
            Every creation includes the artist behind it.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  alt={item.title}
                  className="h-full w-full object-cover"
                  src={item.image}
                />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <img
                    alt={item.user.name}
                    className="h-10 w-10 rounded-full object-cover"
                    src={item.user.avatar}
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-nano-text">
                      {item.user.name}
                    </h3>
                    <p className="text-xs text-nano-gray">{item.user.handle}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-nano-text">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-nano-gray">{item.prompt}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
