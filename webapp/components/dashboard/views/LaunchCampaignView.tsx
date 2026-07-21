'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './launch-campaign.css';

export default function LaunchCampaignView() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [webhookInfo, setWebhookInfo] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    platform: 'meta',
    objective: 'sales',
    productName: '',
    url: '',
    budget: 1500,
    location: 'All India',
    age: '18–44 (recommended)',
    gender: 'All genders',
    audience: 'Broad (AI optimises — recommended)',
    creative: 'brow-serum-ugc-v2.mp4 (Top performer · 3.4x ROAS)',
    adCopy: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const copies = [
    "Struggling with thin eyebrows? Our Velvet Brow Gel has helped 50,000+ women get fuller, defined brows naturally — without any mess or stickiness.\n\n✅ Long-lasting formula\n✅ Dermatologist tested\n✅ Free shipping on orders above ₹499\n\nTap to shop now →",
    "Want thicker, fuller brows in just 30 days? Velvet Brow Gel uses a natural formula loved by 50,000+ customers across India.\n\n🌿 No harmful chemicals\n⭐ 4.8/5 rating (2,400+ reviews)\n🚚 Delivered in 3–5 days\n\nOrder now and see the difference →",
    "Say goodbye to sparse brows! Velvet Brow Gel gives you salon-perfect brows at home — smudge-proof, all-day hold.\n\n✨ Perfect for beginners\n✨ Suitable for sensitive skin\n✨ Cash on delivery available\n\nShop now, limited stock →"
  ];
  
  const [copyIdx, setCopyIdx] = useState(0);
  
  const regenCopy = () => {
    setCopyIdx((prev) => (prev + 1) % copies.length);
  };

  const handleLaunch = async () => {
    if (!formData.productName || !formData.budget || !formData.url) {
      setError('Please fill in product name, budget, and landing page URL.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // If user left adCopy blank, use the AI generated one
    const finalAdCopy = formData.adCopy.trim() ? formData.adCopy : copies[copyIdx];
    const finalData = { ...formData, adCopy: finalAdCopy };
    
    try {
      const res = await fetch('/api/campaigns/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });
      
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error('Launch Error:', data);
        throw new Error(data.error || 'Failed to launch');
      }
      
      if (data.webhook) {
        setWebhookInfo(data.webhook);
      }
      
      setSuccess(true);
      router.refresh(); // Refresh data to show new campaign in tables
    } catch (err: any) {
      setError(`Error: ${err.message || 'Something went wrong'}`);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div id="pg-new" className="page active">
        <div className="success-screen" style={{ display: 'block' }}>
          <div className="success-ico"><i className="ti ti-circle-check"></i></div>
          <div className="success-title">Campaign launched! 🚀</div>
          <div className="success-sub">ScaleWin AI is now setting up your campaign on Meta. It usually goes live within 15–30 minutes once Meta reviews it.</div>
          <div className="success-status">
            <div className="ss-row"><i className="ti ti-check"></i> Campaign created on {formData.platform === 'google' ? 'Google Ads' : formData.platform === 'both' ? 'Meta & Google Ads' : 'Meta Ads'}</div>
            <div className="ss-row"><i className="ti ti-check"></i> Ad set configured (audience + budget)</div>
            <div className="ss-row"><i className="ti ti-check"></i> Creative uploaded</div>
            <div className="ss-row"><i className="ti ti-check"></i> Pixel connected for conversion tracking</div>
            <div className="ss-row"><i className="ti ti-clock" style={{ color: '#e65100' }}></i> Pending review (15–30 min)</div>
            
            {webhookInfo && (
              <div className="ss-row" style={{ marginTop: '15px', borderTop: '1px dashed #e3e4e8', paddingTop: '15px' }}>
                <i className={webhookInfo.status === 'Success' ? 'ti ti-api' : 'ti ti-alert-circle'} style={{ color: webhookInfo.status === 'Success' ? '#0a7a4b' : '#d92d20' }}></i> 
                <strong>Webhook Status:</strong> {webhookInfo.status} 
                {webhookInfo.statusCode ? ` (${webhookInfo.statusCode})` : ''}
              </div>
            )}
          </div>
          <button className="btn btn-p" onClick={() => { setSuccess(false); setCurrentStep(1); }} style={{ padding: '11px 24px', fontSize: '14px' }}>
            <i className="ti ti-plus"></i> Launch another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="pg-new" className="page active">
      <div className="tb">
        <div>
          <span className="bm">New Campaign</span>
          <span className="bs">AI will write the ad copy and handle setup</span>
        </div>
      </div>
      <div className="ct">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          
          {/* Stepper */}
          <div className="stepper" id="stepper">
            {[1, 2, 3, 4].map((step, idx) => (
              <React.Fragment key={step}>
                <div className="step">
                  <div className={`step-dot ${currentStep > step ? 'done' : currentStep === step ? 'active' : 'pending'}`}>
                    {currentStep > step ? <i className="ti ti-check"></i> : step}
                  </div>
                  <span className={`step-label ${currentStep > step ? 'done' : currentStep === step ? 'active' : 'pending'}`}>
                    {step === 1 ? 'Platform' : step === 2 ? 'Campaign details' : step === 3 ? 'Creative & copy' : 'Review & launch'}
                  </span>
                  {idx < 3 && <div className={`step-line ${currentStep > step ? 'done' : ''}`}></div>}
                </div>
              </React.Fragment>
            ))}
          </div>

          {error && <div style={{ padding: '10px', background: '#fef2f2', color: '#d92d20', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}

          {/* STEP 1 */}
          {currentStep === 1 && (
            <div id="step1">
              <div className="card">
                <div className="section-label">Choose your advertising platform</div>
                <div className="platform-grid">
                  <div className={`platform-card ${formData.platform === 'meta' ? 'selected' : ''}`} onClick={() => setField('platform', 'meta')}>
                    <div className="platform-ico meta"><i className="ti ti-brand-facebook"></i></div>
                    <div className="platform-name">Meta Ads</div>
                    <div className="platform-sub">Facebook & Instagram<br/>Best for reach & discovery</div>
                  </div>
                  <div className={`platform-card ${formData.platform === 'google' ? 'selected' : ''}`} onClick={() => setField('platform', 'google')}>
                    <div className="platform-ico google"><i className="ti ti-brand-google"></i></div>
                    <div className="platform-name">Google Ads</div>
                    <div className="platform-sub">Search & Performance Max<br/>Best for intent-based buyers</div>
                  </div>
                  <div className={`platform-card ${formData.platform === 'both' ? 'selected' : ''}`} onClick={() => setField('platform', 'both')}>
                    <div className="platform-ico both"><i className="ti ti-layers-intersect"></i></div>
                    <div className="platform-name">Both platforms</div>
                    <div className="platform-sub">Meta + Google together<br/>Maximum coverage</div>
                  </div>
                </div>

                <div className="section-label">Campaign objective</div>
                <div className="platform-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div className={`platform-card ${formData.objective === 'sales' ? 'selected' : ''}`} onClick={() => setField('objective', 'sales')}>
                    <div className="platform-ico" style={{ background: '#ecfdf5', color: '#0a7a4b' }}><i className="ti ti-shopping-cart"></i></div>
                    <div className="platform-name">Sales</div>
                    <div className="platform-sub">Drive purchases on your store</div>
                  </div>
                  <div className={`platform-card ${formData.objective === 'traffic' ? 'selected' : ''}`} onClick={() => setField('objective', 'traffic')}>
                    <div className="platform-ico" style={{ background: '#fff3e0', color: '#e65100' }}><i className="ti ti-cursor-text"></i></div>
                    <div className="platform-name">Traffic</div>
                    <div className="platform-sub">Bring visitors to your website</div>
                  </div>
                  <div className={`platform-card ${formData.objective === 'awareness' ? 'selected' : ''}`} onClick={() => setField('objective', 'awareness')}>
                    <div className="platform-ico" style={{ background: '#f5f5ff', color: '#2F3DEE' }}><i className="ti ti-speakerphone"></i></div>
                    <div className="platform-name">Awareness</div>
                    <div className="platform-sub">Maximum reach & brand visibility</div>
                  </div>
                </div>

                <div className="wiz-nav">
                  <div className="left"></div>
                  <button className="btn btn-p" onClick={() => setCurrentStep(2)}>Continue <i className="ti ti-arrow-right"></i></button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div id="step2">
              <div className="card">
                <div className="section-label">Product & campaign info</div>
                <div className="form-grid">
                  <div className="form-row">
                    <label>Product name</label>
                    <input name="productName" value={formData.productName} onChange={handleChange} placeholder="e.g. Velvet Brow Gel" />
                  </div>
                  <div className="form-row">
                    <label>Landing page URL</label>
                    <input name="url" type="url" value={formData.url} onChange={handleChange} placeholder="https://yourstore.com/product" />
                  </div>
                </div>

                <div className="section-label">Daily budget</div>
                <div className="budget-display" id="budget-display">₹{formData.budget.toLocaleString('en-IN')}/day</div>
                <div className="budget-sub">Estimated reach: <strong>8,000 – 14,000 people/day</strong></div>
                <input type="range" min="500" max="10000" step="500" value={formData.budget} onChange={(e) => setField('budget', parseInt(e.target.value))} id="budget-slider" />
                <div className="budget-presets">
                  {[500, 1000, 1500, 3000, 5000, 10000].map(val => (
                    <div key={val} className={`budget-preset ${formData.budget === val ? 'on' : ''}`} onClick={() => setField('budget', val)}>₹{val.toLocaleString('en-IN')}</div>
                  ))}
                </div>

                <div className="section-label" style={{ marginTop: '20px' }}>Target audience</div>
                <div className="form-grid">
                  <div className="form-row">
                    <label>Target location</label>
                    <select name="location" value={formData.location} onChange={handleChange}>
                      <option>All India</option>
                      <option>Metro cities only</option>
                      <option>Tier 1 + Tier 2 cities</option>
                      <option>Custom (specify below)</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Age group</label>
                    <select name="age" value={formData.age} onChange={handleChange}>
                      <option>18–44 (recommended)</option>
                      <option>18–24</option>
                      <option>25–34</option>
                      <option>35–54</option>
                      <option>All ages (18+)</option>
                    </select>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-row">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                      <option>All genders</option>
                      <option>Women only</option>
                      <option>Men only</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Audience type</label>
                    <select name="audience" value={formData.audience} onChange={handleChange}>
                      <option>Broad (AI optimises — recommended)</option>
                      <option>Interest-based</option>
                      <option>Lookalike (based on past buyers)</option>
                      <option>Retargeting (past visitors)</option>
                    </select>
                  </div>
                </div>

                <div className="wiz-nav">
                  <div className="left">
                    <button className="btn btn-ghost" onClick={() => setCurrentStep(1)}><i className="ti ti-arrow-left"></i> Back</button>
                  </div>
                  <button className="btn btn-p" onClick={() => setCurrentStep(3)}>Continue <i className="ti ti-arrow-right"></i></button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div id="step3">
              <div className="card">
                <div className="section-label">Select creative from Media Library</div>
                <div className="creative-tabs">
                  <div className="ctab on">All (8)</div>
                  <div className="ctab">Top performers</div>
                  <div className="ctab">Videos</div>
                  <div className="ctab">Images</div>
                </div>
                <div className="creative-grid">
                  {[
                    { name: 'brow-serum-ugc-v2.mp4', icon: 'ti-video', roas: '3.4x ROAS · 247 conv', color: '#0a7a4b', bg: '#ecfdf5' },
                    { name: 'eyelash-before-after.jpg', icon: 'ti-photo', roas: '2.6x ROAS · 89 conv', color: '#0a7a4b', bg: '#ecfdf5' },
                    { name: 'booost-reaction.mp4', icon: 'ti-video', roas: 'Testing · 2.8x ROAS', color: '#2F3DEE', bg: '#f5f5ff' },
                    { name: 'lip-balm-ad-v1.jpg', icon: 'ti-photo', roas: 'Fatigued · Freq 4.2', color: '#d92d20', bg: '#fef2f2' }
                  ].map(c => (
                    <div key={c.name} className={`creative-item ${formData.creative === c.name ? 'selected' : ''}`} onClick={() => setField('creative', c.name)}>
                      <div className="creative-thumb" style={{ background: c.bg, color: c.color }}><i className={`ti ${c.icon}`}></i></div>
                      <div className="creative-name">{c.name}</div>
                      <div className="creative-roas" style={{ color: c.color }}>{c.roas}</div>
                    </div>
                  ))}
                  <div className="add-creative" onClick={() => alert('Upload from Drive, Sheet or device')}>
                    <i className="ti ti-cloud-upload"></i>
                    <span>Upload new</span>
                  </div>
                </div>

                <div className="section-label" style={{ marginTop: '24px' }}>Ad copy</div>
                <div className="ai-copy-box">
                  <div className="ai-copy-badge"><i className="ti ti-sparkles"></i> AI-generated copy (based on your product & audience)</div>
                  <div className="ai-copy-text" dangerouslySetInnerHTML={{ __html: copies[copyIdx].replace(/\n/g, '<br>') }}></div>
                  <div className="ai-copy-actions">
                    <button className="ai-copy-btn" onClick={regenCopy}><i className="ti ti-refresh" style={{ fontSize: '12px' }}></i> Regenerate</button>
                    <button className="ai-copy-btn"><i className="ti ti-edit" style={{ fontSize: '12px' }}></i> Edit manually</button>
                  </div>
                </div>
                <div className="form-row">
                  <label>Or write your own copy</label>
                  <textarea name="adCopy" value={formData.adCopy} onChange={handleChange} placeholder="Leave blank to use AI copy above..."></textarea>
                  <span className="hint">AI copy will be used if this field is left blank</span>
                </div>

                <div className="wiz-nav">
                  <div className="left">
                    <button className="btn btn-ghost" onClick={() => setCurrentStep(2)}><i className="ti ti-arrow-left"></i> Back</button>
                  </div>
                  <button className="btn btn-p" onClick={() => setCurrentStep(4)}>Review campaign <i className="ti ti-arrow-right"></i></button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div id="step4">
              <div className="card">
                <div className="ai-note">
                  <i className="ti ti-robot"></i>
                  <div className="ai-note-text">
                    <strong>ScaleWin AI will handle everything after launch:</strong> campaign creation on Meta/Google, ad set setup, pixel linking, and daily budget optimisation based on real profit — not just ROAS.
                  </div>
                </div>

                <div className="section-label">Campaign summary</div>
                <div className="review-grid">
                  <div className="review-card">
                    <div className="review-card-label">Platform</div>
                    <div className="review-card-value">
                      <i className={`ti ${formData.platform === 'google' ? 'ti-brand-google' : 'ti-brand-facebook'}`} style={{ color: '#2F3DEE', fontSize: '14px' }}></i> 
                      {formData.platform === 'google' ? ' Google Ads' : formData.platform === 'both' ? ' Meta & Google Ads' : ' Meta Ads'}
                    </div>
                  </div>
                  <div className="review-card">
                    <div className="review-card-label">Objective</div>
                    <div className="review-card-value"><i className="ti ti-shopping-cart" style={{ color: '#0a7a4b', fontSize: '14px' }}></i> {formData.objective}</div>
                  </div>
                  <div className="review-card">
                    <div className="review-card-label">Product</div>
                    <div className="review-card-value" id="rv-product">{formData.productName || 'Not specified'}</div>
                  </div>
                  <div className="review-card">
                    <div className="review-card-label">Daily budget</div>
                    <div className="review-card-value big" id="rv-budget">₹{formData.budget.toLocaleString('en-IN')}/day</div>
                  </div>
                  <div className="review-card">
                    <div className="review-card-label">Audience</div>
                    <div className="review-card-value">{formData.location} · {formData.age}</div>
                  </div>
                  <div className="review-card">
                    <div className="review-card-label">Creative selected</div>
                    <div className="review-card-value">{formData.creative}</div>
                  </div>
                </div>

                <div className="section-label">Ad copy preview</div>
                <div style={{ background: '#f6f7f9', borderRadius: '10px', padding: '14px 16px', fontSize: '13px', color: '#1a1d23', lineHeight: 1.6, marginBottom: '20px' }}>
                  {formData.adCopy || copies[copyIdx]}
                </div>

                <div className="section-label">Estimated performance</div>
                <div className="review-grid">
                  <div className="review-card">
                    <div className="review-card-label">Estimated daily reach</div>
                    <div className="review-card-value big">8K–14K</div>
                  </div>
                  <div className="review-card">
                    <div className="review-card-label">Expected ROAS range</div>
                    <div className="review-card-value big">2.2x – 3.4x</div>
                  </div>
                  <div className="review-card">
                    <div className="review-card-label">Monthly spend</div>
                    <div className="review-card-value big">₹{(formData.budget * 30).toLocaleString('en-IN')}</div>
                  </div>
                  <div className="review-card">
                    <div className="review-card-label">Est. monthly revenue</div>
                    <div className="review-card-value big" style={{ color: '#12b76a' }}>₹{Math.round(formData.budget * 30 * 2.8).toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <button className="launch-btn" onClick={handleLaunch} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Launching...' : <><i className="ti ti-rocket"></i> Launch campaign — AI handles the rest</>}
                </button>

                <div className="wiz-nav" style={{ marginTop: '16px' }}>
                  <div className="left">
                    <button className="btn btn-ghost" onClick={() => setCurrentStep(3)}><i className="ti ti-arrow-left"></i> Back</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
