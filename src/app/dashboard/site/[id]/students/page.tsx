import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';

export default async function Students({ params }) {
  const accountId = (await params).id;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  const supabase = await createClient();

  const { data: students, error: studentsError } = await supabase
    .from('account_students')
    .select(`student_id`)
    .eq('account_id', accountId);

  if (studentsError || !students) {
    return <div>No students added yet</div>;
  }

  console.log('Students data:', students);
  return (
    <>
      <div>
        <div>Students</div>
        {students.map((student) => (
          <div key={student.student_id}>{student.student_id}</div>
        ))}
      </div>
    </>
  );
}
