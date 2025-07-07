import { notFound } from 'next/navigation';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import Link from 'next/link';
import { StudentProfile } from '@/app/types/students';
import { getActiveStudents } from '@/app/utils/students';

export default async function Students({ params }) {
  const accountId = (await params).accountId;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  let students: StudentProfile[] = [];

  try {
    students = await getActiveStudents(accountId);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return <div>Error: {message}</div>;
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
