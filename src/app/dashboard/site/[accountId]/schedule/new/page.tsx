import { notFound } from 'next/navigation';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import ScheduleForm from '@/app/components/schedule-form';
import { getActiveStudents } from '@/app/utils/students';
import { getActiveLessons } from '@/app/utils/lessons';

export default async function NewSchedulePage({ params }) {
  const accountId = (await params).accountId;

  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  const students = await getActiveStudents(accountId);
  const lessons = await getActiveLessons(accountId);

  return (
    <>
      <div>Add new schedule</div>
      <ScheduleForm
        accountId={accountId}
        scheduleId=""
        lessonId=""
        studentId=""
        startTime=""
        endTime=""
        newSchedule={true}
        students={students}
        lessons={lessons}
      />
    </>
  );
}
