'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/create', label: 'Studio' },
    { href: '/influencers', label: 'Influencers' },
    { href: '/templates', label: 'Templates' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : ''}`}>
      <div className="page-container h-[56px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-[28px] h-[28px] rounded-[7px] bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <span className="text-black font-semibold text-[10px] sans">S</span>
          </div>
          <span className="sans text-[13px] font-medium text-white/80 tracking-[.04em]">Scenica AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link ${pathname === l.href ? 'active' : ''}`}>
              {l.label}
            </Link>
          ))}
          <div className="w-[1px] h-3 bg-white/[.06] mx-1" />
          <Link href="/about" className="nav-cta">About Us</Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/30 text-[11px] uppercase tracking-[.15em] cursor-pointer hover:text-white/60 transition-colors">
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/[.03] px-6 py-8 flex flex-col gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/25 hover:text-white/60 text-[12px] uppercase tracking-[.15em] transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/about" className="nav-cta text-center mt-2">About Us</Link>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/create', label: 'Studio' },
    { href: '/influencers', label: 'Influencers' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
  ];

  return (
    <footer className="px-6 md:px-10 py-10">
      <div className="sep mb-10" />
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2 group mb-3">
              <div className="w-6 h-6 rounded-[5px] bg-white/[.08] flex items-center justify-center group-hover:bg-white/[.12] transition-colors">
                <span className="text-white/40 text-[8px] sans font-semibold">S</span>
              </div>
              <span className="sans text-[12px] text-white/15 group-hover:text-white/25 transition-colors tracking-wider">Scenica AI</span>
            </Link>
            <p className="text-white/[.06] text-[11px] max-w-xs leading-relaxed">AI 인플루언서가 직접 팔아주는 숏폼 이커머스 플랫폼</p>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="sans text-[9px] text-white/10 uppercase tracking-[.2em] mb-4">Product</div>
              <div className="flex flex-col gap-2.5">
                {footerLinks.slice(0, 3).map((l) => (
                  <Link key={l.href} href={l.href} className="sans text-[11px] text-white/[.08] hover:text-white/25 transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="sans text-[9px] text-white/10 uppercase tracking-[.2em] mb-4">Company</div>
              <div className="flex flex-col gap-2.5">
                {footerLinks.slice(3).map((l) => (
                  <Link key={l.href} href={l.href} className="sans text-[11px] text-white/[.08] hover:text-white/25 transition-colors">{l.label}</Link>
                ))}
                <a href="mailto:hello@scenica.ai" className="sans text-[11px] text-white/[.08] hover:text-white/25 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>

        <div className="sep mb-6" />
        <div className="flex items-center justify-between">
          <span className="sans text-[10px] text-white/[.05]">© 2026 Scenica AI. All rights reserved.</span>
          <div className="flex gap-6 sans text-[10px] text-white/[.05]">
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  // Right-click & drag prevention
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('dragstart', prevent);
    return () => {
      document.removeEventListener('contextmenu', prevent);
      document.removeEventListener('dragstart', prevent);
    };
  }, []);

  return (
    <html lang="ko">
      <head>
        <title>Scenica AI — AI 인플루언서 숏폼 이커머스 플랫폼</title>
        <meta name="description" content="팔로워 10만+ AI 인플루언서가 영상 제작부터 채널 게시, 판매까지." />
      </head>
      <body className="bg-black min-h-screen">
        <Nav />
        <main className="pt-[56px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
