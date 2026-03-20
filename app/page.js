'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   AOS ENGINE
   ═══════════════════════════════════════════════════════════════ */

function useAOS() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-aos]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = e.target.getAttribute('data-aos-delay') || 0;
            const duration = e.target.getAttribute('data-aos-duration') || 800;
            e.target.style.transitionDuration = `${duration}ms`;
            setTimeout(() => e.target.classList.add('aos-animate'), Number(delay));
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   PROTECTION — right click, drag, select
   ═══════════════════════════════════════════════════════════════ */

function useProtection() {
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('dragstart', prevent);
    return () => {
      document.removeEventListener('contextmenu', prevent);
      document.removeEventListener('dragstart', prevent);
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' });
}

const YT_THUMB = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

// Fullscreen loop, ALL controls hidden, nocookie
const YT_CINEMA_URL = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=0&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&rel=0&playsinline=1&disablekb=1&fs=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const VIDEOS = [
  { id: 'VU52Kx2AXL8', title: 'Night City Mood', creator: 'YUNA', cat: 'cinematic', views: '324K' },
  { id: 'YFU4erbddog', title: 'Shh No Talk Tonight', creator: 'YUNA', cat: 'beauty', views: '891K' },
  { id: 'LygFajnhLFY', title: 'Street Fashion Film', creator: 'MISO', cat: 'fashion', views: '512K' },
  { id: 'rxWNmzQpW2c', title: 'Morning Routine', creator: 'HANA', cat: 'lifestyle', views: '267K' },
  { id: 'RPmqjTwdVP8', title: 'Product Showcase', creator: 'RINA', cat: 'commerce', views: '183K' },
  { id: 'ttR0eoHz9Bg', title: 'Brand Campaign', creator: 'YUNA', cat: 'commerce', views: '445K' },
  { id: 'YFU4erbddog', title: 'Cosmetics Editorial', creator: 'MISO', cat: 'beauty', views: '678K' },
  { id: 'LygFajnhLFY', title: 'Lookbook SS26', creator: 'HANA', cat: 'fashion', views: '394K' },
  { id: 'rxWNmzQpW2c', title: 'Cafe Vlog', creator: 'RINA', cat: 'lifestyle', views: '221K' },
  { id: 'RPmqjTwdVP8', title: 'Unboxing Haul', creator: 'YUNA', cat: 'commerce', views: '156K' },
  { id: 'VU52Kx2AXL8', title: 'Cinematic Portrait', creator: 'MISO', cat: 'cinematic', views: '733K' },
  { id: 'ttR0eoHz9Bg', title: 'Summer Collection', creator: 'HANA', cat: 'fashion', views: '289K' },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'cinematic', label: 'Cinematic' },
  { key: 'beauty', label: 'Beauty' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'commerce', label: 'Commerce' },
];

/* ═══════════════════════════════════════════════════════════════
   MODAL — TRUE fullscreen, iframe 300% to hide ALL YouTube UI
   ═══════════════════════════════════════════════════════════════ */

function VideoModal({ video, onClose }) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop">
      <div className="modal-video-wrap">
        <iframe
          src={YT_CINEMA_URL(video.id)}
          allow="autoplay; encrypted-media"
          allowFullScreen
          tabIndex="-1"
        />
        {/* 4-side gradient blockers to hide any remaining YouTube elements */}
        <div className="modal-blocker-top" />
        <div className="modal-blocker-bottom" />
        <div className="modal-blocker-left" />
        <div className="modal-blocker-right" />
      </div>

      {/* Close button */}
      <button className="modal-close" onClick={onClose}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
        </svg>
      </button>

      {/* Video info */}
      <div className="modal-info">
        <div className="text-white/50 text-[13px] font-light tracking-wide">{video.title}</div>
        <div className="text-white/15 text-[11px] sans mt-1 tracking-wider uppercase">{video.creator} — Scenica AI</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIDEO CARD — Thumbnail only → click → fullscreen modal
   ═══════════════════════════════════════════════════════════════ */

function VideoCard({ video, index, onPlay }) {
  return (
    <div
      className="vcard"
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 60, 360)}
      data-aos-duration="900"
      onClick={() => onPlay(video)}
    >
      <img src={YT_THUMB(video.id)} alt="" className="thumb aspect-video" loading="lazy" />
      <div className="card-overlay" />
      <div className="play-icon">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="#000"><polygon points="2,0 14,8 2,16" /></svg>
      </div>
      <div className="card-info">
        <div className="text-white/90 text-[12px] font-medium tracking-wide">{video.title}</div>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-white/30 text-[10px] sans uppercase tracking-wider">{video.creator}</span>
          <span className="text-white/10 text-[10px]">|</span>
          <span className="text-white/15 text-[10px] sans tracking-wider">{video.views}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : ''}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[56px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-[28px] h-[28px] rounded-[7px] bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <span className="text-black font-semibold text-[10px] sans">S</span>
          </div>
          <span className="sans text-[13px] font-medium text-white/80 tracking-[.04em]">Scenica AI</span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => scrollTo('gallery')} className="nav-link">Contents</button>
          <button onClick={() => scrollTo('about')} className="nav-link">About</button>
          <button onClick={() => scrollTo('pricing')} className="nav-link">Pricing</button>
          <div className="w-[1px] h-3 bg-white/[.06] mx-2" />
          <button onClick={() => scrollTo('waitlist')} className="nav-cta">Early Access</button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/30 text-[11px] uppercase tracking-[.15em] cursor-pointer hover:text-white/60 transition-colors">
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/[.03] px-6 py-8 flex flex-col gap-6">
          {[['gallery','Contents'],['about','About'],['pricing','Pricing']].map(([id,label]) => (
            <button key={id} onClick={() => { scrollTo(id); setMobileOpen(false); }} className="text-left text-white/25 hover:text-white/60 text-[12px] uppercase tracking-[.15em] transition-colors cursor-pointer">{label}</button>
          ))}
          <button onClick={() => { scrollTo('waitlist'); setMobileOpen(false); }} className="nav-cta text-center mt-2 cursor-pointer">Early Access</button>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO — Changed to LygFajnhLFY (fashion film, more fitting)
   ═══════════════════════════════════════════════════════════════ */

function Hero({ onVideoClick }) {
  const [parallaxY, setParallaxY] = useState(0);
  const featured = VIDEOS[2]; // Street Fashion Film - MISO

  useEffect(() => {
    const h = () => setParallaxY(window.scrollY * 0.25);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <section className="relative pt-[56px] overflow-hidden">
      <div className="relative w-full" style={{ height: 'max(60vh, 540px)' }}>
        <div className="absolute inset-0 w-full" style={{ height: '130%', top: '-15%', transform: `translateY(${parallaxY}px)` }}>
          <img src={YT_THUMB(featured.id)} alt="" className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1440px] w-full mx-auto px-6 md:px-10 pb-14 md:pb-20">
            <div className="hero-badge mb-8" data-aos="fade-up" data-aos-duration="600">
              <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" />
              <span className="sans">Early Access Open</span>
            </div>

            <h1
              className="serif text-[38px] sm:text-[50px] md:text-[68px] lg:text-[82px] font-light text-white leading-[1.05] max-w-3xl"
              style={{ letterSpacing: '-0.03em' }}
              data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000"
            >
              AI 인플루언서가<br />직접 팔아줍니다
            </h1>

            <p className="text-white/30 text-[14px] font-light leading-[1.8] max-w-md mt-6" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
              상품만 등록하세요. 팔로워 10만+ AI 인플루언서가<br />
              영상 제작부터 판매까지 전부 자동으로.
            </p>

            <div className="flex items-center gap-5 mt-8" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
              <button onClick={() => scrollTo('waitlist')} className="hero-btn hero-btn-primary">사전등록</button>
              <button onClick={() => onVideoClick(featured)} className="hero-btn hero-btn-ghost">
                <div className="play-circle">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><polygon points="1,0 10,6 1,12" /></svg>
                </div>
                <span className="sans text-[11px] tracking-[.12em] uppercase">Watch Film</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sep" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-10" data-aos="fade-up" data-aos-delay="100">
        <div className="stat-row">
          {[
            { v: '130', u: '건', l: 'Orders' },
            { v: '3.2', u: '억', l: 'Revenue' },
            { v: '9', u: 'x', l: 'Conversion' },
            { v: '97', u: '%', l: 'Cost Saved' },
            { v: '40', u: '만+', l: 'Followers' },
          ].map((s, i) => (
            <div key={s.l} className="stat-item" data-aos="fade-up" data-aos-delay={100 + i * 80}>
              <span className="stat-num">{s.v}<span className="text-[16px]">{s.u}</span></span>
              <span className="stat-label">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="sep" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY — Tabs + Grid, click → modal (no inline play)
   ═══════════════════════════════════════════════════════════════ */

function Gallery({ onVideoClick }) {
  const [activeCat, setActiveCat] = useState('all');
  const [key, setKey] = useState(0);

  const filtered = activeCat === 'all' ? VIDEOS : VIDEOS.filter((v) => v.cat === activeCat);

  const changeCat = (cat) => {
    setActiveCat(cat);
    setKey((k) => k + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('#gallery [data-aos]');
      els.forEach((el) => {
        el.classList.remove('aos-animate');
        void el.offsetWidth;
        const delay = el.getAttribute('data-aos-delay') || 0;
        const duration = el.getAttribute('data-aos-duration') || 800;
        el.style.transitionDuration = `${duration}ms`;
        setTimeout(() => el.classList.add('aos-animate'), Number(delay));
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [key]);

  return (
    <section id="gallery" className="px-6 md:px-10 py-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="tab-bar mb-10" data-aos="fade-up" data-aos-duration="600">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => changeCat(cat.key)}
              className={`tab-item ${activeCat === cat.key ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="vid-grid" key={key}>
          {filtered.map((video, i) => (
            <VideoCard key={`${video.id}-${i}-${key}`} video={video} index={i} onPlay={onVideoClick} />
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="200">
          <button onClick={() => scrollTo('waitlist')} className="btn-o cursor-pointer sans">Get Early Access</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════ */

function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-24">
      <div className="sep mb-24" />
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-20">
          <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">About Scenica AI</span>
          <h2 className="serif text-[28px] md:text-[42px] font-light text-white mt-6 leading-[1.15]" style={{ letterSpacing: '-0.02em' }} data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
            셀러는 상품만 등록하세요.<br />AI 인플루언서가 만들고, 띄우고, 팔아줍니다.
          </h2>
          <p className="text-white/20 text-[14px] font-light leading-[1.9] mt-6 max-w-lg mx-auto" data-aos="fade-up" data-aos-delay="200">
            Scenica AI는 팔로워 10만+ AI 인플루언서가 영상 제작부터 채널 게시,
            판매 전환 추적, 수수료 정산까지 전체 커머스 파이프라인을 자동화합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/[.03] rounded-lg overflow-hidden">
          {[
            { n: '01', t: '상품 등록', d: '이미지와 정보만' },
            { n: '02', t: 'AI 영상 생성', d: '22단계 파이프라인' },
            { n: '03', t: '채널 게시', d: '10만+ 팔로워' },
            { n: '04', t: '판매 정산', d: '자동 추적 · 정산' },
          ].map((step, i) => (
            <div key={step.n} className="bg-black p-6 md:p-8 group hover:bg-white/[.01] transition-colors duration-500" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="serif text-white/[.05] text-[32px] font-light mb-6 group-hover:text-white/[.1] transition-colors duration-500">{step.n}</div>
              <div className="text-white/70 text-[13px] font-medium mb-1 tracking-wide">{step.t}</div>
              <div className="text-white/15 text-[11px] font-light">{step.d}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-[1px] bg-white/[.03] rounded-lg overflow-hidden mt-3" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-black p-6 text-center hover:bg-white/[.01] transition-colors duration-500">
            <div className="sans text-[9px] text-white/10 uppercase tracking-[.2em] mb-3">인플루언서 섭외</div>
            <div className="serif text-white/25 text-[20px] font-light">30~500만</div>
            <div className="text-white/[.06] text-[10px] mt-1 sans">건당</div>
          </div>
          <div className="bg-[#060606] p-6 text-center relative">
            <div className="absolute top-0 left-[25%] right-[25%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="sans text-[9px] text-white/20 uppercase tracking-[.2em] mb-3">Scenica AI</div>
            <div className="serif text-white/80 text-[20px] font-light">30,000</div>
            <div className="text-white/15 text-[10px] mt-1 sans">월 구독</div>
          </div>
          <div className="bg-black p-6 text-center hover:bg-white/[.01] transition-colors duration-500">
            <div className="sans text-[9px] text-white/10 uppercase tracking-[.2em] mb-3">AI 영상 툴</div>
            <div className="serif text-white/25 text-[20px] font-light">채널 없음</div>
            <div className="text-white/[.06] text-[10px] mt-1 sans">영상만 생성</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════════════════════════ */

function Pricing() {
  const plans = [
    { name: 'Free', price: '0', sym: '₩', period: '', desc: '체험', features: ['AI 콘텐츠 3건/월', '720p', '기본 리포트'], featured: false },
    { name: 'Pro', price: '30,000', sym: '₩', period: '/월', desc: '셀러', features: ['무제한 콘텐츠', 'AI 채널 게시', '4K', '전환 추적', '수수료 자동정산', '브랜드 학습'], featured: true },
    { name: 'Enterprise', price: 'Custom', sym: '', period: '', desc: '에이전시', features: ['전용 AI 인플루언서', 'API', '팀 대시보드', '전담 매니저'], featured: false },
  ];

  return (
    <section id="pricing" className="px-6 md:px-10 py-24">
      <div className="sep mb-24" />
      <div className="max-w-[960px] mx-auto">
        <div className="text-center mb-16">
          <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">Pricing</span>
          <h2 className="serif text-[28px] md:text-[36px] font-light text-white mt-6" style={{ letterSpacing: '-0.02em' }} data-aos="fade-up" data-aos-delay="100">심플한 요금제</h2>
          <p className="text-white/10 text-[13px] mt-3 sans" data-aos="fade-up" data-aos-delay="150">사전등록 시 Pro 50% 할인</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <div key={p.name} className={`price-card relative ${p.featured ? 'featured' : ''}`} data-aos="fade-up" data-aos-delay={i * 120}>
              {p.featured && <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />}
              <div className="sans text-[9px] text-white/15 uppercase tracking-[.2em] mb-1">{p.name}</div>
              <div className="text-white/10 text-[11px] mb-6">{p.desc}</div>
              <div className="flex items-baseline gap-[2px] mb-8">
                <span className="sans text-white/30 text-[14px]">{p.sym}</span>
                <span className="serif text-white/80 text-[32px] font-light">{p.price}</span>
                {p.period && <span className="text-white/15 text-[12px] sans">{p.period}</span>}
              </div>
              <ul className="space-y-3 mb-10">
                {p.features.map((f) => (
                  <li key={f} className="text-white/20 text-[12px] flex items-center gap-3 font-light">
                    <span className="w-[3px] h-[3px] rounded-full bg-white/10 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo('waitlist')} className={`w-full py-[10px] cursor-pointer ${p.featured ? 'btn-w' : 'btn-o'}`}>
                {p.featured ? '사전등록 (50% 할인)' : p.name === 'Enterprise' ? '문의하기' : '무료 시작'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WAITLIST
   ═══════════════════════════════════════════════════════════════ */

function Waitlist() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const submit = () => {
    if (!email) { setErr('이메일을 입력해주세요'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('올바른 형식이 아닙니다'); return; }
    setErr(''); setDone(true);
  };

  return (
    <section id="waitlist" className="px-6 md:px-10 py-24">
      <div className="sep mb-24" />
      <div className="max-w-md mx-auto text-center">
        <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">Early Access</span>
        <h2 className="serif text-[24px] md:text-[32px] font-light text-white mt-6 mb-3" style={{ letterSpacing: '-0.02em' }} data-aos="fade-up" data-aos-delay="100">사전등록</h2>
        <p className="text-white/10 text-[13px] mb-10 font-light" data-aos="fade-up" data-aos-delay="150">Pro 50% 할인 + 1개월 무료 체험</p>

        <div data-aos="fade-up" data-aos-delay="200">
          {!done ? (
            <div>
              <div className="flex gap-2">
                <input type="email" placeholder="이메일 주소" value={email} onChange={(e) => { setEmail(e.target.value); setErr(''); }} onKeyDown={(e) => e.key === 'Enter' && submit()} className="flex-1 px-5 py-3" />
                <button onClick={submit} className="btn-w shrink-0 cursor-pointer">등록</button>
              </div>
              {err && <p className="text-red-400/40 text-[11px] mt-3 text-left pl-1">{err}</p>}
            </div>
          ) : (
            <div className="py-6">
              <div className="serif text-white/60 text-[20px] font-light mb-2">등록 완료</div>
              <p className="text-white/15 text-[13px] font-light">출시 시 알려드리겠습니다.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10">
      <div className="sep mb-10" />
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-5 h-5 rounded-[4px] bg-white/[.06] flex items-center justify-center group-hover:bg-white/[.1] transition-colors duration-500">
            <span className="text-white/30 text-[8px] sans font-semibold">S</span>
          </div>
          <span className="sans text-[11px] text-white/[.08] group-hover:text-white/15 transition-colors duration-500 tracking-wider">Scenica AI</span>
        </button>
        <div className="flex items-center gap-8 sans text-[10px] text-white/[.08] tracking-[.1em] uppercase">
          <a href="mailto:hello@scenica.ai" className="hover:text-white/20 transition-colors duration-500 cursor-pointer">Contact</a>
          <span>Terms</span>
          <span>Privacy</span>
        </div>
        <span className="sans text-[10px] text-white/[.05] tracking-wider">2026</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [modal, setModal] = useState(null);

  useAOS();
  useProtection();

  return (
    <main className="bg-black min-h-screen">
      <Nav />
      <Hero onVideoClick={setModal} />
      <Gallery onVideoClick={setModal} />
      <About />
      <Pricing />
      <Waitlist />
      <Footer />
      {modal && <VideoModal video={modal} onClose={() => setModal(null)} />}
    </main>
  );
}
