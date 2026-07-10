import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()

  // Ensure user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const url = new URL(request.url)
  const platform = url.searchParams.get('platform')

  let scopes = 'https://www.googleapis.com/auth/userinfo.email'
  if (platform === 'google') scopes += ' https://www.googleapis.com/auth/adwords'
  if (platform === 'drive') scopes += ' https://www.googleapis.com/auth/drive.file'
  if (platform === 'sheet') scopes += ' https://www.googleapis.com/auth/spreadsheets'

  const authOptions = {
    scopes,
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: 'true'
    },
    redirectTo: new URL('/api/setup/callback', request.url).toString(),
  }

  // Use signInWithOAuth directly (or linkIdentity if user not linked)
  const { data, error } = await supabase.auth.linkIdentity({
    provider: 'google',
    options: authOptions,
  })

  // If linkIdentity fails (e.g. already linked), fallback to signInWithOAuth
  if (error) {
    const { data: signInData } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: authOptions,
    })
    
    if (signInData?.url) {
      return NextResponse.redirect(signInData.url)
    }
  }

  if (data?.url) {
    return NextResponse.redirect(data.url)
  }

  console.error("OAuth error:", error)
  return NextResponse.redirect(new URL('/setup?error=oauth_failed', request.url))
}
