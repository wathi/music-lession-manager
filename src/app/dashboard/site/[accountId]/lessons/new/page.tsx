import { notFound } from 'next/navigation';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import LessonForm from '@/app/components/lesson-form';

export default async function NewLessonPage({ params }) {
  const accountId = (await params).accountId;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  return (
    <>
      <div>Add new lesson</div>
      <LessonForm
        accountId={accountId}
        lessonId=""
        lessonName=""
        lessonPrice=""
        newLesson={true}
      />
    </>
  );
}
