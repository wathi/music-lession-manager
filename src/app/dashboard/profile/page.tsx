import { redirect } from 'next/navigation';
import { createClient } from 'utils/supabase/server';
import EditProfileForm from 'app/components/edit-profile-form';

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (profileError) throw profileError;

  return (
    <div className="px-50">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>
      <EditProfileForm user={user} profile={profile} />
    </div>
  );
}
