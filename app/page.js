'use client';

import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════
   SCENICA AI — Landing Page
   ═══════════════════════════════════════════ */

// ─── Intersection Observer Hook ───
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Navigation ───
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-scenica-dark/80 backdrop-blur-xl border-b border-scenica-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-scenica-accent to-scenica-cyan flex items-center justify-center">
            <span className="text-white font-bold text-sm font-display">S</span>
          </div>
          <span className="font-display font-bold text-lg text-white tracking-tight">
            Scenica<span className="text-scenica-accent">.AI</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">기능</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">사용법</a>
          <a href="#pricing" className="hover:text-white transition-colors">요금</a>
          <a
            href="#waitlist"
            className="btn-primary px-5 py-2 rounded-full text-white font-semibold text-sm relative z-10"
          >
            <span className="relative z-10">사전등록</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ───
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden pt-16">
      {/* Decorative Orbs */}
      <div className="orb w-[500px] h-[500px] bg-scenica-accent/20 -top-40 -left-40" />
      <div className="orb w-[400px] h-[400px] bg-scenica-cyan/10 top-1/3 -right-32" />
      <div className="orb w-[300px] h-[300px] bg-scenica-magenta/10 bottom-20 left-1/4" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-scenica-accent/30 bg-scenica-accent/5 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-scenica-cyan animate-glow-pulse" />
          <span className="text-sm text-scenica-cyan font-medium">사전등록 오픈</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-extrabold text-5xl md:text-7xl leading-tight mb-6 animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          상품 사진 <span className="gradient-text">1장</span>이
          <br />
          광고 영상이 됩니다
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          AI가 촬영부터 편집까지. 장비도, 전문가도 필요 없습니다.
          <br className="hidden md:block" />
          소상공인 셀러를 위한 <span className="text-white font-medium">원클릭 영상 제작 플랫폼</span>
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: '0.5s' }}
        >
          <a
            href="#waitlist"
            className="btn-primary px-8 py-4 rounded-full text-white font-bold text-lg relative z-10 w-full sm:w-auto"
          >
            <span className="relative z-10">무료 사전등록 →</span>
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-full border border-scenica-border text-gray-300 font-semibold hover:border-scenica-accent/50 hover:text-white transition-all w-full sm:w-auto"
          >
            어떻게 작동하나요?
          </a>
        </div>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-8 md:gap-16 mt-16 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          {[
            { num: '22단계', label: 'AI 시네마 파이프라인' },
            { num: '3분', label: '영상 완성 시간' },
            { num: '₩0', label: '장비 투자 비용' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-2xl md:text-3xl gradient-text-static">
                {stat.num}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Visual Mockup */}
        <div className="mt-20 relative animate-float">
          <div className="glass-card rounded-2xl p-1 glow-accent max-w-3xl mx-auto">
            <div className="bg-scenica-deeper rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="text-xs text-gray-500 font-mono">scenica.ai/studio</div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="aspect-square bg-scenica-card rounded-lg border border-dashed border-scenica-border flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📸</div>
                    <div className="text-xs text-gray-500">상품 사진 업로드</div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl">✨</div>
                  <div className="h-12 w-px bg-gradient-to-b from-scenica-accent to-scenica-cyan" />
                  <div className="px-3 py-1.5 rounded-full bg-scenica-accent/10 border border-scenica-accent/20">
                    <span className="text-xs text-scenica-accent font-semibold">AI 처리 중...</span>
                  </div>
                  <div className="h-12 w-px bg-gradient-to-b from-scenica-cyan to-scenica-magenta" />
                  <div className="text-2xl">🎬</div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-scenica-accent/20 to-scenica-magenta/20 rounded-lg border border-scenica-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎥</div>
                    <div className="text-xs text-gray-400">광고 영상 완성</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ───
function Features() {
  const containerRef = useReveal();

  const features = [
    {
      icon: '🎯',
      title: '원클릭 영상 생성',
      desc: '상품 이미지 1장만 업로드하세요. AI가 컨셉부터 편집까지 알아서 완성합니다.',
      accent: 'from-scenica-accent to-purple-500',
    },
    {
      icon: '🎬',
      title: '시네마급 퀄리티',
      desc: '22단계 AI 파이프라인이 전문 스튜디오 수준의 광고 영상을 만들어냅니다.',
      accent: 'from-scenica-cyan to-blue-500',
    },
    {
      icon: '💰',
      title: '제작비 99% 절감',
      desc: '외주 제작비 평균 200~500만원. Scenica는 월 7.9만원으로 무제한 제작.',
      accent: 'from-scenica-magenta to-pink-500',
    },
    {
      icon: '⚡',
      title: '3분 완성',
      desc: '기존 영상 제작 평균 5~14일. AI가 3분 안에 광고 영상을 완성합니다.',
      accent: 'from-yellow-400 to-orange-500',
    },
    {
      icon: '📱',
      title: '멀티 플랫폼 최적화',
      desc: '인스타, 유튜브, 틱톡, 스마트스토어 — 플랫폼별 최적 비율로 자동 변환.',
      accent: 'from-green-400 to-emerald-500',
    },
    {
      icon: '🎨',
      title: '브랜드 맞춤 스타일',
      desc: '내 브랜드 톤앤매너를 학습해 일관된 영상 스타일을 유지합니다.',
      accent: 'from-scenica-accent to-scenica-cyan',
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="text-scenica-accent font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-4">
            왜 <span className="gradient-text-static">Scenica</span>인가요?
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            소상공인이 진짜 필요한 기능만 담았습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-7 reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center text-xl mb-5`}
              >
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ───
function HowItWorks() {
  const containerRef = useReveal();

  const steps = [
    {
      num: '01',
      title: '사진 업로드',
      desc: '스마트폰으로 찍은 상품 사진 1장이면 충분합니다.',
      icon: '📸',
    },
    {
      num: '02',
      title: 'AI가 분석 & 제작',
      desc: '22단계 AI 파이프라인이 자동으로 컨셉, 구도, 편집을 완성합니다.',
      icon: '🤖',
    },
    {
      num: '03',
      title: '영상 다운로드',
      desc: '완성된 광고 영상을 원하는 플랫폼에 바로 업로드하세요.',
      icon: '🚀',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 px-6 grid-bg" ref={containerRef}>
      <div className="orb w-[400px] h-[400px] bg-scenica-cyan/10 top-20 -right-40" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20 reveal">
          <span className="text-scenica-cyan font-semibold text-sm uppercase tracking-wider">How it works</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-4">
            <span className="gradient-text-static">3단계</span>면 끝
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="reveal text-center" style={{ transitionDelay: `${i * 0.2}s` }}>
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-2xl bg-scenica-card border border-scenica-border flex items-center justify-center text-3xl glow-accent">
                  {s.icon}
                </div>
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-scenica-accent flex items-center justify-center text-white font-display font-bold text-xs">
                  {s.num}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Arrow connectors for desktop */}
        <div className="hidden md:flex justify-center items-center gap-0 -mt-[180px] mb-[100px] relative z-0 pointer-events-none">
          <div className="w-1/3" />
          <div className="text-scenica-accent/40 text-3xl">→</div>
          <div className="w-1/3" />
          <div className="text-scenica-accent/40 text-3xl">→</div>
          <div className="w-1/3" />
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ───
function Pricing() {
  const containerRef = useReveal();

  const plans = [
    {
      name: 'Free',
      price: '0',
      period: '영원히 무료',
      desc: '먼저 체험해 보세요',
      features: ['월 3회 영상 생성', '720p 해상도', '기본 템플릿', '워터마크 포함'],
      cta: '무료로 시작',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '79,000',
      period: '월',
      desc: '본격적인 셀러를 위한',
      features: ['월 무제한 영상 생성', '4K 해상도', '프리미엄 템플릿', '워터마크 없음', '브랜드 스타일 학습', '멀티 플랫폼 변환'],
      cta: '사전등록 (50% 할인)',
      highlight: true,
    },
    {
      name: 'Team',
      price: '별도 문의',
      period: '',
      desc: '에이전시 · 대량 제작',
      features: ['팀 멤버 관리', 'API 연동', '전용 파이프라인', '우선 지원', '맞춤 온보딩'],
      cta: '문의하기',
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 px-6" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="text-scenica-magenta font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-4">
            심플한 요금제
          </h2>
          <p className="text-gray-400 mt-4">
            사전등록 시 <span className="text-scenica-accent font-semibold">Pro 50% 할인</span> 혜택
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`rounded-2xl p-7 reveal ${
                p.highlight
                  ? 'pricing-highlight glass-card relative scale-105'
                  : 'glass-card'
              }`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {p.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-scenica-accent to-scenica-cyan text-white text-xs font-bold">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-display font-bold text-lg text-white">{p.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
              </div>
              <div className="mb-6">
                <span className="font-display font-extrabold text-4xl text-white">
                  {p.price === '별도 문의' ? '' : '₩'}
                  {p.price}
                </span>
                {p.period && (
                  <span className="text-gray-500 text-sm ml-1">/ {p.period}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-scenica-cyan">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-all ${
                  p.highlight
                    ? 'btn-primary text-white relative z-10'
                    : 'border border-scenica-border text-gray-300 hover:border-scenica-accent/50 hover:text-white'
                }`}
              >
                <span className="relative z-10">{p.cta}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Waitlist / Pre-registration ───
function Waitlist() {
  const containerRef = useReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // TODO: 실제 API 연동 (Google Sheets, Supabase, etc.)
      console.log('Submitted:', email);
      setSubmitted(true);
    }
  };

  return (
    <section id="waitlist" className="relative py-32 px-6 grid-bg" ref={containerRef}>
      <div className="orb w-[500px] h-[500px] bg-scenica-accent/15 top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-2xl mx-auto relative z-10 text-center reveal">
        <span className="text-scenica-gold font-semibold text-sm uppercase tracking-wider">Early Access</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-4 mb-4">
          지금 사전등록하세요
        </h2>
        <p className="text-gray-400 mb-10 leading-relaxed">
          사전등록 하시면 <span className="text-white font-medium">Pro 플랜 50% 할인</span>과
          <br className="hidden md:block" />
          <span className="text-white font-medium">1개월 무료 체험</span> 혜택을 드립니다.
        </p>

        {!submitted ? (
          <div className="glass-card rounded-2xl p-8 glow-accent">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-xl bg-scenica-deeper border border-scenica-border text-white placeholder-gray-500 text-sm"
              />
              <button
                onClick={handleSubmit}
                className="btn-primary px-8 py-4 rounded-xl text-white font-bold text-sm whitespace-nowrap relative z-10"
              >
                <span className="relative z-10">사전등록 →</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              🔒 스팸 없이, 출시 알림만 보내드립니다. 언제든 구독 해제 가능.
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-8 glow-cyan text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">등록 완료!</h3>
            <p className="text-gray-400">
              출시 시 가장 먼저 알려드릴게요.
              <br />
              Pro 50% 할인 혜택이 확보되었습니다.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="border-t border-scenica-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-scenica-accent to-scenica-cyan flex items-center justify-center">
            <span className="text-white font-bold text-xs font-display">S</span>
          </div>
          <span className="font-display font-semibold text-sm text-gray-400">
            Scenica.AI
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
          <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          <a href="mailto:hello@scenica.ai" className="hover:text-white transition-colors">문의</a>
        </div>
        <p className="text-xs text-gray-600">
          © 2025 Scenica AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Main Page ───
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
