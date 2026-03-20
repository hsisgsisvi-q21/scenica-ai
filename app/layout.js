import './globals.css';

export const metadata = {
  title: 'Scenica AI — AI 인플루언서 숏폼 이커머스 플랫폼',
  description: '팔로워 10만+ AI 인플루언서가 영상 제작부터 채널 게시, 판매까지.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
