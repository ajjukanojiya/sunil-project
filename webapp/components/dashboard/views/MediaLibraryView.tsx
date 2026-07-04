'use client';
import React from 'react';

export default function MediaLibraryView() {
  return (
    <div id="pg-media" className="page active">
      <div className="tb">
        <div><span className="bm">Media Library</span><span className="bs">All your creatives in one place</span></div>
        <div className="tr"><span style={{ fontSize: '11.5px', color: '#9ea3ae' }}>Storage: <strong style={{ color: '#1a1d23' }}>340 MB / 1 GB</strong></span></div>
      </div>
      <div className="ct">

        <div className="gr4">
          <div className="mc"><div className="ml"><i className="ti ti-photo"></i> Total creatives</div><div className="mv">24</div><div className="mc2" style={{ color: '#2F3DEE' }}>16 images · 8 videos</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-thumb-up"></i> Top performers</div><div className="mv">4</div><div className="mc2 up">ROAS 2.5x+</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-thumb-down"></i> Underperforming</div><div className="mv">3</div><div className="mc2 dn">Need replacement</div></div>
          <div className="mc"><div className="ml"><i className="ti ti-flask"></i> Currently testing</div><div className="mv">2</div><div className="mc2" style={{ color: '#2F3DEE' }}>Wait &amp; watch</div></div>
        </div>

        <div className="ai-box">
          <div className="ai-hdr">
            <div className="ai-ico"><i className="ti ti-sparkles"></i></div>
            <div><div className="ai-ttl">Creative Insights</div><div className="ai-sub">What&apos;s working and what to refresh</div></div>
          </div>
          <div className="ai-body">
            <div className="ai-rec">
              <div className="ai-rec-ico aii-g"><i className="ti ti-trending-up"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">UGC-style videos outperform polished ads by 2.4x</div>
                <div className="ai-rec-d">Your brow-serum-ugc-v2.mp4 has 3.4x ROAS vs polished product shots at 1.4x. Make more UGC-style content — real users, casual tone.</div>
              </div>
              <button className="ai-rec-b">Plan more</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-w"><i className="ti ti-alert-triangle"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">3 creatives need replacement urgently</div>
                <div className="ai-rec-d">Nova Lip Tint, Hair Stick and Aurora Lash static ads showing fatigue. Upload fresh variants to maintain performance — old creatives will keep declining.</div>
              </div>
              <button className="ai-rec-b">View list</button>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-ico aii-b"><i className="ti ti-bulb"></i></div>
              <div className="ai-rec-c">
                <div className="ai-rec-t">Sync new files from Google Drive (12 found)</div>
                <div className="ai-rec-d">12 new files added to your Drive folder yesterday. Click to sync and add them to Media Library, ready for next campaign launch.</div>
              </div>
              <button className="ai-rec-b">Sync now</button>
            </div>
          </div>
        </div>

        <div className="upload-options">
          <div className="up-card"><i className="ti ti-brand-google-drive"></i><div className="up-t">Google Drive</div><div className="up-d">Sync from your Drive folder<br />(recommended — free storage)</div></div>
          <div className="up-card"><i className="ti ti-table"></i><div className="up-t">Google Sheet</div><div className="up-d">Bulk import via spreadsheet<br />with creative URLs</div></div>
          <div className="up-card"><i className="ti ti-cloud-upload"></i><div className="up-t">Direct Upload</div><div className="up-d">Drag &amp; drop files from<br />your laptop</div></div>
        </div>
        <div className="pf">
          <div className="pfc on">All (24)</div>
          <div className="pfc">Images (16)</div>
          <div className="pfc">Videos (8)</div>
          <div className="pfc">Top performers (4)</div>
          <div className="pfc">Underperforming (3)</div>
        </div>
        <div className="card">
          <div className="ch"><div className="ct2"><i className="ti ti-photo"></i> All Creatives</div></div>
          <div className="media-grid">
            <div className="media-card"><div className="media-thumb" style={{ background: '#ecfdf5', color: '#0a7a4b' }}><i className="ti ti-video"></i><span className="media-src">Drive</span></div><div className="media-info"><div className="media-name">brow-serum-ugc-v2.mp4</div><div className="media-meta">15s · 3.4x ROAS · 247 conv</div></div></div>
            <div className="media-card"><div className="media-thumb" style={{ background: '#ecfdf5', color: '#0a7a4b' }}><i className="ti ti-photo"></i><span className="media-src">Drive</span></div><div className="media-info"><div className="media-name">eyelash-before-after.jpg</div><div className="media-meta">Static · 2.6x ROAS · 89 conv</div></div></div>
            <div className="media-card"><div className="media-thumb" style={{ background: '#ecfdf5', color: '#0a7a4b' }}><i className="ti ti-video"></i><span className="media-src">Sheet</span></div><div className="media-info"><div className="media-name">booost-drop-reaction.mp4</div><div className="media-meta">20s · 2.8x ROAS · testing</div></div></div>
            <div className="media-card"><div className="media-thumb" style={{ background: '#f5f5ff', color: '#2F3DEE' }}><i className="ti ti-photo"></i><span className="media-src">Direct</span></div><div className="media-info"><div className="media-name">grey-stick-product.jpg</div><div className="media-meta">Static · Not used yet</div></div></div>
            <div className="media-card"><div className="media-thumb" style={{ background: '#fef2f2', color: '#d92d20' }}><i className="ti ti-photo"></i><span className="media-src">Drive</span></div><div className="media-info"><div className="media-name">lip-balm-ad-v1.jpg</div><div className="media-meta">Fatigued · Freq 4.2</div></div></div>
            <div className="media-card"><div className="media-thumb" style={{ background: '#fef2f2', color: '#d92d20' }}><i className="ti ti-photo"></i><span className="media-src">Sheet</span></div><div className="media-info"><div className="media-name">hair-stick-product.jpg</div><div className="media-meta">CTR 0.4% · low perf</div></div></div>
            <div className="media-card"><div className="media-thumb" style={{ background: '#ecfdf5', color: '#0a7a4b' }}><i className="ti ti-video"></i><span className="media-src">Drive</span></div><div className="media-info"><div className="media-name">brow-tutorial.mp4</div><div className="media-meta">30s · 2.9x ROAS</div></div></div>
            <div className="media-card"><div className="media-thumb" style={{ background: '#f5f5ff', color: '#2F3DEE' }}><i className="ti ti-photo"></i><span className="media-src">Direct</span></div><div className="media-info"><div className="media-name">festive-banner-v3.jpg</div><div className="media-meta">Just uploaded</div></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
