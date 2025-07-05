'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ScheduleForm({
  accountId,
  studentId,
  lessonId,
  startTime,
  endTime,
  newSchedule,
}) {
  const [startTime, setStartTime] = useState(startTime || '');
  const [endTime, setEndTime] = useState(endTime || '');
  const [studentId, setStudentId] = useState(studentId || '');
  const [lessonId, setLessonId] = useState(lessonId || '');
  const [contentChanged, setContentChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();

    if (newSchedule) {
      const { error } = await supabase.from('schedule').insert({
        lessonId: lessonId,
        studentId: studentId,
        startTime: startTime,
        endTime: endTime,
        account_id: accountId,
      });
      setLoading(false);
      setContentChanged(false);
      if (error) {
        setMessage('Error add student');
      } else {
        setMessage('Student add!');
      }
    }

    if (!newStudent) {
      const { error } = await supabase
        .from('students')
        .update({ name: name, email: email, phone: phone })
        .eq('id', studentId);
      setLoading(false);
      setContentChanged(false);
      if (error) {
        setMessage('Error updating student');
      } else {
        setMessage('Lesson student!');
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
        <div className="font-bold">Email</div>
        <input
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setContentChanged(true);
          }}
        />
        <div className="font-bold">Phone</div>
        <input
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
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
