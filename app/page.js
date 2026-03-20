'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const VIDEOS = [
  { id: 'VU52Kx2AXL8', title: 'Night City Mood', creator: 'YUNA', cat: 'cinematic', views: '324K' },
  { id: 'YFU4erbddog', title: 'Shh No Talk Tonight', creator: 'YUNA', cat: 'beauty', views: '891K' },
  { id: 'LygFajnhLFY', title: 'Street Fashion Film', creator: 'MISO', cat: 'fashion', views: '512K' },
  { id: 'rxWNmzQpW2c', title: 'Morning Routine', creator: 'HANA', cat: 'lifestyle', views: '267K' },
  { id: 'RPmqjTwdVP8', title: 'Product Showcase', creator: 'RINA', cat: 'commerce', views: '183K' },
  { id: 'ttR0eoHz9Bg', title: 'Brand Campaign', creator: 'YUNA', cat: 'commerce', views: '445K' },
  { id: 'YFU4erbddog', title: 'Cosmetics Editorial', creator: 'MISO', cat: 'beauty', views: '678K' },
  { id: 'LygFajnhLFY', title: 'Lookbook SS26', creator: 'HANA', cat: 'fashion', views: '394K' },
  { id: 'rxWNmzQpW2c', title: 'Cafe Vlog', creator: 'RINA', cat: 'lifestyle', views: '221K' },
  { id: 'RPmqjTwdVP8', title: 'Unboxing Haul', creator: 'YUNA', cat: 'commerce', views: '156K' },
  { id: 'VU52Kx2AXL8', title: 'Cinematic Portrait', creator: 'MISO', cat: 'cinematic', views: '733K' },
  { id: 'ttR0eoHz9Bg', title: 'Summer Collection', creator: 'HANA', cat: 'fashion', views: '289K' },
];

const CATEGORIES = [
  { key: 'all', label: 'All' }, { key: 'cinematic', label: 'Cinematic' },
  { key: 'beauty', label: 'Beauty' }, { key: 'fashion', label: 'Fashion' },
  { key: 'lifestyle', label: 'Lifestyle' }, { key: 'commerce', label: 'Commerce' },
];

const YT_THUMB = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const YT_CINEMA = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=0&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&rel=0&playsinline=1&disablekb=1&fs=0`;

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

function VideoModal({ video, onClose }) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-video-wrap" onClick={(e) => e.stopPropagation()}>
        <iframe src={YT_CINEMA(video.id)} allow="autoplay; encrypted-media" allowFullScreen tabIndex="-1" />
        <div className="modal-blocker-top" />
        <div className="modal-blocker-bottom" />
        <div className="modal-click-block" />
      </div>
      <button className="modal-close" onClick={onClose}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" /></svg>
      </button>
      <div className="modal-info">
        <div className="text-white/50 text-[13px] font-light tracking-wide">{video.title}</div>
        <div className="text-white/15 text-[11px] sans mt-1 tracking-wider uppercase">{video.creator} — Scenica AI</div>
      </div>
    </div>
  );
}

function VideoCard({ video, index, onPlay }) {
  return (
    <div className="vcard" data-aos="fade-up" data-aos-delay={Math.min(index * 60, 360)} data-aos-duration="900" onClick={() => onPlay(video)}>
      <img src={YT_THUMB(video.id)} alt="" className="thumb aspect-video" loading="lazy" />
      <div className="card-overlay" />
      <div className="play-icon"><svg width="14" height="16" viewBox="0 0 14 16" fill="#000"><polygon points="2,0 14,8 2,16" /></svg></div>
      <div className="card-info">
        <div className="text-white/90 text-[12px] font-medium tracking-wide">{video.title}</div>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-white/30 text-[10px] sans uppercase tracking-wider">{video.creator}</span>
          <span className="text-white/10 text-[10px]">|</span>
          <span className="text-white/15 text-[10px] sans tracking-wider">{video.views}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [modal, setModal] = useState(null);
  const [activeCat, setActiveCat] = useState('all');
  const [key, setKey] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const featured = VIDEOS[1]; // Shh No Talk Tonight - YUNA

  useAOS();

  useEffect(() => {
    const h = () => setParallaxY(window.scrollY * 0.25);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const filtered = activeCat === 'all' ? VIDEOS : VIDEOS.filter((v) => v.cat === activeCat);

  const changeCat = (cat) => { setActiveCat(cat); setKey((k) => k + 1); };

  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll('#gallery [data-aos]').forEach((el) => {
        el.classList.remove('aos-animate'); void el.offsetWidth;
        el.style.transitionDuration = `${el.getAttribute('data-aos-duration') || 800}ms`;
        setTimeout(() => el.classList.add('aos-animate'), Number(el.getAttribute('data-aos-delay') || 0));
      });
    }, 50);
    return () => clearTimeout(t);
  }, [key]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative w-full" style={{ height: 'max(70vh, 600px)' }}>
          <div className="absolute inset-0 w-full" style={{ height: '125%', top: '-12%', transform: `translateY(${parallaxY}px)` }}>
            <img src={YT_THUMB(featured.id)} alt="" className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="page-container pb-16 md:pb-24 w-full">
              <div className="hero-badge mb-6" data-aos="fade-up" data-aos-duration="600">
                <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" />
                <span className="sans">Early Access Open</span>
              </div>
              <h1 className="serif text-[36px] sm:text-[48px] md:text-[64px] lg:text-[78px] font-light text-white leading-[1.08] max-w-2xl" style={{ letterSpacing: '-0.03em' }} data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                AI 인플루언서가<br />직접 팔아줍니다
              </h1>
              <p className="text-white/25 text-[13px] md:text-[14px] font-light leading-[1.9] max-w-sm mt-5" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                상품만 등록하세요. 팔로워 10만+ AI 인플루언서가<br />영상 제작부터 판매까지 전부 자동으로.
              </p>
              <div className="flex items-center gap-4 mt-8" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                <Link href="/create" className="hero-btn hero-btn-primary">시작하기</Link>
                <button onClick={() => setModal(featured)} className="hero-btn hero-btn-ghost">
                  <div className="play-circle"><svg width="10" height="12" viewBox="0 0 10 12" fill="white"><polygon points="1,0 10,6 1,12" /></svg></div>
                  <span className="sans text-[11px] tracking-[.12em] uppercase">Watch Film</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sep" />
        <div className="page-container" data-aos="fade-up" data-aos-delay="100">
          <div className="stat-row">
            {[{ v:'130',u:'건',l:'Orders' },{ v:'3.2',u:'억',l:'Revenue' },{ v:'9',u:'x',l:'Conversion' },{ v:'97',u:'%',l:'Cost Saved' },{ v:'40',u:'만+',l:'Followers' }].map((s,i) => (
              <div key={s.l} className="stat-item" data-aos="fade-up" data-aos-delay={100+i*80}>
                <span className="stat-num">{s.v}<span className="text-[16px]">{s.u}</span></span>
                <span className="stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sep" />
      </section>

      {/* GALLERY */}
      <section id="gallery" className="page-container py-14">
        <div className="tab-bar mb-10" data-aos="fade-up" data-aos-duration="600">
          {CATEGORIES.map((cat) => (
            <button key={cat.key} onClick={() => changeCat(cat.key)} className={`tab-item ${activeCat === cat.key ? 'active' : ''}`}>{cat.label}</button>
          ))}
        </div>
        <div className="vid-grid" key={key}>
          {filtered.map((v, i) => <VideoCard key={`${v.id}-${i}-${key}`} video={v} index={i} onPlay={setModal} />)}
        </div>
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="200">
          <Link href="/create" className="btn-o sans inline-block">Start Creating</Link>
        </div>
      </section>

      {modal && <VideoModal video={modal} onClose={() => setModal(null)} />}
    </>
  );
}
