import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import Link from 'next/link';

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
    .eq('account_id', accountId);

  if (lessonsError || !lessons) {
    return <div>No lessons added yet</div>;
  }

  return (
    <>
      <div>
        <div className="mb-4">
          <Link
            href={`/dashboard/site/${accountId}/lessons/new`}
            className="bg-gray-700 text-white px-6 py-2 rounded-md cursor-pointer"
          >
            Add
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>Name</div>
          <div>Price</div>
        </div>

        {lessons.map((lesson) => (
          <div key={lesson.id} className="grid grid-cols-2 gap-4 mb-4">
            <Link
              href={`./lessons/${lesson.id}`}
              className="pr-2 text-blue-700"
            >
              {lesson.name}
            </Link>
            <div>{lesson.price ? `£${lesson.price}` : 'Free'}</div>
          </div>
        ))}
      </div>
    </>
  );
}
