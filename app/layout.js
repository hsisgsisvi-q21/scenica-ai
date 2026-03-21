'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/create', label: 'Studio' },
    { href: '/influencers', label: 'Influencers' },
    { href: '/templates', label: 'Templates' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'nav-glass' : ''}`}>
      <div className="page-container h-[52px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-[24px] h-[24px] rounded-[6px] bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <span className="text-black font-semibold text-[9px] sans">S</span>
          </div>
          <span className="sans text-[12px] font-medium text-white/70 tracking-[.06em]">Scenica</span>
        </Link>
        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link ${path === l.href ? 'active' : ''}`}>{l.label}</Link>
          ))}
          <div className="w-[1px] h-2.5 bg-white/[.04] mx-1" />
          <Link href="/about" className="nav-cta">About</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/20 text-[10px] uppercase tracking-[.18em] cursor-pointer hover:text-white/40 transition-colors">
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/97 backdrop-blur-3xl border-t border-white/[.02] px-7 py-10 flex flex-col gap-7">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/20 hover:text-white/50 text-[11px] uppercase tracking-[.18em] transition-colors">{l.label}</Link>
          ))}
          <Link href="/about" className="nav-cta text-center mt-3">About</Link>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="page-container py-14">
      <div className="sep mb-14" />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">
        <div>
          <Link href="/" className="flex items-center gap-2 group mb-3">
            <div className="w-5 h-5 rounded-[4px] bg-white/[.04] flex items-center justify-center group-hover:bg-white/[.07] transition-colors">
              <span className="text-white/25 text-[7px] sans font-semibold">S</span>
            </div>
            <span className="sans text-[10px] text-white/[.15] group-hover:text-white/30 transition-colors tracking-[.1em]">Scenica AI</span>
          </Link>
          <p className="text-white/[.12] text-[10px] max-w-[260px] leading-[1.8]">AI 인플루언서 숏폼 이커머스 플랫폼</p>
        </div>
        <div className="flex gap-16">
          <div>
            <div className="sans text-[8px] text-white/[.12] uppercase tracking-[.2em] mb-4">Product</div>
            <div className="flex flex-col gap-3">
              {[['/', 'Home'], ['/create', 'Studio'], ['/influencers', 'Influencers']].map(([h, l]) => (
                <Link key={h} href={h} className="sans text-[10px] text-white/[.15] hover:text-white/35 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="sans text-[8px] text-white/[.12] uppercase tracking-[.2em] mb-4">Company</div>
            <div className="flex flex-col gap-3">
              {[['/pricing', 'Pricing'], ['/about', 'About']].map(([h, l]) => (
                <Link key={h} href={h} className="sans text-[10px] text-white/[.15] hover:text-white/35 transition-colors">{l}</Link>
              ))}
              <a href="mailto:hello@scenica.ai" className="sans text-[10px] text-white/[.15] hover:text-white/35 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
      <div className="sep mb-6" />
      <div className="flex items-center justify-between">
        <span className="sans text-[9px] text-white/[.04]">© 2026 Scenica AI</span>
        <div className="flex gap-6 sans text-[9px] text-white/[.04]"><span>Terms</span><span>Privacy</span></div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  useEffect(() => {
    const p = (e) => e.preventDefault();
    document.addEventListener('contextmenu', p);
    document.addEventListener('dragstart', p);
    return () => { document.removeEventListener('contextmenu', p); document.removeEventListener('dragstart', p); };
  }, []);

  return (
    <html lang="ko">
      <head><title>Scenica AI — AI 인플루언서 숏폼 이커머스</title></head>
      <body className="bg-black min-h-screen"><Nav /><main className="pt-[52px]">{children}</main><Footer /></body>
    </html>
  );
}
