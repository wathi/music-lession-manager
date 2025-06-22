import Link from 'next/link';
import { createClient } from 'utils/supabase/server';

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div>
        <div className="mx-80 p-6">
          <nav className="text-gray-800 text-md flex items-center justify-between">
            <div className="text-xl cursor-pointer">NEIRO</div>
            <div className="flex items-center">
              <div className="p-4 py-2 mx-1 rounded-xl hover:text-gray-700 cursor-pointer">
                Feature
              </div>
              <div className="px-4 py-2 mx-1 rounded-xl hover:bg-gray-300 cursor-pointer">
                Pricing
              </div>
              <div className="px-4 py-2 mx-1 rounded-xl hover:bg-gray-300 cursor-pointer">
                Contact
              </div>
              {user ? (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 mx-1 rounded-xl bg-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 mx-1 rounded-xl hover:bg-gray-300 cursor-pointer"
                >
                  Log in
                </Link>
              )}
            </div>
          </nav>
          <main className="flex flex-col items-center p-4 m-20">
            <div className="text-gray-900 text-5xl font-bold p-6 mb-6">
              Where every lesson finds its rhythm
            </div>
            <p className="text-gray-800 text-2xl">
              A refined space to harmonise music learning —
            </p>
            <p className="text-gray-800 text-2xl mb-10">
              schedule, organise, and grow your musical journey.
            </p>
            <Link
              href="/register"
              className="rounded-md px-8 py-3 bg-gray-800 text-white font-medium hover:bg-gray-700 cursor-pointer"
            >
              Join Now
            </Link>
          </main>
        </div>
      </div>

      <footer className="bg-gray-700 text-white">
        <div className="mx-80 p-6">
          <div className="text-xl mb-2">NEIRO</div>
          <div className="text-sm mb-2">Follow us</div>
          <div className="border-b mb-2"></div>
          <div className="text-xs">
            Copyright (C) 2025. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
