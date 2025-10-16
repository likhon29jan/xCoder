export function BaseChat() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-neutral-950 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center shadow-lg">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to xCoder</h1>
        <p className="mt-2 text-sm text-neutral-300">
          Loading the interactive workspace. Hold steady while we prepare your mindful environment.
        </p>
      </div>
    </div>
  );
}
