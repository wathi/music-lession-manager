import { redirect, notFound } from 'next/navigation';
import { createClient } from 'utils/supabase/server';
import { checkAccountAccess } from 'app/utils/checkAccountAccess';

export default async function Students({ params }) {
  const accountId = (await params).id;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  const supabase = await createClient();

  const { data: students, error: studentsError } = await supabase
    .from('students')
    .select('*')
    .eq('account_id', accountId);

  if (studentsError || !students) {
    console.log('Data not found', studentsError);
    redirect('/dashboard');
  }

  console.log('Students data:', students);
  return (
    <>
      <div>
        <div>Students</div>
        {students.map((student) => (
          <div key={student.id}>{student.first_name}</div>
        ))}
      </div>
    </>
  );
}
