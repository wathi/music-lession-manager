import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import LessonsList from './LessonList';

export default async function SubdomainPage({ params }) {
  const subdomain = (await params).subdomain;
  console.log('Subdomain:', subdomain);

  const supabase = await createClient();

  type Lesson = {
    id: string;
    name: string;
    price: number;
  };

  type AccountLesson = {
    lessons: Lesson[];
  };

  const { data: accountLessons, error: accountLessonsError } = (await supabase
    .from('accounts')
    .select('lessons (id, name, price)')
    .eq('subdomain', subdomain)
    .single()) as { data: AccountLesson | null; error: PostgrestError };

  const lessons = accountLessons?.lessons || [];

  if (!lessons || lessons.length === 0) {
    return <div>Page not found.</div>;
  }

  if (accountLessonsError) {
    return <div>No lessons added yet</div>;
  }

  console.log('Lessons:', lessons);

  return (
    <>
      <div className="mx-80 p-6">
        <h1 className="text-2xl font-bold mb-4">Lessons for {subdomain}</h1>
        <LessonsList lessons={lessons} subdomain={subdomain} />
      </div>
    </>
  );
}
