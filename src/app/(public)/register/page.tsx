import Link from 'next/link';
import { register } from './actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }
  return (
    <>
      <div className="flex flex-col items-center h-screen w-screen bg-gray-700">
        <div className="flex flex-col items-center m-20">
          <form className="flex flex-col items-center p-4 bg-gray-100 rounded-md w-150 mb-6">
            <div className="px-20 py-6 mb-6 border-b">Registration</div>

            <div className="flex flex-col mb-4">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                className="border border-gray-700 rounded-sm px-2 py-1"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="last_name">Last name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                className="border border-gray-700 rounded-sm px-2 py-1"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="border border-gray-700 rounded-sm px-2 py-1"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="border border-gray-700 rounded-sm px-2 py-1"
              />
            </div>
            <button
              className="bg-gray-700 rounded-xl text-white px-10 py-2 mb-4 hover:bg-gray-600 cursor-pointer"
              formAction={register}
            >
              Register
            </button>
          </form>
          <div className="flex flex-col items-center">
            <div className="text-gray-100 mb-2">Already have an account?</div>
            <Link
              href="/login"
              className="border border-gray-100 text-gray-100 rounded-xl px-10 py-2 hover:border-yellow-600 cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
