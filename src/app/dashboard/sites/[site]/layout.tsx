'use client';
import Link from 'next/link';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
