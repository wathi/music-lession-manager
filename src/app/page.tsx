export default function Page() {
  return (
    <div className="h-screen w-screen bg-stone-300 grid place-content-center">
      <div className="flex flex-col justify-center">
        <div className="text-6xl mb-20">Music Lesson Manager</div>
        <div className="flex justify-center">
          <button className="px-8 py-4 m-4 rounded-xl bg-emerald-900 text-white hover:bg-green-800">
            Sign up
          </button>
          <button className="px-8 py-4 m-4 rounded-xl border border-emerald-900 text-black hover:bg-stone-400">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
