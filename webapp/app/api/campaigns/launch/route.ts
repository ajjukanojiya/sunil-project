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
    const insertData = {
      client_id: client.id,
      name: formData.productName || 'New Campaign',
      product_name: formData.productName,
      platform: formData.platform,
      budget: String(formData.budget),
      daily_budget: formData.budget,
      goal: formData.objective || formData.goal,
      campaign_goal: formData.objective || formData.goal,
      url: formData.url,
      landing_url: formData.url,
      ad_copy: formData.adCopy,
      creative_url: formData.creative,
      status: 'Active',
      n8n_status: 'queued'
    };

    const { data: insertedCampaign, error: dbError } = await supabase
      .from('campaigns')
      .insert(insertData)
      .select('id')
      .single();
      
    if (dbError) {
      console.error('Error saving campaign to DB:', dbError)
      return NextResponse.json({ error: 'Database Error', details: dbError }, { status: 500 })
    }

    // We will use this campaign_id for the webhook
    var campaignId = insertedCampaign?.id;
  } else {
    return NextResponse.json({ error: 'Client not found for user' }, { status: 400 })
  }

  // Send the data to n8n webhook
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
  const n8nSecret = process.env.N8N_WEBHOOK_SECRET

  let webhookResult: any = { status: 'Not configured', message: 'Webhook URL missing' };

  if (n8nWebhookUrl) {
    try {
      // Sending minimal payload as per n8n developer architecture
      const payload = {
        campaign_id: campaignId,
        client_id: client.id,
        action: 'create',
        triggered_at: new Date().toISOString()
      };
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': n8nSecret || '',
        },
        body: JSON.stringify(payload)
      });

      let responseText = '';
      try {
        responseText = await n8nResponse.text();
      } catch (e) {}

      webhookResult = {
        status: n8nResponse.ok ? 'Success' : 'Failed',
        statusCode: n8nResponse.status,
        message: responseText
      };

      if (!n8nResponse.ok) {
        console.error('n8n Webhook Error:', responseText)
      }
    } catch (e: any) {
      console.error('Error reaching n8n Webhook:', e)
      webhookResult = { status: 'Error', message: e.message };
    }
  } else {
    console.warn('N8N_WEBHOOK_URL not configured. Form submitted but not sent to n8n.')
  }

  return NextResponse.json({ success: true, webhook: webhookResult })
}
