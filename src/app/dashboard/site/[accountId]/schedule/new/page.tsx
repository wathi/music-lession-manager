import { notFound } from 'next/navigation';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import ScheduleForm from '@/app/components/schedule-form';

export default async function NewSchedulePage({ params }) {
  const accountId = (await params).accountId;

  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

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
        newSchedule={false}
      />
    </>
  );
}
