import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  context: { params: { accountId: string; lessonId: string } }
) {
  const { accountId, lessonId } = context.params;
  const supabase = await createClient();

  const { error } = await supabase
    .from('lessons')
    .update({ archived_at: new Date().toISOString() })
    .eq('id', lessonId)
    .eq('account_id', accountId);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
