import './globals.css';

export const metadata = {
  title: 'Scenica AI — AI 인플루언서가 직접 팔아주는 숏폼 이커머스',
  description: '팔로워 10만+ AI 인플루언서가 영상 제작부터 채널 게시, 판매까지.',
  openGraph: {
    title: 'Scenica AI — AI 인플루언서 숏폼 이커머스',
    description: '상품만 등록하면, AI 인플루언서가 만들고 띄우고 팔아줍니다',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
