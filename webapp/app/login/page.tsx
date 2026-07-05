
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
function togglePwd(){
  const p=document.getElementById('pwd');
  const e=event.target;
  if(p.type==='password'){p.type='text';e.classList.remove('ti-eye');e.classList.add('ti-eye-off');}
  else{p.type='password';e.classList.remove('ti-eye-off');e.classList.add('ti-eye');}
}
async function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('pwd').value;
  if(!email || !password) { alert('Please enter both email and password'); return; }
  const btn = document.getElementById('loginBtn');
  btn.innerHTML = 'Logging in...';
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(res.ok) { window.location.href = '/dashboard'; }
    else { alert(data.error || 'Login failed'); btn.innerHTML = 'Log in <i class="ti ti-arrow-right"></i>'; }
  } catch(e) {
    alert('Error logging in');
    btn.innerHTML = 'Log in <i class="ti ti-arrow-right"></i>';
  }
}
`];
      scriptContents.forEach(scriptText => {
        try {
          const scriptEl = document.createElement('script');
          scriptEl.textContent = `
            (function() {
              if (window._loginInjected) return;
              window._loginInjected = true;
              ${scriptText}
              window.togglePwd = typeof togglePwd !== 'undefined' ? togglePwd : undefined;
              window.handleLogin = typeof handleLogin !== 'undefined' ? handleLogin : undefined;
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
body{font-family:'Inter',sans-serif;background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased;}
.legacy-html-wrapper{display:flex;min-height:100vh;width:100%}
h1,h2,h3,.serif{font-family:'Space Grotesk',sans-serif;letter-spacing:-0.02em}

/* LEFT — brand panel */
.brand-panel{flex:1;background:var(--ink-block);color:var(--cream);padding:48px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
.brand-panel::before{content:'';position:absolute;inset:0;opacity:.06;background-image:radial-gradient(var(--gold) 1px,transparent 1px);background-size:24px 24px}
.brand-panel::after{content:'';position:absolute;top:-120px;right:-120px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(200,160,74,.2),transparent 68%)}
.bp-logo{display:flex;align-items:center;gap:11px;font-weight:800;font-size:20px;letter-spacing:-.02em;position:relative;z-index:2}
.bp-logo-mark{width:36px;height:36px;border-radius:9px;background:rgba(200,160,74,.18);display:flex;align-items:center;justify-content:center}
.bp-logo-mark i{font-size:19px;color:var(--gold)}
.bp-logo span{color:var(--gold)}
.bp-mid{position:relative;z-index:2;max-width:380px}
.bp-quote{font-family:'Space Grotesk',sans-serif;font-size:30px;font-weight:500;line-height:1.25;letter-spacing:-.01em;margin-bottom:24px}
.bp-quote em{font-style:italic;color:var(--gold)}
.bp-stats{display:flex;gap:30px}
.bp-stat-num{font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:600;color:var(--gold);line-height:1}
.bp-stat-lbl{font-size:12.5px;color:#b8b2a4;margin-top:5px}
.bp-foot{font-size:12.5px;color:#7a7568;position:relative;z-index:2}
@media(max-width:880px){.brand-panel{display:none}}

/* RIGHT — login form */
.login-panel{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 28px;position:relative}
.login-panel::before{content:'';position:fixed;inset:0;pointer-events:none;opacity:.025;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.login-box{width:100%;max-width:380px;position:relative;z-index:1}

/* mobile logo (shown when brand panel hidden) */
.mobile-logo{display:none;align-items:center;gap:10px;font-weight:800;font-size:19px;margin-bottom:30px}
.mobile-logo .lm{width:34px;height:34px;border-radius:9px;background:var(--ink-block);display:flex;align-items:center;justify-content:center}
.mobile-logo .lm i{font-size:18px;color:var(--gold)}
.mobile-logo span{color:var(--gold-deep)}
@media(max-width:880px){.mobile-logo{display:flex}}

.login-head{margin-bottom:30px}
.login-head h1{font-size:30px;font-weight:600;letter-spacing:-.02em;margin-bottom:8px}
.login-head p{font-size:15px;color:var(--ink-soft)}

.gbtn{width:100%;background:#fff;border:1px solid var(--line);border-radius:11px;padding:13px;font-size:14.5px;font-weight:600;color:var(--ink);cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:10px;transition:border-color .15s;margin-bottom:22px}
.gbtn:hover{border-color:var(--ink-faint)}
.gbtn i{font-size:18px;color:var(--google)}
.divider{display:flex;align-items:center;gap:12px;margin:22px 0;color:var(--ink-faint);font-size:12.5px}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--line)}

.field{margin-bottom:18px}
.field-label-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px}
.field label{font-size:13px;font-weight:600}
.forgot{font-size:12.5px;color:var(--gold-deep);text-decoration:none;font-weight:600}
.forgot:hover{text-decoration:underline}
.field input{width:100%;background:var(--cream);border:1px solid var(--line);border-radius:10px;padding:13px 15px;font-size:14.5px;color:var(--ink);font-family:inherit;outline:none;transition:border-color .15s}
.field input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(200,160,74,.1)}
.input-wrap{position:relative}
.input-wrap .eye{position:absolute;right:13px;top:50%;transform:translateY(-50%);cursor:pointer;color:var(--ink-faint);font-size:18px}

.remember{display:flex;align-items:center;gap:9px;margin-bottom:22px;font-size:13.5px;color:var(--ink-soft);cursor:pointer}
.remember input{width:17px;height:17px;accent-color:var(--ink-block);cursor:pointer}

.login-btn{width:100%;background:var(--ink-block);color:var(--cream);padding:15px;border-radius:11px;font-weight:600;font-size:15.5px;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:9px;transition:transform .15s;box-shadow:0 4px 0 var(--gold-deep)}
.login-btn:hover{transform:translateY(-2px);box-shadow:0 6px 0 var(--gold-deep)}

.signup-line{text-align:center;font-size:14px;color:var(--ink-soft);margin-top:26px}
.signup-line a{color:var(--gold-deep);font-weight:600;text-decoration:none}
.signup-line a:hover{text-decoration:underline}

.back-home{position:absolute;top:24px;left:28px;font-size:13.5px;color:var(--ink-faint);text-decoration:none;display:flex;align-items:center;gap:6px;z-index:2}
.back-home:hover{color:var(--ink)}
@media(max-width:880px){.back-home{color:var(--ink-faint)}}
` }} />
      
      <div 
        ref={containerRef}
        className="legacy-html-wrapper" 
        dangerouslySetInnerHTML={{ __html: `

<!-- LEFT brand panel -->
<div class="brand-panel">
  <div class="brand" onclick="window.location.href='index.html'" style="cursor:pointer; position:relative; z-index:2; margin-bottom: 20px;">
    <span class="mk"><b>S</b></span>
    ScaleWin
  </div>
  <div class="bp-mid">
    <div class="bp-quote">An AI that <em>thinks like a ₹300 Cr marketer</em> — running your ads while you sleep.</div>
    <div class="bp-stats">
      <div><div class="bp-stat-num">₹1,500 Cr+</div><div class="bp-stat-lbl">Experience behind the AI</div></div>
      <div><div class="bp-stat-num">3-in-1</div><div class="bp-stat-lbl">Meta · Google · SEO</div></div>
    </div>
  </div>
  <div class="bp-foot">© 2026 ScaleWin · Built by performance marketers</div>
</div>

<!-- RIGHT login -->
<div class="login-panel">
  <a href="/" class="back-home"><i class="ti ti-arrow-left"></i> Back to home</a>
  <div class="login-box">

    <div class="mobile-logo brand" onclick="window.location.href='index.html'" style="cursor:pointer;">
      <span class="mk"><b>S</b></span>
      ScaleWin
    </div>

    <div class="login-head">
      <h1>Welcome back</h1>
      <p>Log in to your ScaleWin dashboard</p>
    </div>

    <button class="gbtn" onclick="alert('Google login is not enabled. Please log in with email below.')"><i class="ti ti-brand-google"></i> Continue with Google</button>
    <div class="divider">or log in with email</div>

    <div class="field">
      <label>Email</label>
      <input type="email" id="loginEmail" placeholder="you@yourstore.com">
    </div>

    <div class="field">
      <div class="field-label-row">
        <label>Password</label>
        <a href="#" class="forgot">Forgot password?</a>
      </div>
      <div class="input-wrap">
        <input type="password" id="pwd" placeholder="••••••••">
        <i class="ti ti-eye eye" onclick="togglePwd()"></i>
      </div>
    </div>

    <label class="remember">
      <input type="checkbox"> Keep me logged in
    </label>

    <button class="login-btn" id="loginBtn" onclick="handleLogin()">Log in <i class="ti ti-arrow-right"></i></button>

    <div class="signup-line">Don't have an account? <a href="/signup">Start free trial</a></div>

  </div>
</div>





` }} 
      />
      
    </>
  );
}
