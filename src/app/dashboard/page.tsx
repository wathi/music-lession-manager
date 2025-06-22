import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

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
      <div className="flex gap-4 py-6">
        {accounts?.map(
          ({ accounts }) =>
            accounts && (
              <Link
                href={`dashboard/site/${accounts.id}`}
                key={accounts.id}
                className="flex items-center justify-between border p-6 rounded-md w-96 hover:bg-gray-100 cursor-pointer"
              >
                <div>
                  <div className="text-xl text-gray-700">{accounts.name}</div>
                  <div className="text-sm text-gray-500">
                    {accounts.subdomain}
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
    </>
  );
}
