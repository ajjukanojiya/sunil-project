'use client';
import React from 'react';

export default function LaunchCampaignView() {
  return (
    <div id="pg-new" className="page active">
      <div className="tb">
        <div><span className="bm">Launch New Campaign</span><span className="bs">AI will handle everything after you submit</span></div>
      </div>
      <div className="ct">
        <div style={{ maxWidth: '560px' }}>
          <div className="card" style={{ padding: '24px 26px' }}>
            <div className="fsl" style={{ marginTop: 0 }}>Campaign basics</div>
            <div className="fgrid">
              <div className="form-row"><label>Product name</label><input placeholder="e.g. Velvet Brow Gel" /></div>
              <div className="form-row">
                <label>Platform</label>
                <select>
                  <option>Meta (Facebook + Instagram)</option>
                  <option>Google Ads — Search</option>
                  <option>Google Ads — Performance Max</option>
                  <option>Meta + Google both</option>
                </select>
              </div>
            </div>
            <div className="fgrid">
              <div className="form-row"><label>Daily budget (₹)</label><input type="number" placeholder="2,000" /></div>
              <div className="form-row">
                <label>Campaign goal</label>
                <select>
                  <option>Sales / Conversions</option>
                  <option>Traffic</option>
                  <option>Brand awareness</option>
                </select>
              </div>
            </div>
            <div className="form-row"><label>Landing page URL</label><input placeholder="https://yourstore.com/product" /></div>
            <div className="fsl">Creative asset</div>
            <div className="form-row">
              <label>Select from Media Library or upload new</label>
              <select>
                <option>brow-serum-ugc-v2.mp4 (Top performer · 3.4x ROAS)</option>
                <option>eyelash-before-after.jpg (Good · 2.6x)</option>
                <option>booost-drop-reaction.mp4 (Testing · 2.8x)</option>
                <option>+ Upload new creative</option>
              </select>
            </div>
            <div className="fsl">Ad copy</div>
            <div className="form-row">
              <label>Leave blank — AI will write it for you</label>
              <textarea rows={3} placeholder="Or write your own copy here..."></textarea>
            </div>
            <button className="lbtn"><i className="ti ti-rocket"></i> Launch — AI will handle the rest</button>
          </div>
        </div>
      </div>
    </div>
  );
}
