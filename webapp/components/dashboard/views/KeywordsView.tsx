'use client';
import React from 'react';

export default function KeywordsView() {
  return (
    <div id="pg-kw" className="page active">
      <div className="tb">
        <div><span className="bm">Keywords</span><span className="bs">Google Ads — search terms performance</span></div>
        <div className="tr"><button className="btn btn-g"><i className="ti ti-plus"></i> Add keywords</button></div>
      </div>
      <div className="ct">

        <div className="gr4">
          <div className="mc"><div className="ml"><i className="ti ti-key"></i> Total keywords</div><div className="mv">48</div><div className="mc2" style={{ color: '#2F3DEE' }}>24 active · 24 paused</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-trophy"></i> Avg quality score</div><div className="mv">6.8</div><div className="mc2 up">Above average</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-mouse"></i> Avg CPC</div><div className="mv">₹26</div><div className="mc2 wn">+₹3 this week</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-target"></i> Total conversions</div><div className="mv">87</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +19</div></div>
        </div>

        <div className="ai-box">
          <div className="ai-hdr">
            <div className="ai-ico"><i className="ti ti-sparkles"></i></div>
            <div><div className="ai-ttl">Keyword Optimization Insights</div><div className="ai-sub">Where to invest and what to pause</div></div>
          </div>
          <div className="ai-body">
            <div className="ai-rec">
              <div className="ai-rec-ico aii-g"><i className="ti ti-trending-up"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">&quot;brow serum India&quot; — your best keyword</div>
                <div className="ai-rec-d">9/10 quality score with ₹18 CPC and 24 conversions. Add similar variants: &quot;best brow serum India&quot;, &quot;brow growth serum buy online&quot;.</div>
              </div>
              <button className="ai-rec-b">Expand</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-r"><i className="ti ti-circle-x"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">&quot;hair finishing stick&quot; — pause this keyword</div>
                <div className="ai-rec-d">Quality score 3/10, CPC ₹48 (3x average), only 2 conversions. This keyword is draining your budget without results.</div>
              </div>
              <button className="ai-rec-b">Pause</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-b"><i className="ti ti-bulb"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">12 new keyword opportunities found</div>
                <div className="ai-rec-d">Based on your top performers, AI found 12 new keywords with low competition and high conversion potential. Review and add the best ones.</div>
              </div>
              <button className="ai-rec-b">Review</button>
            </div>
          </div>
        </div>

        <div className="pf">
          <div className="pfc on">All (48)</div>
          <div className="pfc">Active (24)</div>
          <div className="pfc">High QS (8+)</div>
          <div className="pfc">Low QS (under 5)</div>
          <div className="pfc">Top converters</div>
        </div>

        <div className="card">
          <div className="ch"><div className="ct2"><i className="ti ti-list"></i> All Keywords</div></div>
          <div className="tscroll"><table className="dtable">
            <thead><tr><th>Keyword</th><th>Campaign</th><th>Status</th><th>Quality Score</th><th style={{ textAlign: 'right' }}>CPC</th><th style={{ textAlign: 'right' }}>Conversions</th></tr></thead>
            <tbody>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>brow serum India</td><td style={{ fontSize: '11px', color: '#1a73e8' }}>Brow PMax</td><td><span className="pill p-act"><span className="dot"></span>Active</span></td><td><div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><span style={{ fontSize: '12px', fontWeight: 600, color: '#12b76a' }}>9/10</span><div className="qbar"><div className="qfill qf-g" style={{ width: '90%' }}></div></div></div></td><td style={{ textAlign: 'right' }}>₹18</td><td style={{ textAlign: 'right' }} className="rg">24</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>eyebrow growth serum</td><td style={{ fontSize: '11px', color: '#1a73e8' }}>Brow PMax</td><td><span className="pill p-act"><span className="dot"></span>Active</span></td><td><div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><span style={{ fontSize: '12px', fontWeight: 600, color: '#12b76a' }}>8/10</span><div className="qbar"><div className="qfill qf-g" style={{ width: '80%' }}></div></div></div></td><td style={{ textAlign: 'right' }}>₹21</td><td style={{ textAlign: 'right' }} className="rg">18</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>eyelash growth serum India</td><td style={{ fontSize: '11px', color: '#1a73e8' }}>Aurora Lash Search</td><td><span className="pill p-act"><span className="dot"></span>Active</span></td><td><div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><span style={{ fontSize: '12px', fontWeight: 600, color: '#f79009' }}>6/10</span><div className="qbar"><div className="qfill qf-w" style={{ width: '60%' }}></div></div></div></td><td style={{ textAlign: 'right' }}>₹22</td><td style={{ textAlign: 'right' }} className="rg">12</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>booost drops hair</td><td style={{ fontSize: '11px', color: '#1a73e8' }}>Pulse PMax</td><td><span className="pill p-act"><span className="dot"></span>Active</span></td><td><div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><span style={{ fontSize: '12px', fontWeight: 600, color: '#12b76a' }}>7/10</span><div className="qbar"><div className="qfill qf-g" style={{ width: '70%' }}></div></div></div></td><td style={{ textAlign: 'right' }}>₹24</td><td style={{ textAlign: 'right' }} className="rg">15</td></tr>
              <tr style={{ background: '#fff5f5' }}><td style={{ fontWeight: 600, color: '#1a1d23' }}>hair finishing stick</td><td style={{ fontSize: '11px', color: '#1a73e8' }}>Hair Search</td><td><span className="pill p-alt"><span className="dot"></span>Low QS</span></td><td><div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><span style={{ fontSize: '12px', fontWeight: 600, color: '#f04438' }}>3/10</span><div className="qbar"><div className="qfill qf-r" style={{ width: '30%' }}></div></div></div></td><td style={{ textAlign: 'right' }} className="rw">₹48</td><td style={{ textAlign: 'right' }} className="rb">2</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>natural lip balm India</td><td style={{ fontSize: '11px', color: '#1a73e8' }}>Nova Lip Tint Search</td><td><span className="pill p-act"><span className="dot"></span>Active</span></td><td><div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><span style={{ fontSize: '12px', fontWeight: 600, color: '#f79009' }}>5/10</span><div className="qbar"><div className="qfill qf-w" style={{ width: '50%' }}></div></div></div></td><td style={{ textAlign: 'right' }}>₹31</td><td style={{ textAlign: 'right' }}>7</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>beetroot lip balm</td><td style={{ fontSize: '11px', color: '#1a73e8' }}>Nova Lip Tint Search</td><td><span className="pill p-act"><span className="dot"></span>Active</span></td><td><div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><span style={{ fontSize: '12px', fontWeight: 600, color: '#12b76a' }}>7/10</span><div className="qbar"><div className="qfill qf-g" style={{ width: '70%' }}></div></div></div></td><td style={{ textAlign: 'right' }}>₹19</td><td style={{ textAlign: 'right' }} className="rg">9</td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
}
