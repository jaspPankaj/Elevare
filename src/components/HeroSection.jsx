export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center gap-4 px-4 p-8"> 
      <h1 className="text-6xl text-blue-600 text-shadow-lg font-bold text-center">
          Elevare
        </h1>
        <h3 className="text-3xl text-black text-shadow-sm font-semibold text-center">
          From skills to success, Smarter with AI
        </h3>
        <a href="/elevare/register" className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Start Now
          </div>
        </a>
    </section>
  );
};
