import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';

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
      <div className="flex justify-between items-center mb-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-gray-300 m-4 p-4 rounded-md shadow-md"
          >
            <div>{lesson.name}</div>
            <div>{lesson.price}</div>
          </div>
        ))}
      </div>
    </>
  );
}
