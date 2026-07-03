
'use client';
import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const initialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    const extScripts: string[] = [];
    let loadedCount = 0;
    
    const runInlineScripts = () => {
      const scriptContents: string[] = ["\nfunction showTab(btn, sec){\n  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));\n  btn.classList.add('active');\n  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));\n  document.querySelector('[data-sec=\"'+sec+'\"]').classList.add('active');\n}\n"];
      scriptContents.forEach(scriptText => {
        try {
          const scriptEl = document.createElement('script');
          scriptEl.textContent = '{\n' + scriptText + '\n}';
          document.body.appendChild(scriptEl);
        } catch (e) {
          console.error(e);
        }
      });
    };

    if (extScripts.length === 0) {
      runInlineScripts();
    } else {
      extScripts.forEach(src => {
        const el = document.createElement('script');
        el.src = src;
        el.async = false;
        el.onload = () => {
          loadedCount++;
          if (loadedCount === extScripts.length) runInlineScripts();
        };
        document.body.appendChild(el);
      });
    }
  }, []);

  // Intercept all <a> clicks for SPA routing
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.getAttribute('href') && target.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        router.push(target.getAttribute('href') as string);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleLinkClick);
    }
    return () => {
      if (container) container.removeEventListener('click', handleLinkClick);
    }
  }, [router]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
:root{
  --ink:#171A28;--ink-soft:#5C6478;--ink-faint:#8A90A3;
  --paper:#F4F2EA;--paper-2:#EDEBE1;--cream:#FCFBF6;
  --line:#E4E1D6;--gold:#DC9E27;--gold-deep:#A8741A;
  --green:#0BB07F;--green-soft:#E2F6EF;--rust:#FF553F;--ink-block:#171A28;
  --meta:#2F3DEE;--google:#1a6fe0;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased;min-height:100vh}
h1,h2,h3,.serif{font-family:'Space Grotesk',sans-serif;letter-spacing:-0.02em}
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.025;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

.topbar{height:64px;border-bottom:1px solid var(--line);background:rgba(250,247,240,.85);backdrop-filter:blur(12px);position:sticky;top:0;z-index:30}
.topbar-in{max-width:1000px;margin:0 auto;padding:0 28px;height:100%;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;letter-spacing:-.02em;cursor:pointer}
.logo-mark{width:32px;height:32px;border-radius:8px;background:var(--ink-block);display:flex;align-items:center;justify-content:center}
.logo-mark i{font-size:17px;color:var(--gold)}
.logo span{color:var(--gold-deep)}
.tb-back{font-size:13.5px;color:var(--ink-soft);text-decoration:none;font-weight:600;display:flex;align-items:center;gap:6px}
.tb-back:hover{color:var(--ink)}

.shell{max-width:1000px;margin:0 auto;padding:36px 28px 80px;position:relative;z-index:1}
.page-title{font-size:30px;font-weight:600;letter-spacing:-.02em;margin-bottom:6px}
.page-sub{font-size:15px;color:var(--ink-soft);margin-bottom:30px}

/* layout: tabs + content */
.layout{display:grid;grid-template-columns:200px 1fr;gap:32px}
@media(max-width:760px){.layout{grid-template-columns:1fr;gap:20px}}
.tabs{display:flex;flex-direction:column;gap:4px;position:sticky;top:90px;align-self:start}
@media(max-width:760px){.tabs{flex-direction:row;flex-wrap:wrap;position:static}}
.tab{display:flex;align-items:center;gap:11px;padding:11px 14px;border-radius:10px;font-size:14px;font-weight:600;color:var(--ink-soft);cursor:pointer;transition:all .15s;background:transparent;border:none;font-family:inherit;text-align:left}
.tab:hover{background:var(--paper-2)}
.tab.active{background:var(--ink-block);color:var(--cream)}
.tab i{font-size:18px}

.section{display:none;animation:fade .35s ease}
.section.active{display:block}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

.card{background:var(--cream);border:1px solid var(--line);border-radius:16px;padding:26px;margin-bottom:20px}
.card-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px}
.card-head h2{font-size:18px;font-weight:600}
.card-head p{font-size:13px;color:var(--ink-faint);margin-top:2px}

/* current plan */
.plan-box{background:linear-gradient(135deg,rgba(200,160,74,.1),rgba(200,160,74,.02));border:1px solid rgba(200,160,74,.3);border-radius:14px;padding:22px;margin-bottom:20px}
.plan-top{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:18px}
.plan-name{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:600}
.plan-badge{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;background:var(--green);color:#fff;padding:4px 12px;border-radius:20px}
.plan-price{text-align:right}
.plan-price .amt{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700}
.plan-price .per{font-size:13px;color:var(--ink-faint)}
.plan-services{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.psvc{display:flex;align-items:center;gap:7px;background:var(--cream);border:1px solid var(--line);padding:6px 13px;border-radius:30px;font-size:13px;font-weight:600}
.psvc i{font-size:15px}
.plan-renew{font-size:13px;color:var(--ink-soft);display:flex;align-items:center;gap:7px}
.plan-renew i{font-size:15px;color:var(--gold-deep)}

.btn{padding:11px 20px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;border:1px solid var(--line);background:var(--cream);color:var(--ink);transition:all .15s}
.btn:hover{border-color:var(--ink-faint)}
.btn-dark{background:var(--ink-block);color:var(--cream);border-color:var(--ink-block)}
.btn-dark:hover{transform:translateY(-1px)}
.btn-row{display:flex;gap:10px;flex-wrap:wrap}

/* manage services */
.svc-manage{border:1px solid var(--line);border-radius:13px;padding:16px 18px;display:flex;align-items:center;gap:15px;margin-bottom:11px}
.svc-manage-ico{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.svc-manage-ico i{font-size:21px}
.svc-manage-info{flex:1}
.svc-manage-info h4{font-size:15px;font-weight:600}
.svc-manage-info p{font-size:12.5px;color:var(--ink-soft)}
.toggle{width:46px;height:26px;border-radius:20px;background:var(--green);position:relative;cursor:pointer;border:none;transition:background .2s;flex-shrink:0}
.toggle::after{content:'';position:absolute;width:20px;height:20px;border-radius:50%;background:#fff;top:3px;right:3px;transition:all .2s}
.toggle.off{background:#d4d0c5}
.toggle.off::after{right:23px}

/* payment method */
.pay-card{border:1px solid var(--line);border-radius:13px;padding:18px;display:flex;align-items:center;gap:16px}
.pay-card-ico{width:50px;height:34px;border-radius:7px;background:var(--ink-block);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pay-card-ico i{font-size:20px;color:var(--gold)}
.pay-card-info{flex:1}
.pay-card-info h4{font-size:14.5px;font-weight:600}
.pay-card-info p{font-size:12.5px;color:var(--ink-faint)}

/* invoices table */
.inv-table{width:100%;border-collapse:collapse}
.inv-table th{text-align:left;font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-faint);padding:0 0 12px;border-bottom:1px solid var(--line)}
.inv-table td{padding:14px 0;border-bottom:1px solid var(--line);font-size:14px}
.inv-table tr:last-child td{border-bottom:none}
.inv-status{font-size:11px;font-weight:700;background:var(--green-soft);color:var(--green);padding:3px 10px;border-radius:20px}
.inv-dl{color:var(--gold-deep);font-weight:600;text-decoration:none;font-size:13.5px;display:inline-flex;align-items:center;gap:5px;cursor:pointer}
.inv-dl:hover{text-decoration:underline}

/* account fields */
.field{margin-bottom:18px}
.field label{display:block;font-size:13px;font-weight:600;margin-bottom:7px}
.field input{width:100%;background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:12px 14px;font-size:14px;color:var(--ink);font-family:inherit;outline:none}
.field input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(200,160,74,.1)}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:520px){.field-row{grid-template-columns:1fr}}

/* danger zone */
.danger{border:1px solid #f0c8be;background:#fdf4f2;border-radius:14px;padding:22px}
.danger h3{font-size:16px;font-weight:600;color:var(--rust);margin-bottom:6px}
.danger p{font-size:13.5px;color:#8a3520;line-height:1.5;margin-bottom:16px}
.btn-danger{background:transparent;border:1px solid var(--rust);color:var(--rust);padding:11px 20px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s}
.btn-danger:hover{background:var(--rust);color:#fff}

.gst-note{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink-soft);margin-top:14px;padding:12px 14px;background:var(--paper-2);border-radius:10px}
.gst-note i{font-size:16px;color:var(--gold-deep)}
` }} />
      
      <div 
        ref={containerRef}
        className="legacy-html-wrapper" 
        dangerouslySetInnerHTML={{ __html: `

<div class="topbar">
  <div class="topbar-in">
    <div class="logo" onclick="window.location.href='index.html'" style="cursor:pointer"><div class="logo-mark"><b>S</b></div>ScaleWin</div>
    <a href="#" class="tb-back"><i class="ti ti-arrow-left"></i> Back to dashboard</a>
  </div>
</div>

<div class="shell">
  <h1 class="page-title">Settings &amp; Billing</h1>
  <p class="page-sub">Manage your plan, payment and account details.</p>

  <div class="layout">
    <!-- TABS -->
    <div class="tabs">
      <button class="tab active" onclick="showTab(this,'plan')"><i class="ti ti-crown"></i> Plan</button>
      <button class="tab" onclick="showTab(this,'payment')"><i class="ti ti-credit-card"></i> Payment</button>
      <button class="tab" onclick="showTab(this,'invoices')"><i class="ti ti-file-invoice"></i> Invoices</button>
      <button class="tab" onclick="showTab(this,'account')"><i class="ti ti-user"></i> Account</button>
    </div>

    <!-- CONTENT -->
    <div class="content">

      <!-- PLAN -->
      <div class="section active" data-sec="plan">
        <div class="card">
          <div class="card-head"><div><h2>Current plan</h2><p>Your active subscription</p></div></div>
          <div class="plan-box">
            <div class="plan-top">
              <div>
                <div class="plan-name">2-Service Bundle</div>
                <span class="plan-badge">Active</span>
              </div>
              <div class="plan-price"><div class="amt">₹9,598</div><div class="per">/month · 20% bundle discount</div></div>
            </div>
            <div class="plan-services">
              <div class="psvc"><i class="ti ti-brand-facebook" style="color:var(--meta)"></i> Meta Ads</div>
              <div class="psvc"><i class="ti ti-brand-google" style="color:var(--google)"></i> Google Ads</div>
            </div>
            <div class="plan-renew"><i class="ti ti-calendar-repeat"></i> Renews on 28 June 2026</div>
          </div>
          <div class="btn-row">
            <button class="btn btn-dark" onclick="alert('Add/change services')">Change services</button>
            <button class="btn" onclick="alert('Switch to annual — save 2 months')">Switch to annual (save 2 months)</button>
          </div>
        </div>

        <div class="card">
          <div class="card-head"><div><h2>Manage services</h2><p>Turn services on or off — billing updates automatically</p></div></div>
          <div class="svc-manage">
            <div class="svc-manage-ico" style="background:#E7E8FD;color:var(--meta)"><i class="ti ti-brand-facebook"></i></div>
            <div class="svc-manage-info"><h4>Meta Ads</h4><p>₹5,999/mo · Active</p></div>
            <button class="toggle" onclick="this.classList.toggle('off')"></button>
          </div>
          <div class="svc-manage">
            <div class="svc-manage-ico" style="background:#e6f0fe;color:var(--google)"><i class="ti ti-brand-google"></i></div>
            <div class="svc-manage-info"><h4>Google Ads</h4><p>₹5,999/mo · Active</p></div>
            <button class="toggle" onclick="this.classList.toggle('off')"></button>
          </div>
          <div class="svc-manage">
            <div class="svc-manage-ico" style="background:var(--green-soft);color:var(--green)"><i class="ti ti-search"></i></div>
            <div class="svc-manage-info"><h4>SEO &amp; Content</h4><p>₹4,999/mo · Add this to unlock 30% bundle discount</p></div>
            <button class="toggle off" onclick="this.classList.toggle('off')"></button>
          </div>
          <div class="gst-note"><i class="ti ti-bulb"></i> Add SEO to make it a 3-service bundle and get 30% off everything — you'd pay ₹11,897/mo instead of ₹13,716.</div>
        </div>

        <div class="danger">
          <h3>Cancel subscription</h3>
          <p>Your AI will keep running until the end of your current billing period (28 June 2026). After that, campaigns stay as-is but won't be optimised. You can resubscribe anytime.</p>
          <button class="btn-danger" onclick="if(confirm('Are you sure you want to cancel? Your AI will stop optimising after 28 June 2026.')){alert('Cancellation flow — we would offer help / pause option here before confirming.')}">Cancel subscription</button>
        </div>
      </div>

      <!-- PAYMENT -->
      <div class="section" data-sec="payment">
        <div class="card">
          <div class="card-head"><div><h2>Payment method</h2><p>Managed securely via Razorpay</p></div></div>
          <div class="pay-card">
            <div class="pay-card-ico"><i class="ti ti-credit-card"></i></div>
            <div class="pay-card-info"><h4>HDFC Card ending in 4242</h4><p>Expires 08/28</p></div>
            <button class="btn" onclick="alert('Update payment method')">Update</button>
          </div>
          <div class="gst-note"><i class="ti ti-shield-check"></i> Your card details are stored securely by Razorpay — we never see them.</div>
        </div>

        <div class="card">
          <div class="card-head"><div><h2>Billing details</h2><p>Used on your GST invoices</p></div></div>
          <div class="field"><label>Business / billing name</label><input type="text" value="Sharma Organics Pvt Ltd"></div>
          <div class="field"><label>GSTIN (optional)</label><input type="text" placeholder="e.g. 06AABCS1234C1Z5" value="06AABCS1234C1Z5"></div>
          <div class="field-row">
            <div class="field"><label>State</label><input type="text" value="Haryana"></div>
            <div class="field"><label>Pincode</label><input type="text" value="122001"></div>
          </div>
          <button class="btn btn-dark" onclick="alert('Billing details saved')">Save details</button>
        </div>
      </div>

      <!-- INVOICES -->
      <div class="section" data-sec="invoices">
        <div class="card">
          <div class="card-head"><div><h2>Invoices</h2><p>Download your GST invoices anytime</p></div></div>
          <table class="inv-table">
            <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th><th></th></tr></thead>
            <tbody>
              <tr><td>28 May 2026</td><td>2-Service Bundle</td><td>₹9,598</td><td><span class="inv-status">Paid</span></td><td><span class="inv-dl" onclick="alert('Download invoice PDF')"><i class="ti ti-download"></i> GST Invoice</span></td></tr>
              <tr><td>28 Apr 2026</td><td>2-Service Bundle</td><td>₹9,598</td><td><span class="inv-status">Paid</span></td><td><span class="inv-dl" onclick="alert('Download invoice PDF')"><i class="ti ti-download"></i> GST Invoice</span></td></tr>
              <tr><td>28 Mar 2026</td><td>Meta Ads (single)</td><td>₹5,999</td><td><span class="inv-status">Paid</span></td><td><span class="inv-dl" onclick="alert('Download invoice PDF')"><i class="ti ti-download"></i> GST Invoice</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ACCOUNT -->
      <div class="section" data-sec="account">
        <div class="card">
          <div class="card-head"><div><h2>Profile</h2><p>Your account information</p></div></div>
          <div class="field-row">
            <div class="field"><label>Your name</label><input type="text" value="Rohit Sharma"></div>
            <div class="field"><label>WhatsApp / Phone</label><input type="tel" value="+91 98765 43210"></div>
          </div>
          <div class="field"><label>Email</label><input type="email" value="rohit@sharmaorganics.com"></div>
          <div class="field"><label>Business name</label><input type="text" value="Sharma Organics"></div>
          <button class="btn btn-dark" onclick="alert('Profile saved')">Save changes</button>
        </div>

        <div class="card">
          <div class="card-head"><div><h2>Password</h2><p>Change your login password</p></div></div>
          <div class="field"><label>Current password</label><input type="password" placeholder="••••••••"></div>
          <div class="field-row">
            <div class="field"><label>New password</label><input type="password" placeholder="••••••••"></div>
            <div class="field"><label>Confirm new password</label><input type="password" placeholder="••••••••"></div>
          </div>
          <button class="btn btn-dark" onclick="alert('Password updated')">Update password</button>
        </div>

      </div>

    </div>
  </div>
</div>





` }} 
      />
      
    </>
  );
}
