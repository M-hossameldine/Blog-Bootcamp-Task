// 14px 16px 18px 20px 24px 36px
export const LayoutHeader = () => {
  return (
    <header className="relative flex items-center justify-center rounded-2xl bg-white/50 px-6 py-4 font-semibold text-white backdrop-blur-lg">
      <p className="absolute top-1/2 left-6 -translate-y-1/2 text-xl">
        Elevate
      </p>
      <h1 className="mx-auto text-2xl">Frontend Advanced Bootcamp Task</h1>
    </header>
  );
};
