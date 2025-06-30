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
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  } | null;

  const { data: students, error: studentError } = (await supabase
    .from('students')
    .select('id, name, email, phone')
    .eq('account_id', accountId)
    .is('archived_at', null)) as {
    data: StudentProfile[];
    error: PostgrestError;
  };

  if (studentError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl border-b">Students</h1>
      <div>
        <div className="mb-4">
          <Link
            href={`/dashboard/site/${accountId}/students/new`}
            className="bg-gray-700 text-white px-6 py-2 rounded-md cursor-pointer"
          >
            Add
          </Link>
        </div>

        {!students || students.length === 0 ? (
          <div>No students added yet</div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-4 mb-4 font-semibold">
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
            </div>

            {students.map((student) => (
              <div key={student.id} className="grid grid-cols-4 gap-4 mb-4">
                <Link
                  href={`./students/${student.id}`}
                  className="pr-2 text-blue-700"
                >
                  {student.name}
                </Link>
                <div>{student.email}</div>
                <div>{student.phone}</div>
                <div>Archive</div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
