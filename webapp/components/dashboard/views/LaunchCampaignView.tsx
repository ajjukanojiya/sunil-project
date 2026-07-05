'use client';
import React, { useState } from 'react';

export default function LaunchCampaignView() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    productName: '',
    platform: 'Meta (Facebook + Instagram)',
    budget: '',
    goal: 'Sales / Conversions',
    url: '',
    creative: 'brow-serum-ugc-v2.mp4 (Top performer · 3.4x ROAS)',
    adCopy: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLaunch = async () => {
    if (!formData.productName || !formData.budget || !formData.url) {
      setError('Please fill in product name, budget, and landing page URL.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/campaigns/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to launch');
      
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong launching the campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div id="pg-new" className="page active">
        <div className="tb">
          <div><span className="bm">Launch New Campaign</span></div>
        </div>
        <div className="ct" style={{ textAlign: 'center', paddingTop: '60px' }}>
          <i className="ti ti-circle-check" style={{ fontSize: '60px', color: '#12b76a' }}></i>
          <h2 style={{ marginTop: '20px', marginBottom: '10px' }}>Campaign Sent to AI</h2>
          <p style={{ color: '#5f6370', maxWidth: '400px', margin: '0 auto' }}>
            Your campaign details have been successfully sent. ScaleWin AI is now generating the ad copy and setting up the campaign in your ad account.
          </p>
          <button className="lbtn" style={{ width: 'auto', padding: '10px 24px', margin: '30px auto 0' }} onClick={() => setSuccess(false)}>
            Launch Another Campaign
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="pg-new" className="page active">
      <div className="tb">
        <div><span className="bm">Launch New Campaign</span><span className="bs">AI will handle everything after you submit</span></div>
      </div>
      <div className="ct">
        <div style={{ maxWidth: '560px' }}>
          <div className="card" style={{ padding: '24px 26px' }}>
            <div className="fsl" style={{ marginTop: 0 }}>Campaign basics</div>
            
            {error && <div style={{ padding: '10px', background: '#fef2f2', color: '#d92d20', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}
            
            <div className="fgrid">
              <div className="form-row">
                <label>Product name</label>
                <input name="productName" value={formData.productName} onChange={handleChange} placeholder="e.g. Velvet Brow Gel" />
              </div>
              <div className="form-row">
                <label>Platform</label>
                <select name="platform" value={formData.platform} onChange={handleChange}>
                  <option>Meta (Facebook + Instagram)</option>
                  <option>Google Ads — Search</option>
                  <option>Google Ads — Performance Max</option>
                  <option>Meta + Google both</option>
                </select>
              </div>
            </div>
            <div className="fgrid">
              <div className="form-row">
                <label>Daily budget (₹)</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="2,000" />
              </div>
              <div className="form-row">
                <label>Campaign goal</label>
                <select name="goal" value={formData.goal} onChange={handleChange}>
                  <option>Sales / Conversions</option>
                  <option>Traffic</option>
                  <option>Brand awareness</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <label>Landing page URL</label>
              <input name="url" value={formData.url} onChange={handleChange} placeholder="https://yourstore.com/product" />
            </div>
            <div className="fsl">Creative asset</div>
            <div className="form-row">
              <label>Select from Media Library or upload new</label>
              <select name="creative" value={formData.creative} onChange={handleChange}>
                <option>brow-serum-ugc-v2.mp4 (Top performer · 3.4x ROAS)</option>
                <option>eyelash-before-after.jpg (Good · 2.6x)</option>
                <option>booost-drop-reaction.mp4 (Testing · 2.8x)</option>
                <option>+ Upload new creative</option>
              </select>
            </div>
            <div className="fsl">Ad copy</div>
            <div className="form-row">
              <label>Leave blank — AI will write it for you</label>
              <textarea name="adCopy" value={formData.adCopy} onChange={handleChange} rows={3} placeholder="Or write your own copy here..."></textarea>
            </div>
            <button className="lbtn" onClick={handleLaunch} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Launching...' : <><i className="ti ti-rocket"></i> Launch — AI will handle the rest</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
