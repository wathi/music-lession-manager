'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from 'utils/supabase/server';

export async function register(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { data, error } = await supabase.auth.signUp({
    email: (formData.get('email') as string).trim(),
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: (formData.get('first_name') as string).trim(),
        last_name: (formData.get('last_name') as string).trim(),
      },
    },
  });

  if (error) {
    throw new Error(error.message);
    // redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
