import { createClient } from '@/utils/supabase/server';
import type { StudentProfile } from '@/app/types/students';

export async function getActiveStudents(
  accountId: string
): Promise<StudentProfile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('students')
    .select('id, name, email, phone')
    .eq('account_id', accountId)
    .is('archived_at', null);

  if (error) throw new Error(error.message);
  return data || [];
}
