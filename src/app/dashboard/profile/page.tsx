import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import EditProfileForm from '@/app/components/edit-profile-form';
import Link from 'next/link';

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
      <Link
        href="/dashboard"
        className="flex items-center mb-6 text-gray-500 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Back to dashboard
      </Link>
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      <EditProfileForm user={user} profile={profile} />
    </div>
  );
}
