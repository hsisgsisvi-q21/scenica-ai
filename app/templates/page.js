'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const YT = (id) => `https://img.youtube.com/vi/${id}/hq720.jpg`;
const T = [
  { id:'YFU4erbddog', n:'뷰티 리뷰', c:'beauty', d:'30s', desc:'코스메틱 언박싱 + 사용 후기' },
  { id:'LygFajnhLFY', n:'패션 룩북', c:'fashion', d:'45s', desc:'시즌별 스타일링 숏폼' },
  { id:'rxWNmzQpW2c', n:'라이프 브이로그', c:'lifestyle', d:'60s', desc:'일상 속 자연스러운 노출' },
  { id:'RPmqjTwdVP8', n:'상품 쇼케이스', c:'commerce', d:'15s', desc:'디테일 클로즈업 시네마틱' },
  { id:'YFU4erbddog', n:'브랜드 캠페인', c:'brand', d:'30s', desc:'브랜드 감성 숏폼 광고' },
  { id:'VU52Kx2AXL8', n:'시네마틱 무드', c:'cinematic', d:'45s', desc:'영화 같은 브랜드 필름' },
  { id:'wMdSqpTGxJo', n:'드리미 비주얼', c:'cinematic', d:'45s', desc:'몽환적 시네마틱 비주얼' },
  { id:'LygFajnhLFY', n:'스트릿 스냅', c:'fashion', d:'15s', desc:'거리 촬영 숏폼' },
  { id:'rxWNmzQpW2c', n:'카페 브이로그', c:'lifestyle', d:'60s', desc:'카페 제품 사용 일상' },
  { id:'RPmqjTwdVP8', n:'언박싱 하울', c:'commerce', d:'30s', desc:'다수 제품 동시 언박싱' },
  { id:'YFU4erbddog', n:'프로모션 릴스', c:'commerce', d:'15s', desc:'할인·이벤트 고지' },
  { id:'VU52Kx2AXL8', n:'나이트 무드', c:'cinematic', d:'30s', desc:'밤 분위기 시네마틱' },
];

const CATS = [
  { k:'all',l:'All' },{ k:'beauty',l:'Beauty' },{ k:'fashion',l:'Fashion' },
  { k:'lifestyle',l:'Lifestyle' },{ k:'commerce',l:'Commerce' },{ k:'cinematic',l:'Cinematic' },{ k:'brand',l:'Brand' },
];

export default function TemplatesPage() {
  const [cat, setCat] = useState('all');

  useEffect(() => {
    const els = document.querySelectorAll('[data-aos]');
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.style.transitionDuration = '900ms'; setTimeout(() => e.target.classList.add('aos-animate'), Number(e.target.dataset.aosDelay || 0)); }}); }, { threshold: 0.06 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const items = cat === 'all' ? T : T.filter((t) => t.c === cat);

  return (
    <div className="min-h-screen">
      <div className="page-container py-20 md:py-28 text-center">
        <span className="sans text-[9px] text-white/[.08] uppercase tracking-[.2em]" data-aos="fade-up">Templates</span>
        <h1 className="serif text-[28px] md:text-[46px] font-light text-white mt-5" style={{ letterSpacing: '-0.03em' }} data-aos="fade-up" data-aos-delay="80">콘텐츠 템플릿</h1>
        <p className="text-white/[.12] text-[12px] font-light mt-5 max-w-sm mx-auto leading-[1.9]" data-aos="fade-up" data-aos-delay="140">
          검증된 템플릿으로 바로 시작하세요. AI가 상품에 맞게 커스터마이즈합니다.
        </p>
      </div>
      <div className="sep" />

      <div className="page-container py-14">
        <div className="tab-bar mb-10" data-aos="fade-up">
          {CATS.map((c) => (
            <button key={c.k} onClick={() => setCat(c.k)} className={`tab-item ${cat === c.k ? 'active' : ''}`}>{c.l}</button>
          ))}
        </div>

        <div className="vid-grid">
          {items.map((t, i) => (
            <Link href="/create" key={`${t.id}-${i}`} data-aos="fade-up" data-aos-delay={Math.min(i * 50, 300)}>
              <div className="tmpl-card group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={YT(t.id)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-900 pointer-events-none" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                    <span className="sans text-[9px] text-white/50">{t.d}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="px-4 py-1.5 rounded-full bg-white text-black text-[9px] sans font-semibold tracking-[.1em] uppercase shadow-lg">Use Template</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/50 text-[12px] font-medium">{t.n}</span>
                    <span className="sans text-[8px] text-white/[.1] uppercase tracking-[.15em]">{t.c}</span>
                  </div>
                  <p className="text-white/[.1] text-[10px] font-light">{t.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16" data-aos="fade-up">
          <p className="text-white/[.06] text-[11px] mb-4">원하는 템플릿이 없나요?</p>
          <Link href="/create" className="btn-w">커스텀으로 시작</Link>
        </div>
      </div>
    </div>
  );
}
