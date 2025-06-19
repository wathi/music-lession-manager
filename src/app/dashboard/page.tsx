import { redirect } from 'next/navigation';
import { createClient } from 'utils/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login'); // Protect this route
  }

  return (
    <>
      <div>Hello, First name</div>
      <div></div>
    </>
  );
}
