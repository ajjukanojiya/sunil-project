import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.json()

  // First, get the client_id for this user
  const { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (client) {
    // Insert into campaigns table
    const { error: dbError } = await supabase
      .from('campaigns')
      .insert({
        client_id: client.id,
        name: formData.productName || 'New Campaign',
        product_name: formData.productName,
        platform: formData.platform,
        budget: formData.budget,
        goal: formData.goal,
        url: formData.url,
        status: 'Active'
      })
      
    if (dbError) {
      console.error('Error saving campaign to DB:', dbError)
    }
  }

  // Send the data to n8n webhook
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
  const n8nSecret = process.env.N8N_WEBHOOK_SECRET

  if (n8nWebhookUrl) {
    try {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': n8nSecret || '',
        },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      if (!n8nResponse.ok) {
        console.error('n8n Webhook Error:', await n8nResponse.text())
        // We still might want to return success to the user if it's queued, 
        // but for now, we'll pass the error back if it strictly fails.
      }
    } catch (e) {
      console.error('Error reaching n8n Webhook:', e)
    }
  } else {
    console.warn('N8N_WEBHOOK_URL not configured. Form submitted but not sent to n8n.')
  }

  // Also could log it to Supabase database (e.g. `campaigns` table) here
  // ...

  return NextResponse.json({ success: true })
}
