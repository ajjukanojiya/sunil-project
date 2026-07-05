'use client';
import React from 'react';

interface MetaAdsViewProps {
  setActiveTab: (tab: string) => void;
  campaigns?: any[];
}

export default function MetaAdsView({ setActiveTab, campaigns = [] }: MetaAdsViewProps) {
  const metaCampaigns = campaigns.filter(c => c.platform && c.platform.includes('Meta'));

  return (
    <div id="pg-meta" className="page active">
      <div className="tb">
        <div><span className="bm"><i className="ti ti-brand-facebook" style={{ color: '#2F3DEE', marginRight: '5px' }}></i>Meta Campaigns</span><span className="bs">Facebook + Instagram</span></div>
        <div className="tr">
          <div className="dc">Today</div>
          <div className="dc on">7 days</div>
          <div className="dc">30 days</div>
          <button className="btn btn-p"><i className="ti ti-plus"></i> New Meta campaign</button>
        </div>
      </div>
      <div className="ct">

        <div className="gr4">
          <div className="mc"><div className="ml"><i className="ti ti-credit-card-pay"></i> Meta spend (7d)</div><div className="mv">₹28,200</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +12% vs last week</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-arrows-exchange"></i> Meta ROAS</div><div className="mv">2.4x</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +0.3 improvement</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-shopping-bag"></i> Revenue from Meta</div><div className="mv">₹67,680</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +18%</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-target"></i> Conversions</div><div className="mv">158</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +28 more</div></div>
        </div>

        <div className="ai-box">
          <div className="ai-hdr">
            <div className="ai-ico"><i className="ti ti-sparkles"></i></div>
            <div><div className="ai-ttl">AI Insights for Meta Ads</div><div className="ai-sub">What&apos;s working and what needs attention</div></div>
          </div>
          <div className="ai-body">
            <div className="ai-rec">
              <div className="ai-rec-ico aii-g"><i className="ti ti-trending-up"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Velvet Brow Gel Meta campaign is your top Meta performer</div>
                <div className="ai-rec-d">3.1x ROAS with low frequency (1.8) means there&apos;s room to scale. Increase budget from ₹1,200 to ₹2,000 daily.</div>
              </div>
              <button className="ai-rec-b">Scale</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-w"><i className="ti ti-alert-triangle"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Nova Lip Tint creative fatigue — frequency hit 4.2</div>
                <div className="ai-rec-d">Same audience seeing the ad too many times. Upload a new creative variant to refresh performance and prevent ROAS drop.</div>
              </div>
              <button className="ai-rec-b">Upload</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-b"><i className="ti ti-bulb"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Try Instagram Reels placement for Pulse Drop</div>
                <div className="ai-rec-d">Your video ads are working well. Reels placement can add 30-40% extra reach at lower CPM for similar audience.</div>
              </div>
              <button className="ai-rec-b">Enable</button>
            </div>
          </div>
        </div>

        <div className="gr2">
          <div className="pwin">
            <div className="win-hdr"><div className="win-ico"><i className="ti ti-trophy"></i></div><div><div className="win-l">Best Meta campaign — 7 days</div><div className="win-st"><i className="ti ti-point"></i> Live now</div></div></div>
            <div className="win-name">Velvet Brow Gel</div>
            <div className="win-meta">Strong CTR (3.2%) · Healthy frequency (1.8)</div>
            <div className="win-stats">
              <div className="ws"><div className="wsl">Spend</div><div className="wsv">₹8,400</div></div>
              <div className="ws"><div className="wsl">Revenue</div><div className="wsv">₹26,040</div></div>
              <div className="ws"><div className="wsl">ROAS</div><div className="wsv">3.1x</div></div>
            </div>
            <div className="win-actions"><button className="win-btn win-btn-p">Increase budget</button><button className="win-btn win-btn-s">Duplicate</button></div>
          </div>
          <div className="plose">
            <div className="win-hdr"><div className="win-ico lose-ico"><i className="ti ti-alert-triangle"></i></div><div><div className="win-l lose-l">Needs attention — 7 days</div><div className="win-st"><i className="ti ti-point"></i> Action needed</div></div></div>
            <div className="win-name lose-name">Nova Lip Tint</div>
            <div className="win-meta lose-meta">Creative fatigue · Frequency 4.2 (too high)</div>
            <div className="win-stats lose-stats">
              <div className="ws"><div className="wsl">Spend</div><div className="wsv">₹3,400</div></div>
              <div className="ws"><div className="wsl">Revenue</div><div className="wsv">₹4,080</div></div>
              <div className="ws"><div className="wsl">ROAS</div><div className="wsv">1.2x</div></div>
            </div>
            <div className="win-actions"><button className="win-btn win-btn-p lose-btn-p">Replace creative</button><button className="win-btn win-btn-s lose-btn-s">View details</button></div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="ch"><div className="ct2"><i className="ti ti-list"></i> All Meta Campaigns <span style={{ fontSize: '11px', fontWeight: 500, color: '#9ea3ae', marginLeft: '4px' }}>{metaCampaigns.length} total</span></div></div>
          <div className="tscroll"><table className="dtable">
            <thead><tr><th>Campaign</th><th>Status</th><th style={{ textAlign: 'right' }}>Budget</th><th style={{ textAlign: 'right' }}>ROAS</th><th style={{ textAlign: 'right' }}>CTR</th><th style={{ textAlign: 'right' }}>Freq.</th><th style={{ textAlign: 'center' }}>On/Off</th></tr></thead>
            <tbody>
              {metaCampaigns.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#1a1d23' }}>{c.product_name}</td>
                  <td><span className="pill p-act"><span className="dot"></span>{c.status || 'Live'}</span></td>
                  <td style={{ textAlign: 'right' }}>₹{c.budget}</td>
                  <td style={{ textAlign: 'right' }} className="rg">—</td>
                  <td style={{ textAlign: 'right' }}>—</td>
                  <td style={{ textAlign: 'right' }}>—</td>
                  <td style={{ textAlign: 'center' }}><button className="tog on"></button></td>
                </tr>
              ))}
              {metaCampaigns.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '30px' }}>No campaigns found. Create one to get started!</td></tr>
              )}
            </tbody>
          </table></div>
        </div>

        <div className="card">
          <div className="ch"><div className="ct2"><i className="ti ti-photo"></i> Top Meta Creatives</div><span className="cl" onClick={() => setActiveTab('pg-media')}>View all →</span></div>
          <div className="creative-row"><div className="creative-thumb good"><i className="ti ti-video"></i><div className="creative-thumb-badge good"><i className="ti ti-thumb-up"></i></div></div><div className="creative-info"><div className="creative-name">brow-serum-ugc-v2.mp4 <span className="creative-tag ct-good">Top Performer</span></div><div className="creative-meta">15s video · <strong>3.4x ROAS</strong> · <strong>3.8% CTR</strong> · 247 conversions</div></div></div>
          <div className="creative-row"><div className="creative-thumb bad"><i className="ti ti-photo"></i><div className="creative-thumb-badge bad"><i className="ti ti-thumb-down"></i></div></div><div className="creative-info"><div className="creative-name">lip-balm-ad-v1.jpg <span className="creative-tag ct-bad">Fatigued</span></div><div className="creative-meta">Frequency <strong style={{ color: '#f04438' }}>4.2 (high)</strong> · ROAS dropped from 2.1x to <strong style={{ color: '#f04438' }}>1.2x</strong></div></div></div>
        </div>

      </div>
    </div>
  );
}
