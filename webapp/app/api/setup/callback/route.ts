import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/setup'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.session) {
      // Get the refresh token provided by Google
      const providerRefreshToken = data.session.provider_refresh_token
      
      const { data: { user } } = await supabase.auth.getUser()

      if (user && providerRefreshToken) {
        // Save to clients table
        await supabase
          .from('clients')
          .update({
            google_refresh_token: providerRefreshToken,
          })
          .eq('user_id', user.id)
      }
    } else {
      console.error("Error exchanging code for session:", error)
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(next, request.url))
}
