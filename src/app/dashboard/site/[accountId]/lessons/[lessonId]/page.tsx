import { notFound } from 'next/navigation';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import { createClient } from '@/utils/supabase/server';
import LessonForm from '@/app/components/lesson-form';

export default async function LessonPage({ params }) {
  const accountId = (await params).accountId;
  const lessonId = (await params).lessonId;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  const supabase = await createClient();

  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select(`*`)
    .eq('id', lessonId)
    .single();

  if (lessonError || !lesson) {
    return <div>Not found</div>;
  }

  return (
    <>
      <LessonForm
        accountId={accountId}
        lessonId={lesson.id}
        lessonName={lesson.name}
        lessonPrice={lesson.price}
        newLesson={false}
      />
    </>
  );
}
