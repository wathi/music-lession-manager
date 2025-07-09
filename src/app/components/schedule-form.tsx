'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ScheduleForm({
  accountId,
  scheduleId,
  lessonId,
  studentId,
  startTime,
  endTime,
  newSchedule,
  students,
  lessons,
}) {
  const [startTimeState, setStartTimeState] = useState(startTime || '');
  const [endTimeState, setEndTimeState] = useState(endTime || '');
  const [selectedStudent, setSelectedStudent] = useState(studentId);
  const [selectedLesson, setSelectedLesson] = useState(lessonId);
  const [contentChanged, setContentChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (startTime) {
      setStartTimeState(formatForInput(startTime));
    }
    if (endTime) {
      setEndTimeState(formatForInput(endTime));
    }
  }, [startTime, endTime]);

  function formatForInput(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  }

  async function handleSubmit(e) {
    console.log(`lesson_id`, selectedLesson);
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();

    if (newSchedule) {
      const { error } = await supabase.from('schedule').insert({
        lesson_id: selectedLesson,
        student_id: selectedStudent,
        start_time: startTimeState,
        end_time: endTimeState,
        account_id: accountId,
      });
      setLoading(false);
      setContentChanged(false);
      if (error) {
        setMessage('Error add schedule');
      } else {
        setMessage('Student schedule!');
      }
    }

    if (!newSchedule) {
      const { error } = await supabase
        .from('schedule')
        .update({
          lesson_id: selectedLesson,
          student_id: selectedStudent,
          start_time: startTimeState,
          end_time: endTimeState,
        })
        .eq('id', scheduleId);
      setLoading(false);
      setContentChanged(false);
      if (error) {
        setMessage('Error updating schedule');
      } else {
        setMessage('updated schedule!');
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="font-bold">Start time</div>
        <input
          type="datetime-local"
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={startTimeState}
          onChange={(e) => {
            setStartTimeState(e.target.value);
            setContentChanged(true);
          }}
        />
        <div className="font-bold">End Time</div>
        <input
          type="datetime-local"
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={endTimeState}
          onChange={(e) => {
            setEndTimeState(e.target.value);
            setContentChanged(true);
          }}
        />

        <div className="font-bold">Student</div>
        <select
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        <div className="font-bold">Lesson</div>
        <select
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={selectedLesson}
          onChange={(e) => setSelectedLesson(e.target.value)}
        >
          <option value="">Select a lesson</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </select>
        <div>
          <button
            type="submit"
            className={`mt-4 px-4 py-2 bg-gray-700 text-white rounded  ${
              loading || !contentChanged ? 'opacity-50' : 'hover:cursor-pointer'
            }`}
            disabled={loading || !contentChanged}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
        {message && <div className="mt-2">{message}</div>}
      </form>
    </>
  );
}
