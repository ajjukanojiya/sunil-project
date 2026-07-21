import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { metaAccountId, pageId, pixelId } = data;

    if (!metaAccountId || !pageId) {
      return NextResponse.json({ error: 'Meta Account ID and Page ID are required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { createClient: createAdminClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Update the clients table with the selected values
    const { error } = await supabaseAdmin
      .from('clients')
      .update({
        meta_account_id: metaAccountId,
        meta_page_id: pageId,
        meta_pixel_id: pixelId || null,
      })
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error('Meta Save Error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
