export default function CoreFeatures() {
  return (
    <section className="bg-white px-6 py-24" id="features">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-nano-text md:text-4xl">
            Core Features
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold">Speed</h3>
            <p className="text-sm text-nano-gray">
              High-resolution generation, fast and reliable for all your
              creative needs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.38.328 16.042 16.042 0 0 0 4.788-1.284 6.75 6.75 0 0 0-3.39-12.016A6.749 6.749 0 0 0 4.7 9.873c0 .354.02.705.057 1.054.496.064.982.206 1.436.425ZM4.82 20.211a2.25 2.25 0 0 1-4.144-.753 5.996 5.996 0 0 1 1.944-4.524l-.193-.058a.75.75 0 0 1 .425-1.353l.317.094c.06-.39.148-.773.264-1.146A21.574 21.574 0 0 1 2.76 12.035a.75.75 0 0 1 .305-1.46c.338.07.683.125 1.033.166A6.878 6.878 0 0 1 4.29 9.805a8.273 8.273 0 0 1 2.39-4.606.75.75 0 0 1 1.06 0 8.273 8.273 0 0 1 2.39 4.606c.045.312.076.627.093.945a.75.75 0 0 1-.689.813c-.35.04-.695.096-1.033.166a.75.75 0 0 1-.305-1.46 19.96 19.96 0 0 0-1.067-.282 6.75 6.75 0 0 0-3.39-12.016Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold">Palette Variety</h3>
            <p className="text-sm text-nano-gray">
              Premium color presets and variety of instant technological styles.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold">Brain Models</h3>
            <p className="text-sm text-nano-gray">
              Generate AI generated art, and access different AI models with
              ease.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold">Easy to Access</h3>
            <p className="text-sm text-nano-gray">
              Access seamless entries to societies and networks from the cloud.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
