import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';

export default async function Lessons({ params }) {
  const accountId = (await params).id;
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
        <div>Lessons</div>
        {lessons.map((lesson) => (
          <div key={lesson.id}>{lesson.name}</div>
        ))}
      </div>
    </>
  );
}
