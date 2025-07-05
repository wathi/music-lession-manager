'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getActiveStudents } from '@/app/utils/students';
import { getActiveLessons } from '../utils/lessons';

export default function ScheduleForm({
  accountId,
  scheduleId,
  lessonId,
  studentId,
  startTime,
  endTime,
  newSchedule,
}) {
  const [startTimeState, setStartTimeState] = useState(startTime || '');
  const [endTimeState, setEndTimeState] = useState(endTime || '');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(studentId);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(lessonId);
  const [contentChanged, setContentChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await getActiveStudents(accountId);
        setStudents(data);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchLessons() {
      try {
        const data = await getActiveLessons(accountId);
        setLessons(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudents();
    fetchLessons();
  }, [accountId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();

    if (newSchedule) {
      const { error } = await supabase.from('schedule').insert({
        lesson_id: selectedLesson.id,
        student_id: selectedStudent.id,
        start_time: startTimeState,
        end_time: endTimeState,
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

    if (!newSchedule) {
      const { error } = await supabase
        .from('schedule')
        .update({
          lesson_i: selectedLesson.id,
          student_id: selectedStudent.id,
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
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={startTime}
          onChange={(e) => {
            setStartTimeState(e.target.value);
            setContentChanged(true);
          }}
        />
        <div className="font-bold">End Time</div>
        <input
          className="py-2 mb-2 border border-gray-300 rounded px-2"
          value={endTime}
          onChange={(e) => {
            setEndTimeState(e.target.value);
            setContentChanged(true);
          }}
        />
        <label>
          Student:
          <select
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
        </label>
        <label>
          Student:
          <select
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
        </label>
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
