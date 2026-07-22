export const profile = {
  name: "현상민",
  role: "프론트엔드 개발자",
  years: "3년 차",
  tagline:
    "관리자 웹과 하이브리드 앱을 화면부터 API까지 다룹니다. 웹과 네이티브가 얽혀 어느 한쪽만으로는 풀리지 않는 문제를 주로 맡습니다.",
  email: "gustkdals123@gmail.com",
  github: "https://github.com/aqumon12",
};

// AI 지원 개발(AX) — 도구를 팀 방식대로 일하게 만드는 환경 설계
export const aiWorkflow = {
  intro:
    "AI 코딩 도구를 그때그때 시키는 식으로만 쓰지 않고, 팀 코드 패턴을 규칙과 명령어로 만들어두고 그 위에서 씁니다.",
  items: [
    {
      title: "패턴의 규칙화",
      detail:
        "직접 잡은 팀 코드 패턴(도메인 세트, query-key 팩토리, MSW 목 규칙)을 AI 도구의 규칙 문서로 정리해, AI가 만드는 코드도 팀 컨벤션을 따르게 했습니다.",
    },
    {
      title: "스캐폴딩 커맨드",
      detail:
        "새 도메인(service+query hook)과 MSW 핸들러(픽스처·시나리오 패널 등록 포함) 생성이 명령어 하나로 끝나게 만들었습니다.",
    },
    {
      title: "검증 훅",
      detail:
        "AI가 코드를 수정할 때마다 eslint가 자동으로 돌도록 훅을 걸어뒀습니다. 컨벤션에 어긋난 코드는 그 자리에서 걸리고, AI가 바로 고칩니다.",
    },
    {
      title: "LLM 기능 프로토타이핑",
      detail:
        "관리자 웹 푸시 문구 초안 생성(목적 입력 → 제목/본문 후보 3개) — NestJS 엔드포인트(Claude API, structured outputs + zod 이중 검증)부터 푸시 폼의 초안 패널까지 모노레포 양쪽을 직접 구현했습니다.",
    },
  ],
};

export const stacks: { label: string; items: string[] }[] = [
  { label: "core", items: ["TypeScript", "Next.js", "React"] },
  { label: "state · data", items: ["TanStack Query", "Zustand", "Zod", "react-hook-form"] },
  { label: "style", items: ["Tailwind CSS"] },
  { label: "etc", items: ["React Native", "MSW", "Vitest", "Sentry", "ethers v6", "NestJS (학습)", "PHP (레거시)"] },
];
