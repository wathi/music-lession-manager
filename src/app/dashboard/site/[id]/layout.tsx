'use client';
import Link from 'next/link';
import React from 'react';

export default function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  return (
    <>
      <aside className="fixed top-12 left-0 h-[calc(100%-3rem)] w-56 overflow-y-auto text-gray-800 text-sm mt-4">
        <Link
          href={`/dashboard/site/${id}`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Overview
        </Link>
        <Link
          href={`/dashboard/site/${id}/students`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Students
        </Link>
        <Link
          href={`/dashboard/site/${id}/lessons`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Lessons
        </Link>
        <Link
          href={`/dashboard/site/${id}/messages`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Messages
        </Link>
        <Link
          href={`/dashboard/site/${id}/reports`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Reports
        </Link>
        <Link
          href={`/dashboard/site/${id}/website`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Website
        </Link>
        <Link
          href={`/dashboard/site/${id}/settings`}
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
