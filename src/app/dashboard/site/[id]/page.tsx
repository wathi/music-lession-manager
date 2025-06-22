import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { checkAccountAccess } from '@/app/utils/checkAccountAccess';

export default async function SitePage({ params }) {
  const accountId = (await params).id;
  const checkAccessResult = await checkAccountAccess(accountId);
  if (!checkAccessResult) {
    notFound();
  }

  const supabase = await createClient();

  const { data: account, error: accountError } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', accountId)
    .single();

  if (accountError || !account) {
    console.log('Account not found', accountError);
    redirect('/dashboard');
  }

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Overview</h1>
        <div className="mb-2">Account ID: {account.id}</div>
        <div className="mb-2">Account Name: {account.name}</div>
      </div>
    </>
  );
}
