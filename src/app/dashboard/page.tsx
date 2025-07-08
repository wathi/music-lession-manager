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

  type AccountUser = {
    accounts: {
      id: string;
      name: string;
      subdomain: string;
    } | null;
  };

  const { data: accounts } = (await supabase
    .from('account_users')
    .select('accounts ( id, name, subdomain )')
    .eq('user_id', user.id)
    .in('role', ['owner', 'user'])) as { data: AccountUser[] };

  return (
    <>
      <div className="mb-4">Organisations</div>
      <div className="mb-4">
        <Link
          href={`/dashboard/site/new`}
          className="bg-gray-700 text-white px-6 py-2 rounded-md cursor-pointer"
        >
          Add
        </Link>
      </div>
      <div className="flex gap-4 py-6">
        {accounts?.map((account) => (
          <Link
            href={`dashboard/site/${account.accounts.id}`}
            key={account.accounts.id}
            className="flex items-center justify-between border p-6 rounded-md w-96 hover:bg-gray-100 cursor-pointer"
          >
            <div>
              <div className="text-xl text-gray-700">
                {account.accounts.name}
              </div>
              <div className="text-sm text-gray-500">
                {account.accounts.subdomain}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
