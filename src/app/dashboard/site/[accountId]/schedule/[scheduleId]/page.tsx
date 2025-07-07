import { notFound } from 'next/navigation';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import { createClient } from '@/utils/supabase/server';
import ScheduleForm from '@/app/components/schedule-form';
import { getActiveStudents } from '@/app/utils/students';
import { getActiveLessons } from '@/app/utils/lessons';

export default async function SchedulePage({ params }) {
  const accountId = (await params).accountId;
  const scheduleId = (await params).scheduleId;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }
  const students = await getActiveStudents(accountId);
  const lessons = await getActiveLessons(accountId);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('schedule')
    .select(`*`)
    .eq('id', scheduleId)
    .single();

  if (error || !data) {
    return <div>Not found</div>;
  }

  return (
    <>
      <ScheduleForm
        accountId={accountId}
        scheduleId={data.id}
        lessonId={data.lesson_id}
        studentId={data.student_id}
        startTime={data.start_time}
        endTime={data.end_time}
        newSchedule={false}
        students={students}
        lessons={lessons}
      />
    </>
  );
}
