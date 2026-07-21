# aqumon.dev — 포트폴리오 사이트

프론트엔드 개발자 현상민의 포트폴리오 사이트 소스입니다.
프로젝트·트러블슈팅 기록을 정적 데이터(`lib/*.ts`)로 관리하고, Next.js App Router로 렌더링합니다.

**Live**: https://aqumon.dev

## 스택

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- Vercel 배포

## 구조

```
app/                  # 홈 · projects/[slug] · troubleshooting/[slug]
components/           # UI 컴포넌트 (테마 토글, 다이어그램 등)
lib/
  ├── content.ts      # 프로필·소개
  ├── projects.ts     # 프로젝트 상세 데이터
  └── troubles.ts     # 트러블슈팅 상세 데이터
```

## 실행

```bash
pnpm install
pnpm dev
```
