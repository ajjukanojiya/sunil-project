import Link from 'next/link';

export default function Footer() {
  return (
    <>
<footer>
  <div className="brand" style={{ fontSize: '16px' }}><span className="mk"><b>S</b></span>ScaleWin</div>
  <div className="fl"><Link href="#channels">Channels</Link><Link href="#pricing">Pricing</Link><Link href="#founder">Why us</Link><Link href="/blog">Blog</Link><Link href="#agent">The AI</Link></div>
  <div className="fl" style={{ flexBasis: '100%', justifyContent: 'center', borderTop: '1px solid var(--line)', paddingTop: '16px' }}><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link><Link href="/refund">Refund &amp; Cancellation</Link><Link href="/cookies">Cookie Policy</Link><Link href="/contact">Contact Us</Link></div>
  <div>© 2026 ScaleWin — a service of Giftyard · scalewin.ai 🇮🇳</div>
</footer>
    </>
  );
}