import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function checkAccountAccess(accountId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: userAccount, error: userAccountError } = await supabase
    .from('account_users')
    .select('account_id')
    .eq('user_id', user.id)
    .eq('account_id', accountId)
    .in('role', ['owner', 'user'])
    .single();

  if (userAccountError || !userAccount) {
    console.log('User account not found', userAccountError);
    redirect('/dashboard');
  }

  if (userAccount.account_id !== accountId) {
    console.log('User does not have access to this account');
    redirect('/dashboard');
  }
  return { user, userAccount };
}
