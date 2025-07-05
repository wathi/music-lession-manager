import { createClient } from '@/utils/supabase/server';
import type { Lesson } from '@/app/types/lessons';

export async function getActiveLessons(accountId: string): Promise<Lesson[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lessons')
    .select('id, name, price')
    .eq('account_id', accountId)
    .is('archived_at', null);

  if (error) throw new Error(error.message);
  return data || [];
}
