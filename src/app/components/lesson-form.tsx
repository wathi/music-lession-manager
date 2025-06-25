'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function LessonForm({
  accountId,
  lessonId,
  lessonName,
  lessonPrice,
  newLesson,
}) {
  const [name, setName] = useState(lessonName || '');
  const [price, setPrice] = useState(lessonPrice || 0.0);
  const [contentChanged, setContentChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();

    if (newLesson) {
      const { error } = await supabase
        .from('lessons')
        .insert({ name: name, price: price, account_id: accountId });
      setLoading(false);
      setContentChanged(false);
      if (error) {
        setMessage('Error add lesson');
      } else {
        setMessage('Lesson add!');
      }
    }

    if (!newLesson) {
      const { error } = await supabase
        .from('lessons')
        .update({ name: name, price: price })
        .eq('id', lessonId);
      setLoading(false);
      setContentChanged(false);
      if (error) {
        setMessage('Error updating lesson');
      } else {
        setMessage('Lesson updated!');
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="font-bold">Name</div>
        <input
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setContentChanged(true);
          }}
        />
        <div className="font-bold">Price</div>
        <input
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setContentChanged(true);
          }}
        />
        <div className="font-bold">Account id</div>
        <div className="py-2 mb-2">{accountId}</div>
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
