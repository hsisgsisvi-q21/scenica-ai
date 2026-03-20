'use client';

import { useState, useEffect } from 'react';
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

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useAOS();

  const plans = [
    { name: 'Free', price: annual ? '0' : '0', desc: '체험용', features: ['AI 콘텐츠 3건/월', '720p 해상도', '기본 성과 리포트', '워터마크 포함'], featured: false },
    { name: 'Pro', price: annual ? '25,000' : '30,000', desc: '본격 셀러', features: ['무제한 콘텐츠 생성', 'AI 인플루언서 채널 게시', '4K 해상도', '실시간 전환 추적', '수수료 5% 자동정산', '브랜드 스타일 학습', '멀티 플랫폼 배포', '워터마크 없음', '우선 큐'], featured: true },
    { name: 'Enterprise', price: 'Custom', desc: '에이전시·대량', features: ['전용 AI 인플루언서 육성', 'API 연동', '팀 관리 대시보드', '전담 매니저', '맞춤 온보딩', 'SLA 보장', '커스텀 브랜딩'], featured: false },
  ];

  const faqs = [
    { q: 'Pro 사전등록 할인은 언제까지인가요?', a: '정식 출시 전까지 사전등록하시면 Pro 플랜 50% 할인(월 15,000원)이 영구 적용됩니다.' },
    { q: '수수료 5%는 어떻게 정산되나요?', a: 'AI 인플루언서 채널을 통한 판매가 발생하면, 판매 금액의 5%가 자동으로 정산됩니다. 판매가 없으면 수수료도 없습니다.' },
    { q: 'Free 플랜에서 Pro로 업그레이드 시 데이터가 유지되나요?', a: '네. 모든 상품 정보, 콘텐츠 히스토리, 성과 데이터가 그대로 유지됩니다.' },
    { q: '환불 정책은 어떻게 되나요?', a: '구독 시작 후 7일 이내 환불 요청 시 전액 환불됩니다. 이후에는 다음 결제 주기부터 해지 가능합니다.' },
    { q: 'Enterprise 플랜은 어떤 경우에 적합한가요?', a: '월 50건 이상의 콘텐츠 제작이 필요하거나, 전용 AI 인플루언서 육성이 필요한 에이전시·브랜드에 적합합니다.' },
  ];

  const compareRows = [
    { feature: '월 콘텐츠 생성', free: '3건', pro: '무제한', ent: '무제한' },
    { feature: '해상도', free: '720p', pro: '4K', ent: '4K+' },
    { feature: 'AI 인플루언서 채널 게시', free: '-', pro: '가능', ent: '전용 채널' },
    { feature: '전환 추적', free: '기본', pro: '실시간', ent: '고급 분석' },
    { feature: '수수료 자동정산', free: '-', pro: '5%', ent: '커스텀' },
    { feature: '브랜드 학습', free: '-', pro: '가능', ent: '고급' },
    { feature: '멀티 플랫폼', free: '-', pro: '가능', ent: '가능' },
    { feature: 'API 연동', free: '-', pro: '-', ent: '가능' },
    { feature: '전담 매니저', free: '-', pro: '-', ent: '가능' },
    { feature: '워터마크', free: '있음', pro: '없음', ent: '없음' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="page-container py-16 text-center">
        <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">Pricing</span>
        <h1 className="serif text-[32px] md:text-[52px] font-light text-white mt-5" style={{ letterSpacing: '-0.03em' }} data-aos="fade-up" data-aos-delay="100">
          심플한 요금제
        </h1>
        <p className="text-white/20 text-[13px] mt-4" data-aos="fade-up" data-aos-delay="150">
          사전등록 시 <span className="text-white/40 font-medium">Pro 50% 영구 할인</span>
        </p>

        {/* Annual toggle */}
        <div className="flex items-center justify-center gap-3 mt-8" data-aos="fade-up" data-aos-delay="200">
          <span className={`sans text-[12px] ${!annual ? 'text-white/50' : 'text-white/15'}`}>월간</span>
          <button onClick={() => setAnnual(!annual)} className="w-10 h-5 rounded-full bg-white/[.06] relative cursor-pointer transition-colors hover:bg-white/[.1]">
            <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${annual ? 'left-5.5' : 'left-0.5'}`} style={{ left: annual ? '22px' : '2px' }} />
          </button>
          <span className={`sans text-[12px] ${annual ? 'text-white/50' : 'text-white/15'}`}>연간 <span className="text-white/25">(17% 할인)</span></span>
        </div>
      </div>

      <div className="sep" />

      {/* Pricing Cards */}
      <div className="page-container py-16">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <div key={p.name} className={`price-card relative ${p.featured ? 'featured' : ''}`} data-aos="fade-up" data-aos-delay={i * 120}>
              {p.featured && <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />}
              <div className="sans text-[9px] text-white/15 uppercase tracking-[.2em] mb-1">{p.name}</div>
              <div className="text-white/10 text-[11px] mb-6">{p.desc}</div>
              <div className="flex items-baseline gap-[2px] mb-2">
                {p.price !== 'Custom' && <span className="sans text-white/30 text-[14px]">₩</span>}
                <span className="serif text-white/80 text-[36px] font-light">{p.price}</span>
                {p.price !== 'Custom' && p.price !== '0' && <span className="text-white/15 text-[12px] sans">/월</span>}
              </div>
              {p.featured && annual && <div className="text-white/20 text-[11px] mb-4 sans">연간 결제 시 ₩300,000/년</div>}
              <ul className="space-y-3 my-8">
                {p.features.map((f) => (
                  <li key={f} className="text-white/25 text-[12px] flex items-center gap-3 font-light">
                    <span className="w-[3px] h-[3px] rounded-full bg-white/15 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => {}} className={`w-full py-[11px] cursor-pointer ${p.featured ? 'btn-w' : 'btn-o'}`}>
                {p.featured ? '사전등록 (50% 할인)' : p.price === 'Custom' ? '문의하기' : '무료로 시작'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="sep" />
      <div className="page-container py-16">
        <div className="max-w-[900px] mx-auto">
          <h2 className="serif text-[22px] md:text-[28px] font-light text-white text-center mb-10" data-aos="fade-up">상세 비교</h2>
          <div className="border border-white/[.04] rounded-xl overflow-hidden" data-aos="fade-up" data-aos-delay="100">
            <div className="grid grid-cols-4 text-center text-[11px] font-semibold p-4 bg-white/[.02] border-b border-white/[.04]">
              <div className="text-left text-white/20 sans">기능</div>
              <div className="text-white/20 sans">Free</div>
              <div className="text-white/50 sans">Pro</div>
              <div className="text-white/20 sans">Enterprise</div>
            </div>
            {compareRows.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-4 text-center text-[12px] p-4 ${i < compareRows.length - 1 ? 'border-b border-white/[.03]' : ''} hover:bg-white/[.01] transition-colors`}>
                <div className="text-left text-white/25">{row.feature}</div>
                <div className="text-white/15">{row.free}</div>
                <div className="text-white/40 font-medium">{row.pro}</div>
                <div className="text-white/15">{row.ent}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="sep" />
      <div className="page-container py-16">
        <div className="max-w-[700px] mx-auto">
          <h2 className="serif text-[22px] md:text-[28px] font-light text-white text-center mb-10" data-aos="fade-up">자주 묻는 질문</h2>
          <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/[.04] rounded-xl overflow-hidden hover:border-white/[.06] transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left cursor-pointer group">
                  <span className="text-white/50 text-[13px] font-medium pr-4 group-hover:text-white/70 transition-colors">{faq.q}</span>
                  <div className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === i ? 'bg-white/10 rotate-45' : ''}`}>
                    <span className="text-white/40 text-[12px]">+</span>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5 text-white/20 text-[13px] leading-[1.8] font-light">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
