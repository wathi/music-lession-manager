'use client';

import { useState } from 'react';
import Link from 'next/link';
import ArchiveModal from '@/app/components/archive-modal';

export default function LessonItem({ lesson, accountId }) {
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [archived, setArchived] = useState(false);

  const handleArchive = async () => {
    const res = await fetch(
      `/dashboard/site/${accountId}/lessons/${lesson.id}/archive`,
      {
        method: 'POST',
      }
    );

    if (res.ok) {
      setArchived(true);
      setOpenArchiveModal(false);
    } else {
      alert('Failed to archive');
    }
  };

  if (archived) return null;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4 hover:bg-gray-100 rounded-md p-2">
        <Link href={`./lessons/${lesson.id}`} className="pr-2 text-blue-700">
          {lesson.name}
        </Link>
        <div>{lesson.price ? `£${lesson.price}` : 'Free'}</div>
        <div className="relative">
          <button
            onClick={() => setShowMenuDropdown(!showMenuDropdown)}
            className="absolute right-0"
          >
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
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
          {showMenuDropdown && (
            <div className="absolute right-0 top-full bg-white border rounded shadow-lg z-10 mt-2 w-32">
              <button
                onClick={() => {
                  setOpenArchiveModal(true);
                  setShowMenuDropdown(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Archive
              </button>
            </div>
          )}
        </div>
      </div>
      {openArchiveModal && (
        <ArchiveModal
          open={openArchiveModal}
          setOpen={setOpenArchiveModal}
          onArchive={handleArchive}
        />
      )}
    </>
  );
}
