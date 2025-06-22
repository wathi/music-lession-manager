'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function EditProfileForm({ user, profile }) {
  const [firstName, setFirstName] = useState(profile.first_name || '');
  const [lastName, setLastName] = useState(profile.last_name || '');
  const [contentChanged, setContentChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({ first_name: firstName, last_name: lastName })
      .eq('user_id', user.id);

    setLoading(false);
    setContentChanged(false);
    if (error) {
      setMessage('Error updating profile');
    } else {
      setMessage('Profile updated!');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="font-bold">First name</div>
        <input
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setContentChanged(true);
          }}
        />
        <div className="font-bold">Last name</div>
        <input
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setContentChanged(true);
          }}
        />
        <div className="font-bold">Email</div>
        <div className="py-2 mb-2">{user.email}</div>
        <button
          type="submit"
          className={`mt-4 px-4 py-2 bg-gray-700 text-white rounded  ${
            loading || !contentChanged ? 'opacity-50' : 'hover:cursor-pointer'
          }`}
          disabled={loading || !contentChanged}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        {message && <div className="mt-2">{message}</div>}
      </form>
    </>
  );
}
