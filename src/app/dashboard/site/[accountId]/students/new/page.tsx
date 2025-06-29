import { notFound } from 'next/navigation';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';
import StudentForm from '@/app/components/student-form';

export default async function NewStudentPage({ params }) {
  const accountId = (await params).accountId;
  console.log(params);
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  return (
    <>
      <div>Add new student</div>
      <StudentForm
        accountId={accountId}
        studentId=""
        studentName=""
        studentEmail=""
        studentPhone=""
        newStudent={true}
      />
    </>
  );
}
