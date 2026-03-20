'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Scroll Reveal Hook ───
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: '서비스', href: '#features' },
    { label: '성과', href: '#traction' },
    { label: '비교', href: '#compare' },
    { label: '요금', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00F5D4] flex items-center justify-center">
            <span className="text-white font-bold text-sm font-en">S</span>
          </div>
          <span className="font-en font-bold text-lg text-white tracking-tight">
            Scenica<span className="text-[#A29BFE]">.AI</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7 text-[13px] text-gray-400">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
          ))}
          <a href="#waitlist" className="btn-main px-5 py-2 rounded-full text-white font-semibold text-sm relative z-10">
            <span className="relative z-10">사전등록</span>
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white text-xl">
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-gray-300 text-base">{l.label}</a>
          ))}
          <a href="#waitlist" onClick={() => setMobileOpen(false)} className="btn-main px-6 py-3 rounded-full text-white font-semibold text-center relative z-10">
            <span className="relative z-10">사전등록</span>
          </a>
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════
// HERO
// ═══════════════════════════════════════
function Hero() {
  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00F5D4]/20 bg-[#00F5D4]/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse" />
          <span className="text-[13px] text-[#00F5D4] font-medium">사전등록 오픈 — Pro 50% 할인</span>
        </div>

        <h1 className="font-bold text-[2.8rem] md:text-[4.2rem] leading-[1.15] mb-6 tracking-tight">
          <span className="text-white">AI 인플루언서가</span>
          <br />
          <span className="text-gradient-hero">직접 팔아줍니다</span>
        </h1>

        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          상품만 등록하세요. 팔로워 <span className="text-white font-semibold">10만+</span> AI 인플루언서가
          <br className="hidden md:block" />
          영상 제작 → 채널 게시 → 판매까지 전부 해결합니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#waitlist" className="btn-main px-8 py-4 rounded-full text-white font-bold text-base relative z-10 w-full sm:w-auto">
            <span className="relative z-10">무료 사전등록 →</span>
          </a>
          <a href="#features" className="btn-neon px-8 py-4 rounded-full font-semibold text-base w-full sm:w-auto text-center">
            어떻게 작동하나요?
          </a>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {[
            { value: '130건', label: '상품 의뢰' },
            { value: '3.2억', label: '누적 거래액' },
            { value: '9배', label: '전환율 향상' },
            { value: '97%', label: '비용 절감' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-en font-bold text-2xl md:text-3xl text-gradient">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* AI Influencer Visual */}
        <div className="mt-20 grid grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { name: 'YUNA', followers: '12.4만', category: '뷰티', gradient: 'from-pink-500/20 to-purple-500/20' },
            { name: 'MISO', followers: '8.7만', category: '패션', gradient: 'from-blue-500/20 to-cyan-500/20' },
            { name: 'HANA', followers: '11.2만', category: '라이프', gradient: 'from-amber-500/20 to-red-500/20' },
            { name: 'RINA', followers: '9.8만', category: '푸드', gradient: 'from-green-500/20 to-teal-500/20' },
          ].map((inf, i) => (
            <div key={inf.name} className="influencer-card aspect-[3/4]" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-full h-full bg-gradient-to-b ${inf.gradient} flex items-center justify-center`}>
                <div className="text-4xl md:text-5xl opacity-40">🤖</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-en font-bold text-white text-sm">{inf.name}</div>
                    <div className="text-[10px] text-gray-400">{inf.category}</div>
                  </div>
                  <div className="text-[11px] text-[#00F5D4] font-semibold">{inf.followers}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-4">AI 인플루언서 4명 · 평균 팔로워 10만+ · 총 팔로워 40만+</p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// PROBLEM → SOLUTION (Features)
// ═══════════════════════════════════════
function Features() {
  const ref = useReveal();

  return (
    <section id="features" className="py-28 px-6 section-glow" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="text-[#FF6B6B] font-en font-semibold text-xs uppercase tracking-[3px]">Problem → Solution</span>
          <h2 className="font-bold text-3xl md:text-[2.6rem] text-white mt-4 leading-tight">
            셀러 82%가 숏폼 커머스에
            <br /><span className="text-gradient">진입조차 못 하고 있습니다</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            비용 부담 76% · 채널 부재 68% · 지속 공급 불가 61%
            <br />3중 장벽을 Scenica AI가 한 번에 해결합니다
          </p>
        </div>

        {/* Problem → Solution Cards */}
        <div className="space-y-6">
          {[
            {
              problem: '인플루언서 1회 섭외 30~500만원',
              solution: '월 3만원으로 AI 인플루언서 상시 가동',
              icon: '💰',
              metric: '97% 비용 절감',
            },
            {
              problem: '영상 제작만 가능, 판매 채널 연동 0',
              solution: '영상 생성 → 채널 게시 → 판매 추적 자동화',
              icon: '🔗',
              metric: '전환율 9배 향상',
            },
            {
              problem: '주 3~5회 콘텐츠 교체, 1인 셀러는 불가능',
              solution: '22단계 AI 파이프라인이 콘텐츠 무한 생산',
              icon: '⚡',
              metric: '제작 4주→3일',
            },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-6 md:p-8 reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] text-[#FF6B6B] font-semibold uppercase tracking-wider mb-1">Problem</div>
                    <p className="text-gray-400 text-sm">{item.problem}</p>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#00F5D4] font-semibold uppercase tracking-wider mb-1">Solution</div>
                    <p className="text-white text-sm font-medium">{item.solution}</p>
                  </div>
                </div>
                <div className="font-en font-bold text-lg text-gradient whitespace-nowrap">{item.metric}</div>
              </div>
            </div>
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
    <section className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-[#A29BFE] font-en font-semibold text-xs uppercase tracking-[3px]">How it works</span>
          <h2 className="font-bold text-3xl md:text-[2.6rem] text-white mt-4">
            셀러가 하는 일은 <span className="text-gradient">딱 2가지</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 reveal">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center text-2xl mx-auto mb-5">📦</div>
            <h3 className="text-white font-bold text-lg mb-2">1. 상품 등록</h3>
            <p className="text-gray-400 text-sm">상품 정보와 이미지를 올리고<br />월 구독 가입하면 끝</p>
          </div>
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#00F5D4]/10 border border-[#00F5D4]/20 flex items-center justify-center text-2xl mx-auto mb-5">📊</div>
            <h3 className="text-white font-bold text-lg mb-2">2. 매출 확인</h3>
            <p className="text-gray-400 text-sm">대시보드에서 실시간<br />판매 현황과 수익 확인</p>
          </div>
        </div>

        <div className="reveal">
          <p className="text-center text-gray-500 text-sm mb-8">나머지는 전부 Scenica AI가 자동으로 ↓</p>
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: '01', title: 'AI 영상 생성', desc: '22단계 파이프라인', color: '#6C5CE7' },
                { step: '02', title: '채널 자동 게시', desc: '10만+ 팔로워 채널', color: '#A29BFE' },
                { step: '03', title: '판매 전환 추적', desc: '실시간 성과 분석', color: '#00F5D4' },
                { step: '04', title: '수수료 자동정산', desc: '5% 자동 정산', color: '#FFD93D' },
              ].map((s, i) => (
                <div key={s.step} className="text-center p-4">
                  <div className="font-en font-bold text-3xl mb-2" style={{ color: s.color }}>{s.step}</div>
                  <h4 className="text-white font-semibold text-sm mb-1">{s.title}</h4>
                  <p className="text-gray-500 text-xs">{s.desc}</p>
                </div>
              ))}
            </div>
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

  return (
    <section id="traction" className="py-28 px-6 section-glow" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-[#FFD93D] font-en font-semibold text-xs uppercase tracking-[3px]">Traction</span>
          <h2 className="font-bold text-3xl md:text-[2.6rem] text-white mt-4">
            이미 <span className="text-gradient-warm">검증된 성과</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm">사전 준비 단계에서 달성한 실제 숫자입니다</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
          {[
            { value: '130건', label: '상품 의뢰', sub: '누적 거래' },
            { value: '3.2억원', label: '누적 거래액', sub: '실 매출' },
            { value: '67%', label: '재의뢰율', sub: '셀러 만족도 기반' },
            { value: '4.3/5.0', label: '셀러 만족도', sub: '평균 평점' },
            { value: '2.8%', label: 'AI 채널 전환율', sub: '일반 대비 9배' },
            { value: '3일', label: '제작 주기', sub: '기존 4주 대비' },
          ].map((s, i) => (
            <div key={s.label} className="stat-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="font-en font-bold text-2xl md:text-3xl text-white">{s.value}</div>
              <div className="text-sm text-gray-300 mt-1">{s.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
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

  return (
    <section id="compare" className="py-28 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-[#00F5D4] font-en font-semibold text-xs uppercase tracking-[3px]">Comparison</span>
          <h2 className="font-bold text-3xl md:text-[2.6rem] text-white mt-4">
            왜 <span className="text-gradient">Scenica AI</span>인가요?
          </h2>
        </div>

        <div className="glass rounded-2xl overflow-hidden reveal">
          <div className="grid grid-cols-4 gap-0 text-center text-xs font-semibold text-gray-400 p-4 border-b border-white/5">
            <div className="text-left">항목</div>
            <div className="text-[#6C5CE7]">Scenica AI</div>
            <div>AI 영상 툴</div>
            <div>인플루언서 매칭</div>
          </div>
          {[
            { item: '영상 생성', scenica: '✓ 자동', ai: '✓ 수동', inf: '✕' },
            { item: '판매 채널', scenica: '✓ 10만+ 채널', ai: '✕ 없음', inf: '△ 섭외 필요' },
            { item: '커머스 전환', scenica: '✓ 자동 추적', ai: '✕', inf: '△ 수동' },
            { item: '월 비용', scenica: '3만원~', ai: '2~10만원', inf: '30~500만원/건' },
            { item: '콘텐츠 지속성', scenica: '✓ 무한', ai: '△ 직접 제작', inf: '✕ 건당 계약' },
            { item: '브랜드 일관성', scenica: '✓ AI 학습', ai: '△', inf: '✕ 인플루언서 의존' },
          ].map((row) => (
            <div key={row.item} className="grid grid-cols-4 gap-0 text-center text-sm compare-row p-4">
              <div className="text-left text-gray-400 text-xs">{row.item}</div>
              <div className="text-[#00F5D4] font-medium text-xs">{row.scenica}</div>
              <div className="text-gray-500 text-xs">{row.ai}</div>
              <div className="text-gray-500 text-xs">{row.inf}</div>
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
      name: 'Starter',
      price: '0',
      period: '영원히 무료',
      desc: '먼저 체험해 보세요',
      features: ['AI 인플루언서 콘텐츠 3건/월', '기본 성과 리포트', '720p 영상'],
      highlight: false,
    },
    {
      name: 'Pro',
      price: '30,000',
      period: '월',
      desc: '본격적인 셀러를 위한',
      features: ['무제한 콘텐츠 생성', 'AI 인플루언서 채널 게시', '4K 영상', '실시간 전환 추적', '수수료 5% 자동정산', '브랜드 스타일 학습'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: '별도 문의',
      period: '',
      desc: '에이전시 · 대량 운영',
      features: ['전용 AI 인플루언서 육성', 'API 연동', '팀 관리 대시보드', '우선 지원'],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 px-6 section-glow" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-[#A29BFE] font-en font-semibold text-xs uppercase tracking-[3px]">Pricing</span>
          <h2 className="font-bold text-3xl md:text-[2.6rem] text-white mt-4">심플한 요금제</h2>
          <p className="text-gray-400 mt-3 text-sm">사전등록 시 <span className="text-[#FFD93D] font-semibold">Pro 50% 할인</span></p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start reveal">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`rounded-2xl p-7 ${p.highlight ? 'pricing-glow glass relative md:scale-105' : 'glass'}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {p.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] text-white text-[10px] font-bold font-en uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="font-en font-bold text-lg text-white">{p.name}</h3>
              <p className="text-gray-500 text-xs mt-1">{p.desc}</p>
              <div className="mt-5 mb-6">
                <span className="font-en font-extrabold text-4xl text-white">
                  {p.price === '별도 문의' ? '' : '₩'}{p.price}
                </span>
                {p.period && <span className="text-gray-500 text-sm ml-1">/ {p.period}</span>}
              </div>
              <ul className="space-y-2.5 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-[#00F5D4] mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className={`block text-center py-3 rounded-full font-semibold text-sm transition-all ${
                p.highlight ? 'btn-main text-white relative z-10' : 'border border-white/10 text-gray-300 hover:border-[#6C5CE7]/50 hover:text-white'
              }`}>
                <span className="relative z-10">{p.highlight ? '사전등록 (50% 할인)' : p.price === '별도 문의' ? '문의하기' : '무료로 시작'}</span>
              </a>
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
    { role: '대표', focus: '플랫폼 기획·개발 총괄', bg: '프롬프트 엔지니어 자격, 130건 의뢰·3.2억 거래액 달성' },
    { role: 'CTO', focus: 'AI 개발 총괄', bg: '석사, AI 영상 모델 논문, Stable Diffusion 서비스 개발' },
    { role: '백엔드', focus: '커머스 인프라', bg: '커머스 플랫폼 5년, 일 10만건 API 설계' },
    { role: '콘텐츠 매니저', focus: 'AI 인플루언서 운영', bg: '숏폼 팔로워 5만+, 단일 영상 50만 조회' },
    { role: 'TTS 엔지니어', focus: '음성 AI', bg: '석사(음성신호처리), 한국어 TTS MOS 4.0' },
    { role: 'UX/UI', focus: '셀러 경험 설계', bg: '이커머스 전환율 12% 향상' },
  ];

  return (
    <section className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-[#FF6B6B] font-en font-semibold text-xs uppercase tracking-[3px]">Team</span>
          <h2 className="font-bold text-3xl md:text-[2.6rem] text-white mt-4">
            <span className="text-gradient-warm">130건 의뢰 · 3.2억 거래액</span>을
            <br />이미 만들어낸 팀
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
          {members.map((m, i) => (
            <div key={m.role} className="glass rounded-xl p-5" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C5CE7]/20 to-[#00F5D4]/20 flex items-center justify-center text-white font-en font-bold text-sm mb-3">
                {m.role.charAt(0)}
              </div>
              <h4 className="text-white font-bold text-sm">{m.role}</h4>
              <p className="text-[#A29BFE] text-xs mt-0.5">{m.focus}</p>
              <p className="text-gray-500 text-[11px] mt-2 leading-relaxed">{m.bg}</p>
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
  const [open, setOpen] = useState(null);

  const items = [
    { q: 'AI 인플루언서가 진짜 팔로워를 가지고 있나요?', a: '네. 현재 4명의 AI 인플루언서가 실제 SNS 채널을 운영하고 있으며, 평균 팔로워 10만+, 총 40만+ 이상입니다. 실제 소비자가 팔로우하고 댓글을 다는 활성 채널입니다.' },
    { q: '기존 AI 영상 툴(Sora, Runway 등)과 뭐가 다른가요?', a: '기존 AI 영상 툴은 "영상 생성"까지만 가능합니다. Scenica AI는 영상 생성 → AI 인플루언서 채널 게시 → 판매 전환 추적 → 수수료 정산까지 전체 파이프라인을 자동화합니다.' },
    { q: '월 3만원 외에 추가 비용이 있나요?', a: '판매가 발생하면 건당 5% 수수료가 자동정산됩니다. 판매가 없으면 월 구독료 3만원만 발생합니다. 추가 비용은 없습니다.' },
    { q: '어떤 상품이 잘 맞나요?', a: '뷰티, 패션, 라이프스타일, 푸드 카테고리가 특히 전환율이 높습니다. 숏폼 콘텐츠로 시각적 어필이 가능한 상품이면 대부분 적합합니다.' },
    { q: '사전등록하면 어떤 혜택이 있나요?', a: 'Pro 플랜 50% 할인(월 15,000원)과 1개월 무료 체험 혜택을 받으실 수 있습니다. 정식 출시 시 가장 먼저 알려드립니다.' },
  ];

  return (
    <section id="faq" className="py-28 px-6 section-glow" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-gray-400 font-en font-semibold text-xs uppercase tracking-[3px]">FAQ</span>
          <h2 className="font-bold text-3xl md:text-[2.6rem] text-white mt-4">자주 묻는 질문</h2>
        </div>

        <div className="space-y-3 reveal">
          {items.map((item, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white text-sm font-medium pr-4">{item.q}</span>
                <span className="text-gray-400 text-lg flex-shrink-0">{open === i ? '−' : '+'}</span>
              </button>
              <div className={`px-5 text-gray-400 text-sm leading-relaxed transition-all duration-300 ${open === i ? 'pb-5 max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {item.a}
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

  return (
    <section id="waitlist" className="py-28 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center reveal">
        <h2 className="font-bold text-3xl md:text-[2.6rem] text-white mb-4">
          지금 사전등록하세요
        </h2>
        <p className="text-gray-400 text-sm mb-10 leading-relaxed">
          사전등록 시 <span className="text-white font-medium">Pro 50% 할인</span> +{' '}
          <span className="text-white font-medium">1개월 무료 체험</span>
        </p>

        {!done ? (
          <div className="glass rounded-2xl p-8" style={{ boxShadow: '0 0 60px rgba(108,92,231,0.1)' }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm"
              />
              <button
                onClick={() => email && setDone(true)}
                className="btn-main px-8 py-4 rounded-xl text-white font-bold text-sm whitespace-nowrap relative z-10"
              >
                <span className="relative z-10">사전등록 →</span>
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-4">🔒 출시 알림만 보내드립니다. 언제든 구독 해제 가능.</p>
          </div>
        ) : (
          <div className="glass rounded-2xl p-8" style={{ boxShadow: '0 0 60px rgba(0,245,212,0.1)' }}>
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-bold text-2xl text-white mb-2">등록 완료!</h3>
            <p className="text-gray-400 text-sm">출시 시 가장 먼저 알려드릴게요.<br />Pro 50% 할인 혜택이 확보되었습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#6C5CE7] to-[#00F5D4] flex items-center justify-center">
            <span className="text-white font-bold text-[10px] font-en">S</span>
          </div>
          <span className="font-en font-semibold text-sm text-gray-500">Scenica.AI</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-600">
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
          <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          <a href="mailto:hello@scenica.ai" className="hover:text-white transition-colors">문의</a>
        </div>
        <p className="text-[11px] text-gray-700">© 2026 Scenica AI. All rights reserved.</p>
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
