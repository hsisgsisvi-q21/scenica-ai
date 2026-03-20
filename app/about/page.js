'use client';

import { useEffect } from 'react';
import Link from 'next/link';

function useAOS() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-aos]');
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.style.transitionDuration = '900ms'; setTimeout(() => e.target.classList.add('aos-animate'), Number(e.target.dataset.aosDelay || 0)); }}); }, { threshold: 0.06 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function AboutPage() {
  useAOS();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="page-container py-20 md:py-28 text-center">
        <span className="sans text-[9px] text-white/[.08] uppercase tracking-[.2em]" data-aos="fade-up">About</span>
        <h1 className="serif text-[28px] md:text-[46px] font-light text-white mt-5 leading-[1.1]" style={{ letterSpacing: '-0.03em' }} data-aos="fade-up" data-aos-delay="80" data-aos-duration="1100">
          셀러와 소비자를 잇는<br />새로운 커머스 파이프라인
        </h1>
        <p className="text-white/[.15] text-[12px] font-light mt-6 max-w-md mx-auto leading-[1.9]" data-aos="fade-up" data-aos-delay="160">
          AI 인플루언서가 영상 제작부터 채널 운영, 판매 전환까지 전체 커머스를 자동화합니다.
        </p>
      </div>
      <div className="sep" />

      {/* Mission */}
      <div className="page-container py-24">
        <div className="max-w-[860px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
          <div data-aos="fade-up">
            <span className="sans text-[8px] text-white/[.06] uppercase tracking-[.2em]">Mission</span>
            <h2 className="serif text-[22px] md:text-[30px] font-light text-white mt-4 leading-[1.2]" style={{ letterSpacing: '-0.02em' }}>
              소상공인 셀러의<br />숏폼 진입 장벽을<br />제로로.
            </h2>
          </div>
          <div className="text-white/[.15] text-[12px] font-light leading-[2.1] md:pt-10" data-aos="fade-up" data-aos-delay="120">
            <p className="mb-4">숏폼 시장 83조원 시대. 온라인 셀러의 82%는 비용, 채널, 인력의 3중 장벽으로 진입조차 못 합니다.</p>
            <p>Scenica AI는 팔로워 10만+ AI 인플루언서를 통해 월 800만원을 3만원으로, 4주를 3일로 줄입니다.</p>
          </div>
        </div>
      </div>
      <div className="sep" />

      {/* Traction */}
      <div className="page-container py-24">
        <div className="max-w-[860px] mx-auto text-center">
          <span className="sans text-[8px] text-white/[.06] uppercase tracking-[.2em]" data-aos="fade-up">Traction</span>
          <h2 className="serif text-[20px] md:text-[28px] font-light text-white mt-4 mb-12" data-aos="fade-up" data-aos-delay="60">검증된 성과</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-[1px] bg-white/[.02] rounded-lg overflow-hidden" data-aos="fade-up" data-aos-delay="100">
            {[{ v:'130',u:'건',l:'의뢰' },{ v:'3.2',u:'억',l:'거래액' },{ v:'67',u:'%',l:'재의뢰' },{ v:'4.3',u:'/5',l:'만족도' },{ v:'2.8',u:'%',l:'전환율' },{ v:'97',u:'%',l:'비용절감' }].map((s) => (
              <div key={s.l} className="bg-black p-5 text-center">
                <div className="serif text-white/40 text-[20px] font-light">{s.v}<span className="text-[13px] text-white/[.18]">{s.u}</span></div>
                <div className="text-white/[.06] text-[8px] sans uppercase tracking-[.15em] mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sep" />

      {/* Timeline */}
      <div className="page-container py-24">
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-14">
            <span className="sans text-[8px] text-white/[.06] uppercase tracking-[.2em]" data-aos="fade-up">Milestones</span>
            <h2 className="serif text-[20px] md:text-[28px] font-light text-white mt-4" data-aos="fade-up" data-aos-delay="60">여정</h2>
          </div>
          {[
            { d:'2025.Q3', t:'파이프라인 구축', s:'22단계 멀티 AI 시네마 파이프라인' },
            { d:'2025.Q4', t:'인플루언서 육성', s:'4명, 평균 10만+ 팔로워' },
            { d:'2026.Q1', t:'시장 검증', s:'130건 · 3.2억 · 재의뢰율 67%' },
            { d:'2026.Q2', t:'플랫폼 고도화', s:'셀러 대시보드 + 자동정산' },
            { d:'2026.H2', t:'정식 출시', s:'유료 셀러 100명 목표' },
          ].map((m, i) => (
            <div key={m.d} className="flex gap-5 group" data-aos="fade-up" data-aos-delay={i * 60}>
              <div className="flex flex-col items-center"><div className="w-1.5 h-1.5 rounded-full bg-white/[.1] group-hover:bg-white/25 transition-colors mt-1.5" />{i < 4 && <div className="w-[.5px] flex-1 bg-white/[.03]" />}</div>
              <div className="pb-10">
                <div className="sans text-[8px] text-white/[.1] uppercase tracking-[.15em] mb-1">{m.d}</div>
                <div className="text-white/40 text-[13px] font-medium mb-0.5">{m.t}</div>
                <div className="text-white/[.1] text-[11px] font-light">{m.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sep" />

      {/* Team */}
      <div className="page-container py-24">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-14">
            <span className="sans text-[8px] text-white/[.06] uppercase tracking-[.2em]" data-aos="fade-up">Team</span>
            <h2 className="serif text-[20px] md:text-[28px] font-light text-white mt-4" data-aos="fade-up" data-aos-delay="60">130건 · 3.2억을 만든 팀</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/[.02] rounded-lg overflow-hidden" data-aos="fade-up" data-aos-delay="100">
            {[
              { r:'대표', f:'플랫폼 총괄', s:'프롬프트 엔지니어, 130건·3.2억 달성' },
              { r:'CTO', f:'AI 개발', s:'석사, 영상 생성 모델 논문' },
              { r:'Backend', f:'커머스 인프라', s:'일 10만건 API 설계·운영' },
              { r:'Contents', f:'채널 운영', s:'숏폼 팔로워 5만+, 50만 조회' },
              { r:'TTS', f:'음성 AI', s:'석사(음성신호처리), MOS 4.0' },
              { r:'UX/UI', f:'경험 설계', s:'전환율 12% 향상' },
            ].map((m, i) => (
              <div key={m.r} className="bg-black p-6 group hover:bg-white/[.005] transition-colors duration-700" data-aos="fade-up" data-aos-delay={i * 40}>
                <div className="w-8 h-8 rounded-full bg-white/[.02] flex items-center justify-center mb-4 group-hover:bg-white/[.04] transition-colors">
                  <span className="sans text-[9px] font-medium text-white/25">{m.r[0]}</span>
                </div>
                <div className="text-white/45 text-[13px] font-medium mb-0.5">{m.r}</div>
                <div className="text-white/[.12] text-[10px] sans mb-2.5">{m.f}</div>
                <div className="text-white/[.06] text-[10px] font-light leading-[1.6]">{m.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sep" />

      {/* CTA */}
      <div className="page-container py-28 text-center" data-aos="fade-up">
        <h2 className="serif text-[22px] md:text-[30px] font-light text-white mb-4">함께 만들어가요</h2>
        <p className="text-white/[.1] text-[12px] mb-10">AI 인플루언서 이커머스의 시작</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/create" className="btn-w">시작하기</Link>
          <a href="mailto:hello@scenica.ai" className="btn-o">문의하기</a>
        </div>
      </div>
    </div>
  );
}
