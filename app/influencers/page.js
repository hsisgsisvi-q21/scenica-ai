'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const INFLUENCERS = [
  { name: 'YUNA', category: 'Beauty', followers: '12.4만', videos: '847', engagement: '4.2%', desc: '뷰티·코스메틱 전문. 자연스러운 리뷰와 감성적인 룩북으로 팔로워와 소통합니다.', videoIds: ['YFU4erbddog', 'ttR0eoHz9Bg', 'VU52Kx2AXL8'] },
  { name: 'MISO', category: 'Fashion', followers: '8.7만', videos: '623', engagement: '3.8%', desc: '스트릿 패션부터 하이엔드까지. 트렌디한 스타일링과 룩북 콘텐츠를 제작합니다.', videoIds: ['LygFajnhLFY', 'YFU4erbddog', 'RPmqjTwdVP8'] },
  { name: 'HANA', category: 'Lifestyle', followers: '11.2만', videos: '731', engagement: '4.5%', desc: '데일리 라이프스타일, 카페 브이로그, 인테리어까지. 일상을 감성적으로 담아냅니다.', videoIds: ['rxWNmzQpW2c', 'LygFajnhLFY', 'ttR0eoHz9Bg'] },
  { name: 'RINA', category: 'Food & Living', followers: '9.8만', videos: '568', engagement: '3.9%', desc: '푸드 리뷰, 홈쿠킹, 리빙 소품까지. 따뜻한 톤의 콘텐츠로 구매 전환을 이끕니다.', videoIds: ['RPmqjTwdVP8', 'rxWNmzQpW2c', 'VU52Kx2AXL8'] },
];

const YT_THUMB = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

export default function InfluencersPage() {
  const [selected, setSelected] = useState(null);

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="page-container py-16 text-center">
        <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]" data-aos="fade-up">AI Influencers</span>
        <h1 className="serif text-[32px] md:text-[52px] font-light text-white mt-5 leading-[1.1]" style={{ letterSpacing: '-0.03em' }} data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
          팔로워 40만+<br />AI 인플루언서를 만나보세요
        </h1>
        <p className="text-white/20 text-[14px] font-light mt-5 max-w-md mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
          각 카테고리에 특화된 AI 인플루언서가<br />당신의 상품을 직접 홍보합니다
        </p>
      </div>

      <div className="sep" />

      {/* Influencer Grid */}
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INFLUENCERS.map((inf, i) => (
            <div
              key={inf.name}
              className="inf-profile cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={i * 100}
              onClick={() => setSelected(selected === inf.name ? null : inf.name)}
            >
              {/* Cover Image */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <img src={YT_THUMB(inf.videoIds[0])} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Profile info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="sans text-[9px] text-white/30 uppercase tracking-[.2em] mb-2">{inf.category}</div>
                      <div className="text-white text-[22px] font-semibold sans tracking-wide">{inf.name}</div>
                    </div>
                    <div className="flex gap-6 text-right">
                      <div>
                        <div className="serif text-white/60 text-[18px] font-light">{inf.followers}</div>
                        <div className="text-white/15 text-[9px] sans uppercase tracking-wider">Followers</div>
                      </div>
                      <div>
                        <div className="serif text-white/60 text-[18px] font-light">{inf.engagement}</div>
                        <div className="text-white/15 text-[9px] sans uppercase tracking-wider">Engagement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {selected === inf.name && (
                <div className="p-6 border-t border-white/[.04]">
                  <p className="text-white/25 text-[13px] font-light leading-[1.8] mb-6">{inf.desc}</p>

                  {/* Recent content grid */}
                  <div className="sans text-[9px] text-white/15 uppercase tracking-[.2em] mb-3">Recent Contents</div>
                  <div className="grid grid-cols-3 gap-2">
                    {inf.videoIds.map((vid, j) => (
                      <div key={j} className="aspect-video rounded-md overflow-hidden relative group">
                        <img src={YT_THUMB(vid)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <Link href="/create" className="btn-w text-[11px]">이 인플루언서로 제작하기</Link>
                    <span className="text-white/10 text-[11px] sans">{inf.videos} videos created</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="sep" />
      <div className="page-container py-20 text-center">
        <h2 className="serif text-[24px] md:text-[32px] font-light text-white mb-4" data-aos="fade-up">
          AI 인플루언서와 함께 시작하세요
        </h2>
        <p className="text-white/15 text-[13px] mb-8" data-aos="fade-up" data-aos-delay="100">상품만 등록하면, 나머지는 AI가 전부 해결합니다</p>
        <Link href="/create" className="btn-w inline-block" data-aos="fade-up" data-aos-delay="200">시작하기</Link>
      </div>
    </div>
  );
}
