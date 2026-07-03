
'use client';
import { useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
      const scriptContents: string[] = [];
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
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased;overflow-x:hidden}
.wrap{max-width:1200px;margin:0 auto;padding:0 28px}
h1,h2,h3,.serif{font-family:'Space Grotesk',sans-serif;letter-spacing:-0.02em}
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.025;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

}

/* HEADER */
.blog-header{padding:64px 0 30px;text-align:center;position:relative;overflow:hidden}
.blog-header::after{content:'';position:absolute;top:-140px;left:50%;transform:translateX(-50%);width:600px;height:400px;background:radial-gradient(circle,rgba(200,160,74,.14),transparent 68%);pointer-events:none}
.bh-eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--cream);border:1px solid var(--line);padding:7px 15px;border-radius:30px;font-size:13px;font-weight:600;color:var(--gold-deep);margin-bottom:22px;position:relative;z-index:2}
.blog-header h1{font-size:clamp(38px,5.5vw,60px);line-height:1.05;font-weight:600;letter-spacing:-.025em;margin-bottom:18px;position:relative;z-index:2}
.blog-header h1 em{font-style:italic;color:var(--gold-deep)}
.blog-header p{font-size:18px;color:var(--ink-soft);max-width:560px;margin:0 auto;line-height:1.6;position:relative;z-index:2}

/* FILTERS */
.filters{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:36px 0 48px;position:relative;z-index:2}
.filter-btn{background:transparent;border:1px solid var(--line);color:var(--ink-soft);padding:9px 18px;border-radius:30px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .18s}
.filter-btn:hover{border-color:var(--gold)}
.filter-btn.active{background:var(--ink-block);border-color:var(--ink-block);color:var(--cream)}

/* FEATURED */
.featured{margin-bottom:56px}
.featured-card{display:grid;grid-template-columns:1.15fr 1fr;background:var(--cream);border:1px solid var(--line);border-radius:22px;overflow:hidden;cursor:pointer;transition:transform .2s,box-shadow .2s}
.featured-card:hover{transform:translateY(-3px);box-shadow:0 26px 60px -28px rgba(22,20,15,.3)}
@media(max-width:820px){.featured-card{grid-template-columns:1fr}}
.featured-img{min-height:340px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.featured-img i{font-size:80px;opacity:.92;position:relative;z-index:2}
.featured-img::before{content:'';position:absolute;inset:0;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.4) 1px,transparent 1px);background-size:20px 20px}
.featured-body{padding:44px 40px;display:flex;flex-direction:column;justify-content:center}
.feat-badge{display:inline-flex;align-items:center;gap:6px;background:var(--rust);color:#fff;font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:5px 12px;border-radius:20px;margin-bottom:18px;width:fit-content}
.featured-cat{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--gold-deep);margin-bottom:12px}
.featured-body h2{font-size:clamp(26px,3vw,36px);line-height:1.15;font-weight:600;letter-spacing:-.02em;margin-bottom:16px}
.featured-body p{font-size:16px;line-height:1.6;color:var(--ink-soft);margin-bottom:24px}
.featured-meta{display:flex;align-items:center;gap:14px;font-size:13.5px;color:var(--ink-faint)}
.fm-author{display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink-soft)}
.fm-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-deep));display:flex;align-items:center;justify-content:center;color:var(--ink-block);font-size:13px;font-weight:700}
.fm-dot{color:var(--line)}

/* GRID */
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
@media(max-width:980px){.blog-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.blog-grid{grid-template-columns:1fr}}
@media(max-width:600px){html,body{overflow-x:hidden}.wrap{padding:0 18px}}
.bcard{background:var(--cream);border:1px solid var(--line);border-radius:18px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s;opacity:1}
.bcard:hover{transform:translateY(-5px);box-shadow:0 20px 46px -22px rgba(22,20,15,.26)}
.bcard.hidden{display:none}
.bcard-img{height:180px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.bcard-img i{font-size:48px;opacity:.92;position:relative;z-index:2}
.bcard-img::before{content:'';position:absolute;inset:0;opacity:.45;background-image:radial-gradient(rgba(255,255,255,.4) 1px,transparent 1px);background-size:18px 18px}
.bcard-body{padding:24px 24px 26px;flex:1;display:flex;flex-direction:column}
.bcard-cat{font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--gold-deep);margin-bottom:11px}
.bcard h3{font-size:19px;font-weight:600;line-height:1.3;letter-spacing:-.01em;margin-bottom:11px}
.bcard p{font-size:14px;line-height:1.55;color:var(--ink-soft);margin-bottom:18px;flex:1}
.bcard-meta{display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--ink-faint);padding-top:16px;border-top:1px solid var(--line)}
.bcard-meta .read{display:flex;align-items:center;gap:5px}

/* color themes for images */
.t-meta{background:linear-gradient(135deg,#E7E8FD,#C7CBFB);color:#2F3DEE}
.t-google{background:linear-gradient(135deg,#e6f0fe,#c4ddfb);color:#1a6fe0}
.t-seo{background:linear-gradient(135deg,var(--green-soft),#c8e6da);color:var(--green)}
.t-growth{background:linear-gradient(135deg,#fff1e6,#ffd9bd);color:var(--rust)}
.t-ai{background:linear-gradient(135deg,#f3eafe,#e0c9fb);color:#8b3fd6}
.t-money{background:linear-gradient(135deg,#fdf6e3,#f5e3b0);color:var(--gold-deep)}

/* newsletter */
.newsletter{margin:72px 0 0;background:var(--ink-block);border-radius:24px;padding:54px 40px;text-align:center;position:relative;overflow:hidden}
.newsletter::before{content:'';position:absolute;inset:0;opacity:.06;background-image:radial-gradient(var(--gold) 1px,transparent 1px);background-size:22px 22px}
.newsletter h2{color:var(--cream);font-size:clamp(26px,3.4vw,38px);font-weight:600;letter-spacing:-.02em;margin-bottom:14px;position:relative;z-index:2}
.newsletter h2 em{font-style:italic;color:var(--gold)}
.newsletter p{color:#cfc9bb;font-size:16px;max-width:440px;margin:0 auto 28px;line-height:1.6;position:relative;z-index:2}
.nl-form{display:flex;gap:10px;max-width:440px;margin:0 auto;position:relative;z-index:2;flex-wrap:wrap}
.nl-form input{flex:1;min-width:200px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.18);border-radius:11px;padding:14px 16px;font-size:14.5px;color:var(--cream);font-family:inherit;outline:none}
.nl-form input::placeholder{color:#8a8578}
.nl-form input:focus{border-color:var(--gold)}
.nl-btn{background:var(--gold);color:var(--ink-block);padding:14px 26px;border-radius:11px;font-weight:700;font-size:14.5px;border:none;cursor:pointer;font-family:inherit;transition:transform .15s}
.nl-btn:hover{transform:translateY(-2px)}



.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}
.reveal.in{opacity:1;transform:none}

/* ===== LEGAL / CONTACT ===== */
.legal-head{padding:56px 0 8px;text-align:center;position:relative}
.legal-head h1{font-size:clamp(30px,4.4vw,48px);font-weight:600;letter-spacing:-.025em;margin-bottom:12px}
.legal-head .upd{font-size:12.5px;color:var(--ink-faint);font-family:'JetBrains Mono',monospace}
.legal{max-width:820px;margin:0 auto;padding:26px 28px 10px;font-size:16px;line-height:1.72;color:#2c3142}
.legal h2{font-size:22px;font-weight:600;letter-spacing:-.01em;margin:34px 0 12px;color:var(--ink)}
.legal h3{font-size:17px;font-weight:600;margin:22px 0 8px;color:var(--ink)}
.legal p{margin:0 0 16px}.legal ul{margin:0 0 16px;padding-left:22px}.legal li{margin-bottom:8px}
.legal strong{color:var(--ink);font-weight:600}.legal a{color:var(--meta);text-decoration:underline;text-underline-offset:2px}
.legal-note{background:var(--green-soft);border:1px solid #bfe6d6;border-radius:12px;padding:14px 18px;font-size:14px;color:#13594a;margin:0 0 22px}
.contact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:26px 0}
@media(max-width:760px){.contact-grid{grid-template-columns:1fr}}
.cc{background:var(--cream);border:1px solid var(--line);border-radius:16px;padding:26px 22px;text-align:center}
.cc i{font-size:26px;color:var(--gold-deep)}.cc h3{margin:12px 0 6px;font-size:16px}
.cc p,.cc a{font-size:14.5px;color:var(--ink-soft);text-decoration:none;line-height:1.5}
.cform{max-width:560px;margin:8px auto 0}.cform .field{margin-bottom:14px}
.cform label{display:block;font-size:13.5px;font-weight:600;margin-bottom:6px;color:var(--ink-soft)}
.cform input,.cform textarea{width:100%;background:var(--cream);border:1px solid var(--line);border-radius:10px;padding:12px 14px;font-size:14.5px;color:var(--ink);font-family:inherit;outline:none}
.cform input:focus,.cform textarea:focus{border-color:var(--gold)}
.cform button{background:var(--ink-block);color:var(--cream);padding:13px 28px;border-radius:11px;font-weight:600;font-size:15px;border:none;cursor:pointer;box-shadow:0 4px 0 var(--gold-deep);font-family:inherit}
` }} />
      <Header />
      <div 
        ref={containerRef}
        className="legacy-html-wrapper" 
        dangerouslySetInnerHTML={{ __html: `

<div class="wrap"><header class="legal-head"><h1>Privacy Policy</h1><div class="upd">Last updated: 16 June 2026</div></header></div>
<main class="legal">
<p><strong>ScaleWin</strong> ("ScaleWin", "we", "us" or "our") is a software service operated by <strong>Giftyard</strong> ([legal entity / proprietor name], GSTIN: [your GSTIN]), with its registered office at [your registered business address, India]. This Privacy Policy explains how we collect, use, share and protect your information when you use our website <a href="https://scalewin.ai">scalewin.ai</a> and our marketing-automation services (the "Service").</p>
<p>By using the Service, you agree to the practices described in this policy.</p>

<h2>1. Information we collect</h2>
<ul>
<li><strong>Account information</strong> — name, business name, email, phone number and password when you sign up.</li>
<li><strong>Business &amp; campaign data</strong> — information you connect or provide so we can run your marketing, such as your product/cost details, store data and goals.</li>
<li><strong>Connected advertising accounts</strong> — when you authorise a connection (for example Meta Ads or Google Ads) via secure OAuth, we access campaign and performance data needed to operate and optimise your ads. We never see or store your platform passwords.</li>
<li><strong>Payment information</strong> — subscription payments are processed by our payment partner <strong>Razorpay</strong>. We do not collect or store your full card or bank details on our servers.</li>
<li><strong>Usage &amp; device data</strong> — log data, IP address, browser type and how you use the Service, collected via cookies and similar technologies.</li>
</ul>

<h2>2. How we use your information</h2>
<ul>
<li>To provide, operate and optimise the Service for you;</li>
<li>To create, manage and report on your advertising campaigns;</li>
<li>To process subscriptions and payments;</li>
<li>To communicate with you about your account, updates and support;</li>
<li>To improve and secure our products; and</li>
<li>To comply with legal obligations.</li>
</ul>

<h2>3. How we share information</h2>
<p>We do not sell your personal information. We share data only with:</p>
<ul>
<li><strong>Service providers</strong> we rely on to run the Service — for example payment processing (Razorpay), advertising platforms (Meta, Google), hosting and database providers, and automation infrastructure — strictly to deliver the Service to you;</li>
<li><strong>Legal &amp; safety</strong> — where required by law, regulation or valid legal process, or to protect our rights and users.</li>
</ul>

<h2>4. Data from your connected accounts</h2>
<p>Data accessed from your connected advertising or store accounts is used <strong>only</strong> to provide the Service to you — to run, monitor and improve your own campaigns. We do not use it for any unrelated purpose, and you can disconnect any account at any time from your dashboard.</p>

<h2>5. Data retention</h2>
<p>We keep your information for as long as your account is active or as needed to provide the Service, comply with our legal obligations, resolve disputes and enforce our agreements. You may request deletion of your account data as described below.</p>

<h2>6. Security</h2>
<p>We use reasonable technical and organisational measures — including encryption in transit and access controls — to protect your information. However, no method of transmission or storage is fully secure, and we cannot guarantee absolute security.</p>

<h2>7. Your rights</h2>
<p>You may access, correct, update or request deletion of your personal information, and withdraw consent for connected accounts, by contacting us at <a href="mailto:support@scalewin.ai">support@scalewin.ai</a>.</p>

<h2>8. Cookies</h2>
<p>We use cookies and similar technologies as described in our <a href="/cookies">Cookie Policy</a>.</p>

<h2>9. Children</h2>
<p>The Service is intended for businesses and users aged 18 and above. We do not knowingly collect data from children.</p>

<h2>10. Changes to this policy</h2>
<p>We may update this Privacy Policy from time to time. Material changes will be posted on this page with a revised "Last updated" date.</p>

<h2>11. Contact</h2>
<p>For any privacy questions or requests, contact us at <a href="mailto:support@scalewin.ai">support@scalewin.ai</a> or via our <a href="/contact">Contact page</a>.</p>
</main>



` }} 
      />
      <Footer />
    </>
  );
}
