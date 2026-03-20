'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.05 }
    );
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
}

/* ═══════════════════════════════════════════════════════════════
   DATA — All videos and categories
   ═══════════════════════════════════════════════════════════════ */

const VIDEOS = [
  { id: 'VU52Kx2AXL8', title: 'Night City Mood', creator: 'YUNA', cat: 'cinematic', views: '324K' },
  { id: 'YFU4erbddog', title: 'Shh No Talk Tonight', creator: 'YUNA', cat: 'beauty', views: '891K' },
  { id: 'LygFajnhLFY', title: 'Street Fashion Film', creator: 'MISO', cat: 'fashion', views: '512K' },
  { id: 'rxWNmzQpW2c', title: 'Morning Routine', creator: 'HANA', cat: 'lifestyle', views: '267K' },
  { id: 'RPmqjTwdVP8', title: 'Product Showcase', creator: 'RINA', cat: 'commerce', views: '183K' },
  { id: 'ttR0eoHz9Bg', title: 'Brand Campaign', creator: 'YUNA', cat: 'commerce', views: '445K' },
  { id: 'YFU4erbddog', title: 'Cosmetics Review', creator: 'MISO', cat: 'beauty', views: '678K' },
  { id: 'LygFajnhLFY', title: 'Lookbook SS26', creator: 'HANA', cat: 'fashion', views: '394K' },
  { id: 'rxWNmzQpW2c', title: 'Cafe Vlog', creator: 'RINA', cat: 'lifestyle', views: '221K' },
  { id: 'RPmqjTwdVP8', title: 'Unboxing Haul', creator: 'YUNA', cat: 'commerce', views: '156K' },
  { id: 'VU52Kx2AXL8', title: 'Cinematic Portrait', creator: 'MISO', cat: 'cinematic', views: '733K' },
  { id: 'ttR0eoHz9Bg', title: 'Summer Collection', creator: 'HANA', cat: 'fashion', views: '289K' },
];

const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'cinematic', label: '시네마틱' },
  { key: 'beauty', label: '뷰티' },
  { key: 'fashion', label: '패션' },
  { key: 'lifestyle', label: '라이프' },
  { key: 'commerce', label: '커머스' },
];

const YT_EMBED = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&cc_load_policy=0&controls=1`;

const YT_THUMB = (id) =>
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

/* ═══════════════════════════════════════════════════════════════
   VIDEO MODAL — Cinematic fullscreen player
   ═══════════════════════════════════════════════════════════════ */

function VideoModal({ videoId, title, creator, onClose }) {
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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={YT_EMBED(videoId)}
          className="w-full h-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      </div>
      <button className="modal-close" onClick={onClose}>✕</button>

      {/* Video info below player */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="text-white text-sm font-medium">{title}</div>
        <div className="text-white/30 text-xs dm mt-1">by {creator} · Scenica AI</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIDEO CARD — Vidu-exact hover interaction
   ═══════════════════════════════════════════════════════════════ */

function VideoCard({ video, onClick }) {
  return (
    <div className="vcard" onClick={() => onClick(video)}>
      <img
        src={YT_THUMB(video.id)}
        alt={video.title}
        className="thumb aspect-video"
        loading="lazy"
      />
      <div className="card-overlay" />
      <div className="play-icon">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="#000">
          <polygon points="1,0 16,9 1,18" />
        </svg>
      </div>
      <div className="card-info">
        <div className="text-white text-[13px] font-medium leading-snug">{video.title}</div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-white/40 text-[11px] dm">{video.creator}</span>
          <span className="text-white/15 text-[11px]">·</span>
          <span className="text-white/25 text-[11px] dm">{video.views} views</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV — Ultra minimal like Vidu
   ═══════════════════════════════════════════════════════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur border-b border-white/[.04]' : ''}`}>
      <div className="max-w-[1440px] mx-auto px-5 h-[56px] flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold text-[11px] dm">S</span>
          </div>
          <span className="dm font-semibold text-[14px] text-white tracking-tight">
            Scenica AI
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          <button onClick={() => scrollTo('gallery')} className="tab">콘텐츠</button>
          <button onClick={() => scrollTo('about')} className="tab">소개</button>
          <button onClick={() => scrollTo('pricing')} className="tab">요금</button>
          <button onClick={() => scrollTo('waitlist')} className="btn-w text-[12px] px-5 py-[7px] ml-3">
            사전등록
          </button>
        </div>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-white/50 text-sm cursor-pointer"
        >
          {mobileMenu ? '닫기' : '메뉴'}
        </button>
      </div>

      {mobileMenu && (
        <div className="md:hidden bg-black border-t border-white/[.04] px-5 py-4 flex flex-col gap-2">
          <button onClick={() => { scrollTo('gallery'); setMobileMenu(false); }} className="text-left text-white/40 hover:text-white py-2 text-sm cursor-pointer transition-colors">콘텐츠</button>
          <button onClick={() => { scrollTo('about'); setMobileMenu(false); }} className="text-left text-white/40 hover:text-white py-2 text-sm cursor-pointer transition-colors">소개</button>
          <button onClick={() => { scrollTo('pricing'); setMobileMenu(false); }} className="text-left text-white/40 hover:text-white py-2 text-sm cursor-pointer transition-colors">요금</button>
          <button onClick={() => { scrollTo('waitlist'); setMobileMenu(false); }} className="btn-w text-sm py-2.5 mt-2 cursor-pointer">사전등록</button>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO — Featured video, massive, cinematic
   ═══════════════════════════════════════════════════════════════ */

function Hero({ onVideoClick }) {
  const featured = VIDEOS[0];

  return (
    <section className="pt-[56px]">
      {/* Featured Video — Full width, cinema ratio */}
      <div className="relative w-full cursor-pointer group" onClick={() => onVideoClick(featured)}>
        <div className="w-full" style={{ aspectRatio: '2.35/1', minHeight: '45vh', maxHeight: '75vh' }}>
          <img
            src={YT_THUMB(featured.id)}
            alt={featured.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[2s] ease-out"
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[.08] backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[11px] text-white/60 dm">Early Access Open</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-2xl">
              AI 인플루언서가<br />직접 팔아줍니다
            </h1>

            <p className="text-white/35 text-sm md:text-base mt-4 max-w-md leading-relaxed">
              상품만 등록하세요. 팔로워 10만+ AI 인플루언서가
              영상 제작부터 판매까지 전부 자동으로.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={(e) => { e.stopPropagation(); scrollTo('waitlist'); }}
                className="btn-w text-[13px] px-6 py-2.5 cursor-pointer"
              >
                사전등록
              </button>
              <div className="flex items-center gap-2 text-white/30 text-sm">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="white"><polygon points="1,0 12,7 1,14" /></svg>
                </div>
                <span className="dm text-[12px]">Watch Film</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal stat bar */}
      <div className="sep" />
      <div className="max-w-[1440px] mx-auto px-5 py-5 flex items-center justify-between overflow-x-auto gap-6">
        {[
          { v: '130건', l: '의뢰' },
          { v: '3.2억', l: '거래액' },
          { v: '9배', l: '전환율' },
          { v: '97%', l: '절감' },
          { v: '40만+', l: '팔로워' },
        ].map((s) => (
          <div key={s.l} className="flex items-center gap-2 shrink-0">
            <span className="dm text-white/70 text-[13px] font-medium">{s.v}</span>
            <span className="text-white/15 text-[11px]">{s.l}</span>
          </div>
        ))}
      </div>
      <div className="sep" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY — Category tabs + video grid (THE MAIN SECTION)
   ═══════════════════════════════════════════════════════════════ */

function Gallery({ onVideoClick }) {
  const ref = useReveal();
  const [activeCat, setActiveCat] = useState('all');

  const filtered = activeCat === 'all'
    ? VIDEOS
    : VIDEOS.filter((v) => v.cat === activeCat);

  return (
    <section id="gallery" className="px-5 py-10" ref={ref}>
      <div className="max-w-[1440px] mx-auto">

        {/* Tabs — Vidu style */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2 reveal">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCat(cat.key)}
              className={`tab ${activeCat === cat.key ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="vid-grid reveal">
          {filtered.map((video, i) => (
            <div
              key={`${video.id}-${i}`}
              className="reveal"
              style={{ transitionDelay: `${Math.min(i * 0.04, 0.3)}s` }}
            >
              <VideoCard video={video} onClick={onVideoClick} />
            </div>
          ))}
        </div>

        {/* Load more hint */}
        <div className="text-center mt-10 reveal">
          <button
            onClick={() => scrollTo('waitlist')}
            className="btn-o text-[12px] px-6 py-2.5 dm cursor-pointer"
          >
            사전등록하고 더 많은 콘텐츠 보기 →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT — Brief, clean, no fluff
   ═══════════════════════════════════════════════════════════════ */

function About() {
  const ref = useReveal();

  return (
    <section id="about" className="px-5 py-20" ref={ref}>
      <div className="sep mb-20" />
      <div className="max-w-[860px] mx-auto reveal">
        <div className="text-center mb-16">
          <span className="dm text-[11px] text-white/15 uppercase tracking-[3px]">About Scenica AI</span>
          <h2 className="text-white text-xl md:text-3xl font-semibold mt-5 leading-snug tracking-tight">
            셀러는 상품만 등록하세요.<br />
            AI 인플루언서가 만들고, 띄우고, 팔아줍니다.
          </h2>
        </div>

        {/* Process — 4 steps, ultra clean */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#111] rounded-xl overflow-hidden reveal">
          {[
            { n: '01', t: '상품 등록', d: '이미지와 정보만 올려주세요' },
            { n: '02', t: 'AI 영상 생성', d: '22단계 파이프라인' },
            { n: '03', t: '채널 게시', d: '팔로워 10만+ 채널' },
            { n: '04', t: '판매 정산', d: '전환 추적 · 자동 정산' },
          ].map((step) => (
            <div key={step.n} className="bg-black p-5 md:p-7">
              <div className="dm text-white/[.07] text-[28px] font-bold mb-5">{step.n}</div>
              <div className="text-white text-[13px] font-medium mb-1">{step.t}</div>
              <div className="text-white/20 text-[11px] leading-relaxed">{step.d}</div>
            </div>
          ))}
        </div>

        {/* Comparison — one clean row */}
        <div className="grid grid-cols-3 gap-[1px] bg-[#111] rounded-xl overflow-hidden mt-4 reveal">
          <div className="bg-black p-5 text-center">
            <div className="text-white/15 text-[10px] dm uppercase tracking-wider mb-2">인플루언서 섭외</div>
            <div className="text-white/30 dm text-base">30~500만원</div>
            <div className="text-white/10 text-[10px] mt-1">건당</div>
          </div>
          <div className="bg-[#080808] p-5 text-center relative">
            <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-white/20" />
            <div className="text-white/30 text-[10px] dm uppercase tracking-wider mb-2">Scenica AI</div>
            <div className="text-white dm text-base font-semibold">₩30,000</div>
            <div className="text-white/20 text-[10px] mt-1">월 구독</div>
          </div>
          <div className="bg-black p-5 text-center">
            <div className="text-white/15 text-[10px] dm uppercase tracking-wider mb-2">AI 영상 툴</div>
            <div className="text-white/30 dm text-base">채널 없음</div>
            <div className="text-white/10 text-[10px] mt-1">영상만 생성</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRICING — Dark, minimal, Vidu-grade
   ═══════════════════════════════════════════════════════════════ */

function Pricing() {
  const ref = useReveal();

  const plans = [
    {
      name: 'Free',
      price: '₩0',
      period: '',
      desc: '체험용',
      features: ['AI 콘텐츠 3건/월', '720p', '기본 리포트'],
      featured: false,
    },
    {
      name: 'Pro',
      price: '₩30,000',
      period: '/월',
      desc: '셀러용',
      features: ['무제한 콘텐츠', 'AI 채널 게시', '4K', '전환 추적', '수수료 자동정산', '브랜드 학습'],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: '에이전시',
      features: ['전용 AI 인플루언서', 'API', '팀 대시보드', '전담 매니저'],
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="px-5 py-20" ref={ref}>
      <div className="sep mb-20" />
      <div className="max-w-[960px] mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="dm text-[11px] text-white/15 uppercase tracking-[3px]">Pricing</span>
          <h2 className="text-white text-xl md:text-2xl font-semibold mt-5">심플한 요금제</h2>
          <p className="text-white/15 text-[13px] mt-2">사전등록 시 Pro 50% 할인</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 reveal">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`price-card p-6 relative ${p.featured ? 'featured' : ''}`}
            >
              <div className="dm text-white/20 text-[11px] uppercase tracking-[2px] mb-1">{p.name}</div>
              <div className="text-white/30 text-[11px] mb-5">{p.desc}</div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="dm text-white text-2xl font-bold">{p.price}</span>
                {p.period && <span className="text-white/20 text-sm">{p.period}</span>}
              </div>

              <ul className="space-y-2.5 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="text-white/30 text-[12px] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/15" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollTo('waitlist')}
                className={`w-full py-2.5 rounded-full text-[12px] font-medium cursor-pointer transition-all ${
                  p.featured ? 'btn-w' : 'btn-o'
                }`}
              >
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
   WAITLIST — Clean email form
   ═══════════════════════════════════════════════════════════════ */

function Waitlist() {
  const ref = useReveal();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const submit = () => {
    if (!email) { setErr('이메일을 입력해주세요'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('올바른 형식이 아닙니다'); return; }
    setErr('');
    setDone(true);
  };

  return (
    <section id="waitlist" className="px-5 py-20" ref={ref}>
      <div className="sep mb-20" />
      <div className="max-w-md mx-auto text-center reveal">
        <h2 className="text-white text-xl font-semibold mb-2">사전등록</h2>
        <p className="text-white/15 text-[13px] mb-8">Pro 50% 할인 + 1개월 무료 체험</p>

        {!done ? (
          <div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErr(''); }}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="flex-1 px-4 py-3 text-[13px]"
              />
              <button onClick={submit} className="btn-w px-5 py-3 text-[12px] dm cursor-pointer shrink-0">
                등록
              </button>
            </div>
            {err && <p className="text-red-500/50 text-[11px] mt-2 text-left">{err}</p>}
          </div>
        ) : (
          <div className="py-4">
            <div className="text-white text-sm font-medium mb-1">등록 완료</div>
            <p className="text-white/20 text-[13px]">출시 시 알려드리겠습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER — Minimal
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="px-5 py-8">
      <div className="sep mb-8" />
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 cursor-pointer group"
        >
          <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
            <span className="text-white/50 text-[9px] dm font-bold">S</span>
          </div>
          <span className="dm text-[12px] text-white/10 group-hover:text-white/20 transition-colors">Scenica AI</span>
        </button>

        <div className="flex items-center gap-5 text-[11px] text-white/10 dm">
          <a href="mailto:hello@scenica.ai" className="hover:text-white/25 transition-colors">Contact</a>
          <span>Terms</span>
          <span>Privacy</span>
        </div>

        <span className="dm text-[11px] text-white/[.06]">© 2026</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [modal, setModal] = useState(null);

  const openVideo = useCallback((video) => {
    setModal(video);
  }, []);

  const closeVideo = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <main className="bg-black min-h-screen">
      <Nav />
      <Hero onVideoClick={openVideo} />
      <Gallery onVideoClick={openVideo} />
      <About />
      <Pricing />
      <Waitlist />
      <Footer />

      {/* Video Modal */}
      {modal && (
        <VideoModal
          videoId={modal.id}
          title={modal.title}
          creator={modal.creator}
          onClose={closeVideo}
        />
      )}
    </main>
  );
}
