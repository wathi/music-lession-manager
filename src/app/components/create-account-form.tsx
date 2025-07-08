'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function CreateAccountForm({ userId }) {
  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();

    const { data: accountData, error: accountError } = await supabase
      .from('accounts')
      .insert({
        name: name,
        subdomain: subdomain,
      })
      .select()
      .single();
    setLoading(false);

    if (accountError) {
      setMessage('Error add account');
      return;
    } else {
      setMessage('Account add!');
    }

    console.log(accountData);
    const accountId = accountData.id;

    const { error: accountUserError } = await supabase
      .from('account_users')
      .insert({
        account_id: accountId,
        user_id: userId,
        role: 'owner',
      });

    if (accountUserError) {
      console.error(accountUserError);
      setMessage(
        `Account created but failed to link user: ${accountUserError.message}`
      );
    } else {
      setMessage('Account created and linked successfully!');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="font-bold">Account name</div>
        <input
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className="font-bold">Subdomain</div>
        <input
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={subdomain}
          onChange={(e) => {
            setSubdomain(e.target.value);
          }}
        />
        <div>
          <button
            type="submit"
            className={`mt-4 px-4 py-2 bg-gray-700 text-white rounded  ${
              loading ? 'opacity-50' : 'hover:cursor-pointer'
            }`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
        {message && <div className="mt-2">{message}</div>}
      </form>
    </>
  );
}
