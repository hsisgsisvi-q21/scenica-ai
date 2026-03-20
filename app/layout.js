import './globals.css';

export const metadata = {
  title: 'Scenica AI — 상품 사진 1장으로 광고 영상 제작',
  description: '소상공인을 위한 AI 영상 제작 플랫폼. 상품 이미지 하나로 몇 분 만에 광고 영상을 만들어 보세요.',
  keywords: 'AI, 영상제작, 광고영상, 소상공인, 자동영상, Scenica',
  openGraph: {
    title: 'Scenica AI — 상품 사진 1장으로 광고 영상 제작',
    description: '소상공인을 위한 AI 영상 제작 플랫폼',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
