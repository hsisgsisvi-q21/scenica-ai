'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const YT_THUMB = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const TEMPLATES = [
  { id: 'YFU4erbddog', name: '뷰티 리뷰', category: 'beauty', duration: '30s', desc: '코스메틱 제품 언박싱 + 사용 후기' },
  { id: 'LygFajnhLFY', name: '패션 룩북', category: 'fashion', duration: '45s', desc: '시즌별 스타일링 숏폼 룩북' },
  { id: 'rxWNmzQpW2c', name: '라이프 브이로그', category: 'lifestyle', duration: '60s', desc: '일상 속 제품 자연스럽게 노출' },
  { id: 'RPmqjTwdVP8', name: '상품 쇼케이스', category: 'commerce', duration: '15s', desc: '제품 디테일 클로즈업 시네마틱' },
  { id: 'ttR0eoHz9Bg', name: '브랜드 캠페인', category: 'brand', duration: '30s', desc: '브랜드 감성 숏폼 광고' },
  { id: 'VU52Kx2AXL8', name: '시네마틱 무드', category: 'cinematic', duration: '45s', desc: '영화 같은 분위기의 브랜드 필름' },
  { id: 'YFU4erbddog', name: '언박싱 하울', category: 'commerce', duration: '30s', desc: '다수 제품 동시 언박싱 콘텐츠' },
  { id: 'LygFajnhLFY', name: '스트릿 스냅', category: 'fashion', duration: '15s', desc: '거리 촬영 스타일 숏폼' },
  { id: 'rxWNmzQpW2c', name: '카페 브이로그', category: 'lifestyle', duration: '60s', desc: '카페에서의 제품 사용 일상' },
  { id: 'RPmqjTwdVP8', name: 'ASMR 리뷰', category: 'beauty', duration: '30s', desc: '소리와 감촉 중심의 감성 리뷰' },
  { id: 'ttR0eoHz9Bg', name: '프로모션 릴스', category: 'commerce', duration: '15s', desc: '할인·이벤트 고지용 숏폼' },
  { id: 'VU52Kx2AXL8', name: '나이트 무드', category: 'cinematic', duration: '30s', desc: '밤 분위기 시네마틱 영상' },
];

const CATS = [
  { key: 'all', label: 'All' },
  { key: 'beauty', label: 'Beauty' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'commerce', label: 'Commerce' },
  { key: 'cinematic', label: 'Cinematic' },
  { key: 'brand', label: 'Brand' },
];

export default function TemplatesPage() {
  const [cat, setCat] = useState('all');

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

  const filtered = cat === 'all' ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="page-container py-16 text-center">
        <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">Templates</span>
        <h1 className="serif text-[32px] md:text-[52px] font-light text-white mt-5" style={{ letterSpacing: '-0.03em' }} data-aos="fade-up" data-aos-delay="100">
          콘텐츠 템플릿
        </h1>
        <p className="text-white/20 text-[13px] mt-4 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="150">
          카테고리별 검증된 템플릿으로 바로 시작하세요.<br />
          AI가 상품에 맞게 자동으로 커스터마이즈합니다.
        </p>
      </div>

      <div className="sep" />

      {/* Tabs + Grid */}
      <div className="page-container py-14">
        <div className="tab-bar mb-10" data-aos="fade-up">
          {CATS.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)} className={`tab-item ${cat === c.key ? 'active' : ''}`}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="vid-grid">
          {filtered.map((tmpl, i) => (
            <Link href="/create" key={`${tmpl.id}-${i}`} data-aos="fade-up" data-aos-delay={Math.min(i * 60, 360)}>
              <div className="tmpl-card group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={YT_THUMB(tmpl.id)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm">
                    <span className="sans text-[10px] text-white/60">{tmpl.duration}</span>
                  </div>

                  {/* Use button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-5 py-2 rounded-full bg-white text-black text-[11px] sans font-semibold tracking-wider uppercase shadow-lg">
                      Use Template
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/60 text-[13px] font-medium">{tmpl.name}</span>
                    <span className="sans text-[9px] text-white/15 uppercase tracking-wider">{tmpl.category}</span>
                  </div>
                  <p className="text-white/15 text-[11px] font-light">{tmpl.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16" data-aos="fade-up">
          <p className="text-white/10 text-[13px] mb-4">원하는 템플릿이 없나요?</p>
          <Link href="/create" className="btn-w inline-block">커스텀으로 시작하기</Link>
        </div>
      </div>
    </div>
  );
}
