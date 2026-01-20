export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center text-white">
      <main className="flex flex-col items-center text-center px-4">
        <p className="text-2xl md:text-3xl font-[family-name:var(--font-eb-garamond)] tracking-wide">
          HUMANS ARE
        </p>
        <h1 className="text-8xl md:text-[12rem] font-normal tracking-wide text-white font-[family-name:var(--font-eb-garamond)] leading-none my-2">
          CAPABLE
        </h1>
        <p className="text-2xl md:text-3xl font-[family-name:var(--font-eb-garamond)] tracking-wide">
          OF GREATNESS
        </p>
        <p className="text-xl md:text-2xl mt-16 tracking-widest font-[family-name:var(--font-eb-garamond)]">
          More soon.
        </p>
      </main>
    </div>
  );
}
