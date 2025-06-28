import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import type { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';

export default async function Students({ params }) {
  const accountId = (await params).accountId;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  const supabase = await createClient();

  type StudentProfile = {
    user_id: string;
    profiles: {
      id: string;
      first_name: string;
      last_name: string;
    } | null;
  };

  const { data: students, error: studentError } = (await supabase
    .from('account_users')
    .select('user_id, profiles (id, first_name, last_name)')
    .eq('account_id', accountId)
    .eq('role', 'student')) as {
    data: StudentProfile[];
    error: PostgrestError;
  };

  if (!students || students.length === 0) {
    return <div>No students added yet</div>;
  }

  if (studentError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl border-b">Students</h1>
      <div>
        <div className="mb-4">
          <Link
            href={``}
            className="bg-gray-700 text-white px-6 py-2 rounded-md cursor-pointer"
          >
            Invite Student
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>First name</div>
          <div>Last name</div>
        </div>

        {students.map((student) => (
          <div
            key={student.profiles.id}
            className="grid grid-cols-3 gap-4 mb-4"
          >
            <div>{student.profiles.first_name}</div>
            <div>{student.profiles.last_name}</div>
            <div>
              <Link
                href={`./students/${student.user_id}`}
                className="px-4 py-2 rounded-md bg-gray-700 text-white"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
