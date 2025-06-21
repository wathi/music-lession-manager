import { redirect } from 'next/navigation';
import { createClient } from 'utils/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

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
    <>
      <div>Organisations</div>
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
    </>
  );
}
