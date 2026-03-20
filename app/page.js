'use client';

import { useState, useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
}

function Counter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(end.replace(/[^0-9.]/g, ''));
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / 2000, 1);
          setCount(+(p * num).toFixed(1));
          if (p < 1) requestAnimationFrame(tick); else setCount(num);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{count % 1 === 0 ? Math.floor(count) : count}{suffix}</span>;
}

function YTCard({ videoId, title, subtitle }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-violet-500/30 transition-all duration-500 hover:shadow-[0_0_60px_-20px_rgba(124,58,237,0.2)] cursor-pointer" onClick={() => !playing && setPlaying(true)}>
      {!playing ? (
        <>
          <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt={title || ''} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-violet-600/80 group-hover:border-violet-400/50 group-hover:scale-110 transition-all duration-300">
              <svg width="20" height="24" viewBox="0 0 20 24" fill="white"><polygon points="2,0 20,12 2,24" /></svg>
            </div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-white font-semibold text-sm">{title}</div>
              {subtitle && <div className="text-gray-400 text-xs mt-0.5">{subtitle}</div>}
            </div>
          )}
        </>
      ) : (
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`} className="w-full aspect-video" allow="autoplay; encrypted-media" allowFullScreen />
      )}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [
    { id: 'showcase', label: 'AI 콘텐츠' },
    { id: 'features', label: '서비스' },
    { id: 'traction', label: '성과' },
    { id: 'pricing', label: '요금' },
    { id: 'faq', label: 'FAQ' },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-[#050507]/90 backdrop-blur-2xl border-b border-white/[0.04]' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-sm font-en">S</span>
          </div>
          <span className="font-en font-semibold text-[17px] text-white tracking-tight">Scenica<span className="text-violet-400">.AI</span></span>
        </button>
        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="px-4 py-2 rounded-full text-[13px] font-medium text-gray-500 hover:text-white transition-all cursor-pointer">{l.label}</button>
          ))}
          <div className="w-px h-5 bg-white/10 mx-3" />
          <button onClick={() => scrollTo('waitlist')} className="btn-primary px-6 py-2.5 rounded-full text-white font-semibold text-[13px] relative z-10 cursor-pointer"><span className="relative z-10">사전등록</span></button>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-2xl cursor-pointer">{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <div className="lg:hidden bg-[#050507]/98 backdrop-blur-2xl border-t border-white/5 px-6 py-6 flex flex-col gap-1">
          {links.map(l => (<button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false); }} className="text-left text-gray-300 py-3 text-base cursor-pointer">{l.label}</button>))}
          <button onClick={() => { scrollTo('waitlist'); setOpen(false); }} className="btn-primary mt-3 py-3.5 rounded-full text-white font-semibold text-center relative z-10 cursor-pointer"><span className="relative z-10">무료 사전등록 →</span></button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 opacity-[0.07]">
        <img src="https://img.youtube.com/vi/VU52Kx2AXL8/maxresdefault.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#050507]/50 to-[#050507]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="text-[13px] text-emerald-400 font-medium">사전등록 오픈 — Pro 50% 할인</span>
        </div>
        <h1 className="font-display text-[2.6rem] sm:text-[3.4rem] md:text-[4.5rem] font-bold leading-[1.08] mb-8 tracking-tight">
          <span className="text-white">AI 인플루언서가</span><br />
          <span className="text-shine">직접 팔아줍니다</span>
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-[1.8]">
          상품만 등록하세요. 팔로워 <span className="text-white font-semibold">10만+</span> AI 인플루언서가
          <br className="hidden md:block" />영상 제작 → 채널 게시 → 판매까지 <span className="text-violet-300">전부 자동</span>으로.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button onClick={() => scrollTo('waitlist')} className="btn-primary px-10 py-4 rounded-full text-white font-bold text-[15px] relative z-10 w-full sm:w-auto cursor-pointer"><span className="relative z-10">무료 사전등록 →</span></button>
          <button onClick={() => scrollTo('showcase')} className="btn-ghost px-10 py-4 rounded-full font-semibold text-[15px] w-full sm:w-auto cursor-pointer">AI 콘텐츠 보기</button>
        </div>
        <div className="max-w-3xl mx-auto">
          <YTCard videoId="VU52Kx2AXL8" title="Scenica AI · 시네마틱 숏폼" subtitle="AI 인플루언서가 만드는 프리미엄 콘텐츠" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mt-16">
          {[
            { end: '130', suffix: '건', label: '상품 의뢰' },
            { end: '3.2', suffix: '억', label: '누적 거래액' },
            { end: '9', suffix: '배', label: '전환율 향상' },
            { end: '97', suffix: '%', label: '비용 절감' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-en font-bold text-2xl md:text-3xl text-cool"><Counter end={s.end} suffix={s.suffix} /></div>
              <div className="font-en text-[11px] text-gray-500 mt-1.5 tracking-wider uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ['숏폼 시장 83조원', '국내 이용률 78.9%', '셀러 82% 미진입', '전환율 9배', '비용 97% 절감', '제작 4주→3일', '재의뢰율 67%'];
  return (
    <div className="py-5 border-y border-white/[0.03] overflow-hidden">
      <div className="marquee flex whitespace-nowrap gap-12">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-en text-[11px] text-gray-600 tracking-wider uppercase flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-violet-500/30" />{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Showcase() {
  const ref = useReveal();
  const videos = [
    { id: 'YFU4erbddog', title: 'AI 뷰티 인플루언서', subtitle: 'YUNA · Beauty' },
    { id: 'LygFajnhLFY', title: 'AI 패션 인플루언서', subtitle: 'MISO · Fashion' },
    { id: 'rxWNmzQpW2c', title: 'AI 라이프 인플루언서', subtitle: 'HANA · Lifestyle' },
    { id: 'RPmqjTwdVP8', title: 'AI 푸드 인플루언서', subtitle: 'RINA · Food' },
    { id: 'ttR0eoHz9Bg', title: '숏폼 광고 콘텐츠', subtitle: '상품 프로모션' },
    { id: 'VU52Kx2AXL8', title: '시네마틱 브랜드 필름', subtitle: '프리미엄 브랜드' },
  ];
  return (
    <section id="showcase" className="relative py-28 px-6 section-line" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="font-en text-violet-400 text-[11px] uppercase tracking-[4px] font-semibold">AI Contents</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">AI가 만든 콘텐츠,<br /><span className="text-cool">사람과 구별할 수 없습니다</span></h2>
          <p className="text-gray-500 mt-4 text-sm">클릭해서 직접 확인하세요</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
          {videos.map((v, i) => (
            <div key={v.id + i} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <YTCard videoId={v.id} title={v.title} subtitle={v.subtitle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const ref = useReveal();
  const [active, setActive] = useState(0);
  const cards = [
    { icon: '💰', problem: '인플루언서 1회 섭외 30~500만원', solution: '월 3만원으로 AI 인플루언서 상시 가동', metric: '97%', label: '비용 절감', detail: '월 800만원 → 28만원' },
    { icon: '📡', problem: '영상 만들어도 팔아줄 채널이 없다', solution: '팔로워 10만+ AI 채널에 자동 게시', metric: '9배', label: '전환율 향상', detail: '일반 0.3% → AI 2.8%' },
    { icon: '⚡', problem: '주 3~5회 콘텐츠 교체, 혼자 불가', solution: '22단계 AI 파이프라인 무한 생산', metric: '93%', label: '시간 단축', detail: '4주 → 3일' },
  ];
  return (
    <section id="features" className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="font-en text-rose-400 text-[11px] uppercase tracking-[4px] font-semibold">Problem → Solution</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5 leading-tight">셀러 <span className="text-warm">82%</span>가 숏폼 커머스에<br />진입조차 못 합니다</h2>
        </div>
        <div className="space-y-3 reveal">
          {cards.map((c, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-full text-left glass rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-500 ${active === i ? 'border-violet-500/20 bg-white/[0.04]' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="text-3xl">{c.icon}</div>
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-en text-[10px] text-rose-400 font-semibold uppercase tracking-[2px] mb-1">Problem</div>
                    <p className="text-gray-400 text-sm">{c.problem}</p>
                  </div>
                  <div>
                    <div className="font-en text-[10px] text-emerald-400 font-semibold uppercase tracking-[2px] mb-1">Solution</div>
                    <p className="text-white text-sm font-medium">{c.solution}</p>
                  </div>
                </div>
                {active === i && (
                  <div className="flex items-center gap-3">
                    <div className="font-en font-bold text-3xl text-cool">{c.metric}</div>
                    <div><div className="text-white text-sm font-medium">{c.label}</div><div className="text-gray-500 text-xs">{c.detail}</div></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useReveal();
  return (
    <section className="relative py-28 px-6 section-line" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="font-en text-violet-400 text-[11px] uppercase tracking-[4px] font-semibold">How it works</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">셀러가 하는 일은 <span className="text-cool">딱 2가지</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mb-6 reveal">
          {[{ n: '01', icon: '📦', t: '상품 등록', d: '상품 정보 + 이미지 올리고 월 구독', c: '#8B5CF6' }, { n: '02', icon: '📊', t: '매출 확인', d: '대시보드에서 실시간 수익 확인', c: '#7DD3FC' }].map(s => (
            <div key={s.n} className="glass rounded-2xl p-8 text-center card-glow">
              <div className="font-mono text-[11px] font-medium tracking-[3px] mb-4" style={{ color: s.c }}>{s.n}</div>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{s.t}</h3>
              <p className="text-gray-400 text-sm">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center text-gray-600 text-sm mb-5 reveal">↓ 나머지는 전부 AI가 자동 ↓</div>
        <div className="glass rounded-2xl p-8 reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ s: '01', t: 'AI 영상 생성', d: '22단계 파이프라인', c: '#8B5CF6' }, { s: '02', t: '채널 자동 게시', d: '10만+ 팔로워', c: '#A78BFA' }, { s: '03', t: '판매 전환 추적', d: '실시간 분석', c: '#7DD3FC' }, { s: '04', t: '수수료 정산', d: '5% 자동', c: '#FBBF24' }].map(x => (
              <div key={x.s} className="text-center">
                <div className="font-mono text-3xl font-bold mb-2" style={{ color: x.c }}>{x.s}</div>
                <h4 className="text-white font-semibold text-[13px] mb-1">{x.t}</h4>
                <p className="text-gray-500 text-[11px]">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Traction() {
  const ref = useReveal();
  return (
    <section id="traction" className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="font-en text-amber-400 text-[11px] uppercase tracking-[4px] font-semibold">Traction</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">이미 <span className="text-warm">검증된 성과</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
          {[{ v: '130', u: '건', l: '상품 의뢰' }, { v: '3.2', u: '억원', l: '누적 거래액' }, { v: '67', u: '%', l: '재의뢰율' }, { v: '4.3', u: '/5.0', l: '셀러 만족도' }, { v: '2.8', u: '%', l: 'AI 전환율' }, { v: '3', u: '일', l: '제작 주기' }].map((s, i) => (
            <div key={s.l} className="stat-glow p-6" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="font-en text-3xl md:text-4xl font-bold text-white">{s.v}<span className="text-lg text-violet-300">{s.u}</span></div>
              <div className="text-sm text-gray-300 mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compare() {
  const ref = useReveal();
  return (
    <section id="compare" className="relative py-28 px-6 section-line" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="font-en text-cyan-400 text-[11px] uppercase tracking-[4px] font-semibold">Comparison</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">왜 <span className="text-cool">Scenica AI</span>인가요?</h2>
        </div>
        <div className="glass rounded-2xl overflow-hidden reveal">
          <div className="grid grid-cols-4 text-center text-[11px] font-semibold p-5 border-b border-white/5">
            <div className="text-left text-gray-500">항목</div><div className="text-violet-400">Scenica AI</div><div className="text-gray-600">AI 영상 툴</div><div className="text-gray-600">인플루언서 매칭</div>
          </div>
          {[['영상 생성','✓ 자동','✓ 수동','✕'],['판매 채널','✓ 10만+ 채널','✕ 없음','△ 섭외'],['커머스 전환','✓ 자동 추적','✕','△ 수동'],['월 비용','3만원~','2~10만원','30~500만원/건'],['콘텐츠 지속','✓ 무한','△ 직접','✕ 건별'],['브랜드 일관성','✓ AI 학습','△','✕']].map((r,i) => (
            <div key={i} className={`grid grid-cols-4 text-center text-[12px] p-4 ${i<5?'border-b border-white/[0.03]':''} hover:bg-white/[0.015] transition-colors`}>
              <div className="text-left text-gray-400">{r[0]}</div><div className="text-emerald-400 font-medium">{r[1]}</div><div className="text-gray-600">{r[2]}</div><div className="text-gray-600">{r[3]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const ref = useReveal();
  const plans = [
    { name: 'Starter', price: '0', period: '영원히 무료', desc: '체험용', features: ['AI 콘텐츠 3건/월','기본 리포트','720p'], hl: false },
    { name: 'Pro', price: '30,000', period: '월', desc: '본격 셀러용', features: ['무제한 콘텐츠','AI 채널 게시','4K 영상','실시간 추적','수수료 5% 자동정산','브랜드 학습','멀티 플랫폼'], hl: true },
    { name: 'Enterprise', price: '별도 문의', period: '', desc: '에이전시용', features: ['전용 AI 인플루언서','API 연동','팀 대시보드','전담 매니저'], hl: false },
  ];
  return (
    <section id="pricing" className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="font-en text-violet-400 text-[11px] uppercase tracking-[4px] font-semibold">Pricing</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">심플한 요금제</h2>
          <p className="text-gray-500 mt-4 text-sm">사전등록 시 <span className="text-amber-300 font-semibold">Pro 50% 할인</span></p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 items-start reveal">
          {plans.map((p,i) => (
            <div key={p.name} className={`rounded-2xl p-7 ${p.hl?'card-glow glass md:scale-[1.04] relative':'glass'}`}>
              {p.hl && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[10px] font-en font-bold uppercase tracking-wider">Most Popular</div>}
              <div className="font-en text-white font-bold text-base">{p.name}</div>
              <p className="text-gray-500 text-xs mt-1">{p.desc}</p>
              <div className="mt-5 mb-6"><span className="font-en font-extrabold text-4xl text-white">{p.price==='별도 문의'?'':'₩'}{p.price}</span>{p.period&&<span className="text-gray-500 text-sm ml-1">/ {p.period}</span>}</div>
              <ul className="space-y-2.5 mb-8">{p.features.map(f=><li key={f} className="flex items-start gap-2.5 text-[13px] text-gray-300"><span className="text-emerald-400 mt-0.5 text-xs">✓</span>{f}</li>)}</ul>
              <button onClick={()=>scrollTo('waitlist')} className={`w-full py-3.5 rounded-full font-semibold text-sm cursor-pointer transition-all ${p.hl?'btn-primary text-white relative z-10':'border border-white/10 text-gray-300 hover:border-violet-500/40 hover:text-white'}`}>
                <span className="relative z-10">{p.hl?'사전등록 (50% 할인)':p.price==='별도 문의'?'문의하기':'무료로 시작'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const ref = useReveal();
  const m = [
    { role:'대표',focus:'플랫폼 기획·개발',skill:'프롬프트 엔지니어, 130건·3.2억',c:'#8B5CF6' },
    { role:'CTO',focus:'AI 개발 총괄',skill:'석사, AI 영상 모델 논문',c:'#7DD3FC' },
    { role:'Backend',focus:'커머스 인프라',skill:'커머스 5년, 일 10만건 API',c:'#34D399' },
    { role:'Contents',focus:'AI 인플루언서 운영',skill:'팔로워 5만+, 50만뷰',c:'#FBBF24' },
    { role:'TTS',focus:'음성 AI',skill:'석사(음성처리), MOS 4.0',c:'#F87171' },
    { role:'UX/UI',focus:'셀러 경험 설계',skill:'전환율 12% 향상',c:'#A78BFA' },
  ];
  return (
    <section className="relative py-28 px-6 section-line" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="font-en text-rose-400 text-[11px] uppercase tracking-[4px] font-semibold">Team</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5"><span className="text-warm">130건 · 3.2억</span>을 만든 팀</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
          {m.map(x=>(
            <div key={x.role} className="glass rounded-xl p-5 card-glow group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-en font-bold text-sm mb-3 group-hover:scale-110 transition-transform" style={{background:x.c+'15',color:x.c}}>{x.role[0]}</div>
              <h4 className="text-white font-bold text-sm">{x.role}</h4>
              <p className="text-xs mt-0.5" style={{color:x.c}}>{x.focus}</p>
              <p className="text-gray-500 text-[11px] mt-3 leading-relaxed">{x.skill}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const ref = useReveal();
  const [oi,setOi] = useState(null);
  const items = [
    {q:'AI 인플루언서가 진짜 팔로워를 가지고 있나요?',a:'네. 4명의 AI 인플루언서가 실제 SNS 채널을 운영하며 평균 팔로워 10만+, 총 40만+입니다.'},
    {q:'기존 AI 영상 툴과 뭐가 다른가요?',a:'기존 툴은 영상 생성까지만. Scenica AI는 영상→채널 게시→판매 추적→수수료 정산 전부 자동화합니다.'},
    {q:'월 3만원 외에 추가 비용?',a:'판매 발생 시 건당 5% 수수료 자동정산. 판매 없으면 구독료만.'},
    {q:'어떤 상품이 잘 맞나요?',a:'뷰티, 패션, 라이프스타일, 푸드 카테고리가 전환율이 높습니다.'},
    {q:'사전등록 혜택은?',a:'Pro 50% 할인(월 15,000원) + 1개월 무료 체험 + 베타 우선 초대.'},
    {q:'언제 출시?',a:'2026년 하반기 예정. 사전등록 시 베타 우선 초대됩니다.'},
  ];
  return (
    <section id="faq" className="py-28 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="font-en text-gray-500 text-[11px] uppercase tracking-[4px] font-semibold">FAQ</span>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mt-5">자주 묻는 질문</h2>
        </div>
        <div className="space-y-2 reveal">
          {items.map((item,i)=>(
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button onClick={()=>setOi(oi===i?null:i)} className="w-full flex items-center justify-between p-5 text-left cursor-pointer group">
                <span className="text-white text-sm font-medium pr-4 group-hover:text-violet-200 transition-colors">{item.q}</span>
                <div className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${oi===i?'bg-violet-600 border-violet-600 rotate-45':'group-hover:border-violet-500/30'}`}><span className="text-white text-sm">+</span></div>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${oi===i?'max-h-40 opacity-100':'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-5 text-gray-400 text-sm leading-[1.8]">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  const ref = useReveal();
  const [email,setEmail] = useState('');
  const [done,setDone] = useState(false);
  const [err,setErr] = useState('');
  const submit = () => {
    if(!email){setErr('이메일을 입력해주세요');return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setErr('올바른 이메일 형식이 아닙니다');return;}
    setErr('');setDone(true);
  };
  return (
    <section id="waitlist" className="relative py-28 px-6 section-line" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/[0.05] blur-[120px]" />
      <div className="max-w-2xl mx-auto relative z-10 text-center reveal">
        <h2 className="font-display text-3xl md:text-[2.8rem] font-bold text-white mb-4">지금 사전등록하세요</h2>
        <p className="text-gray-400 text-sm mb-12"><span className="text-white font-medium">Pro 50% 할인</span> + <span className="text-white font-medium">1개월 무료</span></p>
        {!done?(
          <div className="glass-strong rounded-2xl p-8" style={{boxShadow:'0 0 80px rgba(124,58,237,0.06)'}}>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="이메일 주소를 입력하세요" value={email} onChange={e=>{setEmail(e.target.value);setErr('');}} onKeyDown={e=>e.key==='Enter'&&submit()}
                className="flex-1 px-5 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 text-sm" />
              <button onClick={submit} className="btn-primary px-8 py-4 rounded-xl text-white font-bold text-sm relative z-10 cursor-pointer"><span className="relative z-10">사전등록 →</span></button>
            </div>
            {err&&<p className="text-rose-400 text-xs mt-3 text-left">{err}</p>}
            <p className="text-[11px] text-gray-600 mt-5">🔒 출시 알림만 보내드립니다 · 언제든 해제 가능</p>
          </div>
        ):(
          <div className="glass-strong rounded-2xl p-10" style={{boxShadow:'0 0 80px rgba(52,211,153,0.06)'}}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-3xl mx-auto mb-5">🎉</div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">등록 완료!</h3>
            <p className="text-gray-400 text-sm">출시 시 가장 먼저 알려드릴게요.<br /><span className="text-emerald-400 font-medium">Pro 50% 할인</span> 혜택이 확보되었습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform"><span className="text-white font-bold text-[10px] font-en">S</span></div>
          <span className="font-en font-semibold text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Scenica.AI</span>
        </button>
        <div className="flex items-center gap-8 text-[12px] text-gray-600">
          {[{l:'서비스',id:'features'},{l:'요금',id:'pricing'},{l:'FAQ',id:'faq'}].map(x=>(
            <button key={x.id} onClick={()=>scrollTo(x.id)} className="hover:text-gray-300 transition-colors cursor-pointer">{x.l}</button>
          ))}
          <a href="mailto:hello@scenica.ai" className="hover:text-gray-300 transition-colors">문의</a>
        </div>
        <p className="font-en text-[11px] text-gray-700">© 2026 Scenica AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Showcase />
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
