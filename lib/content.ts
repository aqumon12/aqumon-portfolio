export const profile = {
  name: "현상민",
  role: "프론트엔드 개발자",
  years: "3년 차",
  tagline:
    "비멤버의 관리자 웹과 하이브리드 앱 웹을 만들고 있습니다. 웹뷰 브릿지나 토큰 인증처럼 웹과 앱 사이에서 생기는 문제도 같이 맡아왔습니다.",
  email: "gustkdals123@gmail.com",
  github: "https://github.com/aqumon12",
};

// AI 지원 개발(AX) — 도구를 팀 방식대로 일하게 만드는 환경 설계
export const aiWorkflow = {
  intro:
    "AI 코딩 도구를 그때그때 시키는 식으로만 쓰지 않고, 팀 코드 패턴을 규칙과 명령어로 만들어 AI가 그대로 따르게 해두고 씁니다.",
  items: [
    {
      title: "패턴의 규칙화",
      detail:
        "팀 코드 패턴(도메인 세트, query-key 팩토리, MSW 목 규칙)을 Claude Code 규칙으로 만들어, AI가 만드는 코드도 팀 컨벤션을 따르게 했습니다.",
    },
    {
      title: "스캐폴딩 커맨드",
      detail:
        "새 도메인(service+query hook)과 MSW 핸들러(픽스처·시나리오 패널 등록 포함) 생성이 명령어 하나로 끝나게 만들었습니다.",
    },
    {
      title: "검증 훅",
      detail:
        "AI가 코드를 수정할 때마다 eslint가 자동으로 돌도록 훅을 걸어뒀습니다. 컨벤션에 어긋난 코드는 그 자리에서 걸리고, 토큰·브릿지 같은 핵심 로직은 단위 테스트로 한 번 더 검증합니다.",
    },
    {
      title: "효과 검증 실험",
      detail:
        "규칙 환경이 정말 나은지 일반 웹챗 방식과 같은 규모의 도메인으로 비교해봤습니다. 속도 차이는 크지 않았습니다. 대신 참고 파일을 매번 고르는 비용이 사라지고, 누가 돌려도 같은 결과가 나온다는 게 더 큰 이점이라고 결론 내렸습니다.",
    },
    {
      title: "LLM 기능 프로토타이핑",
      detail:
        "관리자 웹 푸시 문구 초안 생성(목적 입력 → 제목/본문 후보 3개) — NestJS 엔드포인트(Claude API, structured outputs + zod 이중 검증)부터 푸시 폼의 초안 패널까지 모노레포 양쪽을 구현했습니다.",
    },
  ],
};

export const stacks: { label: string; items: string[] }[] = [
  { label: "core", items: ["TypeScript", "Next.js", "React"] },
  { label: "state · data", items: ["TanStack Query", "Zustand", "Zod", "react-hook-form"] },
  { label: "style", items: ["Tailwind CSS"] },
  { label: "etc", items: ["React Native", "MSW", "Vitest", "Sentry", "ethers", "NestJS (학습)", "PHP (레거시)"] },
];

// 메인 "대표 작업" — 시스템 단위의 큼직한 케이스 4개 (상세는 프로젝트·트러블 페이지로 연결)
export const featuredWorks: {
  title: string;
  desc: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "하이브리드 앱-웹 브릿지 & 토큰 인증",
    desc: "앱 로그인 후 브릿지로 받은 JWT를 전 요청에 자동 주입하는 인증 구조. 동시 401은 재발급 한 번으로 합치고, 무한 재요청 루프는 401 기준 강제 갱신으로 차단했습니다.",
    links: [
      { label: "프로젝트 상세", href: "/projects/hybrid-app" },
      { label: "트러블슈팅", href: "/troubleshooting/webview-token-loop" },
    ],
  },
  {
    title: "QR 로그인 — 앱으로 찍으면 데스크톱이 로그인",
    desc: "모바일 앱으로 QR을 찍으면 데스크톱이 바로 로그인되는 흐름 — SSE 수신부터 세션 생성, 만료 키 재사용 문제 해결까지 웹 영역을 구현했습니다.",
    links: [
      { label: "프로젝트 상세", href: "/projects/admin-web" },
      { label: "트러블슈팅", href: "/troubleshooting/sse-qr-cache" },
    ],
  },
  {
    title: "NFT 전송 플로우 — 온체인 상태를 다루는 화면",
    desc: "전송 요청부터 완료까지 — 모달과 폴링으로 진행 상태를 관리하고, 전송 중인 NFT는 중복 전송을 막고, 실패하면 원인별 재시도 화면으로 분기합니다.",
    links: [{ label: "프로젝트 상세", href: "/projects/hybrid-app" }],
  },
  {
    title: "관리자 웹 공통 구조 — 폼 34개를 지탱하는 레이어",
    desc: "API 통신·캐시·폼 공통 구조를 먼저 설계해 전체 화면에 적용했습니다. 연관 화면 캐시를 함께 무효화해 데이터 어긋남을 구조로 막았고, 지금도 팀 기본 패턴입니다.",
    links: [
      { label: "프로젝트 상세", href: "/projects/admin-web" },
      { label: "트러블슈팅", href: "/troubleshooting/cross-domain-cache" },
    ],
  },
];
