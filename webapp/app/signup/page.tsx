
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
      const scriptContents: string[] = [`
let step=0;
const PRICES={meta:5999,google:5999,seo:4999};
const NAMES={meta:'Meta Ads',google:'Google Ads',seo:'SEO & Content'};
let selectedSvcs=['meta'];
const LABELS=['Account','Goal','Services','Start trial'];

function fmt(n){return n.toLocaleString('en-IN');}

function showStep(n){
  document.querySelectorAll('.step-pane').forEach(p=>p.classList.remove('active'));
  document.querySelector('[data-pane="'+n+'"]').classList.add('active');
  rebuildDots(n);
  document.querySelectorAll('.pline').forEach((l,i)=>l.classList.toggle('done',i<n));
  const nav=document.getElementById('wizNav');
  if(n===4){nav.style.display='none';return;}else{nav.style.display='flex';}
  document.getElementById('backBtn').classList.toggle('hidden',n===0);
  document.getElementById('nextBtn').innerHTML=(n===3)?'Start free trial <i class="ti ti-arrow-right"></i>':'Continue <i class="ti ti-arrow-right"></i>';
}
function rebuildDots(n){
  document.querySelectorAll('.pdot').forEach((d,i)=>{
    d.classList.remove('active','done');
    let inner=(i<n)?'<i class="ti ti-check"></i>':(i+1);
    let lblA=(i===n)?' active':'';
    d.innerHTML=inner+'<span class="plabel'+lblA+'">'+LABELS[i]+'</span>';
    if(i<n)d.classList.add('done');
    if(i===n)d.classList.add('active');
  });
}
function nextStep(){ if(step===3){step=4;showStep(4);return;} if(step<3){step++;showStep(step);window.scrollTo({top:0,behavior:'smooth'});} }
function prevStep(){ if(step>0){step--;showStep(step);window.scrollTo({top:0,behavior:'smooth'});} }

function selectGoal(el){ document.querySelectorAll('[data-pane="1"] .opt').forEach(o=>o.classList.remove('selected')); el.classList.add('selected'); }

function toggleSvc(el){ el.classList.toggle('selected'); selectedSvcs=[...document.querySelectorAll('.svc.selected')].map(s=>s.dataset.svc); recalcBundle(); }
function recalcBundle(){
  const S=document.getElementById('bbServices'),T=document.getElementById('bbTotal'),SV=document.getElementById('bbSave'),L=document.getElementById('bbLabel');
  if(selectedSvcs.length===0){L.textContent='No plan';S.textContent='Pick at least one service';T.textContent='0';SV.style.display='none';return;}
  let full=selectedSvcs.reduce((s,k)=>s+PRICES[k],0);
  let disc=selectedSvcs.length===2?.2:selectedSvcs.length===3?.3:0;
  let final=Math.round(full*(1-disc));
  L.textContent=selectedSvcs.length===1?'Your plan':selectedSvcs.length+'-service bundle';
  S.textContent=selectedSvcs.map(k=>NAMES[k]).join(' + ');
  T.textContent=fmt(final);
  if(disc>0){SV.style.display='inline-block';SV.textContent=(disc*100)+'% off · save ₹'+fmt(full-final)+'/mo';}else SV.style.display='none';
  document.getElementById('revServices').textContent=selectedSvcs.map(k=>NAMES[k]).join(' + ');
  document.getElementById('revPrice').textContent='₹'+fmt(final)+'/mo';
}

const d=new Date();d.setDate(d.getDate()+3);
document.getElementById('trialEnd').textContent=d.toLocaleDateString('en-IN',{day:'numeric',month:'short'});

rebuildDots(0);recalcBundle();

async function handleSignup() {
  const name = document.getElementById('signupName')?.value;
  const businessName = document.getElementById('signupBusiness')?.value;
  const email = document.getElementById('signupEmail')?.value;
  const password = document.getElementById('signupPwd')?.value;
  if(!email || !password) { alert('Email and password required'); return false; }
  
  const btn = document.getElementById('nextBtn');
  const oldTxt = btn.innerHTML;
  btn.innerHTML = 'Starting trial...';
  
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, businessName })
    });
    const data = await res.json();
    if(res.ok) {
      return true; // proceed to step 4
    } else {
      alert(data.error || 'Signup failed');
      btn.innerHTML = oldTxt;
      return false;
    }
  } catch(e) {
    alert('Error during signup');
    btn.innerHTML = oldTxt;
    return false;
  }
}

async function nextStep(){ 
  if(step===3){
    const success = await handleSignup();
    if(success) { step=4; showStep(4); }
    return;
  } 
  if(step<3){
    // Validation on step 0
    if(step===0) {
      const email = document.getElementById('signupEmail')?.value;
      const password = document.getElementById('signupPwd')?.value;
      if(!email || !password || password.length < 6) {
         alert('Please enter a valid email and a password (min 6 chars)');
         return;
      }
    }
    step++;showStep(step);window.scrollTo({top:0,behavior:'smooth'});
  } 
}
`];
      scriptContents.forEach(scriptText => {
        try {
          const scriptEl = document.createElement('script');
          scriptEl.textContent = `
            (function() {
              if (window._signupInjected) return;
              window._signupInjected = true;
              ${scriptText}
              window.nextStep = typeof nextStep !== 'undefined' ? nextStep : undefined;
              window.prevStep = typeof prevStep !== 'undefined' ? prevStep : undefined;
              window.selectGoal = typeof selectGoal !== 'undefined' ? selectGoal : undefined;
              window.toggleSvc = typeof toggleSvc !== 'undefined' ? toggleSvc : undefined;
              window.handleSignup = typeof handleSignup !== 'undefined' ? handleSignup : undefined;
              window.recalcBundle = typeof recalcBundle !== 'undefined' ? recalcBundle : undefined;
              window.showStep = typeof showStep !== 'undefined' ? showStep : undefined;
            })();
          `;
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
.topbar-in{max-width:760px;margin:0 auto;padding:0 24px;height:100%;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;letter-spacing:-.02em}
.logo-mark{width:32px;height:32px;border-radius:8px;background:var(--ink-block);display:flex;align-items:center;justify-content:center}
.logo-mark i{font-size:17px;color:var(--gold)}
.logo span{color:var(--gold-deep)}
.save-exit{font-size:13.5px;color:var(--ink-faint);text-decoration:none;font-weight:500;display:inline-flex;align-items:center;gap:5px}
.save-exit:hover{color:var(--ink)}

.shell{max-width:620px;margin:0 auto;padding:40px 24px 80px;position:relative;z-index:1}

.progress{display:flex;align-items:center;margin-bottom:42px}
.pstep{display:flex;align-items:center;flex:1}
.pstep:last-child{flex:0}
.pdot{width:32px;height:32px;border-radius:50%;background:var(--cream);border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--ink-faint);flex-shrink:0;transition:all .3s;position:relative}
.pdot.done{background:var(--green);border-color:var(--green);color:#fff}
.pdot.active{background:var(--ink-block);border-color:var(--ink-block);color:var(--cream);box-shadow:0 0 0 4px rgba(28,26,21,.1)}
.pline{height:2px;flex:1;background:var(--line);margin:0 8px;transition:background .3s}
.pline.done{background:var(--green)}
.plabel{position:absolute;top:40px;left:50%;transform:translateX(-50%);font-size:11.5px;font-weight:600;color:var(--ink-faint);white-space:nowrap}
.plabel.active{color:var(--ink)}

.card{background:var(--cream);border:1px solid var(--line);border-radius:20px;padding:40px;box-shadow:0 18px 50px -30px rgba(22,20,15,.25)}
.step-eyebrow{font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--gold-deep);margin-bottom:10px}
.step-title{font-size:28px;font-weight:600;letter-spacing:-.02em;margin-bottom:8px;line-height:1.15}
.step-desc{font-size:15px;color:var(--ink-soft);margin-bottom:30px;line-height:1.55}

.field{margin-bottom:20px}
.field label{display:block;font-size:13px;font-weight:600;margin-bottom:7px}
.field input,.field select{width:100%;background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:13px 15px;font-size:14.5px;color:var(--ink);font-family:inherit;outline:none;transition:border-color .15s}
.field input:focus,.field select:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(200,160,74,.1)}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:520px){.field-row{grid-template-columns:1fr}}
.hint{font-size:11.5px;color:var(--ink-faint);margin-top:5px}

.gbtn{width:100%;background:#fff;border:1px solid var(--line);border-radius:11px;padding:13px;font-size:14.5px;font-weight:600;color:var(--ink);cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:10px;transition:border-color .15s;margin-bottom:20px}
.gbtn:hover{border-color:var(--ink-faint)}
.gbtn i{font-size:18px;color:var(--google)}
.divider{display:flex;align-items:center;gap:12px;margin:20px 0;color:var(--ink-faint);font-size:12.5px}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--line)}

.opt-grid{display:grid;gap:12px}
.opt{border:2px solid var(--line);border-radius:14px;padding:16px 18px;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:15px;background:var(--paper);position:relative}
.opt:hover{border-color:var(--gold)}
.opt.selected{border-color:var(--ink-block);background:var(--cream)}
.opt.selected::after{content:'✓';position:absolute;right:16px;width:22px;height:22px;border-radius:50%;background:var(--ink-block);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700}
.opt.disabled{opacity:.5;cursor:not-allowed;pointer-events:none}
.opt-ico{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.opt-ico i{font-size:21px}
.opt-txt h4{font-size:15px;font-weight:600;margin-bottom:2px;display:flex;align-items:center;gap:8px}
.opt-txt p{font-size:12.5px;color:var(--ink-soft);line-height:1.4}
.soon-tag{font-size:9px;background:var(--paper-2);color:var(--ink-faint);padding:2px 7px;border-radius:20px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}

.svc{border:2px solid var(--line);border-radius:14px;padding:16px 18px;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:15px;background:var(--paper);position:relative;margin-bottom:12px}
.svc:hover{border-color:var(--gold)}
.svc.selected{border-color:var(--ink-block);background:var(--cream)}
.svc-check{width:23px;height:23px;border-radius:7px;border:2px solid var(--line);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .15s}
.svc.selected .svc-check{background:var(--ink-block);border-color:var(--ink-block)}
.svc.selected .svc-check::after{content:'✓';color:#fff;font-size:13px;font-weight:700}
.svc-ico{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.svc-ico i{font-size:20px}
.svc-info{flex:1}
.svc-info h4{font-size:15px;font-weight:600;margin-bottom:2px}
.svc-info p{font-size:12px;color:var(--ink-soft)}
.svc-price{font-family:'Space Grotesk',sans-serif;font-size:19px;font-weight:600;white-space:nowrap}
.svc-price span{font-size:11px;color:var(--ink-faint);font-weight:400;font-family:'Inter'}

.bundle-bar{background:linear-gradient(135deg,rgba(200,160,74,.12),rgba(200,160,74,.03));border:1px solid rgba(200,160,74,.3);border-radius:14px;padding:16px 20px;margin-top:6px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.bb-label{font-size:11.5px;color:var(--gold-deep);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.bb-services{font-size:13.5px;color:var(--ink-soft)}
.bb-right{text-align:right}
.bb-total{font-family:'Space Grotesk',sans-serif;font-size:34px;font-weight:700;letter-spacing:-.01em;line-height:1;color:var(--ink)}
.bb-total span{font-size:15px;color:var(--ink-soft);font-weight:500;font-family:'Inter'}
.bb-total .amt{color:var(--gold-deep);font-size:34px}
.bb-save{font-size:11.5px;color:var(--green);font-weight:600;background:var(--green-soft);padding:3px 10px;border-radius:20px;display:inline-block;margin-top:5px}

.trial-banner{background:rgba(184,71,43,.08);border:1px solid rgba(184,71,43,.25);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:11px;margin-bottom:24px}
.trial-banner i{font-size:20px;color:var(--rust);flex-shrink:0}
.trial-banner p{font-size:13px;color:#8a3520;font-weight:500;line-height:1.45}
.review-box{background:var(--paper-2);border-radius:14px;padding:6px 20px;margin-bottom:24px}
.review-row{display:flex;justify-content:space-between;padding:13px 0;border-bottom:1px solid var(--line);font-size:14px}
.review-row:last-child{border-bottom:none}
.review-row .rl{color:var(--ink-soft)}
.review-row .rv{font-weight:600;text-align:right}
.review-row.big .rv{font-family:'Space Grotesk',sans-serif;font-size:18px;color:var(--gold-deep)}
.pay-methods{display:flex;gap:10px;margin-bottom:8px}
.pay-m{flex:1;border:1px solid var(--line);border-radius:10px;padding:12px;text-align:center;font-size:13px;font-weight:600;color:var(--ink-soft);background:var(--paper)}
.pay-m i{font-size:20px;display:block;margin-bottom:5px;color:var(--gold-deep)}

.next-box{background:var(--green-soft);border:1px solid #bfe0d2;border-radius:12px;padding:16px;margin-top:8px}
.next-box h4{font-size:13.5px;font-weight:700;color:#1a5c44;margin-bottom:10px;display:flex;align-items:center;gap:7px}
.next-list{display:flex;flex-direction:column;gap:8px}
.next-item{display:flex;align-items:center;gap:9px;font-size:13px;color:#1a5c44}
.next-item i{font-size:15px;flex-shrink:0}

.wiz-nav{display:flex;justify-content:space-between;align-items:center;margin-top:30px;gap:14px}
.btn-back{background:transparent;border:1px solid var(--line);color:var(--ink-soft);padding:13px 24px;border-radius:11px;font-weight:600;font-size:15px;cursor:pointer;font-family:inherit;transition:border-color .15s}
.btn-back:hover{border-color:var(--ink-faint)}
.btn-next{background:var(--ink-block);color:var(--cream);padding:14px 30px;border-radius:11px;font-weight:600;font-size:15px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:9px;font-family:inherit;transition:transform .15s;box-shadow:0 4px 0 var(--gold-deep)}
.btn-next:hover{transform:translateY(-2px);box-shadow:0 6px 0 var(--gold-deep)}
.btn-back.hidden{visibility:hidden}

.success{text-align:center;padding:20px 0}
.success-ico{width:80px;height:80px;border-radius:50%;background:var(--green-soft);display:flex;align-items:center;justify-content:center;margin:0 auto 22px}
.success-ico i{font-size:44px;color:var(--green)}
.success h2{font-size:30px;font-weight:600;margin-bottom:12px}
.success p{font-size:16px;color:var(--ink-soft);max-width:420px;margin:0 auto 28px;line-height:1.6}

.step-pane{display:none;animation:fade .4s ease}
.step-pane.active{display:block}
@keyframes fade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

/* ===== MOBILE: channel cards + steps ===== */
@media(max-width:560px){
  .svc{gap:11px;padding:13px 13px;align-items:center}
  .svc-ico{order:1;width:38px;height:38px}.svc-ico i{font-size:18px}
  .svc-info{order:2;min-width:0;flex:1 1 auto}
  .svc-info h4{font-size:14.5px}
  .svc-info p{font-size:11.5px;line-height:1.35}
  .svc-price{order:3;flex-shrink:0;font-size:16px;text-align:right}
  .svc-price span{font-size:10.5px}
  .svc-check{order:4;width:22px;height:22px;margin-left:4px}
}
@media(max-width:380px){
  .svc-info p{display:none}
  .svc-price{font-size:15px}
}
` }} />
      
      <div 
        ref={containerRef}
        className="legacy-html-wrapper" 
        dangerouslySetInnerHTML={{ __html: `

<div class="topbar">
  <div class="topbar-in">
    <a href="/" class="brand" style="text-decoration:none;color:inherit"><span class="mk"><b>S</b></span>ScaleWin</a>
    <a href="/" class="save-exit"><i class="ti ti-arrow-left" style="font-size:14px;vertical-align:-2px"></i> Back to home</a>
  </div>
</div>

<div class="shell">

  <div class="progress" id="progress">
    <div class="pstep"><div class="pdot active">1<span class="plabel active">Account</span></div><div class="pline"></div></div>
    <div class="pstep"><div class="pdot">2<span class="plabel">Goal</span></div><div class="pline"></div></div>
    <div class="pstep"><div class="pdot">3<span class="plabel">Services</span></div><div class="pline"></div></div>
    <div class="pstep"><div class="pdot">4<span class="plabel">Start trial</span></div></div>
  </div>

  <div class="card">

    <!-- STEP 1: ACCOUNT -->
    <div class="step-pane active" data-pane="0">
      <div class="step-eyebrow">Step 1 of 4</div>
      <h1 class="step-title">Create your account</h1>
      <p class="step-desc">Takes under 2 minutes. You'll set up your campaigns inside the dashboard after — with our help.</p>
      <button class="gbtn"><i class="ti ti-brand-google"></i> Continue with Google</button>
      <div class="divider">or sign up with email</div>
      <div class="field"><label>Your name</label><input type="text" id="signupName" placeholder="e.g. Rohit Sharma"></div>
      <div class="field"><label>Business name</label><input type="text" id="signupBusiness" placeholder="e.g. Sharma Organics"></div>
      <div class="field-row">
        <div class="field"><label>Email</label><input type="email" id="signupEmail" placeholder="you@yourstore.com"></div>
        <div class="field"><label>WhatsApp / Phone</label><input type="tel" id="signupPhone" placeholder="+91 ..."></div>
      </div>
      <div class="field" style="margin-bottom:0"><label>Create password</label><input type="password" id="signupPwd" placeholder="••••••••"></div>
    </div>

    <!-- STEP 2: GOAL -->
    <div class="step-pane" data-pane="1">
      <div class="step-eyebrow">Step 2 of 4</div>
      <h1 class="step-title">What's your main goal?</h1>
      <p class="step-desc">This sets up the right metrics for your business.</p>
      <div class="opt-grid">
        <div class="opt selected" onclick="selectGoal(this)">
          <div class="opt-ico" style="background:var(--green-soft);color:var(--green)"><i class="ti ti-shopping-cart"></i></div>
          <div class="opt-txt"><h4>Online Sales (D2C / E-commerce)</h4><p>Sell products online, get more profitable orders.</p></div>
        </div>
        <div class="opt disabled"><div class="opt-ico" style="background:#E7E8FD;color:var(--meta)"><i class="ti ti-forms"></i></div><div class="opt-txt"><h4>Leads <span class="soon-tag">Coming soon</span></h4><p>Form fills, calls or WhatsApp enquiries.</p></div></div>
        <div class="opt disabled"><div class="opt-ico" style="background:#e6f0fe;color:var(--google)"><i class="ti ti-briefcase"></i></div><div class="opt-txt"><h4>B2B / Demos <span class="soon-tag">Coming soon</span></h4><p>Qualified business enquiries &amp; demo bookings.</p></div></div>
        <div class="opt disabled"><div class="opt-ico" style="background:#f3eafe;color:#8b3fd6"><i class="ti ti-device-mobile"></i></div><div class="opt-txt"><h4>App installs <span class="soon-tag">Coming soon</span></h4><p>More downloads for your mobile app.</p></div></div>
        <div class="opt disabled"><div class="opt-ico" style="background:#fff1e6;color:var(--rust)"><i class="ti ti-map-pin"></i></div><div class="opt-txt"><h4>Local / footfall <span class="soon-tag">Coming soon</span></h4><p>Walk-ins for restaurant, salon, clinic etc.</p></div></div>
        <div class="opt disabled"><div class="opt-ico" style="background:#fdf6e3;color:var(--gold-deep)"><i class="ti ti-school"></i></div><div class="opt-txt"><h4>Course / coaching <span class="soon-tag">Coming soon</span></h4><p>Sell courses, info products or coaching.</p></div></div>
      </div>
      <p class="hint" style="margin-top:16px"><i class="ti ti-info-circle" style="font-size:12px"></i> Launching with D2C / E-commerce first. Other goals coming soon.</p>
    </div>

    <!-- STEP 3: SERVICES -->
    <div class="step-pane" data-pane="2">
      <div class="step-eyebrow">Step 3 of 4</div>
      <h1 class="step-title">Choose your channels</h1>
      <p class="step-desc">Pick one or more. Bundle 2 for 20% off, all 3 for 30% off.</p>
      <div class="svc selected" data-svc="meta" data-price="5999" onclick="toggleSvc(this)">
        <div class="svc-check"></div>
        <div class="svc-ico" style="background:#E7E8FD;color:var(--meta)"><i class="ti ti-brand-facebook"></i></div>
        <div class="svc-info"><h4>Meta Ads</h4><p>Facebook &amp; Instagram, automated</p></div>
        <div class="svc-price">₹5,999<span>/mo</span></div>
      </div>
      <div class="svc" data-svc="google" data-price="5999" onclick="toggleSvc(this)">
        <div class="svc-check"></div>
        <div class="svc-ico" style="background:#e6f0fe;color:var(--google)"><i class="ti ti-brand-google"></i></div>
        <div class="svc-info"><h4>Google Ads</h4><p>Search &amp; PMax with keyword AI</p></div>
        <div class="svc-price">₹5,999<span>/mo</span></div>
      </div>
      <div class="svc" data-svc="seo" data-price="4999" onclick="toggleSvc(this)">
        <div class="svc-check"></div>
        <div class="svc-ico" style="background:var(--green-soft);color:var(--green)"><i class="ti ti-search"></i></div>
        <div class="svc-info"><h4>SEO &amp; Content</h4><p>Page fixes + AI blogs that rank</p></div>
        <div class="svc-price">₹4,999<span>/mo</span></div>
      </div>
      <div class="bundle-bar">
        <div><div class="bb-label" id="bbLabel">Your plan</div><div class="bb-services" id="bbServices">Meta Ads</div></div>
        <div class="bb-right">
          <div class="bb-total"><span class="amt">₹<span id="bbTotal">5,999</span></span><span>/mo</span></div>
          <div class="bb-save" id="bbSave" style="display:none"></div>
        </div>
      </div>
    </div>

    <!-- STEP 4: PAYMENT -->
    <div class="step-pane" data-pane="3">
      <div class="step-eyebrow">Step 4 of 4</div>
      <h1 class="step-title">Start your free trial</h1>
      <p class="step-desc">Your 3-day free trial starts now. No charge until it ends — cancel anytime.</p>
      <div class="trial-banner">
        <i class="ti ti-gift"></i>
        <p><strong>3 days free</strong> · First charge on <strong id="trialEnd">—</strong> · Cancel anytime before then, no charge</p>
      </div>
      <div class="review-box">
        <div class="review-row"><span class="rl">Business goal</span><span class="rv">Online Sales (D2C)</span></div>
        <div class="review-row"><span class="rl">Services</span><span class="rv" id="revServices">Meta Ads</span></div>
        <div class="review-row big"><span class="rl">After trial</span><span class="rv" id="revPrice">₹5,999/mo</span></div>
      </div>
      <div class="field"><label>Payment method</label>
        <div class="pay-methods">
          <div class="pay-m"><i class="ti ti-credit-card"></i>Card</div>
          <div class="pay-m"><i class="ti ti-device-mobile"></i>UPI</div>
          <div class="pay-m"><i class="ti ti-building-bank"></i>Netbanking</div>
        </div>
        <input type="text" placeholder="Card number / UPI ID — secured by Razorpay">
      </div>
      <div class="next-box">
        <h4><i class="ti ti-list-check"></i> What happens next</h4>
        <div class="next-list">
          <div class="next-item"><i class="ti ti-arrow-right"></i> You'll land on your dashboard</div>
          <div class="next-item"><i class="ti ti-arrow-right"></i> A simple guided setup connects your ad accounts, store &amp; creatives</div>
          <div class="next-item"><i class="ti ti-arrow-right"></i> Our team helps you if you get stuck — just reach out</div>
          <div class="next-item"><i class="ti ti-arrow-right"></i> Your AI activates and starts working</div>
        </div>
      </div>
      <p class="hint" style="margin-top:14px"><i class="ti ti-shield-check" style="font-size:12px"></i> Secure payment via Razorpay · GST invoice included · No charge during trial</p>
    </div>

    <!-- SUCCESS -->
    <div class="step-pane" data-pane="4">
      <div class="success">
        <div class="success-ico"><i class="ti ti-circle-check"></i></div>
        <h2>Welcome aboard! 🎉</h2>
        <p>Your trial is active. Next, we'll walk you through connecting your accounts inside the dashboard — it's quick and we're here to help.</p>
        <button class="btn-next" style="margin:0 auto" onclick="window.location.href='/dashboard'">Go to setup <i class="ti ti-arrow-right"></i></button>
      </div>
    </div>

    <div class="wiz-nav" id="wizNav">
      <button class="btn-back hidden" id="backBtn" onclick="prevStep()"><i class="ti ti-arrow-left"></i> Back</button>
      <button class="btn-next" id="nextBtn" onclick="nextStep()">Continue <i class="ti ti-arrow-right"></i></button>
    </div>

  </div>

  <p style="text-align:center;font-size:12.5px;color:var(--ink-faint);margin-top:20px">Already have an account? <a href="/login" style="color:var(--gold-deep);font-weight:600;text-decoration:none">Log in</a></p>
</div>





` }} 
      />
      
    </>
  );
}
