import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { email, password, name, businessName, businessGoal } = await request.json()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (data.user) {
    // Insert client details using admin client to bypass RLS since session might not be fully established
    const { createClient: createAdminClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { error: dbError } = await supabaseAdmin.from('clients').insert({
      user_id: data.user.id,
      business_name: businessName || '',
      business_goal: businessGoal || 'D2C',
    });
    
    if (dbError) {
      console.error('Database Error:', dbError);
    }
  }

  return NextResponse.json({ success: true, user: data.user })
}
