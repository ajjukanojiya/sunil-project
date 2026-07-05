import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { business_name, industry } = await request.json()

  // Update Supabase clients table
  const { error } = await supabase
    .from('clients')
    .update({ 
      business_name, 
      industry,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
