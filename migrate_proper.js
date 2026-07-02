const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function htmlToJsx(htmlStr) {
  let jsx = htmlStr;
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/tabindex=/g, 'tabIndex=');
  jsx = jsx.replace(/onclick="document\.getElementById\('nav'\)\.classList\.toggle\('open'\)"/gi, "onClick={() => document.getElementById('nav')?.classList.toggle('open')}");
  jsx = jsx.replace(/onclick=/gi, 'onClick=');
  jsx = jsx.replace(/onsubmit=/gi, 'onSubmit=');
  
  jsx = jsx.replace(/style="font-size:16px"/g, "style={{ fontSize: '16px' }}");
  jsx = jsx.replace(/style="flex-basis:100%;justify-content:center;border-top:1px solid var\(--line\);padding-top:16px"/g, "style={{ flexBasis: '100%', justifyContent: 'center', borderTop: '1px solid var(--line)', paddingTop: '16px' }}");

  jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
  jsx = jsx.replace(/clip-rule=/g, 'clipRule=');
  jsx = jsx.replace(/viewbox=/gi, 'viewBox=');

  jsx = jsx.replace(/href="([^"]+)\.html"/g, (match, p1) => {
    if (p1 === 'index') return 'href="/"';
    return `href="/${p1}"`;
  });

  jsx = jsx.replace(/<img([^>]*[^\/])>/gi, '<img$1 />');
  jsx = jsx.replace(/<input([^>]*[^\/])>/gi, '<input$1 />');
  jsx = jsx.replace(/<hr([^>]*[^\/])>/gi, '<hr$1 />');
  jsx = jsx.replace(/<br([^>]*[^\/])>/gi, '<br$1 />');

  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // Use Next.js Link
  jsx = jsx.replace(/<a([^>]*)href="([^"]+)"([^>]*)>/g, '<Link$1href="$2"$3>');
  jsx = jsx.replace(/<\/a>/g, '</Link>');

  return jsx;
}

function processPage(htmlPath, outPath, hasHeaderFooter) {
  if (!fs.existsSync(htmlPath)) return;
  let htmlRaw = fs.readFileSync(htmlPath, 'utf8');

  // Fix hrefs in the raw HTML before loading to Cheerio
  htmlRaw = htmlRaw.replace(/href="([^"]+)\.html"/g, (match, p1) => {
    if (p1 === 'index') return 'href="/"';
    return `href="/${p1}"`;
  });

  htmlRaw = htmlRaw.replace(/window\.location\.href='([^']+)\.html'/g, (match, p1) => {
    if (p1 === 'index') return "window.location.href='/'";
    return `window.location.href='/${p1}'`;
  });

  const $ = cheerio.load(htmlRaw);

  if (htmlPath.includes('index.html')) {
    const navHtml = $.html($('nav'));
    if (navHtml) {
      const headerJsx = `import Link from 'next/link';\n\nexport default function Header() {\n  return (\n    <>\n${htmlToJsx(navHtml)}\n    </>\n  );\n}`;
      fs.mkdirSync('f:/sunil/webapp/components/layout', { recursive: true });
      fs.writeFileSync('f:/sunil/webapp/components/layout/Header.tsx', headerJsx);
    }

    const footerHtml = $.html($('footer'));
    if (footerHtml) {
      const footerJsx = `import Link from 'next/link';\n\nexport default function Footer() {\n  return (\n    <>\n${htmlToJsx(footerHtml)}\n    </>\n  );\n}`;
      fs.writeFileSync('f:/sunil/webapp/components/layout/Footer.tsx', footerJsx);
    }
  }

  // Extract <style>
  const styles = $('style').html() || '';

  const extScripts = [];
  $('script[src]').each((i, el) => extScripts.push($(el).attr('src')));

  const inlineScripts = [];
  $('script:not([src])').each((i, el) => inlineScripts.push($(el).html()));

  // Remove elements from DOM
  if (hasHeaderFooter) {
    $('nav, footer').remove();
  }
  $('script, style, meta, title, link').remove();
  
  let mainHtml = $('body').html() || '';
  
  const jsxFile = `
'use client';
import { useEffect, useRef } from 'react';
${hasHeaderFooter ? "import Header from '@/components/layout/Header';\nimport Footer from '@/components/layout/Footer';" : ""}
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const initialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    const extScripts: string[] = ${JSON.stringify(extScripts)};
    let loadedCount = 0;
    
    const runInlineScripts = () => {
      const scriptContents: string[] = ${JSON.stringify(inlineScripts)};
      scriptContents.forEach(scriptText => {
        try {
          const scriptEl = document.createElement('script');
          scriptEl.textContent = scriptText;
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
      <style dangerouslySetInnerHTML={{ __html: \`${styles.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
      ${hasHeaderFooter ? '<Header />' : ''}
      <div 
        ref={containerRef}
        className="legacy-html-wrapper" 
        dangerouslySetInnerHTML={{ __html: \`${mainHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} 
      />
      ${hasHeaderFooter ? '<Footer />' : ''}
    </>
  );
}
`;

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, jsxFile);
  console.log('Converted Proper:', htmlPath);
}

const pages = [
  { in: 'index.html', out: 'app/(marketing)/page.tsx', hasHF: true },
  { in: 'dashboard.html', out: 'app/dashboard/page.tsx', hasHF: false },
  { in: 'assistant.html', out: 'app/assistant/page.tsx', hasHF: true },
  { in: 'blog.html', out: 'app/blog/page.tsx', hasHF: true },
  { in: 'blog-article.html', out: 'app/blog/[slug]/page.tsx', hasHF: true },
  { in: 'contact.html', out: 'app/contact/page.tsx', hasHF: true },
  { in: 'cookies.html', out: 'app/cookies/page.tsx', hasHF: true },
  { in: 'privacy.html', out: 'app/privacy/page.tsx', hasHF: true },
  { in: 'terms.html', out: 'app/terms/page.tsx', hasHF: true },
  { in: 'refund.html', out: 'app/refund/page.tsx', hasHF: true },
  { in: 'settings.html', out: 'app/settings/page.tsx', hasHF: false },
  { in: 'setup.html', out: 'app/setup/page.tsx', hasHF: false },
  { in: 'login.html', out: 'app/login/page.tsx', hasHF: false },
  { in: 'signup.html', out: 'app/signup/page.tsx', hasHF: false },
];

pages.forEach(p => {
  processPage(
    path.join('f:/sunil', p.in), 
    path.join('f:/sunil/webapp', p.out),
    p.hasHF
  );
});
