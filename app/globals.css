'use client';

import { useState, useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
}

/* ═══════════════════════════════════════
   VIDEO CARD — Vidu-style with hover play
   ═══════════════════════════════════════ */
function VideoCard({ videoId, title, creator, aspect = 'video' }) {
  const [playing, setPlaying] = useState(false);
  const aspects = {
    video: 'aspect-video',
    portrait: 'aspect-[9/16]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  };

  return (
    <div
      className="vid-card"
      onClick={() => !playing && setPlaying(true)}
    >
      {!playing ? (
        <>
          <div className={`${aspects[aspect]} relative`}>
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title || 'AI content'}
              loading="lazy"
            />
            <div className="overlay" />
            <div className="play-btn">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="white">
                <polygon points="0,0 18,10 0,20" />
              </svg>
            </div>
            <div className="meta">
              {title && <div className="text-white text-[13px] font-medium leading-tight">{title}</div>}
              {creator && <div className="text-white/50 text-[11px] mt-1 font-en">{creator}</div>}
            </div>
          </div>
        </>
      ) : (
        <div className={`${aspects[aspect]}`}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   NAV — Ultra minimal, transparent
   ═══════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-2xl' : ''}`}>
      <div className="max-w-[1400px] mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-black font-bold text-sm font-en">S</span>
          </div>
          <span className="font-en font-semibold text-[15px] text-white tracking-tight hidden sm:block">Scenica AI</span>
        </button>

        <div className="hidden md:flex items-center gap-6 text-[13px]">
          <button onClick={() => scrollTo('gallery')} className="text-white/40 hover:text-white transition-colors cursor-pointer">콘텐츠</button>
          <button onClick={() => scrollTo('about')} className="text-white/40 hover:text-white transition-colors cursor-pointer">소개</button>
          <button onClick={() => scrollTo('pricing')} className="text-white/40 hover:text-white transition-colors cursor-pointer">요금</button>
          <button onClick={() => scrollTo('waitlist')} className="btn-white px-5 py-2 rounded-full text-[12px] cursor-pointer">사전등록</button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white cursor-pointer">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl px-5 py-5 flex flex-col gap-3 border-t border-white/5">
          <button onClick={() => { scrollTo('gallery'); setOpen(false); }} className="text-left text-white/60 py-2 cursor-pointer">콘텐츠</button>
          <button onClick={() => { scrollTo('about'); setOpen(false); }} className="text-left text-white/60 py-2 cursor-pointer">소개</button>
          <button onClick={() => { scrollTo('pricing'); setOpen(false); }} className="text-left text-white/60 py-2 cursor-pointer">요금</button>
          <button onClick={() => { scrollTo('waitlist'); setOpen(false); }} className="btn-white py-3 rounded-full text-center text-sm cursor-pointer">사전등록</button>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════
   HERO — Fullscreen cinematic video
   ═══════════════════════════════════════ */
function Hero() {
  const [heroPlaying, setHeroPlaying] = useState(false);

  return (
    <section className="relative pt-16">
      {/* Hero Video — Full width */}
      <div className="relative w-full" style={{ aspectRatio: '21/9', minHeight: '50vh' }}>
        {!heroPlaying ? (
          <div className="absolute inset-0 cursor-pointer group" onClick={() => setHeroPlaying(true)}>
            <img
              src="https://img.youtube.com/vi/VU52Kx2AXL8/maxresdefault.jpg"
              alt="Scenica AI"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.5s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />

            {/* Hero text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[12px] text-white/70 font-en">Now Open for Early Access</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                AI 인플루언서가<br />
                <span className="text-fade">직접 팔아줍니다</span>
              </h1>

              <p className="text-white/40 text-sm md:text-base max-w-lg mb-10 leading-relaxed">
                상품만 등록하세요. 팔로워 10만+ AI 인플루언서가<br className="hidden sm:block" />
                영상 제작 → 채널 게시 → 판매까지 전부 자동으로.
              </p>

              {/* Play button */}
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
                <svg width="22" height="26" viewBox="0 0 22 26" fill="white"><polygon points="2,0 22,13 2,26" /></svg>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src="https://www.youtube.com/embed/VU52Kx2AXL8?autoplay=1&rel=0&modestbranding=1&controls=1"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        )}
      </div>

      {/* Stat strip */}
      <div className="max-w-[1400px] mx-auto px-5 py-8 flex flex-wrap items-center justify-center gap-10 md:gap-20">
        {[
          { v: '130건', l: '상품 의뢰' },
          { v: '3.2억', l: '누적 거래액' },
          { v: '9배', l: '전환율' },
          { v: '97%', l: '비용 절감' },
          { v: '4명', l: 'AI 인플루언서' },
        ].map(s => (
          <div key={s.l} className="text-center">
            <div className="font-en font-semibold text-white text-lg md:text-xl">{s.v}</div>
            <div className="font-en text-[10px] text-white/25 mt-1 uppercase tracking-[2px]">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="divider" />
    </section>
  );
}

/* ═══════════════════════════════════════
   GALLERY — Vidu-style masonry video grid
   ═══════════════════════════════════════ */
function Gallery() {
  const ref = useReveal();

  const videos = [
    { id: 'YFU4erbddog', title: 'Shh No Talk Tonight', creator: 'YUNA · AI Beauty Influencer', aspect: 'portrait' },
    { id: 'LygFajnhLFY', title: 'AI Fashion Film', creator: 'MISO · AI Fashion Influencer', aspect: 'video' },
    { id: 'rxWNmzQpW2c', title: 'Cinematic Lifestyle', creator: 'HANA · AI Lifestyle', aspect: 'video' },
    { id: 'RPmqjTwdVP8', title: 'AI Brand Campaign', creator: 'RINA · AI Creator', aspect: 'portrait' },
    { id: 'ttR0eoHz9Bg', title: 'Product Showcase', creator: 'Scenica AI · Commercial', aspect: 'video' },
    { id: 'VU52Kx2AXL8', title: 'Night City Visual', creator: 'Scenica AI · Brand Film', aspect: 'square' },
    { id: 'YFU4erbddog', title: 'Beauty Editorial', creator: 'YUNA · Cosmetics', aspect: 'video' },
    { id: 'LygFajnhLFY', title: 'Street Fashion', creator: 'MISO · Lookbook', aspect: 'portrait' },
    { id: 'rxWNmzQpW2c', title: 'Daily Vlog', creator: 'HANA · Daily Content', aspect: 'video' },
  ];

  return (
    <section id="gallery" className="px-5 py-12" ref={ref}>
      <div className="max-w-[1400px] mx-auto">
        {/* Section header — minimal like Vidu */}
        <div className="flex items-center justify-between mb-8 reveal">
          <div>
            <h2 className="text-white text-xl md:text-2xl font-semibold">AI 인플루언서 콘텐츠</h2>
            <p className="text-white/30 text-[13px] mt-1">클릭하여 재생 · Powered by Scenica AI</p>
          </div>
          <button onClick={() => scrollTo('waitlist')} className="btn-outline px-5 py-2 rounded-full text-[12px] font-en cursor-pointer hidden sm:block">
            Get Early Access →
          </button>
        </div>

        {/* Masonry Grid */}
        <div className="masonry reveal">
          {videos.map((v, i) => (
            <div key={`${v.id}-${i}`} className="item reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <VideoCard
                videoId={v.id}
                title={v.title}
                creator={v.creator}
                aspect={v.aspect}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ABOUT — Minimal, cinematic
   ═══════════════════════════════════════ */
function About() {
  const ref = useReveal();

  return (
    <section id="about" className="px-5 py-24" ref={ref}>
      <div className="divider mb-24" />
      <div className="max-w-3xl mx-auto text-center reveal">
        <span className="font-en text-[11px] text-white/20 uppercase tracking-[4px]">What is Scenica AI</span>
        <h2 className="text-white text-2xl md:text-4xl font-bold mt-6 leading-tight">
          셀러는 상품만 등록하세요.<br />
          나머지는 AI가 전부 해결합니다.
        </h2>
        <p className="text-white/30 text-sm md:text-base mt-6 leading-[1.9] max-w-xl mx-auto">
          Scenica AI는 팔로워 10만+ AI 인플루언서가 영상 제작부터
          채널 게시, 판매 전환 추적, 수수료 정산까지
          전체 커머스 파이프라인을 자동화하는 플랫폼입니다.
        </p>
      </div>

      {/* How it works — ultra minimal */}
      <div className="max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.03] rounded-2xl overflow-hidden reveal">
        {[
          { n: '01', t: '상품 등록', d: '이미지 + 정보 업로드' },
          { n: '02', t: 'AI 영상 생성', d: '22단계 파이프라인' },
          { n: '03', t: '채널 게시', d: '10만+ 팔로워 채널' },
          { n: '04', t: '판매 정산', d: '자동 추적 · 5% 수수료' },
        ].map(s => (
          <div key={s.n} className="bg-black p-6 md:p-8 text-center group hover:bg-white/[0.02] transition-colors">
            <div className="font-en text-white/10 text-3xl font-bold mb-4 group-hover:text-white/20 transition-colors">{s.n}</div>
            <div className="text-white text-[13px] font-semibold mb-1">{s.t}</div>
            <div className="text-white/25 text-[11px]">{s.d}</div>
          </div>
        ))}
      </div>

      {/* Compare — one line */}
      <div className="max-w-3xl mx-auto mt-20 reveal">
        <div className="grid grid-cols-3 gap-px bg-white/[0.03] rounded-xl overflow-hidden text-center text-[12px]">
          <div className="bg-black p-5">
            <div className="text-white/20 mb-2 font-en uppercase text-[10px] tracking-wider">기존 인플루언서</div>
            <div className="text-white/50 font-en text-lg">30~500만</div>
            <div className="text-white/15 text-[10px] mt-1">건당</div>
          </div>
          <div className="bg-white/[0.02] p-5 relative">
            <div className="absolute -top-px left-0 right-0 h-[2px] bg-white" />
            <div className="text-white/40 mb-2 font-en uppercase text-[10px] tracking-wider">Scenica AI</div>
            <div className="text-white font-en text-lg font-bold">₩30,000</div>
            <div className="text-white/30 text-[10px] mt-1">월 구독</div>
          </div>
          <div className="bg-black p-5">
            <div className="text-white/20 mb-2 font-en uppercase text-[10px] tracking-wider">AI 영상 툴</div>
            <div className="text-white/50 font-en text-lg">채널 없음</div>
            <div className="text-white/15 text-[10px] mt-1">영상만 생성</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PRICING — Minimal dark
   ═══════════════════════════════════════ */
function Pricing() {
  const ref = useReveal();

  return (
    <section id="pricing" className="px-5 py-24" ref={ref}>
      <div className="divider mb-24" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="font-en text-[11px] text-white/20 uppercase tracking-[4px]">Pricing</span>
          <h2 className="text-white text-2xl md:text-3xl font-bold mt-5">심플한 요금제</h2>
          <p className="text-white/20 text-sm mt-3">사전등록 시 Pro 50% 할인</p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.03] rounded-2xl overflow-hidden reveal">
          {[
            { name: 'Free', price: '₩0', period: '영원히 무료', features: ['AI 콘텐츠 3건/월', '720p', '기본 리포트'], primary: false },
            { name: 'Pro', price: '₩30,000', period: '/월', features: ['무제한 콘텐츠', 'AI 채널 게시', '4K', '전환 추적', '수수료 자동정산', '브랜드 학습'], primary: true },
            { name: 'Enterprise', price: 'Custom', period: '', features: ['전용 AI 인플루언서', 'API 연동', '전담 매니저'], primary: false },
          ].map(p => (
            <div key={p.name} className={`p-8 ${p.primary ? 'bg-white/[0.03]' : 'bg-black'} relative`}>
              {p.primary && <div className="absolute top-0 left-0 right-0 h-[2px] bg-white" />}
              <div className="font-en text-white/30 text-[11px] uppercase tracking-[2px] mb-4">{p.name}</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-en text-white text-3xl font-bold">{p.price}</span>
                {p.period && <span className="text-white/20 text-sm">{p.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map(f => (
                  <li key={f} className="text-white/40 text-[13px] flex items-center gap-2">
                    <span className="text-white/20">—</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo('waitlist')}
                className={`w-full py-3 rounded-full text-[13px] font-medium cursor-pointer transition-all ${
                  p.primary
                    ? 'btn-white'
                    : 'btn-outline'
                }`}
              >
                {p.primary ? '사전등록 (50% 할인)' : p.name === 'Enterprise' ? '문의하기' : '무료 시작'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   WAITLIST — Clean, minimal
   ═══════════════════════════════════════ */
function Waitlist() {
  const ref = useReveal();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const submit = () => {
    if (!email) { setErr('이메일을 입력해주세요'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('올바른 형식이 아닙니다'); return; }
    setErr(''); setDone(true);
  };

  return (
    <section id="waitlist" className="px-5 py-24" ref={ref}>
      <div className="divider mb-24" />
      <div className="max-w-xl mx-auto text-center reveal">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">지금 사전등록하세요</h2>
        <p className="text-white/25 text-sm mb-10">Pro 50% 할인 + 1개월 무료 체험</p>

        {!done ? (
          <div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={e => { setEmail(e.target.value); setErr(''); }}
                onKeyDown={e => e.key === 'Enter' && submit()}
                className="flex-1 px-4 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20"
              />
              <button onClick={submit} className="btn-white px-6 py-3.5 rounded-full text-[13px] cursor-pointer whitespace-nowrap">
                사전등록
              </button>
            </div>
            {err && <p className="text-red-400/60 text-xs mt-2 text-left pl-4">{err}</p>}
            <p className="text-white/10 text-[11px] mt-4">출시 알림만 보내드립니다</p>
          </div>
        ) : (
          <div className="py-8">
            <div className="text-3xl mb-4">✓</div>
            <div className="text-white text-lg font-semibold mb-2">등록 완료</div>
            <p className="text-white/30 text-sm">출시 시 가장 먼저 알려드릴게요.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER — Minimal
   ═══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="px-5 py-10">
      <div className="divider mb-10" />
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
            <span className="text-black font-bold text-[10px] font-en">S</span>
          </div>
          <span className="font-en text-[13px] text-white/20 group-hover:text-white/40 transition-colors">Scenica AI</span>
        </button>
        <div className="flex items-center gap-6 text-[11px] text-white/15 font-en">
          <button onClick={() => scrollTo('gallery')} className="hover:text-white/40 transition-colors cursor-pointer">Contents</button>
          <button onClick={() => scrollTo('pricing')} className="hover:text-white/40 transition-colors cursor-pointer">Pricing</button>
          <a href="mailto:hello@scenica.ai" className="hover:text-white/40 transition-colors">Contact</a>
        </div>
        <span className="font-en text-[11px] text-white/10">© 2026 Scenica AI</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   MAIN
   ═══════════════════════════════════════ */
export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Nav />
      <Hero />
      <Gallery />
      <About />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
