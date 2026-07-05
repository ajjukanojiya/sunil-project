'use client';
import React from 'react';

export default function GoogleAdsView({ campaigns = [] }: { campaigns?: any[] }) {
  const googleCampaigns = campaigns.filter(c => c.platform && c.platform.includes('Google'));

  return (
    <div id="pg-gcamp" className="page active">
      <div className="tb">
        <div><span className="bm"><i className="ti ti-brand-google" style={{ color: '#1a73e8', marginRight: '5px' }}></i>Google Campaigns</span><span className="bs">Search + Performance Max</span></div>
        <div className="tr">
          <div className="dc">Today</div>
          <div className="dc on">7 days</div>
          <div className="dc">30 days</div>
          <button className="btn btn-g"><i className="ti ti-plus"></i> New Google campaign</button>
        </div>
      </div>
      <div className="ct">

        <div className="gr4">
          <div className="mc"><div className="ml"><i className="ti ti-credit-card-pay"></i> Google spend (7d)</div><div className="mv">₹24,200</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +14% vs last week</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-arrows-exchange"></i> Google ROAS</div><div className="mv">2.4x</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +0.5 improvement</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-shopping-bag"></i> Revenue from Google</div><div className="mv">₹57,032</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +22%</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-target"></i> Conversions</div><div className="mv">61</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +14 more</div></div>
        </div>

        <div className="ai-box">
          <div className="ai-hdr">
            <div className="ai-ico"><i className="ti ti-sparkles"></i></div>
            <div><div className="ai-ttl">AI Insights for Google Ads</div><div className="ai-sub">Optimization opportunities and warnings</div></div>
          </div>
          <div className="ai-body">
            <div className="ai-rec">
              <div className="ai-rec-ico aii-g"><i className="ti ti-trending-up"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Velvet Brow Gel PMax is killing it — 3.6x ROAS</div>
                <div className="ai-rec-d">Performance Max algorithm has learned well. Adding ₹500 daily budget can generate ₹4,200 extra weekly revenue based on current trends.</div>
              </div>
              <button className="ai-rec-b">Scale</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-r"><i className="ti ti-circle-x"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Terra Hair Oil Search campaign losing money — pause it</div>
                <div className="ai-rec-d">CPC ₹48 (too high), quality score 3/10, ROAS 0.9x. ₹2,800 spent for only ₹2,520 revenue. Pausing saves ₹12K monthly.</div>
              </div>
              <button className="ai-rec-b">Pause</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-w"><i className="ti ti-alert-triangle"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Add negative keywords to Nova Lip Tint Search</div>
                <div className="ai-rec-d">CTR dropping to 1.1%. Adding negative keywords like &quot;diy&quot;, &quot;homemade&quot; will filter irrelevant clicks and improve quality score.</div>
              </div>
              <button className="ai-rec-b">Add</button>
            </div>
          </div>
        </div>

        <div className="gr2">
          <div className="pwin">
            <div className="win-hdr"><div className="win-ico"><i className="ti ti-trophy"></i></div><div><div className="win-l">Best Google campaign — 7 days</div><div className="win-st"><i className="ti ti-point"></i> Live now</div></div></div>
            <div className="win-name">Velvet Brow Gel — PMax</div>
            <div className="win-meta">Best CPC (₹18) · Strong conversion rate</div>
            <div className="win-stats">
              <div className="ws"><div className="wsl">Spend</div><div className="wsv">₹12,600</div></div>
              <div className="ws"><div className="wsl">Revenue</div><div className="wsv">₹45,360</div></div>
              <div className="ws"><div className="wsl">ROAS</div><div className="wsv">3.6x</div></div>
            </div>
            <div className="win-actions"><button className="win-btn win-btn-p">Increase budget</button><button className="win-btn win-btn-s">Duplicate</button></div>
          </div>
          <div className="plose">
            <div className="win-hdr"><div className="win-ico lose-ico"><i className="ti ti-alert-triangle"></i></div><div><div className="win-l lose-l">Losing money — 7 days</div><div className="win-st"><i className="ti ti-point"></i> Action needed</div></div></div>
            <div className="win-name lose-name">Terra Hair Oil — Search</div>
            <div className="win-meta lose-meta">Low quality score (3/10) · CPC too high (₹48)</div>
            <div className="win-stats lose-stats">
              <div className="ws"><div className="wsl">Spend</div><div className="wsv">₹2,800</div></div>
              <div className="ws"><div className="wsl">Revenue</div><div className="wsv">₹2,520</div></div>
              <div className="ws"><div className="wsl">ROAS</div><div className="wsv">0.9x</div></div>
            </div>
            <div className="win-actions"><button className="win-btn win-btn-p lose-btn-p">Pause now</button><button className="win-btn win-btn-s lose-btn-s">Let AI fix it</button></div>
          </div>
        </div>

        <div className="pf">
          <div className="pfc on">All types (5)</div>
          <div className="pfc">Search (3)</div>
          <div className="pfc">Performance Max (2)</div>
        </div>
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="ch"><div className="ct2"><i className="ti ti-list"></i> All Google Campaigns <span style={{ fontSize: '11px', fontWeight: 500, color: '#9ea3ae', marginLeft: '4px' }}>{googleCampaigns.length} total</span></div></div>
          <div className="tscroll"><table className="dtable">
            <thead><tr><th>Campaign</th><th>Type</th><th>Status</th><th style={{ textAlign: 'right' }}>Budget</th><th style={{ textAlign: 'right' }}>ROAS</th><th style={{ textAlign: 'right' }}>CPC</th><th style={{ textAlign: 'center' }}>On/Off</th></tr></thead>
            <tbody>
              {googleCampaigns.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#1a1d23' }}>{c.product_name}</td>
                  <td><span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '4px', background: '#e8f0fe', color: '#1a73e8', fontWeight: 600 }}>{c.platform.includes('Performance Max') ? 'PMax' : 'Search'}</span></td>
                  <td><span className="pill p-act"><span className="dot"></span>{c.status || 'Live'}</span></td>
                  <td style={{ textAlign: 'right' }}>₹{c.budget}</td>
                  <td style={{ textAlign: 'right' }} className="rg">—</td>
                  <td style={{ textAlign: 'right' }}>—</td>
                  <td style={{ textAlign: 'center' }}><button className="tog on"></button></td>
                </tr>
              ))}
              {googleCampaigns.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '30px' }}>No campaigns found. Create one to get started!</td></tr>
              )}
            </tbody>
          </table></div>
        </div>

        <div className="card">
          <div className="ch"><div className="ct2"><i className="ti ti-bell"></i> Recent Google Ads activity</div></div>
          <div className="alerts-row">
            <div className="alert-line al-g"><div className="alert-ico-sm"><i className="ti ti-trending-up"></i></div><div className="alert-txt"><strong>Velvet Brow Gel PMax</strong> budget increased ₹500 — strong ROAS</div><div className="alert-meta-sm">12:03 AM today</div></div>
            <div className="alert-line al-w"><div className="alert-ico-sm"><i className="ti ti-key"></i></div><div className="alert-txt"><strong>Terra Hair Oil</strong> keyword quality dropped to 3/10</div><div className="alert-meta-sm">3 hours ago</div></div>
            <div className="alert-line al-i"><div className="alert-ico-sm"><i className="ti ti-bulb"></i></div><div className="alert-txt">New keyword opportunities found for <strong>Aurora Lash Serum</strong> — review them</div><div className="alert-meta-sm">Yesterday</div></div>
          </div>
        </div>

      </div>
    </div>
  );
}
