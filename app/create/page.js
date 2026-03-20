'use client';

import { useState } from 'react';
import Link from 'next/link';

const INFLUENCERS = [
  { name: 'YUNA', category: 'Beauty', followers: '12.4만', img: 'https://img.youtube.com/vi/YFU4erbddog/maxresdefault.jpg' },
  { name: 'MISO', category: 'Fashion', followers: '8.7만', img: 'https://img.youtube.com/vi/LygFajnhLFY/maxresdefault.jpg' },
  { name: 'HANA', category: 'Lifestyle', followers: '11.2만', img: 'https://img.youtube.com/vi/rxWNmzQpW2c/maxresdefault.jpg' },
  { name: 'RINA', category: 'Food', followers: '9.8만', img: 'https://img.youtube.com/vi/RPmqjTwdVP8/maxresdefault.jpg' },
];

export default function CreatePage() {
  const [step, setStep] = useState(1);
  const [selectedInf, setSelectedInf] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setDone(true); }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="page-container py-12">
        <div className="text-center mb-12">
          <span className="sans text-[10px] text-white/10 uppercase tracking-[.25em]">AI Content Studio</span>
          <h1 className="serif text-[28px] md:text-[42px] font-light text-white mt-4" style={{ letterSpacing: '-0.02em' }}>
            AI 인플루언서 콘텐츠 만들기
          </h1>
          <p className="text-white/20 text-[13px] mt-3">상품 정보만 입력하면, AI가 전부 만들어 드립니다</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-16">
          {['인플루언서 선택', '상품 정보', '스타일 설정', '생성'].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${step > i + 1 ? 'text-white/40' : step === i + 1 ? 'text-white' : 'text-white/10'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] sans font-semibold ${step > i + 1 ? 'bg-white/10' : step === i + 1 ? 'bg-white text-black' : 'bg-white/[.03] border border-white/[.06]'}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-[11px] sans tracking-wider hidden sm:inline">{s}</span>
              </div>
              {i < 3 && <div className="w-8 h-[1px] bg-white/[.06]" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Influencer */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white/60 text-[14px] font-medium mb-6">AI 인플루언서를 선택하세요</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INFLUENCERS.map((inf) => (
                <div
                  key={inf.name}
                  onClick={() => setSelectedInf(inf.name)}
                  className={`inf-profile cursor-pointer ${selectedInf === inf.name ? 'border-white/30' : ''}`}
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img src={inf.img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {selectedInf === inf.name && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="#000" strokeWidth="2"><path d="M1 4l3 3 5-6" /></svg>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-white text-[14px] font-semibold sans">{inf.name}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-white/40 text-[10px] sans uppercase tracking-wider">{inf.category}</span>
                        <span className="text-white/25 text-[10px] sans">{inf.followers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-right">
              <button onClick={() => selectedInf && setStep(2)} className={`btn-w ${!selectedInf ? 'opacity-30 cursor-not-allowed' : ''}`}>
                다음
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Product Info */}
        {step === 2 && (
          <div className="max-w-lg mx-auto">
            <h2 className="text-white/60 text-[14px] font-medium mb-6">상품 정보를 입력하세요</h2>
            <div className="space-y-4">
              <div>
                <label className="sans text-[10px] text-white/20 uppercase tracking-[.2em] block mb-2">상품명</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="예: 히알루론산 세럼" className="studio-input" />
              </div>
              <div>
                <label className="sans text-[10px] text-white/20 uppercase tracking-[.2em] block mb-2">상품 설명</label>
                <textarea value={productDesc} onChange={(e) => setProductDesc(e.target.value)} placeholder="상품의 특징, 타겟 고객, 강조 포인트 등을 자유롭게 작성하세요" className="studio-input studio-textarea" />
              </div>
              <div>
                <label className="sans text-[10px] text-white/20 uppercase tracking-[.2em] block mb-2">상품 이미지</label>
                <div className="upload-zone">
                  <div className="text-white/15 text-[13px] mb-2">이미지를 드래그하거나 클릭하여 업로드</div>
                  <div className="text-white/[.06] text-[11px]">JPG, PNG, WEBP · 최대 10MB</div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="btn-o">이전</button>
              <button onClick={() => productName && setStep(3)} className={`btn-w ${!productName ? 'opacity-30 cursor-not-allowed' : ''}`}>다음</button>
            </div>
          </div>
        )}

        {/* Step 3: Style */}
        {step === 3 && (
          <div className="max-w-lg mx-auto">
            <h2 className="text-white/60 text-[14px] font-medium mb-6">영상 스타일을 선택하세요</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'cinematic', label: 'Cinematic', desc: '시네마틱 무드' },
                { key: 'minimal', label: 'Minimal', desc: '깔끔한 미니멀' },
                { key: 'dynamic', label: 'Dynamic', desc: '다이나믹 숏폼' },
                { key: 'editorial', label: 'Editorial', desc: '에디토리얼 룩북' },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStyle(s.key)}
                  className={`studio-panel text-left ${style === s.key ? 'border-white/20' : ''}`}
                >
                  <div className="text-white/70 text-[13px] font-medium sans">{s.label}</div>
                  <div className="text-white/15 text-[11px] mt-1">{s.desc}</div>
                </button>
              ))}
            </div>

            <div className="studio-panel mt-6">
              <label className="sans text-[10px] text-white/20 uppercase tracking-[.2em] block mb-2">추가 프롬프트 (선택)</label>
              <textarea placeholder="특별한 요청사항이 있으면 입력하세요" className="studio-input studio-textarea" />
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="btn-o">이전</button>
              <button onClick={() => setStep(4)} className="btn-w">다음</button>
            </div>
          </div>
        )}

        {/* Step 4: Generate */}
        {step === 4 && !done && (
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-white/60 text-[14px] font-medium mb-8">설정을 확인하고 생성하세요</h2>

            <div className="studio-panel text-left mb-6">
              <div className="grid grid-cols-2 gap-4 text-[12px]">
                <div><span className="text-white/15">인플루언서</span><div className="text-white/50 mt-1">{selectedInf}</div></div>
                <div><span className="text-white/15">상품명</span><div className="text-white/50 mt-1">{productName}</div></div>
                <div><span className="text-white/15">스타일</span><div className="text-white/50 mt-1 capitalize">{style}</div></div>
                <div><span className="text-white/15">상태</span><div className="text-white/50 mt-1">준비 완료</div></div>
              </div>
            </div>

            {!generating ? (
              <button onClick={handleGenerate} className="studio-btn">
                AI 콘텐츠 생성하기
              </button>
            ) : (
              <div className="py-8">
                <div className="w-8 h-8 border-2 border-white/10 border-t-white/50 rounded-full animate-spin mx-auto mb-4" />
                <div className="text-white/40 text-[13px]">AI가 콘텐츠를 생성하고 있습니다...</div>
                <div className="text-white/10 text-[11px] mt-2">약 2~3분 소요</div>
              </div>
            )}

            <div className="mt-6">
              <button onClick={() => setStep(3)} className="btn-o">이전</button>
            </div>
          </div>
        )}

        {/* Done */}
        {done && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="serif text-white/60 text-[24px] font-light mb-4">콘텐츠 생성 완료</div>
            <p className="text-white/20 text-[13px] mb-8">AI 인플루언서 {selectedInf}이(가) 콘텐츠를 제작했습니다</p>

            <div className="vcard mb-8 cursor-default">
              <img src={`https://img.youtube.com/vi/${INFLUENCERS.find(i=>i.name===selectedInf)?.img ? 'YFU4erbddog' : 'VU52Kx2AXL8'}/maxresdefault.jpg`} alt="" className="thumb aspect-video" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="text-white text-[14px] font-medium">{productName}</div>
                <div className="text-white/30 text-[11px] sans mt-1">by {selectedInf} · {style}</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button onClick={() => { setDone(false); setStep(1); setSelectedInf(null); setProductName(''); }} className="btn-o">새로 만들기</button>
              <Link href="/" className="btn-w inline-block">갤러리로 이동</Link>
            </div>

            <p className="text-white/[.06] text-[11px] mt-8">사전등록 후 실제 콘텐츠를 생성할 수 있습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
