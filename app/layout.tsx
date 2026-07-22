import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aqumon.dev"),
  title: "현상민 · 프론트엔드 개발자",
  description:
    "관리자 웹과 하이브리드 앱을 화면부터 API까지 다뤄온 프론트엔드 개발자 현상민의 포트폴리오",
  openGraph: {
    title: "현상민 · 프론트엔드 개발자",
    description:
      "관리자 웹과 하이브리드 앱을 화면부터 API까지 다뤄온 프론트엔드 개발자의 포트폴리오 — 프로젝트와 트러블슈팅을 문제→원인→해결 과정으로 정리했습니다.",
    url: "https://aqumon.dev",
    siteName: "현상민 포트폴리오",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
