import Link from 'next/link';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-12 border-b border-b-gray-300 text-gray-800 text-sm flex items-center justify-between p-4">
        <div className="text-xl cursor-pointer">NEIRO</div>
        <div className="flex items-center">
          <div className="p-2 py-1 hover:bg-gray-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </div>
          <div className="px-2 py-1 hover:bg-gray-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div className="px-2 py-1 hover:bg-gray-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>
      </nav>
      <aside className="fixed top-12 left-0 h-[calc(100%-3rem)] w-56 overflow-y-auto text-gray-800 text-sm mt-4">
        <Link
          href="/dashboard"
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/students"
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          students
        </Link>
        <Link
          href="/dashboard/lessons"
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Lessons
        </Link>
        <Link
          href="/dashboard/messages"
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Messages
        </Link>
        <Link
          href="/dashboard/reports"
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Reports
        </Link>
        <Link
          href="/dashboard/website"
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Website
        </Link>
        <Link
          href="/dashboard/settings"
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Settings
        </Link>
      </aside>
      <main className="absolute top-12 left-56 h-[calc(100%-3rem)] w-[calc(100%-14rem)] p-6 overflow-y-auto">
        {children}
      </main>
    </>
  );
}
