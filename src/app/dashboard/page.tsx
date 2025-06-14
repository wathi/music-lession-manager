export default function Dashboard() {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 h-12 bg-emerald-900 text-white flex items-center justify-between px-4 z-10">
        <div className="text-lg">LOGO</div>
        <div className="flex">
          <div className="px-4">menu1</div>
          <div className="px-4">user icon</div>
        </div>
      </nav>

      <aside className="fixed top-12 left-0 h-[calc(100%-3rem)] w-56 bg-stone-300  overflow-y-auto border-r border-r-emerald-900">
        <ul>
          <li>
            <a href="#" className="block hover:bg-stone-400 p-4">
              Schedule
            </a>
          </li>
          <li>
            <a href="#" className="block hover:bg-stone-400 p-4">
              Student
            </a>
          </li>
          <li>
            <a href="#" className="block hover:bg-stone-400 p-4">
              Lesson
            </a>
          </li>
        </ul>
      </aside>

      <main className="absolute top-12 left-56 h-[calc(100%-3rem)] w-[calc(100%-14rem)] bg-stone-300 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Schedule</h1>
        <div className="flex bg-stone-400 text-gray-700">
          <div className="p-4">Date</div>
          <div className="p-4">Student</div>
        </div>
      </main>
    </div>
  );
}
