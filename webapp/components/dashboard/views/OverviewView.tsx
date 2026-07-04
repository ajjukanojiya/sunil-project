'use client';
import React, { useState } from 'react';

interface OverviewViewProps {
  setActiveTab: (tab: string) => void;
  clientData?: any;
  statsData?: any;
}

export default function OverviewView({ setActiveTab, clientData, statsData }: OverviewViewProps) {
  const [profitTrackingOpen, setProfitTrackingOpen] = useState(false);

  const businessName = clientData?.business_name || 'Your Business';
  
  return (
    <div id="pg-dash" className="page active">
      <div className="tb">
        <div><span className="bm">Welcome back, {businessName}</span><span className="bs">Last 7 days summary</span></div>
        <div className="tr">
          <div className="dc">Today</div>
          <div className="dc on">7 days</div>
          <div className="dc">30 days</div>
          <div className="dc"><i className="ti ti-calendar" style={{ fontSize: '12px' }}></i> Custom</div>
          <button className="btn btn-p" onClick={() => setActiveTab('pg-new')}>
            <i className="ti ti-plus"></i> New campaign
          </button>
        </div>
      </div>
      <div className="ct">

        <div className="hero">
          <div className="hero-l">
            <div className="hero-ico"><i className="ti ti-trending-up"></i></div>
            <div>
              <div className="hero-title">Your business is performing well this week</div>
              <div className="hero-msg">₹{(statsData?.revenue || 0).toLocaleString()} revenue earned from ₹{(statsData?.spend || 0).toLocaleString()} ad spend</div>
            </div>
          </div>
          <div className="hero-r">
            <div className="hero-pl">Blended ROAS</div>
            <div className="hero-pv">{(statsData?.roas || 0).toFixed(2)}x</div>
          </div>
        </div>

        <div className="profit-set">
          <div className="ps-hdr" onClick={() => setProfitTrackingOpen(!profitTrackingOpen)}>
            <div className="ps-left">
              <div className="ps-ico"><i className="ti ti-calculator"></i></div>
              <div>
                <div className="ps-title">Profit Tracking</div>
                <div className="ps-sub">Your costs are set — we calculate real profit, not just ROAS</div>
              </div>
            </div>
            <div className="ps-status"><i className="ti ti-circle-check" style={{ fontSize: '13px' }}></i> Active</div>
          </div>
          <div className="ps-body" style={{ display: profitTrackingOpen ? 'block' : 'none' }}>
            <div className="ps-grid">
              <div className="ps-field"><label>Avg product cost (COGS)</label><div className="ps-input-wrap"><span className="pre">₹</span><input defaultValue="180" /></div></div>
              <div className="ps-field"><label>Avg shipping cost</label><div className="ps-input-wrap"><span className="pre">₹</span><input defaultValue="60" /></div></div>
              <div className="ps-field"><label>Packaging + COD fees</label><div className="ps-input-wrap"><span className="pre">₹</span><input defaultValue="25" /></div></div>
              <div className="ps-field"><label>Avg return rate</label><div className="ps-input-wrap"><span className="pre" style={{ left: 'auto', right: '11px' }}>%</span><input defaultValue="8" style={{ paddingLeft: '12px', paddingRight: '24px' }} /></div></div>
              <div className="ps-field"><label>Avg ad cost / order <span className="auto-tag">AUTO</span></label><div className="ps-input-wrap"><span className="pre">₹</span><input className="locked" defaultValue="108" readOnly /></div></div>
              <div className="ps-field"><label>Avg order value (AOV) <span className="auto-tag">AUTO</span></label><div className="ps-input-wrap"><span className="pre">₹</span><input className="locked" defaultValue="640" readOnly /></div></div>
              <div className="ps-field"><label>Total cost / order</label><div className="ps-input-wrap"><span className="pre">₹</span><input className="locked" defaultValue="373" readOnly style={{ color: '#1a1d23', fontWeight: 600 }} /></div></div>
              <div className="ps-field"><label>Break-even ROAS</label><div className="ps-input-wrap"><span className="pre" style={{ left: 'auto', right: '11px', color: '#2F3DEE', fontWeight: 600 }}>x</span><input className="locked" defaultValue="1.4" readOnly style={{ color: '#2F3DEE', fontWeight: 600, paddingLeft: '12px', paddingRight: '24px' }} /></div></div>
            </div>
            <div className="ps-result">
              <i className="ti ti-bulb"></i>
              <div className="ps-result-txt">With these costs, you need <strong>1.4x ROAS to break even</strong>. Any campaign below 1.4x is losing money — even if ROAS looks &quot;good&quot;. We use this to find your <strong>real best &amp; worst campaigns</strong> below, based on actual profit.</div>
            </div>
          </div>
        </div>

        <div className="gr4">
          <div className="mc"><div className="ml"><i className="ti ti-credit-card-pay"></i> Total spend (7 days)</div><div className="mv">₹{(statsData?.spend || 0).toLocaleString()}</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +18% vs last week</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-arrows-exchange"></i> Blended ROAS</div><div className="mv">{(statsData?.roas || 0).toFixed(2)}x</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +0.4 improvement</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-shopping-bag"></i> Revenue earned</div><div className="mv">₹{(statsData?.revenue || 0).toLocaleString()}</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +24% vs last week</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-shopping-cart"></i> Orders</div><div className="mv">{statsData?.orders || 0}</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +63 more orders</div></div>
        </div>

        <div className="ai-box">
          <div className="ai-hdr">
            <div className="ai-ico"><i className="ti ti-sparkles"></i></div>
            <div><div className="ai-ttl">AI Recommendations</div><div className="ai-sub">3 actions to boost your revenue this week</div></div>
          </div>
          <div className="ai-body">
            <div className="ai-rec">
              <div className="ai-rec-ico aii-g"><i className="ti ti-trending-up"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t"><span className="ch-tag tag-g">Google</span>Scale up Velvet Brow Gel PMax budget — ROAS 3.6x</div>
                <div className="ai-rec-d">This campaign has consistently delivered 3x+ returns for 7 days. Increasing daily budget by ₹500 can generate ~₹4,200 extra revenue per week.</div>
              </div>
              <button className="ai-rec-b">Apply</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-w"><i className="ti ti-alert-triangle"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t"><span className="ch-tag tag-m">Meta</span>Nova Lip Tint creative needs replacement — fatigue detected</div>
                <div className="ai-rec-d">Frequency has hit 4.2 — same users are seeing the ad repeatedly. ROAS will drop from 1.2x to 0.9x next week if creative isn&apos;t refreshed.</div>
              </div>
              <button className="ai-rec-b">Upload</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-r"><i className="ti ti-circle-x"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t"><span className="ch-tag tag-g">Google</span>Pause Terra Hair Oil search campaign — losing money</div>
                <div className="ai-rec-d">Quality score 3/10, CPC ₹48 (too high), and ROAS 0.9x. This week ₹2,800 spent but only ₹2,520 earned. Pausing saves ₹12K monthly.</div>
              </div>
              <button className="ai-rec-b">Pause</button>
            </div>
          </div>
        </div>

        <div className="gr2">
          <div className="pwin">
            <div className="win-hdr"><div className="win-ico"><i className="ti ti-trophy"></i></div><div><div className="win-l">Best campaign — by profit</div><div className="win-st"><i className="ti ti-point"></i> Live now</div></div></div>
            <div className="win-name">Velvet Brow Gel — PMax</div>
            <div className="win-meta"><span className="ch-tag tag-g">Google</span> ROAS 3.6x · Break-even 1.4x · <strong>Profitable</strong></div>
            <div className="win-stats">
              <div className="ws"><div className="wsl">Revenue</div><div className="wsv">₹45,360</div></div>
              <div className="ws"><div className="wsl">ROAS</div><div className="wsv">3.6x</div></div>
              <div className="ws"><div className="wsl">Profit / order</div><div className="wsv">+₹158</div></div>
            </div>
            <div className="win-actions"><button className="win-btn win-btn-p">Increase budget</button><button className="win-btn win-btn-s">View details</button></div>
          </div>
          <div className="plose">
            <div className="win-hdr"><div className="win-ico lose-ico"><i className="ti ti-alert-triangle"></i></div><div><div className="win-l lose-l">Worst campaign — by profit</div><div className="win-st"><i className="ti ti-point"></i> Action needed</div></div></div>
            <div className="win-name lose-name">Nova Lip Tint — Meta</div>
            <div className="win-meta lose-meta"><span className="ch-tag tag-m">Meta</span> ROAS 2.1x looks OK, <strong>but losing money</strong></div>
            <div className="win-stats lose-stats">
              <div className="ws"><div className="wsl">Revenue</div><div className="wsv">₹4,080</div></div>
              <div className="ws"><div className="wsl">ROAS</div><div className="wsv">2.1x</div></div>
              <div className="ws"><div className="wsl">Profit / order</div><div className="wsv">−₹34</div></div>
            </div>
            <div className="win-actions"><button className="win-btn win-btn-p lose-btn-p">Fix pricing</button><button className="win-btn win-btn-s lose-btn-s">Let AI fix it</button></div>
          </div>
        </div>

        <div className="ps-result" style={{ marginBottom: '20px', background: '#fffaeb', borderColor: '#fde68a' }}>
          <i className="ti ti-alert-triangle" style={{ color: '#f79009' }}></i>
          <div className="ps-result-txt"><strong>Why is a 2.1x ROAS campaign the worst?</strong> Nova Lip Tint has low AOV (₹190). After product cost + shipping + ad cost, each order loses ₹34 — even though ROAS looks fine. <strong>This is why we judge by profit, not ROAS.</strong> A 2.1x here loses money, but 1.5x on a high-value product can be very profitable.</div>
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="ch">
            <div className="ct2"><i className="ti ti-list"></i> All Campaigns <span style={{ fontSize: '11px', fontWeight: 500, color: '#9ea3ae', marginLeft: '4px' }}>8 total · 6 live · 2 paused</span></div>
            <span className="cl" onClick={() => setActiveTab('pg-meta')}>View detailed page →</span>
          </div>
          <div className="pf">
            <div className="pfc on">All (8)</div>
            <div className="pfc">Meta (4)</div>
            <div className="pfc">Google (4)</div>
            <div className="pfc">Live only (6)</div>
          </div>
          <div className="tscroll"><table className="dtable">
            <thead><tr><th>Campaign</th><th>Channel</th><th>Status</th><th style={{ textAlign: 'right' }}>Spend (7d)</th><th style={{ textAlign: 'right' }}>Revenue</th><th style={{ textAlign: 'right' }}>ROAS</th><th style={{ textAlign: 'right' }}>Profit / order</th></tr></thead>
            <tbody>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Velvet Brow Gel — PMax</td><td><span className="ch-tag tag-g">Google</span></td><td><span className="pill p-act"><span className="dot"></span>Live</span></td><td style={{ textAlign: 'right' }}>₹12,600</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹45,360</td><td style={{ textAlign: 'right' }} className="rg">3.6x</td><td style={{ textAlign: 'right' }} className="rg">+₹158</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Velvet Brow Gel — Meta</td><td><span className="ch-tag tag-m">Meta</span></td><td><span className="pill p-act"><span className="dot"></span>Live</span></td><td style={{ textAlign: 'right' }}>₹8,400</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹26,040</td><td style={{ textAlign: 'right' }} className="rg">3.1x</td><td style={{ textAlign: 'right' }} className="rg">+₹132</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Pulse Drop — Meta</td><td><span className="ch-tag tag-m">Meta</span></td><td><span className="pill p-act"><span className="dot"></span>Live</span></td><td style={{ textAlign: 'right' }}>₹7,200</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹20,160</td><td style={{ textAlign: 'right' }} className="rg">2.8x</td><td style={{ textAlign: 'right' }} className="rg">+₹96</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Aurora Lash Serum — Search</td><td><span className="ch-tag tag-g">Google</span></td><td><span className="pill p-act"><span className="dot"></span>Live</span></td><td style={{ textAlign: 'right' }}>₹5,600</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹13,440</td><td style={{ textAlign: 'right' }} className="rg">2.4x</td><td style={{ textAlign: 'right' }} className="rg">+₹61</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Aurora Lash Growth — Meta</td><td><span className="ch-tag tag-m">Meta</span></td><td><span className="pill p-act"><span className="dot"></span>Live</span></td><td style={{ textAlign: 'right' }}>₹4,800</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹10,560</td><td style={{ textAlign: 'right' }} className="rg">2.2x</td><td style={{ textAlign: 'right' }} className="rg">+₹38</td></tr>
              <tr style={{ background: '#fffaeb' }}><td style={{ fontWeight: 600, color: '#1a1d23' }}>Nova Lip Tint — Meta</td><td><span className="ch-tag tag-m">Meta</span></td><td><span className="pill p-alt"><span className="dot"></span>Alert</span></td><td style={{ textAlign: 'right' }}>₹3,400</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹4,080</td><td style={{ textAlign: 'right' }} className="rw">2.1x</td><td style={{ textAlign: 'right' }} className="rb">−₹34</td></tr>
              <tr style={{ background: '#fffaeb' }}><td style={{ fontWeight: 600, color: '#1a1d23' }}>Terra Hair Oil — Search</td><td><span className="ch-tag tag-g">Google</span></td><td><span className="pill p-alt"><span className="dot"></span>Alert</span></td><td style={{ textAlign: 'right' }}>₹2,800</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹2,520</td><td style={{ textAlign: 'right' }} className="rb">0.9x</td><td style={{ textAlign: 'right' }} className="rb">−₹89</td></tr>
              <tr><td style={{ color: '#9ea3ae', fontWeight: 600 }}>Glow Cover Stick — Meta</td><td><span className="ch-tag tag-m">Meta</span></td><td><span className="pill p-pau"><span className="dot"></span>Paused</span></td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>₹0</td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>—</td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>—</td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>—</td></tr>
            </tbody>
          </table></div>
        </div>

        <div className="gr3">
          <div className="chan-card">
            <div className="chan-hdr"><div className="chan-name"><i className="ti ti-brand-facebook" style={{ color: '#2F3DEE' }}></i> Meta Ads</div><div className="chan-spend">7d ₹28,200</div></div>
            <div className="chan-roas-block"><div className="chan-roas-l">ROAS</div><div className="chan-roas rg">2.4x</div><span className="chan-trend trend-up"><i className="ti ti-arrow-up" style={{ fontSize: '10px' }}></i> +0.3 vs last week</span></div>
            <div className="chan-detail">
              <div className="chan-stat"><span className="chan-sl">Active campaigns</span><span className="chan-sv">4</span></div>
              <div className="chan-stat"><span className="chan-sl">Avg frequency</span><span className="chan-sv rg">2.1</span></div>
              <div className="chan-stat"><span className="chan-sl">Best CTR</span><span className="chan-sv rg">3.2%</span></div>
              <div className="chan-stat"><span className="chan-sl">Alerts</span><span className="chan-sv rw">1 warning</span></div>
            </div>
          </div>
          <div className="chan-card">
            <div className="chan-hdr"><div className="chan-name"><i className="ti ti-brand-google" style={{ color: '#1a73e8' }}></i> Google Ads</div><div className="chan-spend">7d ₹24,200</div></div>
            <div className="chan-roas-block"><div className="chan-roas-l">ROAS</div><div className="chan-roas rg">2.4x</div><span className="chan-trend trend-up"><i className="ti ti-arrow-up" style={{ fontSize: '10px' }}></i> +0.5 vs last week</span></div>
            <div className="chan-detail">
              <div className="chan-stat"><span className="chan-sl">Active campaigns</span><span className="chan-sv">4</span></div>
              <div className="chan-stat"><span className="chan-sl">Avg quality score</span><span className="chan-sv rg">6.8/10</span></div>
              <div className="chan-stat"><span className="chan-sl">Avg CPC</span><span className="chan-sv">₹26</span></div>
              <div className="chan-stat"><span className="chan-sl">Conversions</span><span className="chan-sv rg">61</span></div>
            </div>
          </div>
          <div className="chan-card">
            <div className="chan-hdr"><div className="chan-name"><i className="ti ti-search" style={{ color: '#e65100' }}></i> SEO</div><div className="chan-spend">Organic</div></div>
            <div className="chan-roas-block"><div className="chan-roas-l">Visits (7d)</div><div className="chan-roas rg">13,420</div><span className="chan-trend trend-up"><i className="ti ti-arrow-up" style={{ fontSize: '10px' }}></i> +21% growth</span></div>
            <div className="chan-detail">
              <div className="chan-stat"><span className="chan-sl">Avg page score</span><span className="chan-sv rg">74/100</span></div>
              <div className="chan-stat"><span className="chan-sl">Top 10 keywords</span><span className="chan-sv rg">2</span></div>
              <div className="chan-stat"><span className="chan-sl">Issues pending</span><span className="chan-sv rw">3</span></div>
              <div className="chan-stat"><span className="chan-sl">Blogs live</span><span className="chan-sv">8</span></div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="ch"><div className="ct2"><i className="ti ti-photo"></i> Creative Performance — AI Feedback</div><span className="cl" onClick={() => setActiveTab('pg-media')}>View all creatives →</span></div>
          <div className="creative-row"><div className="creative-thumb good"><i className="ti ti-video"></i><div className="creative-thumb-badge good"><i className="ti ti-thumb-up"></i></div></div><div className="creative-info"><div className="creative-name">brow-serum-ugc-v2.mp4 <span className="creative-tag ct-good">Top Performer</span></div><div className="creative-meta"><span className="ch-tag tag-m">Meta</span>15s video · <strong>3.4x ROAS</strong> · <strong>3.8% CTR</strong> · 247 conversions</div></div><div className="creative-actions"><button className="creative-btn primary">Duplicate</button></div></div>
          <div className="creative-row"><div className="creative-thumb good"><i className="ti ti-photo"></i><div className="creative-thumb-badge good"><i className="ti ti-thumb-up"></i></div></div><div className="creative-info"><div className="creative-name">eyelash-before-after.jpg <span className="creative-tag ct-good">Good</span></div><div className="creative-meta"><span className="ch-tag tag-g">Google</span>Static image · <strong>2.6x ROAS</strong> · <strong>2.1% CTR</strong> · 89 conversions</div></div><div className="creative-actions"><button className="creative-btn primary">Scale</button></div></div>
          <div className="creative-row"><div className="creative-thumb bad"><i className="ti ti-photo"></i><div className="creative-thumb-badge bad"><i className="ti ti-thumb-down"></i></div></div><div className="creative-info"><div className="creative-name">lip-balm-ad-v1.jpg <span className="creative-tag ct-bad">Fatigued</span></div><div className="creative-meta"><span className="ch-tag tag-m">Meta</span>Frequency <strong style={{ color: '#f04438' }}>4.2 (high)</strong> · ROAS dropped from 2.1x to <strong style={{ color: '#f04438' }}>1.2x</strong></div></div><div className="creative-actions"><button className="creative-btn primary" style={{ background: '#f79009', borderColor: '#f79009' }}>Replace</button></div></div>
          <div className="creative-row"><div className="creative-thumb bad"><i className="ti ti-photo"></i><div className="creative-thumb-badge bad"><i className="ti ti-thumb-down"></i></div></div><div className="creative-info"><div className="creative-name">hair-stick-product-shot.jpg <span className="creative-tag ct-bad">Underperforming</span></div><div className="creative-meta"><span className="ch-tag tag-g">Google</span>CTR only <strong style={{ color: '#f04438' }}>0.4%</strong> · 5,200 impressions but just 21 clicks</div></div><div className="creative-actions"><button className="creative-btn primary" style={{ background: '#f04438', borderColor: '#f04438' }}>Replace</button></div></div>
        </div>

        <div className="card">
          <div className="ch"><div className="ct2"><i className="ti ti-bell"></i> Recent activity (last 24 hours)</div><span className="cl">View all →</span></div>
          <div className="alerts-row">
            <div className="alert-line al-g"><div className="alert-ico-sm"><i className="ti ti-trending-up"></i></div><div className="alert-txt"><strong>Velvet Brow Gel PMax</strong> budget increased by ₹500 — strong ROAS detected</div><div className="alert-meta-sm">12:03 AM today</div></div>
            <div className="alert-line al-w"><div className="alert-ico-sm"><i className="ti ti-alert-triangle"></i></div><div className="alert-txt"><strong>Nova Lip Tint</strong> creative fatigue detected — frequency hit 4.2</div><div className="alert-meta-sm">2 hours ago</div></div>
            <div className="alert-line al-i"><div className="alert-ico-sm"><i className="ti ti-search"></i></div><div className="alert-txt"><strong>Glow Cover Stick</strong> page SEO score is 41 — AI offers to fix it</div><div className="alert-meta-sm">1 hour ago</div></div>
            <div className="alert-line al-g"><div className="alert-ico-sm"><i className="ti ti-pencil"></i></div><div className="alert-txt">2 new blog drafts written by AI — ready for your review</div><div className="alert-meta-sm">Yesterday 6:00 PM</div></div>
          </div>
        </div>

      </div>
    </div>
  );
}
