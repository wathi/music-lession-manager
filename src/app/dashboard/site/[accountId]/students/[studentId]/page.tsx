import { notFound } from 'next/navigation';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import { createClient } from '@/utils/supabase/server';
import StudentForm from '@/app/components/student-form';

export default async function StudentPage({ params }) {
  const accountId = (await params).accountId;
  const studentId = (await params).studentId;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  const supabase = await createClient();

  const { data: student, error: studentError } = await supabase
    .from('students')
    .select(`*`)
    .eq('id', studentId)
    .single();

  if (studentError || !student) {
    return <div>Not found</div>;
  }

  return (
    <>
      <StudentForm
        accountId={accountId}
        studentId={student.id}
        studentName={student.name || ''}
        studentEmail={student.email || ''}
        studentPhone={student.phone || ''}
        newStudent={false}
      />
    </>
  );
}
