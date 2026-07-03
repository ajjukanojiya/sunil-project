
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
      const scriptContents: string[] = ["\nfunction filterPosts(btn, cat){\n  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));\n  btn.classList.add('active');\n  document.querySelectorAll('.bcard').forEach(card=>{\n    if(cat==='all' || card.dataset.cat.includes(cat)){\n      card.classList.remove('hidden');\n    } else {\n      card.classList.add('hidden');\n    }\n  });\n}\n\nfunction subscribeNl(){\n  var email = document.getElementById('nlEmail').value.trim();\n  if(!email){ alert('Please apna email daalein.'); return; }\n  document.getElementById('nlEmail').value='';\n  alert('Thank you! Aap subscribe ho gaye. (Developer ise email list se connect karega.)');\n}\n\nconst obs = new IntersectionObserver((entries)=>{\n  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target);} });\n},{threshold:0.08});\ndocument.querySelectorAll('.reveal').forEach(el=>obs.observe(el));\n","\ndocument.querySelectorAll('.featured-card,.bcard').forEach(function(c){c.style.cursor='pointer';c.addEventListener('click',function(){window.location.href='/blog/article';});});\n"];
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
` }} />
      <Header />
      <div 
        ref={containerRef}
        className="legacy-html-wrapper" 
        dangerouslySetInnerHTML={{ __html: `



<!-- HEADER -->
<header class="blog-header">
  <div class="wrap">
    <div class="bh-eyebrow"><i class="ti ti-notebook"></i> The ScaleWin Blog</div>
    <h1>Marketing insights that <em>actually help</em></h1>
    <p>Practical, no-fluff advice on ads, SEO and growth for Indian businesses — written from ₹1,500 Cr+ of real experience.</p>
  </div>
</header>

<div class="wrap">
  <!-- FILTERS -->
  <div class="filters">
    <button class="filter-btn active" data-cat="all" onclick="filterPosts(this,'all')">All articles</button>
    <button class="filter-btn" data-cat="meta" onclick="filterPosts(this,'meta')">Meta Ads</button>
    <button class="filter-btn" data-cat="google" onclick="filterPosts(this,'google')">Google Ads</button>
    <button class="filter-btn" data-cat="seo" onclick="filterPosts(this,'seo')">SEO</button>
    <button class="filter-btn" data-cat="growth" onclick="filterPosts(this,'growth')">Growth</button>
  </div>

  <!-- FEATURED -->
  <div class="featured reveal">
    <article class="featured-card">
      <div class="featured-img t-money">
        <i class="ti ti-coin-rupee"></i>
      </div>
      <div class="featured-body">
        <span class="feat-badge"><i class="ti ti-star-filled" style="font-size:11px"></i> Featured</span>
        <div class="featured-cat">Meta Ads · Profit</div>
        <h2>Why your 3x ROAS campaign might still be losing money</h2>
        <p>Most Indian D2C owners celebrate a 3x ROAS — but after product cost, shipping and returns, many of those campaigns quietly bleed cash. Here's the simple math to find your real winners.</p>
        <div class="featured-meta">
          <span class="fm-author"><span class="fm-avatar">A</span> ScaleWin Team</span>
          <span class="fm-dot">·</span>
          <span><i class="ti ti-clock" style="font-size:13px"></i> 5 min read</span>
          <span class="fm-dot">·</span>
          <span>Coming soon</span>
        </div>
      </div>
    </article>
  </div>

  <!-- GRID -->
  <div class="blog-grid" id="blogGrid">

    <article class="bcard reveal" data-cat="google">
      <div class="bcard-img t-google"><i class="ti ti-brand-google"></i></div>
      <div class="bcard-body">
        <div class="bcard-cat">Google Ads</div>
        <h3>Performance Max vs Search: where should you start?</h3>
        <p>A clear breakdown of which Google Ads campaign type works best when you're starting with a limited budget.</p>
        <div class="bcard-meta"><span class="read"><i class="ti ti-clock"></i> 6 min</span> · <span>Coming soon</span></div>
      </div>
    </article>

    <article class="bcard reveal" data-cat="seo">
      <div class="bcard-img t-seo"><i class="ti ti-search"></i></div>
      <div class="bcard-body">
        <div class="bcard-cat">SEO</div>
        <h3>How AI-written blogs can rank without sounding robotic</h3>
        <p>Mass-producing content can hurt your SEO. Here's how to use AI for blogs that actually rank and bring organic sales.</p>
        <div class="bcard-meta"><span class="read"><i class="ti ti-clock"></i> 4 min</span> · <span>Coming soon</span></div>
      </div>
    </article>

    <article class="bcard reveal" data-cat="meta">
      <div class="bcard-img t-meta"><i class="ti ti-brand-facebook"></i></div>
      <div class="bcard-body">
        <div class="bcard-cat">Meta Ads</div>
        <h3>Creative fatigue: the silent ROAS killer (and how to spot it)</h3>
        <p>When frequency climbs past 3-4, your best ad starts losing money. Learn the warning signs before it tanks your results.</p>
        <div class="bcard-meta"><span class="read"><i class="ti ti-clock"></i> 5 min</span> · <span>Coming soon</span></div>
      </div>
    </article>

    <article class="bcard reveal" data-cat="growth">
      <div class="bcard-img t-growth"><i class="ti ti-rocket"></i></div>
      <div class="bcard-body">
        <div class="bcard-cat">Growth</div>
        <h3>The first ₹50,000: how to spend your first ad budget wisely</h3>
        <p>New to paid ads? Here's exactly how to allocate your first month's budget across Meta and Google without wasting money.</p>
        <div class="bcard-meta"><span class="read"><i class="ti ti-clock"></i> 7 min</span> · <span>Coming soon</span></div>
      </div>
    </article>

    <article class="bcard reveal" data-cat="seo">
      <div class="bcard-img t-ai"><i class="ti ti-sparkles"></i></div>
      <div class="bcard-body">
        <div class="bcard-cat">SEO · AI</div>
        <h3>Product page SEO: the 6 fixes that move rankings fastest</h3>
        <p>Title tags, meta descriptions, H1s and more — the highest-impact on-page SEO fixes for any e-commerce store.</p>
        <div class="bcard-meta"><span class="read"><i class="ti ti-clock"></i> 6 min</span> · <span>Coming soon</span></div>
      </div>
    </article>

    <article class="bcard reveal" data-cat="meta">
      <div class="bcard-img t-money"><i class="ti ti-chart-arrows-vertical"></i></div>
      <div class="bcard-body">
        <div class="bcard-cat">Meta Ads</div>
        <h3>Break-even ROAS: the one number every D2C owner must know</h3>
        <p>Before you scale any campaign, you need to know your break-even ROAS. Here's how to calculate it in 2 minutes.</p>
        <div class="bcard-meta"><span class="read"><i class="ti ti-clock"></i> 4 min</span> · <span>Coming soon</span></div>
      </div>
    </article>

    <article class="bcard reveal" data-cat="google">
      <div class="bcard-img t-google"><i class="ti ti-key"></i></div>
      <div class="bcard-body">
        <div class="bcard-cat">Google Ads</div>
        <h3>Negative keywords: the easiest way to stop wasting ad spend</h3>
        <p>You're probably paying for clicks that will never convert. Negative keywords fix that — here's how to find them.</p>
        <div class="bcard-meta"><span class="read"><i class="ti ti-clock"></i> 5 min</span> · <span>Coming soon</span></div>
      </div>
    </article>

    <article class="bcard reveal" data-cat="growth">
      <div class="bcard-img t-growth"><i class="ti ti-users"></i></div>
      <div class="bcard-body">
        <div class="bcard-cat">Growth</div>
        <h3>UGC vs polished ads: what actually works for Indian brands</h3>
        <p>Our data shows raw, user-style videos often beat expensive productions. Here's why — and how to make them cheaply.</p>
        <div class="bcard-meta"><span class="read"><i class="ti ti-clock"></i> 6 min</span> · <span>Coming soon</span></div>
      </div>
    </article>

    <article class="bcard reveal" data-cat="seo">
      <div class="bcard-img t-seo"><i class="ti ti-world-search"></i></div>
      <div class="bcard-body">
        <div class="bcard-cat">SEO</div>
        <h3>How often should you really publish blogs? (Hint: not daily)</h3>
        <p>More isn't always better. Learn the publishing cadence that builds authority without triggering spam signals.</p>
        <div class="bcard-meta"><span class="read"><i class="ti ti-clock"></i> 5 min</span> · <span>Coming soon</span></div>
      </div>
    </article>

  </div>

  <!-- NEWSLETTER -->
  <div class="newsletter reveal">
    <h2>Get marketing tips that <em>grow your business</em></h2>
    <p>One practical email a week on ads, SEO and growth. No spam, no fluff. Unsubscribe anytime.</p>
    <div class="nl-form">
      <input type="email" placeholder="you@yourstore.com" id="nlEmail">
      <button class="nl-btn" onclick="subscribeNl()">Subscribe</button>
    </div>
  </div>
</div>








` }} 
      />
      <Footer />
    </>
  );
}
