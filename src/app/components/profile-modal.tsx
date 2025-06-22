import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { logout } from './logout';

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
};

type ProfileModalProps = {
  user: User | null;
  profile: Profile | null;
  closeModal: () => void;
};

export default function ProfileModal({
  user,
  profile,
  closeModal,
}: ProfileModalProps) {
  const router = useRouter();

  return (
    <div className="fixed top-10 right-6 border border-gray-500 bg-gray-100 rounded-md">
      <div className="px-2 border-b">
        <div className="text-base my-1 pl-2 pr-6 rounded-md">
          {profile?.first_name}
        </div>
        <div className="text-base my-1 pl-2 pr-6 rounded-md">{user?.email}</div>
      </div>
      <div className="px-2 border-b">
        <div
          className="text-base my-1 pl-2 pr-6 rounded-md hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            router.push('/dashboard/profile');
            closeModal();
          }}
        >
          Profile
        </div>
      </div>
      <div className="px-2">
        <div
          className="text-base my-1 pl-2 pr-6 rounded-md hover:bg-gray-200 cursor-pointer"
          onClick={async () => {
            await logout();
            router.push('/login');
          }}
        >
          Log out
        </div>
      </div>
    </div>
  );
}
