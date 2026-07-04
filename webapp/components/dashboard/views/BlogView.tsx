'use client';
import React from 'react';

export default function BlogView() {
  return (
    <div id="pg-blog" className="page active">
      <div className="tb">
        <div><span className="bm">Blog Manager</span><span className="bs">AI-written, auto-published</span></div>
        <div className="tr"><button className="btn btn-p"><i className="ti ti-sparkles"></i> AI write new blog</button></div>
      </div>
      <div className="ct">

        <div className="gr4">
          <div className="mc"><div className="ml"><i className="ti ti-files"></i> Total blogs</div><div className="mv">11</div><div className="mc2" style={{ color: '#2F3DEE' }}>8 live · 3 drafts</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-eye"></i> Total visits (7d)</div><div className="mv">4,890</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +32% growth</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-clock"></i> Avg read time</div><div className="mv">3:24</div><div className="mc2 up">Good engagement</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-target"></i> Conversions from blogs</div><div className="mv">47</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +12 more</div></div>
        </div>

        <div className="ai-box">
          <div className="ai-hdr">
            <div className="ai-ico"><i className="ti ti-sparkles"></i></div>
            <div><div className="ai-ttl">Content Opportunities</div><div className="ai-sub">Topics that will drive traffic and sales</div></div>
          </div>
          <div className="ai-body">
            <div className="ai-rec">
              <div className="ai-rec-ico aii-g"><i className="ti ti-trending-up"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">&quot;How to Cover Grey Hair Without Chemicals&quot; is ready to publish</div>
                <div className="ai-rec-d">SEO-optimised draft is ready. Target keyword &quot;grey hair cover&quot; has low competition — expected to drive 800+ monthly visits within 6 weeks.</div>
              </div>
              <button className="ai-rec-b">Approve</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-b"><i className="ti ti-bulb"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">5 new blog ideas based on trending searches</div>
                <div className="ai-rec-d">AI found trending topics: &quot;Best Indian beauty brands 2026&quot;, &quot;Natural eyelash growth tips&quot;, &quot;Lip care for monsoon season&quot; and more. High-intent topics.</div>
              </div>
              <button className="ai-rec-b">View ideas</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-w"><i className="ti ti-alert-triangle"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Refresh old blog: &quot;Top 5 Serums for Eyebrow Growth&quot;</div>
                <div className="ai-rec-d">This is your top blog (1,240 visits) but content is 3 months old. Updating with 2026 trends will keep rankings strong and boost traffic 20%.</div>
              </div>
              <button className="ai-rec-b">Refresh</button>
            </div>
          </div>
        </div>

        <div className="gr2">
          <div className="pwin">
            <div className="win-hdr"><div className="win-ico"><i className="ti ti-trophy"></i></div><div><div className="win-l">Best blog — 7 days</div><div className="win-st"><i className="ti ti-point"></i> Top traffic</div></div></div>
            <div className="win-name">Top 5 Serums for Eyebrow Growth</div>
            <div className="win-meta">Ranking page 1 for 3 keywords · High conversion rate</div>
            <div className="win-stats">
              <div className="ws"><div className="wsl">Visits</div><div className="wsv">1,240</div></div>
              <div className="ws"><div className="wsl">Read time</div><div className="wsv">4:12</div></div>
              <div className="ws"><div className="wsl">Conversions</div><div className="wsv">18</div></div>
            </div>
            <div className="win-actions"><button className="win-btn win-btn-p">View blog</button><button className="win-btn win-btn-s">Boost it</button></div>
          </div>
          <div className="plose" style={{ background: 'linear-gradient(135deg,#eff0ff 0%,#d6d3ff 100%)', borderColor: '#a4a0ff' }}>
            <div className="win-hdr"><div className="win-ico" style={{ background: '#2F3DEE' }}><i className="ti ti-pencil"></i></div><div><div className="win-l" style={{ color: '#5147f5' }}>Pending review</div><div className="win-st"><i className="ti ti-point"></i> AI-written drafts</div></div></div>
            <div className="win-name" style={{ color: '#3c2e80' }}>3 blogs need your approval</div>
            <div className="win-meta" style={{ color: '#5147f5' }}>AI has written drafts · Review and publish to start ranking</div>
            <div className="win-stats" style={{ borderColor: 'rgba(80,71,245,0.2)' }}>
              <div className="ws"><div className="wsl">Drafts</div><div className="wsv" style={{ color: '#3c2e80' }}>3</div></div>
              <div className="ws"><div className="wsl">Avg score</div><div className="wsv" style={{ color: '#3c2e80' }}>86/100</div></div>
              <div className="ws"><div className="wsl">Expected</div><div className="wsv" style={{ color: '#3c2e80' }}>2.5K visits</div></div>
            </div>
            <div className="win-actions"><button className="win-btn" style={{ background: '#2F3DEE', color: '#fff' }}>Review all</button></div>
          </div>
        </div>

        <div className="seg">
          <button className="sb-btn on">All (11)</button>
          <button className="sb-btn">Published (8)</button>
          <button className="sb-btn">Drafts (3)</button>
        </div>
        <div className="card">
          <div className="ch"><div className="ct2"><i className="ti ti-list"></i> All Blogs</div></div>
          <div className="tscroll"><table className="dtable">
            <thead><tr><th>Title</th><th>Status</th><th style={{ textAlign: 'right' }}>Visits</th><th style={{ textAlign: 'right' }}>Conversions</th><th>Date</th></tr></thead>
            <tbody>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Top 5 Serums for Eyebrow Growth India 2026</td><td><span className="pill p-act"><span className="dot"></span>Live</span></td><td style={{ textAlign: 'right' }} className="rg">1,240</td><td style={{ textAlign: 'right' }} className="rg">18</td><td style={{ fontSize: '11.5px', color: '#9ea3ae' }}>18 May</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Natural Lip Care: Why Nova Balm Works Better</td><td><span className="pill p-act"><span className="dot"></span>Live</span></td><td style={{ textAlign: 'right' }} className="rg">876</td><td style={{ textAlign: 'right' }} className="rg">12</td><td style={{ fontSize: '11.5px', color: '#9ea3ae' }}>14 May</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Aurora Lash Growth Tips: Serum vs Castor Oil</td><td><span className="pill p-act"><span className="dot"></span>Live</span></td><td style={{ textAlign: 'right' }} className="rg">654</td><td style={{ textAlign: 'right' }}>8</td><td style={{ fontSize: '11.5px', color: '#9ea3ae' }}>10 May</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Hair Growth Science Explained — Pulse Drop</td><td><span className="pill p-act"><span className="dot"></span>Live</span></td><td style={{ textAlign: 'right' }}>532</td><td style={{ textAlign: 'right' }}>5</td><td style={{ fontSize: '11.5px', color: '#9ea3ae' }}>06 May</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>How to Cover Grey Hair Without Chemicals</td><td><span style={{ fontSize: '10.5px', padding: '2px 9px', borderRadius: '20px', fontWeight: 600, background: '#eff0ff', color: '#2F3DEE' }}>Review pending</span></td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>—</td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>—</td><td style={{ fontSize: '11.5px', color: '#9ea3ae' }}>Draft</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Best Beauty Routine for Indian Skin</td><td><span style={{ fontSize: '10.5px', padding: '2px 9px', borderRadius: '20px', fontWeight: 600, background: '#eff0ff', color: '#2F3DEE' }}>Review pending</span></td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>—</td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>—</td><td style={{ fontSize: '11.5px', color: '#9ea3ae' }}>Draft</td></tr>
              <tr><td style={{ fontWeight: 600, color: '#1a1d23' }}>Pulse Drop Review: Real Results in 30 Days</td><td><span className="pill p-pau"><span className="dot"></span>Writing...</span></td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>—</td><td style={{ textAlign: 'right', color: '#b0b4bc' }}>—</td><td style={{ fontSize: '11.5px', color: '#9ea3ae' }}>Today</td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
}
