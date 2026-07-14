import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  console.log('aaa',user);

  if (!user) {
    redirect('/login');
  }

  // Fetch client details
  const { data: clientData } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!clientData) {
    // If client hasn't completed setup, redirect to setup
    redirect('/setup');
  }

  // Fetch campaign stats (aggregate or latest)
  // For MVP, we will fetch the most recent stats or pass an empty object if no stats exist
  let statsData = {
    spend: 0,
    revenue: 0,
    orders: 0,
    roas: 0
  };

  const { data: statsRow } = await supabase
    .from('campaign_stats')
    .select('*')
    .eq('client_id', clientData.id)
    .order('date', { ascending: false })
    .limit(1)
    .single();

  if (statsRow) {
    statsData = {
      spend: statsRow.spend || 0,
      revenue: statsRow.revenue || 0,
      orders: statsRow.conversions || 0,
      roas: statsRow.roas || 0
    };
  }

  // Fetch campaigns
  const { data: campaignsData } = await supabase
    .from('campaigns')
    .select('*')
    .eq('client_id', clientData.id)
    .order('created_at', { ascending: false });

  const campaigns = campaignsData || [];

  return (
    <DashboardClient clientData={clientData} statsData={statsData} campaigns={campaigns} />
  );
}

