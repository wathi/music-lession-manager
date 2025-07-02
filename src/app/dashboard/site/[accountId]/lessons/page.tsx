import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import Link from 'next/link';
import LessonItem from './lesson-item';

export default async function Lessons({ params }) {
  const accountId = (await params).accountId;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  const supabase = await createClient();

  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('*')
    .eq('account_id', accountId)
    .is('archived_at', null);

  if (lessonsError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl border-b">Lessons</h1>
      <div>
        <div className="mb-4">
          <Link
            href={`/dashboard/site/${accountId}/lessons/new`}
            className="bg-gray-700 text-white px-6 py-2 rounded-md cursor-pointer"
          >
            Add
          </Link>
        </div>

        {!lessons || lessons.length === 0 ? (
          <div>No lessons added yet</div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-4 font-semibold p-2">
              <div>Name</div>
              <div>Price</div>
            </div>

            {lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                accountId={accountId}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
