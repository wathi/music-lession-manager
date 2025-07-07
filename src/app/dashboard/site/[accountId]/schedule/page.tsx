import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import type { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';
import ScheduleItem from './_schedule-item';

export default async function Schedule({ params }) {
  const accountId = (await params).accountId;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  const supabase = await createClient();

  type Schedule = {
    id?: string;
    start_time?: string;
    end_time?: string;
    students: {
      id?: string;
      name?: string;
    };
    lessons: {
      id?: string;
      name?: string;
    };
  } | null;

  const { data: schedule, error: scheduleError } = (await supabase
    .from('schedule')
    .select('id, start_time, end_time, students(id, name), lessons(id, name)')
    .eq('account_id', accountId)
    .is('archived_at', null)) as {
    data: Schedule[];
    error: PostgrestError;
  };

  if (scheduleError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl border-b">Schedule</h1>
      <div>
        <div className="mb-4">
          <Link
            href={`/dashboard/site/${accountId}/schedule/new`}
            className="bg-gray-700 text-white px-6 py-2 rounded-md cursor-pointer"
          >
            Add
          </Link>
        </div>

        {!schedule || schedule.length === 0 ? (
          <div>No schedule added yet</div>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-4 mb-4 font-semibold">
              <div>Start</div>
              <div>End</div>
              <div>Student</div>
              <div>Lesson</div>
            </div>

            {schedule.map((item) => (
              <ScheduleItem
                key={item.id}
                schedule={item}
                accountId={accountId}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
