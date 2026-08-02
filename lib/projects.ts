export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  contribution: string;
  team: string;
  oneLiner: string;
  summary: string; // 홈 카드용 짧은 설명
  tags: string[];
  background: string[];
  stack: { name: string; why: string }[];
  contributions: { title: string; details: string[] }[];
  troubleSlugs: string[];
  results: string[];
  links?: { label: string; href: string }[];
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: "hybrid-app",
    title: "하이브리드 WebView 앱 (웹 영역)",
    period: "2026.01 ~ 진행 중",
    role: "WebView 웹 담당 (+ 모바일 공통 로직 일부, 약 2개월)",
    contribution: "웹 커밋의 약 55% 기여",
    team: "웹/모바일/백엔드 협업 (모바일 메인 개발자 별도)",
    oneLiner:
      "Next.js WebView 웹과 React Native가 브릿지로 통신하는 하이브리드 구조에서, 웹과 네이티브가 얽혀 웹 코드만으로는 풀리지 않는 문제들을 주로 다뤘습니다.",
    summary:
      "네이티브 토큰 기반 인증, 웹↔네이티브 모달·백버튼 연동, NFT 전송 사전 검증, MSW 테스트 인프라(목 분기 5,164줄 삭제)까지 담당.",
    tags: ["인증 아키텍처", "WebView 브릿지", "MSW · Vitest"],
    background: [
      "NFT 멤버십 서비스의 사용자 앱으로, Next.js로 만든 WebView 웹이 React Native 셸과 브릿지로 통신하는 하이브리드 구조입니다.",
      "토큰·모달·뒤로가기처럼 웹과 네이티브가 얽히는 문제가 반복되는 환경이라, 웹에서 처리할지 브릿지로 네이티브에 넘길지를 매번 판단해야 했습니다.",
    ],
    stack: [
      { name: "Next.js 16 (App Router)", why: "라우트 그룹으로 인증 영역을 나누고, 미들웨어로 앱 밖 접근을 막는 데 썼습니다." },
      { name: "Zustand (persist)", why: "네이티브가 준 토큰을 저장해 두고 모든 요청에 자동으로 붙입니다." },
      { name: "ethers", why: "NFT를 보내기 전 실제 소유자를 블록체인에서 직접 확인합니다." },
      { name: "MSW", why: "백엔드 없이도 성공·실패·빈 값 같은 화면 상태를 바로 재현합니다." },
    ],
    contributions: [
      {
        title: "네이티브 브릿지 기반 토큰 인증 설계 — 무한 재요청 루프를 401 기준 갱신으로 차단",
        details: [
          "WebView는 쿠키 세션을 믿을 수 없는 구조 → 브릿지로 토큰을 받아 전 요청에 자동 주입",
          "동시다발 401은 재발급 1회로 합침(single-flight), 10초 무응답은 실패 처리, 리프레시 만료 시 자동 재로그인 연결",
          "서버가 이미 거부한 토큰을 '만료 전'이라며 재사용하던 무한 재요청 루프 발견 → 401 응답 기준 강제 갱신으로 해결",
        ],
      },
      {
        title: "postMessage 호출을 Promise 기반 appBridge API로 정리 — 모달·토스트 네이티브 연동",
        details: [
          "손으로 호출하던 postMessage를 Promise 요청-응답 구조의 appBridge로 통일, 신규 액션(토큰 통합·네이티브 토스트) 추가",
          "웹 모달이 네이티브 탭바를 못 덮는 한계 → 꼭 필요한 모달만 브릿지 액션으로 네이티브 전환",
          "앱 밖에서 들어온 접근은 미들웨어에서 플랫폼별 리다이렉트 처리",
        ],
      },
      {
        title: "NFT 전송 화면 — 요청부터 푸시 완료까지 진행 상태를 화면이 직접 관리",
        details: [
          "전송 완료가 서버 응답이 아니라 푸시 알림으로 오는 구조 → 전송 건을 저장해 두고 요청·처리 중·완료 상태를 관리",
          "전송 중인 NFT는 목록에 '전송 중'으로 표시하고 전송 화면 재진입을 막아 중복 전송 방지",
          "앱이 죽어도 '전송 중'에 갇히지 않게 상태별 만료 처리 (요청 5분·처리 중 24시간)",
          "목록 데이터(인덱서)가 체인보다 늦을 수 있어, 전송 직전 온체인 소유자를 다시 확인해 가스비만 잃는 전송을 걸러내고 해당 NFT는 24시간 목록에서 숨김",
        ],
      },
      {
        title: "기기·OS별 WebView 렌더 차이를 safe-area 분기로 흡수",
        details: [
          "iOS contentInset 하단 빈 공간, SafeAreaView 이중 여백, 둥근 모서리에 잘리는 하단 고정 버튼 등을 플랫폼 분기로 해결",
          "커서 기반 무한 스크롤을 목록 화면 전반에 적용",
          "SVG 아이콘 128종 SVGR 컴포넌트화 — 아이콘 추가가 파일 추가만으로 끝나는 구조 (프로젝트 초기 설정)",
        ],
      },
      {
        title: "목 분기 5,164줄 삭제, MSW 네트워크 레이어로 일원화",
        details: [
          "프로덕션 코드 곳곳의 목(mock) 분기를 걷어내고 MSW 인터셉트 한곳으로 통합 — 핸들러 17종·픽스처 15종 + 실서버 passthrough",
          "런타임 시나리오 패널로 가스 부족·충전 실패 같은 엣지 케이스를 백엔드 없이 클릭으로 재현",
          "목 데이터가 프로덕션 번들에 실리던 것을 dynamic import로 격리 — First Load JS 실측 약 99KB(gzip 21KB) 감축",
        ],
      },
      {
        title: "지연 로드 전환으로 First Load JS gzip 511→370KB(−27.6%), TBT 968→445ms(−54%) 실측",
        details: [
          "초기 로드 청크 분석으로 lottie(gzip 78KB)·Sentry Replay·framer 엔진이 전 페이지 초기 번들에 실리는 것을 발견",
          "셋을 지연 로드로 전환하고, 개선 전후 빌드를 같은 조건에서 띄워 초기 로드 용량 합산으로 검증",
          "처음엔 전체 산출물 크기로 재서 결론이 반대로 나왔던 실수 — 지표를 잘못 잡으면 결론이 뒤집힌다는 걸 배움",
        ],
      },
      {
        title: "핵심 로직을 Vitest 테스트 104개로 고정 — 도입 첫날 로그아웃 버그 적발",
        details: [
          "토큰 single-flight, 브릿지 타임아웃, MSW 프로덕션 게이트 등 트러블슈팅으로 세운 규칙을 11개 파일·104개 테스트로 고정",
          "도입 첫날, 빈 바디 5xx 응답이 '만료'로 오분류돼 로그아웃되던 버그를 테스트가 발견 → 즉시 수정",
          "테스트는 커버리지 숫자가 아니라 정책을 고정하는 도구라는 확신을 얻음",
        ],
      },
      {
        title: "안드로이드 백버튼을 웹과 연동하는 요청-응답 브릿지 단독 구현 (RN 협업, 약 2개월)",
        details: [
          "OS 백 이벤트를 가로채 웹에 처리 의사를 묻는 requestId 기반 브릿지 — 300ms 타임아웃 안전장치",
          "명령형 인증 라우팅을 Expo Router Stack.Protected 선언적 가드로 전환",
          "iOS/Android safe-area 정책 플랫폼 분기, 개발용 앱 수동 빌드·EAS Update(OTA) 수행",
        ],
      },
    ],
    highlights: ["첫 로드 스크립트 gzip −30%", "화면 멈춤 시간(TBT) −54%", "목 분기 5,164줄 삭제", "단위 테스트 104개"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.metastar.nticka&hl=ko" },
      { label: "App Store", href: "https://apps.apple.com/kr/app/id1633810435" },
    ],
    troubleSlugs: ["monorepo-react-dup", "webview-modal-dim", "expo-router-backstack", "webview-token-loop", "sentry-blind-spots"],
    results: [
      "서버가 이미 거부한 토큰을 만료 전이라는 이유로 계속 쓰던 인증을 401 응답 기준으로 바꿔 무한 재요청 루프를 없앴고, 토큰·브릿지처럼 꼬이기 쉬운 로직은 단위 테스트 104개로 잡아뒀습니다.",
      "목 분기 5,164줄을 걷어내 백엔드 없이도 성공·실패·빈 값 상태를 바로 확인하며 개발할 수 있게 됐고, 무거운 라이브러리를 지연 로드로 분리해 첫 로드 스크립트를 30%, 화면 멈춤 시간을 절반 넘게 줄였습니다.",
    ],
  },
  {
    slug: "admin-web",
    title: "NFT 멤버십 관리자 웹 · 비즈센터",
    period: "2025.02 ~ 2025.12 (이후 유지보수)",
    role: "웹 프론트엔드 · 공통 구조 설계",
    contribution: "전체 커밋의 약 38% 기여 · 리뷰·머지한 PR 96건",
    team: "프론트 다수 + 백엔드 협업",
    oneLiner:
      "브랜드 운영사가 회원·NFT·포인트·커뮤니티·푸시 캠페인을 관리하는 B2B 어드민 웹에서 API 통신·캐시·폼의 공통 구조를 잡아 전체 화면에 적용했고, 이후 추가된 도메인들도 이 구조 위에서 확장되고 있습니다.",
    summary:
      "전체 커밋의 약 38%를 기여. API 통신·캐시·폼 같은 공통 구조를 만들고, 회원·NFT·포인트·푸시 등 운영 도메인을 화면부터 API 연동까지 구현.",
    tags: ["공통 아키텍처", "인증·권한", "TanStack Query"],
    background: [
      "NFT 멤버십 서비스의 운영자(브랜드 담당자·관리자)가 회원·NFT·포인트·푸시 발송을 관리하는 관리자 웹(비즈센터)입니다.",
      "프로젝트 초기부터 공통 레이어를 먼저 설계했습니다. 이때 잡은 패턴(fetch 래퍼·query-key 팩토리·폼 세트)이 팀 표준으로 정착했습니다.",
    ],
    stack: [
      { name: "Next.js 15 (App Router)", why: "세션 인증과 페이지 접근 제어를 서버 렌더링 단계에서 처리합니다." },
      { name: "TanStack Query", why: "여러 도메인이 얽힌 화면에서 서버 데이터 캐시와 갱신을 한 가지 규칙으로 다룹니다." },
      { name: "react-hook-form + Zod", why: "폼이 34개로 늘어나도 검증 규칙을 스키마 하나로 관리하고 타입까지 공유합니다." },
      { name: "Zustand", why: "세션·모달·확인창 같은 전역 UI 상태를 가볍게 담습니다." },
    ],
    contributions: [
      {
        title: "API 통신·캐시·폼 공통 레이어 설계 — 폼 34개 전체 적용, 팀 기본 패턴으로 정착",
        details: [
          "중복되던 fetch·에러 처리를 래퍼 하나로 — ApiError, HTTP 상태 11종 한글 매핑, SSR 쿠키 포워딩, 401/403 정책",
          "도메인별 계층적 query-key 팩토리(32개 훅) + 교차 도메인 캐시 무효화 규칙",
          "service+schema+type+hook 4계층 패턴을 전 도메인에 표준화",
        ],
      },
      {
        title: "QR 스캔 로그인(SSE) 구현 + 권한 체크를 훅 하나로 통합해 62개 컴포넌트 적용",
        details: [
          "아이디 입력 없이 모바일 앱 QR 스캔만으로 로그인 — EventSource 생명주기·재연결·만료 처리",
          "페이지마다 흩어져 있던 권한 if문을 훅 하나로 모으고, 4단계 등급을 숫자 비교로 단순화 (단독 작업)",
          "로그인 필요 페이지는 쿠키 세션 기준으로 차단",
        ],
      },
      {
        title: "회원·NFT·포인트·푸시 등 운영 도메인을 화면부터 API 연동까지 구현",
        details: [
          "회원·그룹 관리, NFT·스마트컨트랙트 관리, 브랜드(파트너) 관리 (단독)",
          "포인트 충전/사용/지급 — 지급 500명 상한 등 정산 제약 처리",
          "임베드 인증 위젯(SSO) 구현",
        ],
      },
    ],
    highlights: ["폼 34개 공통 구조 적용", "권한 훅 62개 컴포넌트", "PR 96건 리뷰·머지"],
    troubleSlugs: ["cross-domain-cache", "sse-qr-cache"],
    results: [
      "공통 레이어를 먼저 다져놔서, 이후 새 도메인(브랜드·푸시·위젯 등)이 추가돼도 같은 패턴으로 확장할 수 있었습니다.",
      "화면 간 데이터 정합성 문제를 구조적으로 해결해, 운영자가 보는 값이 어긋나는 상황을 줄였습니다.",
    ],
  },
  {
    slug: "legacy-fullstack",
    title: "레거시 풀스택 · 관리자 페이지 & 운영",
    period: "2024 ~ 2025.01",
    role: "PHP 풀스택 · 게임/정산·관리자 페이지 개발",
    contribution: "게임·포인트 정산·관리자 페이지 풀스택 개발 (문의 대응 겸함)",
    team: "사내 서비스 개발팀",
    oneLiner:
      "사내 PHP MVC 프레임워크로 다오패스(서비스 웹 + 파트너/플랫폼 관리자)와 스타픽(아이돌 팬 서비스)을 풀스택으로 다뤘습니다. 게임 점수 저장부터 포인트 정산까지, 어긋나면 안 되는 로직을 주로 맡았습니다.",
    summary:
      "게임 점수 조작을 막는 3중 검증 저장, 일일 랭킹 포인트 정산, 웹소켓 실시간 인증 대시보드. 파트너·스타픽 관리자 개발과 운영 병행.",
    tags: ["PHP MVC 풀스택", "부정행위 방지", "DB 트랜잭션", "백오피스"],
    background: [
      "다오패스(서비스 웹과 파트너·플랫폼 관리자)와 스타픽(아이돌 팬 서비스)에서, 자체 PHP MVC 프레임워크로 풀스택 개발을 했습니다. 다오패스는 이후 새로 만든 비멤버 앱이 대체한 서비스입니다.",
      "관리자 페이지를 개발하며 문의 대응도 겸해, 운영자가 어떤 기능에서 막히는지 가까이서 봤습니다.",
    ],
    stack: [
      { name: "PHP (사내 MVC 프레임워크)", why: "당시 사내 표준. MVC 구조·라우팅·DB 접근을 프레임워크가 감춰주는 부분까지 직접 다뤘습니다." },
      { name: "관계형 DB", why: "점수·경험치·포인트처럼 어긋나면 안 되는 데이터를 트랜잭션으로 묶어 처리했습니다." },
      { name: "vanilla JS (Web Components)", why: "프레임워크 없이 Shadow DOM·라이프사이클·싱글톤 패턴으로 재사용 UI를 만들었습니다." },
    ],
    contributions: [
      {
        title: "게임 점수 조작을 막는 3중 검증 저장 설계 — 점수·경험치는 DB 트랜잭션으로 처리",
        details: [
          "서명 확인(진짜 게임에서 온 요청인지) + 게임 시작 시 발급한 id로 같은 판 중복 제출 차단 + 기기 변경 시 본인 확인",
          "점수와 경험치 반영을 트랜잭션으로 묶어 한쪽만 반영되는 일 방지",
          "게임 데이터 모델 약 18종, 게임/랭킹/마이페이지 화면 구현",
        ],
      },
      {
        title: "일일 랭킹 포인트 정산 — API부터 관리자 페이지까지",
        details: [
          "게임별 일일 상위 20명에게 등수별 포인트 지급 → 누적 반영 → 푸시 알림까지 이어지는 정산 흐름 개발",
          "지급 예정 목록(랭킹)·정산 내역 조회 API와 관리자 화면까지 함께 구현",
        ],
      },
      {
        title: "파트너사용 B2B 관리자 웹 개발 — 같은 도메인을 이후 React 비즈센터로 재구축",
        details: [
          "회원 관리, 라운지 이벤트 운영(등록·수정·상태 변경·푸시), NFT 발행·인증 통계 대시보드(일간·주간)",
          "파트너 쿠폰·포인트 충전 기능을 화면부터 API까지 구현",
          "라운지 QR 인증 대시보드 — 인증이 들어오면 웹소켓으로 인증자 목록이 실시간 갱신되고 여러 탭에 동시 반영 (관리자 모드·QR 만료 타이머 포함)",
          "같은 문제를 PHP와 React 두 스택으로 풀어본 경험",
        ],
      },
      {
        title: "vanilla JS Web Components로 공용 UI 제작·재사용",
        details: [
          "Shadow DOM·커스텀 엘리먼트·라이프사이클·싱글톤 패턴으로 confirm-dialog, swipe-popup, select-modal 등 재사용 UI 구현",
          "여기서 익힌 컴포넌트 설계가 이후 React 작업의 바탕이 됨",
        ],
      },
      {
        title: "스타픽 — 관리자 기능 개선과 운영 병행",
        details: [
          "공지·팝업·배너 등 기존 관리자 기능·UI 개선, 하트 관리 페이지는 화면부터 API까지 새로 개발",
          "문의를 직접 받아 데이터 조회·정정하는 운영 업무 병행",
        ],
      },
    ],
    highlights: ["점수 저장 3중 검증", "웹소켓 실시간 대시보드", "Web Components 공용 UI"],
    links: [
      { label: "스타픽 Google Play", href: "https://play.google.com/store/apps/details?id=kr.co.imagecube.kpopstarpic&hl=ko" },
      { label: "스타픽 App Store", href: "https://apps.apple.com/kr/app/id1332930709" },
    ],
    troubleSlugs: ["legacy-settlement-date", "game-score-recovery"],
    results: [
      "프레임워크가 감춰주는 계층까지 직접 다루며, MVC·관계형 DB·REST API를 실제 운영 서비스에서 익혔습니다.",
      "포인트가 실제로 지급되는 정산 로직을 운영하며, 데이터가 어긋나면 곧바로 돈 문제로 이어지는 코드를 다루는 법을 배웠습니다.",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
