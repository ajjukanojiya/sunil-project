'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function connectPlatform(platform: string, extraData?: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  // Fetch client ID for the webhook
  let { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!client) {
    // If client row is missing, create it now using admin client to bypass RLS issues
    const { createClient: createAdminClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: newClient, error: insertError } = await supabaseAdmin
      .from('clients')
      .insert({ user_id: user.id, business_name: 'Test Business' })
      .select('id')
      .single();
      
    if (insertError) throw new Error('Failed to create client row: ' + insertError.message);
    client = newClient;
  }

  let updateData: any = {};
  if (platform === 'meta') {
    // Mock the token so development isn't blocked by OAuth approvals
    updateData = { meta_token: 'mock_meta_token_' + Date.now(), meta_account_id: 'mock_meta_act_' + Date.now() };
  } else if (platform === 'google') {
    updateData = { google_refresh_token: 'mock_google_token_' + Date.now(), google_customer_id: 'mock_g_customer' };
  } else if (platform === 'store') {
    updateData = { store_type: extraData?.name || 'Shopify', shopify_domain: 'mock_' + (extraData?.name || 'store').toLowerCase() + '.com' };
  } else if (platform === 'drive') {
    updateData = { drive_folder_id: 'mock_drive_folder' };
  } else if (platform === 'sheet') {
    updateData = { sheet_id: 'mock_sheet_id' };
  } else if (platform === 'profit') {
    updateData = { profit_config: { avg_product_cost: 100, avg_shipping: 50, avg_packaging_cod: 20, return_rate: 10 } };
  }

  const { error } = await supabase
    .from('clients')
    .update(updateData)
    .eq('user_id', user.id);

  if (error) throw new Error(error.message);

  // Fire the onboarding complete webhook upon successful connection
  await triggerOnboardingCompleteWebhook(user.id);

  revalidatePath('/setup');
  
  return { success: true };
}

export async function triggerOnboardingCompleteWebhook(userUuid: string) {
  const url = process.env.N8N_ONBOARDING_WEBHOOK_URL || 'https://digitalajay.app.n8n.cloud/webhook/onboarding-complete';
  const secret = process.env.N8N_WEBHOOK_SECRET || 'whsec_7K3mP9xQ2nR8vL4wT6yB1zA5cF8hjOsE9dG2kM';

  if (!url) {
    console.error('N8N_ONBOARDING_WEBHOOK_URL not configured');
    return;
  }

  const payload = {
    client_id: userUuid,
    action: "onboarding-complete"
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': secret || ''
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error('Onboarding webhook failed', res.statusText);
    } else {
      console.log('Onboarding webhook successfully triggered! Status:', res.status);
    }
  } catch (e) {
    console.error('Onboarding webhook request error', e);
  }
}


