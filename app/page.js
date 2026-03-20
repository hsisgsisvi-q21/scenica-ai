'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ═══ Data ═══ */
const VIDEOS = [
  { id: 'YFU4erbddog', title: 'Shh No Talk Tonight', creator: 'YUNA', cat: 'cinematic', views: '891K' },
  { id: 'VU52Kx2AXL8', title: 'Night City Mood', creator: 'YUNA', cat: 'cinematic', views: '324K' },
  { id: 'LygFajnhLFY', title: 'Street Fashion Film', creator: 'MISO', cat: 'fashion', views: '512K' },
  { id: 'rxWNmzQpW2c', title: 'Morning Routine', creator: 'HANA', cat: 'lifestyle', views: '267K' },
  { id: 'RPmqjTwdVP8', title: 'Product Showcase', creator: 'RINA', cat: 'commerce', views: '183K' },
  { id: 'ttR0eoHz9Bg', title: 'Brand Campaign', creator: 'YUNA', cat: 'commerce', views: '445K' },
  { id: 'LygFajnhLFY', title: 'Lookbook SS26', creator: 'HANA', cat: 'fashion', views: '394K' },
  { id: 'rxWNmzQpW2c', title: 'Cafe Vlog', creator: 'RINA', cat: 'lifestyle', views: '221K' },
  { id: 'YFU4erbddog', title: 'Cosmetics Editorial', creator: 'MISO', cat: 'beauty', views: '678K' },
  { id: 'RPmqjTwdVP8', title: 'Unboxing Haul', creator: 'YUNA', cat: 'commerce', views: '156K' },
  { id: 'VU52Kx2AXL8', title: 'Cinematic Portrait', creator: 'MISO', cat: 'cinematic', views: '733K' },
  { id: 'ttR0eoHz9Bg', title: 'Summer Collection', creator: 'HANA', cat: 'fashion', views: '289K' },
];

const CATS = [
  { key: 'all', label: 'All' }, { key: 'cinematic', label: 'Cinematic' },
  { key: 'beauty', label: 'Beauty' }, { key: 'fashion', label: 'Fashion' },
  { key: 'lifestyle', label: 'Lifestyle' }, { key: 'commerce', label: 'Commerce' },
];

const YT = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const EMBED = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&rel=0&playsinline=1&disablekb=1&fs=0&enablejsapi=1`;

/* ═══ AOS ═══ */
function useAOS() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll('[data-aos]:not(.aos-animate)');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const d = Number(e.target.dataset.aosDelay || 0);
            e.target.style.transitionDuration = `${e.target.dataset.aosDuration || 900}ms`;
            setTimeout(() => e.target.classList.add('aos-animate'), d);
          }
        });
      }, { threshold: 0.06 });
      els.forEach((el) => obs.observe(el));
      return obs;
    };
    const obs = run();
    return () => obs.disconnect();
  }, []);
}

/* ═══ Modal ═══ */
function Modal({ video, onClose }) {
  const iframeRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  const toggleMute = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const cmd = muted ? 'unMute' : 'mute';
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args: '' }), '*');
      setMuted(!muted);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-video-wrap" onClick={(e) => e.stopPropagation()}>
        <iframe ref={iframeRef} src={EMBED(video.id)} allow="autoplay; encrypted-media" allowFullScreen tabIndex="-1" />
        <div className="modal-blocker-top" />
        <div className="modal-blocker-bottom" />
        <div className="modal-click-block" />

        {/* Mute/Unmute button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-5 right-5 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-all"
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.5"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
          )}
        </button>
      </div>
      <button className="modal-close" onClick={onClose}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>
      </button>
      <div className="modal-info">
        <div className="text-white/40 text-[12px] font-light tracking-[.05em]">{video.title}</div>
        <div className="text-white/[.12] text-[10px] sans mt-1.5 tracking-[.15em] uppercase">{video.creator} — Scenica AI</div>
      </div>
    </div>
  );
}

/* ═══ Card ═══ */
function Card({ video, i, onClick }) {
  return (
    <div className="vcard" onClick={() => onClick(video)} data-aos="fade-up" data-aos-delay={Math.min(i * 50, 300)} data-aos-duration="900">
      <img src={YT(video.id)} alt="" className="thumb aspect-video" loading="lazy" />
      <div className="card-overlay" />
      <div className="play-icon">
        <svg width="13" height="15" viewBox="0 0 13 15" fill="#000"><polygon points="1.5,0 13,7.5 1.5,15"/></svg>
      </div>
      <div className="card-info">
        <div className="text-white/80 text-[11px] font-medium tracking-[.02em]">{video.title}</div>
        <div className="flex items-center gap-2.5 mt-1.5">
          <span className="text-white/25 text-[9px] sans uppercase tracking-[.15em]">{video.creator}</span>
          <span className="w-[2px] h-[2px] rounded-full bg-white/10" />
          <span className="text-white/[.12] text-[9px] sans tracking-[.08em]">{video.views}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══ Main ═══ */
export default function Home() {
  const [modal, setModal] = useState(null);
  const [cat, setCat] = useState('all');
  const [gridKey, setGridKey] = useState(0);
  const [py, setPy] = useState(0);

  useAOS();

  useEffect(() => {
    const h = () => setPy(window.scrollY * 0.2);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const items = cat === 'all' ? VIDEOS : VIDEOS.filter((v) => v.cat === cat);

  const switchCat = (c) => {
    setCat(c);
    setGridKey((k) => k + 1);
    // Re-trigger AOS
    setTimeout(() => {
      document.querySelectorAll('#grid [data-aos]').forEach((el) => {
        el.classList.remove('aos-animate');
        void el.offsetWidth;
        el.style.transitionDuration = `${el.dataset.aosDuration || 900}ms`;
        setTimeout(() => el.classList.add('aos-animate'), Number(el.dataset.aosDelay || 0));
      });
    }, 30);
  };

  const hero = VIDEOS[1];

  // 20 unique looks from 3 best videos — each crop/zoom is radically different
  // YFU4erbddog = face with phone (bright, warm)
  // LygFajnhLFY = street fashion (colorful, vibrant)
  // ttR0eoHz9Bg = brand campaign (warm lighting)
  const A = 'https://img.youtube.com/vi/YFU4erbddog/maxresdefault.jpg';
  const B = 'https://img.youtube.com/vi/LygFajnhLFY/maxresdefault.jpg';
  const C = 'https://img.youtube.com/vi/ttR0eoHz9Bg/maxresdefault.jpg';

  const HERO_FRAMES = [
    { src: A, pos: '50% 20%', scale: '1.05' },
    { src: B, pos: '30% 10%', scale: '1.12' },
    { src: C, pos: '50% 25%', scale: '1.03' },
    { src: A, pos: '70% 35%', scale: '1.18' },
    { src: B, pos: '60% 30%', scale: '1.06' },
    { src: C, pos: '35% 15%', scale: '1.14' },
    { src: A, pos: '40% 10%', scale: '1.08' },
    { src: B, pos: '50% 40%', scale: '1.04' },
    { src: C, pos: '65% 20%', scale: '1.1' },
    { src: A, pos: '55% 30%', scale: '1.15' },
    { src: B, pos: '40% 20%', scale: '1.09' },
    { src: C, pos: '50% 35%', scale: '1.06' },
    { src: A, pos: '35% 25%', scale: '1.12' },
    { src: B, pos: '70% 15%', scale: '1.07' },
    { src: C, pos: '40% 30%', scale: '1.16' },
    { src: A, pos: '60% 15%', scale: '1.04' },
    { src: B, pos: '45% 25%', scale: '1.13' },
    { src: C, pos: '55% 10%', scale: '1.08' },
    { src: A, pos: '45% 40%', scale: '1.1' },
    { src: B, pos: '55% 35%', scale: '1.05' },
  ];

  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % HERO_FRAMES.length);
    }, 1900);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════
          HERO — Luxurious, cinematic slideshow
          ════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="relative w-full" style={{ height: 'max(78vh, 660px)' }}>
          {/* Slideshow BG — all frames stacked, opacity transition */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full" style={{ height: '125%', top: '-12%', transform: `translateY(${py}px)` }}>
              {HERO_FRAMES.map((frame, i) => (
                <img
                  key={i}
                  src={frame.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: frame.pos,
                    opacity: heroIdx === i ? 1 : 0,
                    transform: heroIdx === i ? `scale(${frame.scale})` : 'scale(1)',
                    filter: 'brightness(1.1) contrast(1.05)',
                    transition: 'opacity 0.6s ease-in-out, transform 1.9s ease-out',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cinematic overlays — multiple layers for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" style={{ height: '25%' }} />
          <div className="absolute inset-0 bg-black/10" />

          {/* Decorative vertical line */}
          <div className="absolute left-[28px] md:left-[48px] lg:left-[64px] top-[20%] bottom-[30%] w-[0.5px] bg-gradient-to-b from-transparent via-white/[.06] to-transparent" data-aos="fade-up" data-aos-duration="1500" />

          {/* Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="page-container w-full pb-20 md:pb-28 lg:pb-32">

              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-8" data-aos="fade-up" data-aos-duration="800">
                <div className="w-8 h-[0.5px] bg-white/15" />
                <div className="hero-badge">
                  <span className="w-[4px] h-[4px] rounded-full bg-emerald-400 animate-pulse" />
                  <span className="sans">Early Access Open</span>
                </div>
              </div>

              {/* Title — mixed weight for luxury feel */}
              <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
                <div className="sans text-[10px] text-white/[.15] uppercase tracking-[.3em] mb-4">AI Influencer Commerce Platform</div>
                <h1
                  className="serif text-[36px] sm:text-[48px] md:text-[62px] lg:text-[76px] font-light text-white leading-[1.04] max-w-2xl"
                  style={{ letterSpacing: '-0.035em' }}
                >
                  AI 인플루언서가<br />
                  <span className="italic text-white/80">직접</span> 팔아줍니다
                </h1>
              </div>

              {/* Description with left border */}
              <div className="flex items-stretch gap-4 mt-8 max-w-md" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1200">
                <div className="w-[0.5px] bg-white/[.08] shrink-0" />
                <p className="text-white/20 text-[12px] md:text-[13px] font-light leading-[2] pl-1">
                  상품만 등록하세요. 팔로워 10만+ AI 인플루언서가<br />
                  영상 제작부터 판매까지 전부 자동으로.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-5 mt-10" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
                <Link href="/create" className="hero-btn hero-btn-primary">시작하기</Link>
                <div className="w-[0.5px] h-5 bg-white/[.06]" />
                <button onClick={() => setModal(hero)} className="hero-btn hero-btn-ghost">
                  <div className="play-circle">
                    <svg width="9" height="11" viewBox="0 0 9 11" fill="white"><polygon points="1,0 9,5.5 1,11"/></svg>
                  </div>
                  <span className="sans text-[10px] tracking-[.14em] uppercase">Watch Film</span>
                </button>
              </div>

              {/* Slide progress */}
              <div className="flex items-center gap-4 mt-10" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                <div className="w-24 h-[1.5px] bg-white/[.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/30 rounded-full transition-all duration-500"
                    style={{ width: `${((heroIdx + 1) / HERO_FRAMES.length) * 100}%` }}
                  />
                </div>
                <span className="sans text-[9px] text-white/[.08] tracking-[.1em]">
                  {String(heroIdx + 1).padStart(2, '0')} / {String(HERO_FRAMES.length).padStart(2, '0')}
                </span>
              </div>

            </div>
          </div>

          {/* Bottom fade for clean transition */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/[.03] via-white/[.06] to-white/[.03]" />
        </div>

        {/* Stats — refined, more spacing */}
        <div className="page-container py-2">
          <div className="stat-row" data-aos="fade-up" data-aos-delay="100" data-aos-duration="900">
            {[
              { v: '130', u: '건', l: 'Orders' },
              { v: '3.2', u: '억', l: 'Revenue' },
              { v: '9', u: 'x', l: 'Conversion' },
              { v: '97', u: '%', l: 'Cost Saved' },
              { v: '40', u: '만+', l: 'Followers' },
            ].map((s, i) => (
              <div key={s.l} className="stat-item group cursor-default">
                <span className="stat-num group-hover:text-white/50 transition-colors duration-700">{s.v}<span className="text-[14px]">{s.u}</span></span>
                <span className="stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[0.5px] bg-gradient-to-r from-transparent via-white/[.04] to-transparent" />
      </section>

      {/* ════════════════════════════════════
          FEATURED — Large hero-style highlight
          ════════════════════════════════════ */}
      <section className="page-container pt-16 pb-6">
        <div className="flex items-end justify-between mb-6" data-aos="fade-up">
          <div>
            <span className="sans text-[9px] text-white/[.08] uppercase tracking-[.2em]">Featured</span>
            <h2 className="text-white/60 text-[15px] font-medium mt-1 tracking-[.01em]">이번 주 인기 콘텐츠</h2>
          </div>
          <Link href="/templates" className="sans text-[9px] text-white/[.12] uppercase tracking-[.15em] hover:text-white/25 transition-colors">
            View All
          </Link>
        </div>

        {/* 2-column featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-aos="fade-up" data-aos-delay="80">
          {[VIDEOS[0], VIDEOS[2]].map((v, i) => (
            <div key={v.id + i} className="vcard cursor-pointer" onClick={() => setModal(v)}>
              <img src={YT(v.id)} alt="" className="thumb aspect-[21/10] md:aspect-[2/1]" />
              <div className="card-overlay" style={{ opacity: 1, background: 'linear-gradient(0deg, rgba(0,0,0,.7) 0%, transparent 60%)' }} />
              <div className="play-icon">
                <svg width="13" height="15" viewBox="0 0 13 15" fill="#000"><polygon points="1.5,0 13,7.5 1.5,15"/></svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-[2]">
                <div className="text-white/80 text-[13px] md:text-[15px] font-medium tracking-[.01em]">{v.title}</div>
                <div className="flex items-center gap-2.5 mt-2">
                  <span className="text-white/25 text-[9px] sans uppercase tracking-[.15em]">{v.creator}</span>
                  <span className="w-[2px] h-[2px] rounded-full bg-white/10" />
                  <span className="text-white/[.12] text-[9px] sans">{v.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          GALLERY — Tabs + 4-col grid
          ════════════════════════════════════ */}
      <section id="grid" className="page-container py-10">
        {/* Tabs */}
        <div className="tab-bar mb-8" data-aos="fade-up" data-aos-duration="600">
          {CATS.map((c) => (
            <button key={c.key} onClick={() => switchCat(c.key)} className={`tab-item ${cat === c.key ? 'active' : ''}`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="vid-grid" key={gridKey}>
          {items.map((v, i) => (
            <Card key={`${v.id}-${i}-${gridKey}`} video={v} i={i} onClick={setModal} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4 mt-14" data-aos="fade-up" data-aos-delay="100">
          <Link href="/create" className="btn-w sans">Start Creating</Link>
          <Link href="/templates" className="btn-o sans">Browse Templates</Link>
        </div>
      </section>

      {/* ════════════════════════════════════
          VALUE PROP — Clean, editorial
          ════════════════════════════════════ */}
      <section className="py-24">
        <div className="sep mb-24" />
        <div className="page-container">
          <div className="max-w-[900px] mx-auto">
            {/* Heading */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-24">
              <div data-aos="fade-up">
                <span className="sans text-[9px] text-white/[.08] uppercase tracking-[.2em]">Why Scenica AI</span>
                <h2 className="serif text-[26px] md:text-[36px] font-light text-white mt-5 leading-[1.15]" style={{ letterSpacing: '-0.025em' }}>
                  셀러는 상품만<br />등록하세요.
                </h2>
              </div>
              <div className="text-white/[.18] text-[13px] font-light leading-[2] md:pt-12" data-aos="fade-up" data-aos-delay="120">
                팔로워 10만+ AI 인플루언서가 22단계 파이프라인으로 영상을 제작하고,
                자체 채널에 게시하고, 판매를 추적하고, 수수료를 정산합니다.
                기존 월 800만원의 비용을 3만원으로.
              </div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/[.02] rounded-lg overflow-hidden" data-aos="fade-up" data-aos-delay="80">
              {[
                { n: '01', t: '상품 등록', d: '이미지와 정보만' },
                { n: '02', t: 'AI 영상 생성', d: '22단계 파이프라인' },
                { n: '03', t: '채널 게시', d: '10만+ 팔로워' },
                { n: '04', t: '판매 정산', d: '자동 추적 · 정산' },
              ].map((s) => (
                <div key={s.n} className="bg-black p-6 md:p-8 group hover:bg-white/[.008] transition-colors duration-700">
                  <div className="serif text-white/[.04] text-[28px] font-light mb-5 group-hover:text-white/[.08] transition-colors duration-700">{s.n}</div>
                  <div className="text-white/50 text-[12px] font-medium mb-1 tracking-[.02em]">{s.t}</div>
                  <div className="text-white/[.1] text-[10px] font-light">{s.d}</div>
                </div>
              ))}
            </div>

            {/* Comparison */}
            <div className="grid grid-cols-3 gap-[1px] bg-white/[.02] rounded-lg overflow-hidden mt-2" data-aos="fade-up" data-aos-delay="120">
              {[
                { label: '인플루언서 섭외', value: '30~500만', sub: '건당', highlight: false },
                { label: 'Scenica AI', value: '30,000', sub: '월 구독', highlight: true },
                { label: 'AI 영상 툴', value: '채널 없음', sub: '영상만 생성', highlight: false },
              ].map((c) => (
                <div key={c.label} className={`bg-black p-5 md:p-6 text-center relative hover:bg-white/[.005] transition-colors duration-700 ${c.highlight ? '!bg-[#040404]' : ''}`}>
                  {c.highlight && <div className="absolute top-0 left-[20%] right-[20%] h-[.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />}
                  <div className="sans text-[8px] text-white/[.08] uppercase tracking-[.2em] mb-3">{c.label}</div>
                  <div className={`serif text-[18px] font-light ${c.highlight ? 'text-white/60' : 'text-white/20'}`}>{c.value}</div>
                  <div className="text-white/[.05] text-[9px] mt-1 sans tracking-[.1em]">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          AI INFLUENCERS PREVIEW
          ════════════════════════════════════ */}
      <section className="py-20">
        <div className="sep mb-20" />
        <div className="page-container">
          <div className="flex items-end justify-between mb-8" data-aos="fade-up">
            <div>
              <span className="sans text-[9px] text-white/[.08] uppercase tracking-[.2em]">AI Influencers</span>
              <h2 className="text-white/50 text-[15px] font-medium mt-1 tracking-[.01em]">팔로워 40만+ AI 인플루언서</h2>
            </div>
            <Link href="/influencers" className="sans text-[9px] text-white/[.12] uppercase tracking-[.15em] hover:text-white/25 transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-aos="fade-up" data-aos-delay="60">
            {[
              { name: 'YUNA', cat: 'Beauty', f: '12.4만', vid: 'YFU4erbddog' },
              { name: 'MISO', cat: 'Fashion', f: '8.7만', vid: 'LygFajnhLFY' },
              { name: 'HANA', cat: 'Lifestyle', f: '11.2만', vid: 'rxWNmzQpW2c' },
              { name: 'RINA', cat: 'Food', f: '9.8만', vid: 'RPmqjTwdVP8' },
            ].map((inf) => (
              <Link key={inf.name} href="/influencers" className="inf-profile group">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img src={YT(inf.vid)} alt="" className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <div className="sans text-[8px] text-white/20 uppercase tracking-[.2em] mb-1.5">{inf.cat}</div>
                    <div className="flex items-end justify-between">
                      <span className="text-white/80 text-[14px] font-medium sans tracking-[.03em]">{inf.name}</span>
                      <span className="text-white/15 text-[10px] sans">{inf.f}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA — Clean, minimal
          ════════════════════════════════════ */}
      <section className="py-28">
        <div className="sep mb-28" />
        <div className="page-container text-center" data-aos="fade-up">
          <span className="sans text-[9px] text-white/[.06] uppercase tracking-[.2em]">Get Started</span>
          <h2 className="serif text-[26px] md:text-[38px] font-light text-white mt-5 leading-[1.15]" style={{ letterSpacing: '-0.025em' }}>
            지금 시작하세요
          </h2>
          <p className="text-white/[.12] text-[12px] font-light mt-4 mb-10">사전등록 시 Pro 50% 영구 할인 + 1개월 무료 체험</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/create" className="btn-w sans">시작하기</Link>
            <Link href="/pricing" className="btn-o sans">요금제 보기</Link>
          </div>
        </div>
      </section>

      {modal && <Modal video={modal} onClose={() => setModal(null)} />}
    </>
  );
}
