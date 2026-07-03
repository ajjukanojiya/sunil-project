import Link from 'next/link';

export default function Header() {
  return (
    <>
<nav id="nav">
  <div className="brand"><span className="mk"><b>S</b></span>ScaleWin</div>
  <div className="navlinks"><Link href="#agent">The AI</Link><Link href="#channels">Channels</Link><Link href="#pricing">Pricing</Link><Link href="#founder">Why us</Link><Link href="/blog">Blog</Link><Link href="/login">Login</Link><Link href="/signup" className="ncta">Start free trial</Link></div>
  <button className="navtog" aria-label="Menu" onClick={() => document.getElementById('nav')?.classList.toggle('open')}><span></span><span></span><span></span></button>
</nav>
    </>
  );
}