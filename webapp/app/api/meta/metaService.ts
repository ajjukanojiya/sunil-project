// app/api/meta/metaService.ts

const GRAPH_API_VERSION = 'v19.0';
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

/**
 * Fetch Ad Accounts accessible by the user.
 */
export async function getAdAccounts(accessToken: string) {
  const url = `${BASE_URL}/me/adaccounts?fields=id,name,account_status,currency&access_token=${accessToken}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to fetch Ad Accounts');
  }

  return data.data || [];
}

/**
 * Fetch Facebook Pages managed by the user.
 */
export async function getFacebookPages(accessToken: string) {
  const url = `${BASE_URL}/me/accounts?fields=id,name,access_token,category&access_token=${accessToken}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to fetch Facebook Pages');
  }

  return data.data || [];
}

/**
 * Fetch Meta Pixels associated with a specific Ad Account.
 */
export async function getPixels(adAccountId: string, accessToken: string) {
  // Ensure the adAccountId is prefixed correctly. The API often requires 'act_<ID>'
  const formattedId = adAccountId.startsWith('act_') ? adAccountId : `act_${adAccountId}`;
  
  const url = `${BASE_URL}/${formattedId}/adspixels?fields=id,name&access_token=${accessToken}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to fetch Pixels');
  }

  return data.data || [];
}
