import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import CreateAccountForm from '@/app/components/create-account-form';

export default async function CreateNewAccount() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return (
    <>
      <div>Create new account</div>
      <CreateAccountForm userId={user.id} />
    </>
  );
}
