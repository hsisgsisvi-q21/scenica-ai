'use client';

import { useEffect } from 'react';
import Link from 'next/link';

function useAOS() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-aos]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = e.target.getAttribute('data-aos-delay') || 0;
          e.target.style.transitionDuration = `${e.target.getAttribute('data-aos-duration') || 800}ms`;
          setTimeout(() => e.target.classList.add('aos-animate'), Number(delay));
        }
      });
    }, { threshold: 0.08 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const TEAM = [
  { role: '대표', name: 'CEO', focus: '플랫폼 기획·개발 총괄', skill: '프롬프트 엔지니어 자격, 130건 의뢰 · 3.2억 거래액 달성', color: '#fff' },
  { role: 'CTO', name: 'CTO', focus: 'AI 개발 총괄', skill: '석사, AI 영상 생성 모델 논문, Stable Diffusion 서비스 개발', color: '#888' },
  { role: 'Backend', name: 'Backend Lead', focus: '커머스 인프라', skill: '커머스 플랫폼 5년, 일 10만건 주문 API 설계·운영', color: '#666' },
  { role: 'Contents', name: 'Content Manager', focus: 'AI 인플루언서 운영', skill: '숏폼 채널 팔로워 5만+, 단일 영상 50만 조회', color: '#888' },
  { role: 'TTS', name: 'TTS Engineer', focus: '음성 AI', skill: '석사(음성신호처리), 한국어 TTS MOS 4.0', color: '#666' },
  { role: 'UX/UI', name: 'Designer', focus: '셀러 경험 설계', skill: '이커머스 상세페이지 전환율 12% 향상', color: '#888' },
];

const MILESTONES = [
  { date: '2025.Q3', title: 'AI 파이프라인 구축', desc: '22단계 멀티 AI 시네마 파이프라인 완성' },
  { date: '2025.Q4', title: 'AI 인플루언서 육성', desc: '4명 육성, 평균 팔로워 10만+ 달성' },
  { date: '2026.Q1', title: '시장 검증 완료', desc: '130건 의뢰, 3.2억 거래액, 재의뢰율 67%' },
  { date: '2026.Q2', title: '플랫폼 고도화', desc: '셀러 대시보드, 수수료 자동정산 개발' },
  { date: '2026.H2', title: '정식 출시', desc: '유료 셀러 100명 확보 목표' },
  { date: '2027', title: '스케일업', desc: '셀러 1,000명, 브랜드 광고 수익 개시' },
];

export default function AboutPage() {
  useAOS();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="page-container py-20 text-center">
        <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">About Scenica AI</span>
        <h1 className="serif text-[32px] md:text-[52px] font-light text-white mt-5 leading-[1.1]" style={{ letterSpacing: '-0.03em' }} data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
          셀러와 소비자를 잇는<br />새로운 커머스 파이프라인
        </h1>
        <p className="text-white/20 text-[14px] font-light mt-6 max-w-lg mx-auto leading-[1.9]" data-aos="fade-up" data-aos-delay="200">
          Scenica AI는 AI 인플루언서가 영상 제작부터 채널 운영,
          판매 전환까지 전체 커머스 파이프라인을 자동화하는 플랫폼입니다.
        </p>
      </div>

      <div className="sep" />

      {/* Mission */}
      <div className="page-container py-20">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-16">
          <div data-aos="fade-up">
            <div className="sans text-[9px] text-white/10 uppercase tracking-[.2em] mb-4">Mission</div>
            <h2 className="serif text-[24px] md:text-[32px] font-light text-white leading-[1.2]" style={{ letterSpacing: '-0.02em' }}>
              소상공인 셀러의<br />숏폼 커머스 진입 장벽을<br />제로로 만듭니다
            </h2>
          </div>
          <div className="text-white/20 text-[14px] font-light leading-[2] pt-2" data-aos="fade-up" data-aos-delay="150">
            <p className="mb-4">
              숏폼 시장 83조원 시대. 그러나 온라인 셀러의 82%는 비용, 채널, 인력의 3중 장벽으로 진입조차 못 하고 있습니다.
            </p>
            <p>
              Scenica AI는 팔로워 10만+ AI 인플루언서를 통해 셀러가 상품만 등록하면 영상 제작, 채널 게시, 판매 추적, 수수료 정산까지 전부 자동으로 처리합니다. 기존 월 800만원의 비용을 3만원으로 줄이고, 4주의 제작 기간을 3일로 단축합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="sep" />

      {/* Traction */}
      <div className="page-container py-20">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">Traction</span>
            <h2 className="serif text-[24px] md:text-[32px] font-light text-white mt-5" data-aos="fade-up" data-aos-delay="100">검증된 성과</h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-[1px] bg-white/[.03] rounded-xl overflow-hidden" data-aos="fade-up" data-aos-delay="150">
            {[
              { v: '130', u: '건', l: '상품 의뢰' },
              { v: '3.2', u: '억', l: '누적 거래액' },
              { v: '67', u: '%', l: '재의뢰율' },
              { v: '4.3', u: '/5', l: '만족도' },
              { v: '2.8', u: '%', l: '전환율' },
              { v: '97', u: '%', l: '비용 절감' },
            ].map((s) => (
              <div key={s.l} className="bg-black p-5 text-center">
                <div className="serif text-white/50 text-[22px] font-light">{s.v}<span className="text-[14px] text-white/25">{s.u}</span></div>
                <div className="text-white/10 text-[10px] sans uppercase tracking-wider mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sep" />

      {/* Timeline */}
      <div className="page-container py-20">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-16">
            <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">Milestones</span>
            <h2 className="serif text-[24px] md:text-[32px] font-light text-white mt-5" data-aos="fade-up" data-aos-delay="100">여정</h2>
          </div>

          <div className="space-y-0">
            {MILESTONES.map((m, i) => (
              <div key={m.date} className="flex gap-6 group" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-white/15 group-hover:bg-white/30 transition-colors mt-1.5" />
                  {i < MILESTONES.length - 1 && <div className="w-[1px] flex-1 bg-white/[.04]" />}
                </div>
                <div className="pb-10">
                  <div className="sans text-[10px] text-white/15 uppercase tracking-[.15em] mb-1">{m.date}</div>
                  <div className="text-white/50 text-[14px] font-medium mb-1">{m.title}</div>
                  <div className="text-white/15 text-[12px] font-light">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sep" />

      {/* Team */}
      <div className="page-container py-20">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">Team</span>
            <h2 className="serif text-[24px] md:text-[32px] font-light text-white mt-5" data-aos="fade-up" data-aos-delay="100">
              130건 · 3.2억을 만든 팀
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/[.03] rounded-xl overflow-hidden">
            {TEAM.map((m, i) => (
              <div key={m.role} className="bg-black p-6 group hover:bg-white/[.01] transition-colors duration-500" data-aos="fade-up" data-aos-delay={i * 60}>
                <div className="w-10 h-10 rounded-full bg-white/[.03] flex items-center justify-center mb-4 group-hover:bg-white/[.06] transition-colors">
                  <span className="sans text-[11px] font-semibold" style={{ color: m.color }}>{m.role[0]}</span>
                </div>
                <div className="text-white/60 text-[14px] font-medium mb-0.5">{m.role}</div>
                <div className="text-white/20 text-[11px] sans mb-3">{m.focus}</div>
                <div className="text-white/10 text-[11px] font-light leading-relaxed">{m.skill}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sep" />
      <div className="page-container py-20 text-center">
        <h2 className="serif text-[24px] md:text-[32px] font-light text-white mb-4" data-aos="fade-up">함께 만들어가요</h2>
        <p className="text-white/15 text-[13px] mb-8" data-aos="fade-up" data-aos-delay="100">AI 인플루언서 숏폼 이커머스의 시작</p>
        <div className="flex items-center justify-center gap-3" data-aos="fade-up" data-aos-delay="200">
          <Link href="/create" className="btn-w inline-block">시작하기</Link>
          <a href="mailto:hello@scenica.ai" className="btn-o inline-block">문의하기</a>
        </div>
      </div>
    </div>
  );
}
