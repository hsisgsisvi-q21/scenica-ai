'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const YT = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const DATA = [
  { name:'YUNA', cat:'Beauty', f:'12.4만', eng:'4.2%', vids:['YFU4erbddog','wMdSqpTGxJo','VU52Kx2AXL8'], desc:'자연스러운 리뷰와 감성적인 룩북으로 팔로워와 소통합니다.' },
  { name:'MISO', cat:'Fashion', f:'8.7만', eng:'3.8%', vids:['LygFajnhLFY','YFU4erbddog','RPmqjTwdVP8'], desc:'스트릿부터 하이엔드까지. 트렌디한 스타일링 콘텐츠를 제작합니다.' },
  { name:'HANA', cat:'Lifestyle', f:'11.2만', eng:'4.5%', vids:['rxWNmzQpW2c','LygFajnhLFY','LygFajnhLFY'], desc:'데일리 라이프스타일, 카페 브이로그, 인테리어까지.' },
  { name:'RINA', cat:'Food & Living', f:'9.8만', eng:'3.9%', vids:['RPmqjTwdVP8','rxWNmzQpW2c','VU52Kx2AXL8'], desc:'푸드 리뷰, 홈쿠킹, 리빙 소품. 따뜻한 톤으로 구매 전환을 이끕니다.' },
];

export default function InfluencersPage() {
  const [sel, setSel] = useState(null);
  useEffect(() => {
    const els = document.querySelectorAll('[data-aos]');
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.style.transitionDuration = '900ms'; setTimeout(() => e.target.classList.add('aos-animate'), Number(e.target.dataset.aosDelay || 0)); }}); }, { threshold: 0.06 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="page-container py-20 md:py-28 text-center">
        <span className="sans text-[9px] text-white/[.08] uppercase tracking-[.2em]" data-aos="fade-up">AI Influencers</span>
        <h1 className="serif text-[28px] md:text-[46px] font-light text-white mt-5 leading-[1.1]" style={{ letterSpacing: '-0.03em' }} data-aos="fade-up" data-aos-delay="80" data-aos-duration="1100">
          팔로워 40만+<br />AI 인플루언서
        </h1>
        <p className="text-white/[.15] text-[12px] font-light mt-5 max-w-sm mx-auto leading-[1.9]" data-aos="fade-up" data-aos-delay="160">
          각 카테고리에 특화된 AI 인플루언서가 당신의 상품을 직접 홍보합니다
        </p>
      </div>
      <div className="sep" />
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DATA.map((inf, i) => (
            <div key={inf.name} className="inf-profile cursor-pointer" data-aos="fade-up" data-aos-delay={i * 80} onClick={() => setSel(sel === inf.name ? null : inf.name)}>
              <div className="aspect-[16/9] relative overflow-hidden">
                <img src={YT(inf.vids[0])} alt="" className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between">
                  <div>
                    <div className="sans text-[8px] text-white/20 uppercase tracking-[.2em] mb-1.5">{inf.cat}</div>
                    <div className="text-white/80 text-[18px] font-medium sans tracking-[.03em]">{inf.name}</div>
                  </div>
                  <div className="flex gap-6 text-right">
                    <div><div className="serif text-white/40 text-[16px] font-light">{inf.f}</div><div className="text-white/[.08] text-[8px] sans uppercase tracking-[.15em]">Followers</div></div>
                    <div><div className="serif text-white/40 text-[16px] font-light">{inf.eng}</div><div className="text-white/[.08] text-[8px] sans uppercase tracking-[.15em]">Engagement</div></div>
                  </div>
                </div>
              </div>
              {sel === inf.name && (
                <div className="p-5 md:p-6 border-t border-white/[.03]">
                  <p className="text-white/[.18] text-[12px] font-light leading-[1.9] mb-5">{inf.desc}</p>
                  <div className="sans text-[8px] text-white/[.08] uppercase tracking-[.2em] mb-3">Recent</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {inf.vids.map((v, j) => (
                      <div key={j} className="aspect-video rounded overflow-hidden"><img src={YT(v)} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 pointer-events-none" /></div>
                    ))}
                  </div>
                  <div className="mt-5"><Link href="/create" className="btn-w text-[10px]">이 인플루언서로 제작</Link></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="sep" />
      <div className="page-container py-24 text-center" data-aos="fade-up">
        <h2 className="serif text-[22px] md:text-[30px] font-light text-white mb-4">AI 인플루언서와 시작하세요</h2>
        <p className="text-white/[.1] text-[12px] mb-8">상품만 등록하면 나머지는 AI가 전부 해결합니다</p>
        <Link href="/create" className="btn-w">시작하기</Link>
      </div>
    </div>
  );
}
