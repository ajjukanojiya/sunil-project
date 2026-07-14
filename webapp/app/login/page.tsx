'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setErrorMsg('');
    
    try {
      // Assuming /api/auth/login exists as in the original code
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        router.push('/dashboard');
      } else {
        setErrorMsg(data.error || 'Login failed');
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg('Error logging in');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
           redirectTo: `${window.location.origin}/api/setup/callback`
         // redirectTo: `${window.location.origin}/api/setup/callback?next=/dashboard`
        }
      });
      if (error) throw error;
    } catch (e: any) {
      setErrorMsg(e.message || 'Error logging in with Google');
    }
  };

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

/* mobile logo */
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

.error-msg { color: var(--rust); font-size: 13px; margin-bottom: 15px; text-align: center; }
      `}} />

      <div className="legacy-html-wrapper">
        {/* LEFT brand panel */}
        <div className="brand-panel">
          <div className="brand" onClick={() => router.push('/')} style={{ cursor: 'pointer', position: 'relative', zIndex: 2, marginBottom: '20px' }}>
            <span className="mk"><b>S</b></span>
            ScaleWin
          </div>
          <div className="bp-mid">
            <div className="bp-quote">An AI that <em>thinks like a ₹300 Cr marketer</em> — running your ads while you sleep.</div>
            <div className="bp-stats">
              <div>
                <div className="bp-stat-num">₹1,500 Cr+</div>
                <div className="bp-stat-lbl">Experience behind the AI</div>
              </div>
              <div>
                <div className="bp-stat-num">3-in-1</div>
                <div className="bp-stat-lbl">Meta · Google · SEO</div>
              </div>
            </div>
          </div>
          <div className="bp-foot">© 2026 ScaleWin · Built by performance marketers</div>
        </div>

        {/* RIGHT login */}
        <div className="login-panel">
          <button onClick={() => router.push('/')} className="back-home" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <i className="ti ti-arrow-left"></i> Back to home
          </button>
          <div className="login-box">

            <div className="mobile-logo brand" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
              <span className="lm"><b>S</b></span>
              ScaleWin
            </div>

            <div className="login-head">
              <h1>Welcome back</h1>
              <p>Log in to your ScaleWin dashboard</p>
            </div>

            {errorMsg && <div className="error-msg">{errorMsg}</div>}

            <button type="button" className="gbtn" onClick={handleGoogleLogin}>
              <i className="ti ti-brand-google"></i> Continue with Google
            </button>
            <div className="divider">or log in with email</div>

            <form onSubmit={handleLogin}>
              <div className="field">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="you@yourstore.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <div className="field-label-row">
                  <label>Password</label>
                  <a href="#" className="forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                </div>
                <div className="input-wrap">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i 
                    className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'} eye`} 
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>

              <label className="remember">
                <input type="checkbox" /> Keep me logged in
              </label>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Logging in...' : (
                  <>Log in <i className="ti ti-arrow-right"></i></>
                )}
              </button>
            </form>

            <div className="signup-line">
              Don't have an account? <button onClick={() => router.push('/signup')} style={{ background:'none', border:'none', color:'var(--gold-deep)', fontWeight:600, cursor:'pointer' }}>Start free trial</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
