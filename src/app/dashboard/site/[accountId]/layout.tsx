'use client';
import DashboardNavbar from '@/app/components/dashboard-navbar';
import Link from 'next/link';
import React from 'react';

export default function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = React.use(params);

  return (
    <>
      <DashboardNavbar accountId={accountId} />
      <aside className="fixed top-12 left-0 h-[calc(100%-3rem)] w-56 overflow-y-auto text-gray-800 text-sm mt-4">
        <Link
          href={`/dashboard/site/${accountId}`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Overview
        </Link>
        <Link
          href={`/dashboard/site/${accountId}/students`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Students
        </Link>
        <Link
          href={`/dashboard/site/${accountId}/lessons`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Lessons
        </Link>
        <Link
          href={`/dashboard/site/${accountId}/schedule`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Schedule
        </Link>
        <Link
          href={`/dashboard/site/${accountId}/messages`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Messages
        </Link>
        <Link
          href={`/dashboard/site/${accountId}/reports`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Reports
        </Link>
        <Link
          href={`/dashboard/site/${accountId}/website`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Website
        </Link>
        <Link
          href={`/dashboard/site/${accountId}/settings`}
          className="block hover:bg-gray-300 p-4 cursor-pointer"
        >
          Settings
        </Link>
      </aside>
      <div className="absolute top-12 left-56 h-[calc(100%-3rem)] w-[calc(100%-14rem)] p-6 overflow-y-auto">
        {children}
      </div>
    </>
  );
}
