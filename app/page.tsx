export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center text-white">
      <main className="flex flex-col items-center text-center px-4 -mt-20">
        <h1 className="text-7xl md:text-9xl font-normal tracking-wide text-white font-[family-name:var(--font-eb-garamond)]">
          CAPABLE
        </h1>
        <p className="text-3xl md:text-4xl mt-4 font-[family-name:var(--font-eb-garamond)]">
          The Human Capabilities Lab
        </p>
        <p className="text-2xl md:text-3xl mt-16 font-[family-name:var(--font-eb-garamond)] max-w-2xl">
          The next-generation biology &amp; chemistry therapeutics platform.
        </p>
        <p className="text-xl md:text-2xl mt-6 font-[family-name:var(--font-eb-garamond)]">
          First milestone: Enabling faster sleep.
        </p>
        <p className="text-lg md:text-xl mt-8 text-white font-[family-name:var(--font-eb-garamond)]">
          San Francisco, California
        </p>
        <p className="text-2xl md:text-3xl mt-10 tracking-widest font-[family-name:var(--font-eb-garamond)]">
          MORE SOON.
        </p>
      </main>
      <footer className="absolute bottom-4 left-4 text-sm text-white font-[family-name:var(--font-eb-garamond)]">
        1 Corporate Drive, San Francisco, CA 94080
      </footer>
    </div>
  );
}
