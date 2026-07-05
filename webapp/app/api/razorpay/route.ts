import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { amount, plan } = body

  // Mocking Razorpay Order generation
  // In production, you would call Razorpay's API with Key ID and Secret here
  const mockOrderId = 'order_' + Math.random().toString(36).substr(2, 9)

  return NextResponse.json({
    id: mockOrderId,
    amount: amount,
    currency: 'INR',
    plan: plan
  })
}
