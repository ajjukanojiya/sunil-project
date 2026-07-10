import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return NextResponse.json({ 
    hasGoogle: !!client?.google_refresh_token,
    hasMeta: !!client?.meta_token,
    hasStore: !!client?.store_type,
    hasDrive: !!client?.google_refresh_token, // We can reuse it for now, but UI tracks separate clicks, so wait. If we request incremental, Google refresh token remains the same, but it gets more scopes. To verify drive/sheet separately we'd need to store granted scopes. Let's assume if google_refresh_token is present, they clicked *something*.
    hasSheet: !!client?.google_refresh_token,
    token: client?.google_refresh_token
  })
}
