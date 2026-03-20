'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Scroll Reveal ───
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Smooth Scroll ───
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// ─── Animated Counter ───
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const numEnd = parseFloat(end.replace(/[^0-9.]/g, ''));
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setCount(Math.floor(ease * numEnd));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(numEnd);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  const prefix = end.includes('억') ? '' : end.includes('₩') ? '₩' : '';
  const unit = end.includes('억') ? '억' : end.includes('건') ? '건' : end.includes('%') ? '%' : end.includes('배') ? '배' : end.includes('일') ? '일' : end.includes('만') ? '만+' : suffix;

  return <span ref={ref}>{prefix}{count}{unit}</span>;
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['features', 'how', 'traction', 'compare', 'pricing', 'team', 'faq'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'features', label: '서비스' },
    { id: 'traction', label: '성과' },
    { id: 'compare', label: '비교' },
    { id: 'pricing', label: '요금' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-[#050507]/90 backdrop-blur-2xl border-b border-white/[0.04]' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <button onClick={() => scrollTo('top')} className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <span className="text-white font-bold text-sm font-en">S</span>
          </div>
          <span className="font-en font-semibold text-[17px] text-white tracking-tight">
            Scenica<span className="text-violet-400">.AI</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { scrollTo(l.id); setActive(l.id); }}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                active === l.id
                  ? 'text-white bg-white/[0.06]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {l.label}
            </button>
          ))}
          <div className="w-px h-5 bg-white/10 mx-3" />
          <button
            onClick={() => scrollTo('waitlist')}
            className="btn-primary px-6 py-2.5 rounded-full text-white font-semibold text-[13px] relative z-10"
          >
            <span className="relative z-10">사전등록</span>
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-white cursor-pointer"
        >
          <div className="relative w-5 h-4">
            <span className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-300 ${open ? 'top-[7px] rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-[7px] w-full h-[1.5px] bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-300 ${open ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} />
          </div>
        </button>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-[400px] border-t border-white/5' : 'max-h-0'}`}>
        <div className="bg-[#050507]/98 backdrop-blur-2xl px-6 py-6 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { scrollTo(l.id); setOpen(false); }}
              className="text-left text-gray-300 hover:text-white py-3 text-base transition-colors cursor-pointer"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { scrollTo('waitlist'); setOpen(false); }}
            className="btn-primary mt-3 py-3.5 rounded-full text-white font-semibold text-center relative z-10 cursor-pointer"
          >
            <span className="relative z-10">무료 사전등록 →</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// HERO
// ═══════════════════════════════════════
function Hero() {
  const influencers = [
    { name: 'YUNA', followers: '12.4만', category: 'Beauty', gradient: 'from-rose-500/30 via-fuchsia-500/20 to-violet-500/30' },
    { name: 'MISO', followers: '8.7만', category: 'Fashion', gradient: 'from-sky-500/30 via-blue-500/20 to-indigo-500/30' },
    { name: 'HANA', followers: '11.2만', category: 'Lifestyle', gradient: 'from-amber-500/30 via-orange-500/20 to-rose-500/30' },
    { name: 'RINA', followers: '9.8만', category: 'Food', gradient: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30' },
  ];

  return (
    <section id="top" className="hero-gradient relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/[0.04] blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] mb-10 animate-[fadeIn_1s_ease_forwards]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="text-[13px] text-emerald-400 font-medium">사전등록 오픈 — Pro 50% 할인</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[2.6rem] sm:text-[3.4rem] md:text-[4.5rem] font-bold leading-[1.08] mb-8 tracking-tight animate-[slideUp_0.8s_ease_forwards]">
          <span className="text-white">AI 인플루언서가</span>
          <br />
          <span className="text-shine">직접 팔아줍니다</span>
        </h1>

        {/* Sub */}
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-[1.8] animate-[slideUp_0.8s_ease_0.15s_forwards] opacity-0">
          상품만 등록하세요. 팔로워 <span className="text-white font-semibold">10만+</span> AI 인플루언서가
          <br className="hidden md:block" />
          영상 제작 → 채널 게시 → 판매까지 <span className="text-violet-300">전부 자동</span>으로 해결합니다.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-[slideUp_0.8s_ease_0.3s_forwards] opacity-0">
          <button onClick={() => scrollTo('waitlist')} className="btn-primary px-10 py-4.5 rounded-full text-white font-bold text-[15px] relative z-10 w-full sm:w-auto cursor-pointer">
            <span className="relative z-10">무료 사전등록 →</span>
          </button>
          <button onClick={() => scrollTo('features')} className="btn-ghost px-10 py-4.5 rounded-full font-semibold text-[15px] w-full sm:w-auto cursor-pointer">
            어떻게 작동하나요?
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-20 animate-[slideUp_0.8s_ease_0.45s_forwards] opacity-0">
          {[
            { end: '130건', label: '상품 의뢰' },
            { end: '3.2억', label: '누적 거래액' },
            { end: '9배', label: '전환율 향상' },
            { end: '97%', label: '비용 절감' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-en font-bold text-2xl md:text-3xl text-cool">
                <Counter end={s.end} />
              </div>
              <div className="text-[11px] text-gray-500 mt-1.5 tracking-wide uppercase font-en">{s.label}</div>
            </div>
          ))}
        </div>

        {/* AI Influencer Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto animate-[slideUp_0.8s_ease_0.6s_forwards] opacity-0">
          {influencers.map((inf, i) => (
            <div key={inf.name} className="inf-card aspect-[3/4] group">
              <div className={`w-full h-full bg-gradient-to-b ${inf.gradient} flex items-center justify-center`}>
                <div className="text-5xl md:text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-110 transition-transform">🤖</div>
              </div>
              <div className="inf-overlay" />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-3 md:p-4">
                <div className="inline-block px-2 py-0.5 rounded-full bg-white/10 text-[9px] text-gray-300 font-en font-medium mb-1.5 tracking-wider uppercase">{inf.category}</div>
                <div className="flex items-end justify-between">
                  <div className="font-en font-bold text-white text-sm md:text-base">{inf.name}</div>
                  <div className="text-[11px] text-violet-300 font-en font-semibold">{inf.followers}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-600 mt-5 font-en tracking-wider">AI INFLUENCERS · 4 CREATORS · 400K+ TOTAL FOLLOWERS</p>
      </div>

      {/* Scroll indicator */}
      <button onClick={() => scrollTo('features')} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer animate-[fadeIn_1s_ease_1.5s_forwards] opacity-0">
        <span className="text-[10px] font-en tracking-[3px] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent animate-pulse" />
      </button>
    </section>
  );
}

// ═══════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════
function Marquee() {
  const items = ['숏폼 시장 83조원', '국내 이용률 78.9%', '셀러 82% 미진입', '전환율 9배 향상', '비용 97% 절감', '제작 4주→3일', '재의뢰율 67%', '만족도 4.3/5.0'];
  return (
    <div className="py-6 border-y border-white/[0.03] overflow-hidden bg-[#050507]">
      <div className="marquee flex whitespace-nowrap gap-12">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="text-[12px] text-gray-500 font-en font-medium tracking-wider uppercase flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-violet-500/40" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// FEATURES (Problem → Solution)
// ═══════════════════════════════════════
function Features() {
  const ref = useReveal();
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      icon: '💰', problem: '인플루언서 1회 섭외 30~500만원', solution: '월 3만원으로 AI 인플루언서 상시 가동',
      metric: '97%', metricLabel: '비용 절감', detail: '기존 월 800만원 → Scenica AI 월 28만원'
    },
    {
      icon: '📡', problem: '영상 만들어도 팔아줄 채널이 없다', solution: '팔로워 10만+ AI 인플루언서 채널에 자동 게시',
      metric: '9배', metricLabel: '전환율 향상', detail: '일반 게시 0.3% → AI 채널 2.8%'
    },
    {
      icon: '⚡', problem: '주 3~5회 콘텐츠 교체, 혼자서는 불가능', solution: '22단계 AI 파이프라인이 콘텐츠 무한 생산',
      metric: '93%', metricLabel: '시간 단축', detail: '제작 주기 4주 → 3일'
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6 section-line" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="font-en font-semibold text-[11px] uppercase tracking-[4px] text-rose-400">Problem → Solution</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5 leading-tight">
            셀러 <span className="text-warm">82%</span>가 숏폼 커머스에
            <br />진입조차 못 하고 있습니다
          </h2>
          <p className="text-gray-500 mt-5 max-w-lg mx-auto text-sm leading-relaxed">
            비용 부담 · 채널 부재 · 지속 공급 불가<br />3중 장벽을 Scenica AI가 한 번에 해결합니다
          </p>
        </div>

        <div className="space-y-4 reveal">
          {cards.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCard(i)}
              className={`w-full text-left glass rounded-2xl p-6 md:p-8 transition-all duration-500 cursor-pointer ${activeCard === i ? 'border-violet-500/20 bg-white/[0.04]' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="text-3xl">{c.icon}</div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
                    <div className="flex-1">
                      <div className="text-[10px] text-rose-400 font-en font-semibold uppercase tracking-[2px] mb-1.5">Problem</div>
                      <p className="text-gray-400 text-sm leading-relaxed">{c.problem}</p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-white/5" />
                    <div className="flex-1">
                      <div className="text-[10px] text-emerald-400 font-en font-semibold uppercase tracking-[2px] mb-1.5">Solution</div>
                      <p className="text-white text-sm font-medium leading-relaxed">{c.solution}</p>
                    </div>
                  </div>
                  {activeCard === i && (
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-4 animate-[fadeIn_0.4s_ease]">
                      <div className="font-en font-bold text-3xl text-cool">{c.metric}</div>
                      <div>
                        <div className="text-white text-sm font-medium">{c.metricLabel}</div>
                        <div className="text-gray-500 text-xs">{c.detail}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// HOW IT WORKS
// ═══════════════════════════════════════
function HowItWorks() {
  const ref = useReveal();

  return (
    <section id="how" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="font-en font-semibold text-[11px] uppercase tracking-[4px] text-violet-400">How it works</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">
            셀러가 하는 일은 <span className="text-cool">딱 2가지</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8 reveal">
          {[
            { num: '01', icon: '📦', title: '상품 등록', desc: '상품 정보와 이미지를 올리고 월 구독 가입', color: 'violet' },
            { num: '02', icon: '📊', title: '매출 확인', desc: '대시보드에서 실시간 판매 현황과 수익 확인', color: 'cyan' },
          ].map((s) => (
            <div key={s.num} className="glass rounded-2xl p-8 text-center card-glow">
              <div className="font-en font-bold text-[11px] text-gray-600 tracking-[3px] mb-4">{s.num}</div>
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-6 reveal">
          <div className="inline-flex items-center gap-3 text-gray-500 text-sm">
            <div className="w-8 h-px bg-white/10" />
            나머지는 전부 AI가 자동으로
            <div className="w-8 h-px bg-white/10" />
          </div>
        </div>

        <div className="glass rounded-2xl p-6 md:p-10 reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'AI 영상 생성', desc: '22단계 파이프라인', color: '#8B5CF6' },
              { step: '02', title: '채널 자동 게시', desc: '10만+ 팔로워 채널', color: '#A78BFA' },
              { step: '03', title: '판매 전환 추적', desc: '실시간 성과 분석', color: '#7DD3FC' },
              { step: '04', title: '수수료 자동정산', desc: '5% 자동 처리', color: '#FBBF24' },
            ].map((s, i) => (
              <div key={s.step} className="text-center group cursor-default">
                <div className="font-mono font-medium text-4xl mb-3 transition-transform duration-300 group-hover:scale-110" style={{ color: s.color }}>{s.step}</div>
                <h4 className="text-white font-semibold text-[13px] mb-1">{s.title}</h4>
                <p className="text-gray-500 text-[11px]">{s.desc}</p>
                {i < 3 && <div className="hidden md:block absolute right-0 top-1/2 text-gray-700">→</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// TRACTION
// ═══════════════════════════════════════
function Traction() {
  const ref = useReveal();

  const stats = [
    { value: '130', unit: '건', label: '상품 의뢰', sub: '누적' },
    { value: '3.2', unit: '억원', label: '누적 거래액', sub: '실 매출' },
    { value: '67', unit: '%', label: '재의뢰율', sub: '셀러 만족' },
    { value: '4.3', unit: '/5.0', label: '셀러 만족도', sub: '평균 평점' },
    { value: '2.8', unit: '%', label: 'AI 채널 전환율', sub: '일반 대비 9배' },
    { value: '3', unit: '일', label: '평균 제작 주기', sub: '기존 4주' },
  ];

  return (
    <section id="traction" className="relative py-32 px-6 section-line" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/[0.02] blur-[150px]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="font-en font-semibold text-[11px] uppercase tracking-[4px] text-amber-400">Traction</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">
            이미 <span className="text-warm">검증된 성과</span>
          </h2>
          <p className="text-gray-500 mt-4 text-sm">사전 준비 단계에서 달성한 실제 숫자</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
          {stats.map((s, i) => (
            <div key={s.label} className="stat-glow p-6 reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="font-en font-bold text-3xl md:text-4xl text-white">
                {s.value}<span className="text-lg text-violet-300">{s.unit}</span>
              </div>
              <div className="text-sm text-gray-300 mt-2">{s.label}</div>
              <div className="text-[11px] text-gray-600 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// COMPARE
// ═══════════════════════════════════════
function Compare() {
  const ref = useReveal();
  const rows = [
    { item: '영상 생성', s: '✓ 자동', a: '✓ 수동', i: '✕' },
    { item: '판매 채널', s: '✓ 10만+ 채널', a: '✕ 없음', i: '△ 섭외 필요' },
    { item: '커머스 전환 추적', s: '✓ 자동', a: '✕', i: '△ 수동' },
    { item: '월 비용', s: '3만원~', a: '2~10만원', i: '30~500만원/건' },
    { item: '콘텐츠 지속성', s: '✓ 무한', a: '△ 직접 제작', i: '✕ 건별' },
    { item: '브랜드 일관성', s: '✓ AI 학습', a: '△', i: '✕ 인플루언서 의존' },
  ];

  return (
    <section id="compare" className="py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="font-en font-semibold text-[11px] uppercase tracking-[4px] text-cyan-400">Comparison</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">
            왜 <span className="text-cool">Scenica AI</span>인가요?
          </h2>
        </div>

        <div className="glass rounded-2xl overflow-hidden reveal">
          <div className="grid grid-cols-4 text-center text-[11px] font-semibold p-5 border-b border-white/5">
            <div className="text-left text-gray-500 font-en uppercase tracking-wider">항목</div>
            <div className="text-violet-400 font-en">Scenica AI</div>
            <div className="text-gray-500 font-en">AI 영상 툴</div>
            <div className="text-gray-500 font-en">인플루언서 매칭</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.item} className={`grid grid-cols-4 text-center text-[12px] p-4 md:p-5 ${i < rows.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.015] transition-colors`}>
              <div className="text-left text-gray-400">{r.item}</div>
              <div className="text-emerald-400 font-medium">{r.s}</div>
              <div className="text-gray-600">{r.a}</div>
              <div className="text-gray-600">{r.i}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// PRICING
// ═══════════════════════════════════════
function Pricing() {
  const ref = useReveal();
  const plans = [
    {
      name: 'Starter', price: '0', period: '영원히 무료', desc: '먼저 체험해 보세요',
      features: ['AI 인플루언서 콘텐츠 3건/월', '기본 성과 리포트', '720p 영상'], highlight: false,
    },
    {
      name: 'Pro', price: '30,000', period: '월', desc: '본격적인 셀러를 위한',
      features: ['무제한 콘텐츠 생성', 'AI 인플루언서 채널 게시', '4K 영상 퀄리티', '실시간 전환 추적', '수수료 5% 자동정산', '브랜드 스타일 학습', '멀티 플랫폼 배포'], highlight: true,
    },
    {
      name: 'Enterprise', price: '별도 문의', period: '', desc: '에이전시 · 대량 운영',
      features: ['전용 AI 인플루언서 육성', 'API 연동', '팀 관리 대시보드', '전담 매니저', '우선 지원'], highlight: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 px-6 section-line" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="font-en font-semibold text-[11px] uppercase tracking-[4px] text-violet-400">Pricing</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">심플한 요금제</h2>
          <p className="text-gray-500 mt-4 text-sm">사전등록 시 <span className="text-amber-300 font-semibold">Pro 50% 할인</span></p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start reveal">
          {plans.map((p, i) => (
            <div key={p.name} className={`rounded-2xl p-7 ${p.highlight ? 'card-glow glass md:scale-[1.04] relative' : 'glass'}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              {p.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[10px] font-en font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="font-en font-bold text-base text-white">{p.name}</div>
              <p className="text-gray-500 text-xs mt-1">{p.desc}</p>
              <div className="mt-5 mb-6">
                <span className="font-en font-extrabold text-4xl text-white">
                  {p.price === '별도 문의' ? '' : '₩'}{p.price}
                </span>
                {p.period && <span className="text-gray-500 text-sm ml-1">/ {p.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-gray-300">
                    <span className="text-emerald-400 mt-0.5 text-xs">✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo('waitlist')}
                className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all cursor-pointer ${
                  p.highlight
                    ? 'btn-primary text-white relative z-10'
                    : 'border border-white/10 text-gray-300 hover:border-violet-500/40 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <span className="relative z-10">{p.highlight ? '사전등록 (50% 할인)' : p.price === '별도 문의' ? '문의하기' : '무료로 시작'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// TEAM
// ═══════════════════════════════════════
function Team() {
  const ref = useReveal();
  const members = [
    { role: '대표', focus: '플랫폼 기획·개발 총괄', skill: '프롬프트 엔지니어 자격, 130건 의뢰 3.2억 거래액', color: '#8B5CF6' },
    { role: 'CTO', focus: 'AI 개발 총괄', skill: '석사, AI 영상 모델 논문, SD 서비스 개발', color: '#7DD3FC' },
    { role: 'Backend', focus: '커머스 인프라', skill: '커머스 플랫폼 5년, 일 10만건 API', color: '#34D399' },
    { role: 'Contents', focus: 'AI 인플루언서 운영', skill: '숏폼 팔로워 5만+, 단일 영상 50만뷰', color: '#FBBF24' },
    { role: 'TTS', focus: '음성 AI', skill: '석사(음성신호처리), TTS MOS 4.0', color: '#F87171' },
    { role: 'UX/UI', focus: '셀러 경험 설계', skill: '이커머스 전환율 12% 향상', color: '#A78BFA' },
  ];

  return (
    <section id="team" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="font-en font-semibold text-[11px] uppercase tracking-[4px] text-rose-400">Team</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">
            <span className="text-warm">130건 · 3.2억</span>을<br />이미 만들어낸 팀
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
          {members.map((m, i) => (
            <div key={m.role} className="glass rounded-xl p-5 card-glow group" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-en font-bold text-sm mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: m.color + '15', color: m.color }}>
                {m.role.charAt(0)}
              </div>
              <h4 className="text-white font-bold text-sm">{m.role}</h4>
              <p className="text-xs mt-0.5" style={{ color: m.color }}>{m.focus}</p>
              <p className="text-gray-500 text-[11px] mt-3 leading-relaxed">{m.skill}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// FAQ
// ═══════════════════════════════════════
function FAQ() {
  const ref = useReveal();
  const [openIdx, setOpenIdx] = useState(null);

  const items = [
    { q: 'AI 인플루언서가 진짜 팔로워를 가지고 있나요?', a: '네. 현재 4명의 AI 인플루언서가 실제 SNS 채널을 운영하며, 평균 팔로워 10만+, 총 40만+ 이상입니다. 실제 소비자가 팔로우하고 댓글을 다는 활성 채널입니다.' },
    { q: '기존 AI 영상 툴(Sora, Runway 등)과 뭐가 다른가요?', a: '기존 AI 영상 툴은 "영상 생성"까지만 됩니다. Scenica AI는 영상 생성 → AI 인플루언서 채널 게시 → 판매 전환 추적 → 수수료 정산까지 전체 파이프라인을 자동화합니다.' },
    { q: '월 3만원 외에 추가 비용이 있나요?', a: '판매 발생 시 건당 5% 수수료가 자동정산됩니다. 판매가 없으면 구독료만 발생하고, 그 외 추가 비용은 없습니다.' },
    { q: '어떤 상품이 잘 맞나요?', a: '뷰티, 패션, 라이프스타일, 푸드 카테고리가 특히 전환율이 높습니다. 숏폼 콘텐츠로 시각적 어필이 가능한 상품이면 대부분 적합합니다.' },
    { q: '사전등록하면 어떤 혜택이 있나요?', a: 'Pro 플랜 50% 할인(월 15,000원)과 1개월 무료 체험 혜택을 드립니다. 정식 출시 시 가장 먼저 알려드립니다.' },
    { q: '언제 정식 출시되나요?', a: '2026년 하반기 정식 출시 예정입니다. 사전등록 하시면 베타 테스트에 우선 초대해 드립니다.' },
  ];

  return (
    <section id="faq" className="relative py-32 px-6 section-line" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="font-en font-semibold text-[11px] uppercase tracking-[4px] text-gray-500">FAQ</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">자주 묻는 질문</h2>
        </div>

        <div className="space-y-2 reveal">
          {items.map((item, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer group"
              >
                <span className="text-white text-sm font-medium pr-4 group-hover:text-violet-200 transition-colors">{item.q}</span>
                <div className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIdx === i ? 'bg-violet-600 border-violet-600 rotate-45' : 'group-hover:border-violet-500/30'}`}>
                  <span className="text-white text-sm font-light">+</span>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${openIdx === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-400 text-sm leading-[1.8]">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// WAITLIST
// ═══════════════════════════════════════
function Waitlist() {
  const ref = useReveal();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email) { setError('이메일을 입력해주세요'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('올바른 이메일 형식이 아닙니다'); return; }
    setError('');
    setDone(true);
  };

  return (
    <section id="waitlist" className="py-32 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/[0.06] blur-[120px]" />

        <div className="relative z-10 text-center reveal">
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mb-4">
            지금 사전등록하세요
          </h2>
          <p className="text-gray-400 text-sm mb-12 leading-relaxed">
            사전등록 시 <span className="text-white font-medium">Pro 50% 할인</span> +{' '}
            <span className="text-white font-medium">1개월 무료 체험</span>
          </p>

          {!done ? (
            <div className="glass-strong rounded-2xl p-8" style={{ boxShadow: '0 0 80px rgba(124,58,237,0.06)' }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="flex-1 px-5 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 text-sm transition-all"
                />
                <button
                  onClick={handleSubmit}
                  className="btn-primary px-8 py-4 rounded-xl text-white font-bold text-sm whitespace-nowrap relative z-10 cursor-pointer"
                >
                  <span className="relative z-10">사전등록 →</span>
                </button>
              </div>
              {error && <p className="text-rose-400 text-xs mt-3 text-left">{error}</p>}
              <p className="text-[11px] text-gray-600 mt-5">🔒 출시 알림만 보내드립니다 · 언제든 구독 해제 가능</p>
            </div>
          ) : (
            <div className="glass-strong rounded-2xl p-10 animate-[fadeIn_0.5s_ease]" style={{ boxShadow: '0 0 80px rgba(52,211,153,0.06)' }}>
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-3xl mx-auto mb-5">🎉</div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">등록 완료!</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                출시 시 가장 먼저 알려드릴게요.
                <br /><span className="text-emerald-400 font-medium">Pro 50% 할인</span> 혜택이 확보되었습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-[10px] font-en">S</span>
            </div>
            <span className="font-en font-semibold text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Scenica.AI</span>
          </button>

          <div className="flex items-center gap-8 text-[12px] text-gray-600">
            {[
              { label: '서비스', id: 'features' },
              { label: '요금', id: 'pricing' },
              { label: 'FAQ', id: 'faq' },
            ].map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-gray-300 transition-colors cursor-pointer">{l.label}</button>
            ))}
            <a href="mailto:hello@scenica.ai" className="hover:text-gray-300 transition-colors">문의</a>
          </div>

          <p className="text-[11px] text-gray-700 font-en">© 2026 Scenica AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════
// MAIN
// ═══════════════════════════════════════
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <HowItWorks />
      <Traction />
      <Compare />
      <Pricing />
      <Team />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
