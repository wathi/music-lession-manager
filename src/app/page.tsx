export default function Page() {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 h-12 bg-gray-800 text-white flex items-center px-4 z-10">
        <div className="text-lg font-semibold">Top Navigation</div>
      </nav>

      <aside className="fixed top-12 left-0 h-[calc(100%-3rem)] w-56 bg-gray-900 text-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block hover:bg-gray-700 px-2 py-1 rounded">
              Link 1
            </a>
          </li>
          <li>
            <a href="#" className="block hover:bg-gray-700 px-2 py-1 rounded">
              Link 2
            </a>
          </li>
          <li>
            <a href="#" className="block hover:bg-gray-700 px-2 py-1 rounded">
              Link 3
            </a>
          </li>
        </ul>
      </aside>

      <main className="absolute top-12 left-56 h-[calc(100%-3rem)] w-[calc(100%-14rem)] bg-gray-100 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Content Area</h1>
        <p className="text-gray-700">
          This is your main content space. It takes up the full remaining space
          of the screen.
        </p>
      </main>
    </div>
  );
}
