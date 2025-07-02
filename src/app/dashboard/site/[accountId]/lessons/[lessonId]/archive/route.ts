import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { accountId: string; lessonId: string } }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('lessons')
    .update({ archived_at: new Date().toISOString() })
    .eq('id', params.lessonId)
    .eq('account_id', params.accountId);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
