'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const YT = (id) => `https://img.youtube.com/vi/${id}/hq720.jpg`;
const INF = [
  { name: 'YUNA', cat: 'Beauty', f: '12.4만', vid: 'YFU4erbddog' },
  { name: 'MISO', cat: 'Fashion', f: '8.7만', vid: 'LygFajnhLFY' },
  { name: 'HANA', cat: 'Lifestyle', f: '11.2만', vid: 'rxWNmzQpW2c' },
  { name: 'RINA', cat: 'Food', f: '9.8만', vid: 'RPmqjTwdVP8' },
];

export default function CreatePage() {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const generate = () => { setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 3000); };

  useEffect(() => {
    const els = document.querySelectorAll('[data-aos]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.style.transitionDuration = '900ms'; setTimeout(() => e.target.classList.add('aos-animate'), Number(e.target.dataset.aosDelay || 0)); }});
    }, { threshold: 0.06 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen page-container py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-16" data-aos="fade-up">
        <span className="sans text-[9px] text-white/[.08] uppercase tracking-[.2em]">AI Content Studio</span>
        <h1 className="serif text-[26px] md:text-[38px] font-light text-white mt-4" style={{ letterSpacing: '-0.025em' }}>콘텐츠 만들기</h1>
        <p className="text-white/[.15] text-[12px] mt-3 font-light">상품 정보만 입력하면 AI가 전부 만들어 드립니다</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-20" data-aos="fade-up" data-aos-delay="80">
        {['인플루언서', '상품 정보', '스타일', '생성'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] sans font-medium transition-all duration-500 ${step > i + 1 ? 'bg-white/[.08] text-white/30' : step === i + 1 ? 'bg-white text-black' : 'bg-white/[.02] text-white/[.08] border border-white/[.04]'}`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-[9px] sans tracking-[.1em] hidden sm:inline transition-colors duration-500 ${step === i + 1 ? 'text-white/40' : 'text-white/[.08]'}`}>{s}</span>
            {i < 3 && <div className="w-6 h-[.5px] bg-white/[.04]" />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="max-w-3xl mx-auto" data-aos="fade-up">
          <div className="sans text-[9px] text-white/[.1] uppercase tracking-[.2em] mb-6">Select Influencer</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {INF.map((inf) => (
              <div key={inf.name} onClick={() => setSel(inf.name)} className={`inf-profile cursor-pointer ${sel === inf.name ? '!border-white/20' : ''}`}>
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img src={YT(inf.vid)} alt="" className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  {sel === inf.name && <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white flex items-center justify-center"><svg width="8" height="6" viewBox="0 0 8 6" fill="none" stroke="#000" strokeWidth="1.5"><path d="M1 3l2 2 4-5"/></svg></div>}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="sans text-[8px] text-white/20 uppercase tracking-[.2em] mb-1">{inf.cat}</div>
                    <div className="flex items-end justify-between">
                      <span className="text-white/80 text-[13px] font-medium sans">{inf.name}</span>
                      <span className="text-white/15 text-[9px] sans">{inf.f}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-right"><button onClick={() => sel && setStep(2)} className={`btn-w ${!sel ? 'opacity-20 cursor-not-allowed' : ''}`}>다음</button></div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="max-w-md mx-auto" data-aos="fade-up">
          <div className="sans text-[9px] text-white/[.1] uppercase tracking-[.2em] mb-6">Product Info</div>
          <div className="space-y-5">
            <div><label className="sans text-[8px] text-white/[.1] uppercase tracking-[.2em] block mb-2">상품명</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 히알루론산 세럼" className="studio-input" /></div>
            <div><label className="sans text-[8px] text-white/[.1] uppercase tracking-[.2em] block mb-2">상품 설명</label><textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="특징, 타겟, 강조 포인트를 자유롭게" className="studio-input studio-textarea" /></div>
            <div><label className="sans text-[8px] text-white/[.1] uppercase tracking-[.2em] block mb-2">이미지</label><div className="upload-zone"><div className="text-white/[.1] text-[12px] mb-1.5">드래그하거나 클릭하여 업로드</div><div className="text-white/[.04] text-[10px]">JPG, PNG, WEBP · 최대 10MB</div></div></div>
          </div>
          <div className="mt-10 flex justify-between"><button onClick={() => setStep(1)} className="btn-o">이전</button><button onClick={() => name && setStep(3)} className={`btn-w ${!name ? 'opacity-20 cursor-not-allowed' : ''}`}>다음</button></div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="max-w-md mx-auto" data-aos="fade-up">
          <div className="sans text-[9px] text-white/[.1] uppercase tracking-[.2em] mb-6">Video Style</div>
          <div className="grid grid-cols-2 gap-2.5">
            {[{ k:'cinematic',l:'Cinematic',d:'시네마틱 무드' },{ k:'minimal',l:'Minimal',d:'깔끔한 미니멀' },{ k:'dynamic',l:'Dynamic',d:'다이나믹 숏폼' },{ k:'editorial',l:'Editorial',d:'에디토리얼 룩북' }].map((s) => (
              <button key={s.k} onClick={() => setStyle(s.k)} className={`studio-panel text-left ${style === s.k ? '!border-white/15' : ''}`}>
                <div className="text-white/50 text-[12px] font-medium sans">{s.l}</div>
                <div className="text-white/[.1] text-[10px] mt-1">{s.d}</div>
              </button>
            ))}
          </div>
          <div className="studio-panel mt-5"><label className="sans text-[8px] text-white/[.08] uppercase tracking-[.2em] block mb-2">추가 요청 (선택)</label><textarea placeholder="특별한 요청사항" className="studio-input studio-textarea" /></div>
          <div className="mt-10 flex justify-between"><button onClick={() => setStep(2)} className="btn-o">이전</button><button onClick={() => setStep(4)} className="btn-w">다음</button></div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && !done && (
        <div className="max-w-md mx-auto text-center" data-aos="fade-up">
          <div className="sans text-[9px] text-white/[.1] uppercase tracking-[.2em] mb-8">Confirm & Generate</div>
          <div className="studio-panel text-left mb-8">
            <div className="grid grid-cols-2 gap-5 text-[11px]">
              {[['인플루언서', sel], ['상품명', name], ['스타일', style], ['상태', '준비 완료']].map(([k, v]) => (
                <div key={k}><span className="text-white/[.1]">{k}</span><div className="text-white/40 mt-1 capitalize">{v}</div></div>
              ))}
            </div>
          </div>
          {!loading ? <button onClick={generate} className="studio-btn">AI 콘텐츠 생성하기</button> : (
            <div className="py-10"><div className="w-7 h-7 border-[1.5px] border-white/[.06] border-t-white/30 rounded-full animate-spin mx-auto mb-4" /><div className="text-white/25 text-[12px]">생성 중...</div><div className="text-white/[.06] text-[10px] mt-1.5">약 2~3분</div></div>
          )}
          <div className="mt-6"><button onClick={() => setStep(3)} className="btn-o">이전</button></div>
        </div>
      )}

      {/* Done */}
      {done && (
        <div className="max-w-lg mx-auto text-center" data-aos="fade-up">
          <div className="serif text-white/50 text-[22px] font-light mb-3">완료</div>
          <p className="text-white/[.12] text-[12px] mb-10">{sel}이(가) 콘텐츠를 제작했습니다</p>
          <div className="vcard mb-10 cursor-default"><img src={YT('YFU4erbddog')} alt="" className="thumb aspect-video" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /><div className="absolute bottom-4 left-5"><div className="text-white/80 text-[13px] font-medium">{name}</div><div className="text-white/20 text-[10px] sans mt-1">by {sel} · {style}</div></div></div>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => { setDone(false); setStep(1); setSel(null); setName(''); }} className="btn-o">새로 만들기</button>
            <Link href="/" className="btn-w">갤러리</Link>
          </div>
        </div>
      )}
    </div>
  );
}
