'use client';

import { useState } from 'react';
import Link from 'next/link';
import ArchiveModal from '@/app/components/archive-modal';
import { createClient } from '@/utils/supabase/client';

export default function ScheduleItem({ schedule, accountId }) {
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [archived, setArchived] = useState(false);

  const handleArchive = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from('schedule')
      .update({ archived_at: new Date().toISOString() })
      .eq('id', schedule.id)
      .eq('account_id', accountId);

    if (!error) {
      setArchived(true);
      setOpenArchiveModal(false);
    } else {
      console.log(error);
    }
  };

  if (archived) return null;

  return (
    <>
      <div className="grid grid-cols-5 gap-4 mb-4 hover:bg-gray-100 rounded-md p-2">
        <Link href={`./schedule/${schedule.id}`} className="pr-2 text-blue-700">
          {schedule.start_time}
        </Link>
        <div>{schedule.end_time}</div>
        <div>{schedule.students.name}</div>
        <div>{schedule.lessons.name}</div>
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
