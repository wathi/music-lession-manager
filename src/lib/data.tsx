import { createClient } from 'utils/supabase/server';

export default async function Data() {
  const supabase = await createClient();
  const { data } = await supabase.from('users').select();
  console.log(data);
  return <pre>{JSON.stringify(data)}</pre>;
}
