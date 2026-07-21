import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getAdAccounts, getFacebookPages } from '../metaService';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use admin client to bypass RLS if needed, or normal client if RLS is configured for selects
    const { createClient: createAdminClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch the client's meta_token from the database
    const { data: client, error } = await supabaseAdmin
      .from('clients')
      .select('meta_token')
      .eq('user_id', user.id)
      .single();

    if (error || !client?.meta_token) {
      return NextResponse.json({ error: 'Meta token not found. Please connect your Meta account first.' }, { status: 400 });
    }

    // Fetch resources from Meta API
    const accessToken = client.meta_token;
    
    // Fetch in parallel for speed
    const [adAccounts, pages] = await Promise.all([
      getAdAccounts(accessToken).catch(e => {
        console.error('Error fetching Ad Accounts:', e);
        return [];
      }),
      getFacebookPages(accessToken).catch(e => {
        console.error('Error fetching Pages:', e);
        return [];
      })
    ]);

    return NextResponse.json({ adAccounts, pages });

  } catch (err: any) {
    console.error('Meta Resources Error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
