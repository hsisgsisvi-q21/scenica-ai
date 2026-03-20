'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [yr, setYr] = useState(false);
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    const els = document.querySelectorAll('[data-aos]');
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.style.transitionDuration = '900ms'; setTimeout(() => e.target.classList.add('aos-animate'), Number(e.target.dataset.aosDelay || 0)); }}); }, { threshold: 0.06 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const plans = [
    { name:'Free', price: '0', desc:'체험', features:['AI 콘텐츠 3건/월','720p','기본 리포트','워터마크'], featured:false },
    { name:'Pro', price: yr ? '25,000' : '30,000', desc:'셀러', features:['무제한 콘텐츠','AI 채널 게시','4K','실시간 전환 추적','수수료 5% 자동정산','브랜드 학습','멀티 플랫폼','워터마크 없음','우선 큐'], featured:true },
    { name:'Enterprise', price:'Custom', desc:'에이전시', features:['전용 AI 인플루언서','API 연동','팀 대시보드','전담 매니저','맞춤 온보딩','SLA 보장'], featured:false },
  ];

  const rows = [
    ['월 콘텐츠','3건','무제한','무제한'], ['해상도','720p','4K','4K+'], ['채널 게시','-','가능','전용 채널'],
    ['전환 추적','기본','실시간','고급'], ['자동정산','-','5%','커스텀'], ['브랜드 학습','-','가능','고급'],
    ['멀티 플랫폼','-','가능','가능'], ['API','-','-','가능'], ['전담 매니저','-','-','가능'],
  ];

  const faqs = [
    { q:'사전등록 할인은 언제까지?', a:'정식 출시 전까지 등록 시 Pro 50% 영구 할인(월 15,000원).' },
    { q:'수수료 5%는 어떻게?', a:'AI 채널 통한 판매 발생 시 자동 정산. 판매 없으면 수수료 없음.' },
    { q:'Free에서 Pro 업그레이드 시 데이터?', a:'모든 상품·콘텐츠·성과 데이터 그대로 유지.' },
    { q:'환불 정책은?', a:'구독 7일 이내 전액 환불. 이후 다음 주기부터 해지 가능.' },
  ];

  return (
    <div className="min-h-screen">
      <div className="page-container py-20 md:py-28 text-center">
        <span className="sans text-[9px] text-white/[.08] uppercase tracking-[.2em]" data-aos="fade-up">Pricing</span>
        <h1 className="serif text-[28px] md:text-[46px] font-light text-white mt-5" style={{ letterSpacing: '-0.03em' }} data-aos="fade-up" data-aos-delay="80">심플한 요금제</h1>
        <p className="text-white/[.12] text-[12px] mt-4" data-aos="fade-up" data-aos-delay="120">사전등록 시 <span className="text-white/25">Pro 50% 영구 할인</span></p>
        <div className="flex items-center justify-center gap-3 mt-8" data-aos="fade-up" data-aos-delay="160">
          <span className={`sans text-[10px] ${!yr ? 'text-white/40' : 'text-white/[.1]'}`}>월간</span>
          <button onClick={() => setYr(!yr)} className="w-9 h-[18px] rounded-full bg-white/[.04] relative cursor-pointer"><div className="w-3.5 h-3.5 rounded-full bg-white absolute top-[2px] transition-all duration-400" style={{ left: yr ? '18px' : '2px' }} /></button>
          <span className={`sans text-[10px] ${yr ? 'text-white/40' : 'text-white/[.1]'}`}>연간 <span className="text-white/15">-17%</span></span>
        </div>
      </div>
      <div className="sep" />

      <div className="page-container py-16">
        <div className="max-w-[960px] mx-auto grid md:grid-cols-3 gap-3">
          {plans.map((p, i) => (
            <div key={p.name} className={`price-card relative ${p.featured ? 'featured' : ''}`} data-aos="fade-up" data-aos-delay={i * 100}>
              {p.featured && <div className="absolute top-0 left-[20%] right-[20%] h-[.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />}
              <div className="sans text-[8px] text-white/[.1] uppercase tracking-[.2em] mb-1">{p.name}</div>
              <div className="text-white/[.06] text-[10px] mb-6">{p.desc}</div>
              <div className="flex items-baseline gap-[2px] mb-2">
                {p.price !== 'Custom' && <span className="sans text-white/20 text-[13px]">₩</span>}
                <span className="serif text-white/70 text-[32px] font-light">{p.price}</span>
                {p.price !== 'Custom' && p.price !== '0' && <span className="text-white/[.1] text-[11px] sans">/월</span>}
              </div>
              <ul className="space-y-3 my-8">
                {p.features.map((f) => (
                  <li key={f} className="text-white/[.18] text-[11px] flex items-center gap-3 font-light">
                    <span className="w-[2.5px] h-[2.5px] rounded-full bg-white/[.1] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-[10px] cursor-pointer ${p.featured ? 'btn-w' : 'btn-o'}`}>
                {p.featured ? '사전등록 (50% 할인)' : p.price === 'Custom' ? '문의하기' : '무료 시작'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="sep" />
      <div className="page-container py-16">
        <div className="max-w-[860px] mx-auto">
          <h2 className="serif text-[20px] md:text-[26px] font-light text-white text-center mb-10" data-aos="fade-up">상세 비교</h2>
          <div className="border border-white/[.03] rounded-lg overflow-hidden" data-aos="fade-up" data-aos-delay="60">
            <div className="grid grid-cols-4 text-center text-[9px] font-medium p-4 bg-white/[.015] border-b border-white/[.03] sans uppercase tracking-[.15em]">
              <div className="text-left text-white/[.12]">기능</div><div className="text-white/[.12]">Free</div><div className="text-white/35">Pro</div><div className="text-white/[.12]">Enterprise</div>
            </div>
            {rows.map((r, i) => (
              <div key={r[0]} className={`grid grid-cols-4 text-center text-[11px] p-4 ${i < rows.length - 1 ? 'border-b border-white/[.02]' : ''} hover:bg-white/[.008] transition-colors duration-500`}>
                <div className="text-left text-white/[.18]">{r[0]}</div><div className="text-white/[.1]">{r[1]}</div><div className="text-white/30 font-medium">{r[2]}</div><div className="text-white/[.1]">{r[3]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="sep" />
      <div className="page-container py-16">
        <div className="max-w-[640px] mx-auto">
          <h2 className="serif text-[20px] md:text-[26px] font-light text-white text-center mb-10" data-aos="fade-up">자주 묻는 질문</h2>
          <div className="space-y-1.5" data-aos="fade-up" data-aos-delay="60">
            {faqs.map((f, i) => (
              <div key={i} className="border border-white/[.03] rounded-lg overflow-hidden hover:border-white/[.05] transition-colors">
                <button onClick={() => setFaq(faq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left cursor-pointer group">
                  <span className="text-white/35 text-[12px] font-medium pr-4 group-hover:text-white/50 transition-colors">{f.q}</span>
                  <div className={`w-5 h-5 rounded-full border border-white/[.06] flex items-center justify-center shrink-0 transition-all duration-400 ${faq === i ? 'bg-white/[.06] rotate-45' : ''}`}>
                    <span className="text-white/25 text-[11px]">+</span>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${faq === i ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5 text-white/[.15] text-[12px] leading-[1.9] font-light">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
