import { redirect } from 'next/navigation';
import { createClient } from 'utils/supabase/server';

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
    .eq('id', user.id)
    .single(); // since each user has one profile

  if (profileError) throw profileError;

  type Account = {
    id: string;
    name: string;
    subdomain: string;
  };

  type AccountUser = {
    accounts: Account | null;
  };

  const { data: accounts } = (await supabase
    .from('account_users')
    .select('accounts ( id, name, subdomain )')
    .eq('user_id', user.id)) as { data: AccountUser[] };

  return (
    <div className="px-50">
      <h1 className="mb-6 text-2xl font-bold">Profile settings</h1>
      <div className="mb-6 border-b">
        <div className="font-bold">First name</div>
        <div className="py-2 mb-2">{profile.first_name}</div>
        <div className="font-bold">Last name</div>
        <div className="py-2 mb-2">{profile.last_name}</div>
        <div className="font-bold">Email</div>
        <div className="py-2 mb-2">{user.email}</div>
      </div>

      {accounts?.map(
        ({ accounts }) =>
          accounts && (
            <div
              key={accounts.id}
              className="flex items-center justify-between"
            >
              <div>
                <div className="text-xl text-gray-700">{accounts.name}</div>
                <a
                  className="text-sm text-gray-500"
                  href={`${accounts.subdomain}`}
                >
                  {accounts.subdomain}
                </a>
              </div>
              <div className="bg-gray-300 px-6 py-2 rounded-md">Setting</div>
            </div>
          )
      )}
    </div>
  );
}
