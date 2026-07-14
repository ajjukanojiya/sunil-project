import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/setup'
  //const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.session) {
      // Get the refresh token provided by Google
      const providerRefreshToken = data.session.provider_refresh_token
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Use admin client to bypass RLS for inserting new clients
        const { createClient: createAdminClient } = await import('@supabase/supabase-js');
        const supabaseAdmin = createAdminClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Check if client row exists
        const { data: existingClient } = await supabaseAdmin
          .from('clients')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (existingClient) {
          // Update existing row only if we got a new refresh token
          if (providerRefreshToken) {
            await supabaseAdmin
              .from('clients')
              .update({ google_refresh_token: providerRefreshToken })
              .eq('user_id', user.id);
          }
        } else {
          // Insert new row
          const { error: insertError } = await supabaseAdmin
            .from('clients')
            .insert({
              user_id: user.id,
              google_refresh_token: providerRefreshToken || null,
              business_name: 'My Business',
              business_goal: 'D2C'
            });
          
          if (insertError) {
            console.error('Failed to create client row in Google OAuth callback:', insertError);
          }
        }
      }
    } else {
      console.error("Error exchanging code for session:", error)
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(next, request.url))
}
