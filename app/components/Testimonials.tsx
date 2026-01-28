/* eslint-disable @next/next/no-img-element */
export default function Testimonials() {
  return (
    <section className="bg-gray-50/50 px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <h2 className="text-center text-3xl font-bold text-nano-text md:text-4xl">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-6 text-sm italic leading-relaxed text-nano-gray">
              &ldquo;Nanobanana is creating everything with AI-Power! With our
              advanced AI-systems and creative comments, service is
              impeccable.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <img
                alt="User"
                className="h-12 w-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY3ai4di01Ldr5ffnYrK-NggiNBf17__gxQdMk7FMWYci-om2agTacyh7yfsHJIwkUFnd4_iduvWxfGV3-n1uEGiBrkurO9T24khf_CkA_Gz3E6XDrIRfSkqUvadMg3nkw0ZocxwfLUwKsXIiX3ivbAYdktEgsgiqru--d1IO7MQ6l1fyRjvecPwpw3Uc3o33vMUtO9GNH91IIJ89Lh-pcfg1-srrTKyFg8rxL8wTzu-MZKkds6A22M7vL_sx9FgGiY7BSjRkH6o8"
              />
              <div>
                <h4 className="text-sm font-bold">Anna Borah</h4>
                <p className="text-xs text-nano-gray">Diversity Manager</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-6 text-sm italic leading-relaxed text-nano-gray">
              &ldquo;Nanobanana is satiris complex with AI-Powers! With
              extraordinary painting in stunning artworks with our advanced AI
              generation.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <img
                alt="User"
                className="h-12 w-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE78U8KJbMy_s82mVuoGkEOCKIT_bE8-YIxomB6IOUnJNyJZoW29nVc5VwjxQ8InrIgyepzaprYhK3WTuc3R0MjkklP9nBokYv67cHocM9zHePhFS8XnqL52c42w7xeKXgYtwNoBb0j4IqYmypaFc_JjKpb0hCe2z41-X6fTfpAOT01Cnvg34DOiEmwovSgchUztwq1jOA29RAmFMYzoae2ofAaJlGPUkpE_zVXLnlOrC_nfkmMruuPfPEFt-5MTToyuXSQQbz9i4"
              />
              <div>
                <h4 className="text-sm font-bold">Jennifer Shaner</h4>
                <p className="text-xs text-nano-gray">CEO</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-6 text-sm italic leading-relaxed text-nano-gray">
              &ldquo;Creative minds meet ideas! Unique AI generation tools allow
              me to expand my horizons quickly.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <img
                alt="User"
                className="h-12 w-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3dU4aOkjS5DfVNzTgxC_D6hq2fAx0Nn_F7j3FWAQvyn--pfyz1pnOQNCMLO-m9_P5KGC4J4eRkzboTBr5ThJ3V7fBJaLm4Yb40jYW_TOVsXc4ydTs4NQ_UugpG3jix93Na-Vla_1ZcAnPXz_LFy2UnT8n8Yq-R7HCfAplBF0JPv2E336BdrR-aFwOibmU7dae-D9dRkjRNRj1dxhFALOFuihVPW7R3nGXHPU6jvH2RKS0k-Waqojeljl4J2aokxin9QCT1OvvbNY"
              />
              <div>
                <h4 className="text-sm font-bold">Mark Otto</h4>
                <p className="text-xs text-nano-gray">Merch Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
