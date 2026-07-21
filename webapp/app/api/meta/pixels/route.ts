import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getPixels } from '../metaService';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const adAccountId = url.searchParams.get('adAccountId');

    if (!adAccountId) {
      return NextResponse.json({ error: 'adAccountId is required' }, { status: 400 });
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

    const { data: client, error } = await supabaseAdmin
      .from('clients')
      .select('meta_token')
      .eq('user_id', user.id)
      .single();

    if (error || !client?.meta_token) {
      return NextResponse.json({ error: 'Meta token not found.' }, { status: 400 });
    }

    const pixels = await getPixels(adAccountId, client.meta_token);

    return NextResponse.json({ pixels });

  } catch (err: any) {
    console.error('Meta Pixels Error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
