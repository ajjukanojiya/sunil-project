'use client';
import React from 'react';

interface SEOViewProps {
  setActiveTab: (tab: string) => void;
}

export default function SEOView({ setActiveTab }: SEOViewProps) {
  return (
    <div id="pg-seo" className="page active">
      <div className="tb">
        <div><span className="bm">SEO Page Health</span><span className="bs">Sharma Organics website</span></div>
        <div className="tr"><button className="btn"><i className="ti ti-refresh"></i> Re-scan</button><button className="btn btn-p" onClick={() => setActiveTab('pg-blog')}><i className="ti ti-pencil"></i> Write blog</button></div>
      </div>
      <div className="ct">

        <div className="gr4">
          <div className="mc"><div className="ml"><i className="ti ti-gauge"></i> Overall SEO score</div><div className="mv">74<span style={{ fontSize: '14px', color: '#b0b4bc', fontWeight: 400 }}>/100</span></div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +6 points this month</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-eye"></i> Organic visits (7d)</div><div className="mv">13,420</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +21% growth</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-trophy"></i> Top 10 keywords</div><div className="mv">2</div><div className="mc2 up"><i className="ti ti-trending-up" style={{ fontSize: '11px' }}></i> +1 more</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-alert-circle"></i> Issues to fix</div><div className="mv">3</div><div className="mc2 wn">Action needed</div></div>
        </div>

        <div className="ai-box">
          <div className="ai-hdr">
            <div className="ai-ico"><i className="ti ti-sparkles"></i></div>
            <div><div className="ai-ttl">SEO Recommendations</div><div className="ai-sub">Boost your organic traffic with these fixes</div></div>
          </div>
          <div className="ai-body">
            <div className="ai-rec">
              <div className="ai-rec-ico aii-r"><i className="ti ti-circle-x"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Glow Cover Stick page is failing SEO basics</div>
                <div className="ai-rec-d">Missing meta title, description, and H1 tag. AI can auto-fix all 3 in one click — page score will jump from 41 to 80+ within hours.</div>
              </div>
              <button className="ai-rec-b">AI fix it</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-w"><i className="ti ti-alert-triangle"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Nova Lip Tint page is slow</div>
                <div className="ai-rec-d">Page loads in 4.2s (Google recommends under 2.5s). Compress hero image and lazy-load product images to improve speed.</div>
              </div>
              <button className="ai-rec-b">Optimize</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-b"><i className="ti ti-pencil"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Write a blog for &quot;grey hair cover&quot; keyword</div>
                <div className="ai-rec-d">This keyword ranks #52 currently with low competition. A well-written blog can push it to top 20 in 4-6 weeks and drive organic sales.</div>
              </div>
              <button className="ai-rec-b">Write</button>
            </div>
          </div>
        </div>

        <div className="gr2">
          <div className="pwin">
            <div className="win-hdr"><div className="win-ico"><i className="ti ti-trophy"></i></div><div><div className="win-l">Best SEO page</div><div className="win-st"><i className="ti ti-point"></i> Ranking well</div></div></div>
            <div className="win-name">Velvet Brow Gel</div>
            <div className="win-meta">All SEO basics done · Ranking on page 1 for 2 keywords</div>
            <div className="win-stats">
              <div className="ws"><div className="wsl">Score</div><div className="wsv">88/100</div></div>
              <div className="ws"><div className="wsl">Visits (7d)</div><div className="wsv">4,820</div></div>
              <div className="ws"><div className="wsl">Top KW</div><div className="wsv">#4</div></div>
            </div>
            <div className="win-actions"><button className="win-btn win-btn-p">View details</button><button className="win-btn win-btn-s">Boost more</button></div>
          </div>
          <div className="plose">
            <div className="win-hdr"><div className="win-ico lose-ico"><i className="ti ti-alert-triangle"></i></div><div><div className="win-l lose-l">Worst SEO page</div><div className="win-st"><i className="ti ti-point"></i> Needs urgent fix</div></div></div>
            <div className="win-name lose-name">Glow Cover Stick</div>
            <div className="win-meta lose-meta">Missing title, description, H1 — basic SEO failing</div>
            <div className="win-stats lose-stats">
              <div className="ws"><div className="wsl">Score</div><div className="wsv">41/100</div></div>
              <div className="ws"><div className="wsl">Visits (7d)</div><div className="wsv">120</div></div>
              <div className="ws"><div className="wsl">Top KW</div><div className="wsv">#52</div></div>
            </div>
            <div className="win-actions"><button className="win-btn win-btn-p lose-btn-p">AI fix it</button><button className="win-btn win-btn-s lose-btn-s">View issues</button></div>
          </div>
        </div>

        <div className="card">
          <div className="ch"><div className="ct2"><i className="ti ti-world"></i> All Product Pages <span style={{ fontSize: '11px', fontWeight: 500, color: '#9ea3ae', marginLeft: '4px' }}>5 pages · avg score 70</span></div></div>
          <div className="seo-row"><div className="seo-ring ring-g">88</div><div className="seo-info"><div className="seo-pname">Velvet Brow Gel</div><div><span className="kw-tag kw-t">brow serum India #4</span><span className="kw-tag kw-t">eyebrow serum #7</span></div><div className="seo-iss" style={{ color: '#12b76a' }}>All optimised · 4,820 visits</div></div><button className="btn" style={{ fontSize: '11px', padding: '5px 11px' }}>View</button></div>
          <div className="seo-row"><div className="seo-ring ring-g">81</div><div className="seo-info"><div className="seo-pname">Aurora Lash Serum</div><div><span className="kw-tag kw-t">eyelash serum India #6</span><span className="kw-tag kw-m">lash growth #14</span></div><div className="seo-iss">2 images missing alt text · 3,210 visits</div></div><button className="btn" style={{ fontSize: '11px', padding: '5px 11px' }}>Fix</button></div>
          <div className="seo-row"><div className="seo-ring ring-g">79</div><div className="seo-info"><div className="seo-pname">Pulse Drop</div><div><span className="kw-tag kw-m">hair growth drops #12</span></div><div className="seo-iss">Meta description too short · 2,640 visits</div></div><button className="btn" style={{ fontSize: '11px', padding: '5px 11px' }}>Fix</button></div>
          <div className="seo-row"><div className="seo-ring ring-w">62</div><div className="seo-info"><div className="seo-pname">Nova Lip Tint</div><div><span className="kw-tag kw-m">beetroot lip balm #18</span><span className="kw-tag kw-l">natural lip balm #34</span></div><div className="seo-iss" style={{ color: '#f79009' }}>Meta description missing · Page speed slow · 1,640 visits</div></div><button className="btn" style={{ fontSize: '11px', padding: '5px 11px' }}>Fix</button></div>
          <div className="seo-row"><div className="seo-ring ring-r">41</div><div className="seo-info"><div className="seo-pname">Glow Cover Stick</div><div><span className="kw-tag kw-l">grey hair cover #52</span></div><div className="seo-iss" style={{ color: '#f04438' }}>No meta title · No description · H1 missing · 120 visits only</div></div><button className="btn btn-p" style={{ fontSize: '11px', padding: '5px 11px' }}>AI fix it</button></div>
        </div>

      </div>
    </div>
  );
}
