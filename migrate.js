const fs = require('fs');
const path = require('path');

function convertHtmlToJsxSafely(htmlPath, outPath) {
  if (!fs.existsSync(htmlPath)) {
    console.log('Skipping (not found):', htmlPath);
    return;
  }
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Extract body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;
  
  // Extract styles
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
  const styleContent = styleMatch ? styleMatch[1] : '';

  // Extract external scripts from <head> and <body>
  let externalScripts = [];
  let extScriptRegex = /<script\b[^>]*src="([^"]+)"[^>]*><\/script>/gi;
  let extMatch;
  while ((extMatch = extScriptRegex.exec(html)) !== null) {
    externalScripts.push(extMatch[1]);
  }

  // Extract inline scripts from entire html
  let scripts = [];
  let scriptRegex = /<script\b(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    if (match[1].trim()) {
      scripts.push(match[1]);
    }
  }

  // Remove all scripts from bodyContent so we don't have duplicates
  bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  const jsxFile = `
'use client';
import { useEffect, useRef } from 'react';

export default function LegacyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    // Load external scripts first
    const extScripts = ${JSON.stringify(externalScripts)};
    let loadedCount = 0;
    
    const runInlineScripts = () => {
      // Run the inline extracted scripts
      const scriptContents = ${JSON.stringify(scripts)};
      scriptContents.forEach(scriptText => {
        try {
          const scriptEl = document.createElement('script');
          scriptEl.textContent = scriptText;
          document.body.appendChild(scriptEl);
        } catch (e) {
          console.error('Error running script:', e);
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
          if (loadedCount === extScripts.length) {
            runInlineScripts();
          }
        };
        document.body.appendChild(el);
      });
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: \`${styleContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
      <div 
        ref={containerRef}
        className="legacy-html-wrapper" 
        dangerouslySetInnerHTML={{ __html: \`${bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} 
      />
    </>
  );
}
`;

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, jsxFile);
  console.log('Converted SAFELY:', htmlPath, '->', outPath);
}

const pages = [
  { in: 'index.html', out: 'app/(marketing)/page.tsx' },
  { in: 'dashboard.html', out: 'app/dashboard/page.tsx' },
  { in: 'assistant.html', out: 'app/assistant/page.tsx' },
  { in: 'blog.html', out: 'app/blog/page.tsx' },
  { in: 'blog-article.html', out: 'app/blog/[slug]/page.tsx' },
  { in: 'contact.html', out: 'app/contact/page.tsx' },
  { in: 'cookies.html', out: 'app/cookies/page.tsx' },
  { in: 'privacy.html', out: 'app/privacy/page.tsx' },
  { in: 'terms.html', out: 'app/terms/page.tsx' },
  { in: 'refund.html', out: 'app/refund/page.tsx' },
  { in: 'settings.html', out: 'app/settings/page.tsx' },
  { in: 'setup.html', out: 'app/setup/page.tsx' },
  { in: 'login.html', out: 'app/login/page.tsx' },
  { in: 'signup.html', out: 'app/signup/page.tsx' },
];

pages.forEach(p => {
  convertHtmlToJsxSafely(
    path.join('f:/sunil', p.in), 
    path.join('f:/sunil/webapp', p.out)
  );
});
