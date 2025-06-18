import { redirect } from 'next/navigation';

import { createClient } from 'utils/supabase/server';

export default async function PrivatePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/login');
  }

  console.log(user);

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single(); // since each user has one profile

  if (profileError) throw profileError;

  return (
    <>
      <p>Hello {user.email}</p>
      <p>{profile.first_name}</p>
    </>
  );
}
