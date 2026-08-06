import type { ReactNode } from "react";

function Frame({ children, viewBox }: { children: ReactNode; viewBox: string }) {
  return (
    <div
      className="my-6 rounded-xl border p-4 overflow-x-auto"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <svg viewBox={viewBox} width="100%" role="img" style={{ maxWidth: "100%" }}>
        {children}
      </svg>
    </div>
  );
}

const boxFill = "var(--bg)";
const stroke = "var(--border)";
const textC = "var(--text)";
const mutedC = "var(--muted)";
const accent = "var(--accent)";

function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={boxFill} stroke={stroke} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 4)} textAnchor="middle" fontSize="13" fontWeight="500" style={{ fill: textC }}>
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize="10.5" style={{ fill: mutedC }}>
          {sub}
        </text>
      )}
    </g>
  );
}

export function BridgeDiagram() {
  return (
    <Frame viewBox="0 0 640 210">
      <defs>
        <marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={mutedC} />
        </marker>
      </defs>

      <Box x={20} y={70} w={170} h={64} title="Next.js WebView 웹" sub="React 화면 · CSS" />
      <Box x={450} y={70} w={170} h={64} title="React Native 셸" sub="네이티브 탭바 · 모달" />

      <text x={320} y={40} textAnchor="middle" fontSize="12" fontWeight="500" style={{ fill: accent }}>
        브릿지 (postMessage)
      </text>

      <line x1={190} y1={92} x2={450} y2={92} stroke={mutedC} strokeWidth="1.5" markerEnd="url(#arw)" />
      <text x={320} y={86} textAnchor="middle" fontSize="10.5" style={{ fill: mutedC }}>
        Web → Native · {"{ actionType, payload }"}
      </text>

      <line x1={450} y1={116} x2={190} y2={116} stroke={mutedC} strokeWidth="1.5" markerEnd="url(#arw)" />
      <text x={320} y={132} textAnchor="middle" fontSize="10.5" style={{ fill: mutedC }}>
        Native → Web · {"{ code, body }"}
      </text>

      <text x={320} y={178} textAnchor="middle" fontSize="11" style={{ fill: mutedC }}>
        WebView 경계 밖(탭바)은 웹 CSS로 못 그림 → 필요한 모달만 네이티브로 전환
      </text>
    </Frame>
  );
}

export function CacheDiagram() {
  const center = { x: 285, y: 30, w: 110, h: 52 };
  const targets = [
    { x: 40, y: 150, label: "회원 활동" },
    { x: 210, y: 150, label: "회원 그룹" },
    { x: 380, y: 150, label: "관리자" },
    { x: 530, y: 150, label: "포인트" },
  ];
  const cx = center.x + center.w / 2;
  return (
    <Frame viewBox="0 0 640 250">
      <defs>
        <marker id="arw2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={accent} />
        </marker>
      </defs>

      <Box x={center.x} y={center.y} w={center.w} h={center.h} title="회원 변경" sub="mutation" />

      {targets.map((t) => {
        const tx = t.x + 55;
        return (
          <g key={t.label}>
            <line x1={cx} y1={center.y + center.h} x2={tx} y2={t.y} stroke={accent} strokeWidth="1.3" strokeDasharray="4 3" markerEnd="url(#arw2)" />
            <Box x={t.x} y={t.y} w={110} h={48} title={t.label} />
          </g>
        );
      })}

      <text x={cx + 10} y={120} fontSize="10.5" style={{ fill: accent }}>
        교차 무효화
      </text>
      <text x={320} y={228} textAnchor="middle" fontSize="11" style={{ fill: mutedC }}>
        query-key 팩토리로 "이 데이터를 바꾸면 어떤 화면이 영향받는지"를 구조로 명시
      </text>
    </Frame>
  );
}

export function TokenLoopDiagram() {
  return (
    <Frame viewBox="0 0 640 290">
      <defs>
        <marker id="arw3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={mutedC} />
        </marker>
        <marker id="arw3a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={accent} />
        </marker>
      </defs>

      {/* Before */}
      <text x={20} y={18} fontSize="11.5" fontWeight="600" style={{ fill: textC }}>Before — 만료 시각 기준</text>
      <Box x={20} y={32} w={120} h={40} title="API 요청" />
      <Box x={20} y={104} w={120} h={44} title="토큰 재사용" sub="만료 시각 안 지남" />
      <Box x={20} y={176} w={120} h={40} title="서버 401 거부" />
      <line x1={80} y1={72} x2={80} y2={102} stroke={mutedC} strokeWidth="1.3" markerEnd="url(#arw3)" />
      <line x1={80} y1={148} x2={80} y2={174} stroke={mutedC} strokeWidth="1.3" markerEnd="url(#arw3)" />
      <path d="M 140 196 C 210 196 210 124 142 124" fill="none" stroke={mutedC} strokeWidth="1.3" strokeDasharray="4 3" markerEnd="url(#arw3)" />
      <text x={216} y={165} fontSize="10.5" style={{ fill: mutedC }}>무한 반복</text>
      <text x={20} y={248} fontSize="10.5" style={{ fill: mutedC }}>
        서버가 이미 거부한 토큰을 만료 시각만 믿고 계속 재사용
      </text>

      {/* After */}
      <text x={370} y={18} fontSize="11.5" fontWeight="600" style={{ fill: accent }}>After — 서버 401 기준</text>
      <Box x={370} y={32} w={120} h={40} title="API 요청" />
      <Box x={370} y={104} w={130} h={44} title="401 → 강제 갱신" sub="forceRefresh" />
      <Box x={370} y={176} w={130} h={40} title="새 토큰으로 재시도" />
      <line x1={430} y1={72} x2={430} y2={102} stroke={accent} strokeWidth="1.3" markerEnd="url(#arw3a)" />
      <line x1={430} y1={148} x2={430} y2={174} stroke={accent} strokeWidth="1.3" markerEnd="url(#arw3a)" />
      <text x={370} y={248} fontSize="10.5" style={{ fill: mutedC }}>
        로그아웃은 재발급 응답이 401일 때만 · 네트워크 오류는 세션 유지
      </text>

      <line x1={20} y1={260} x2={620} y2={260} stroke={stroke} strokeWidth="1" />
      <text x={320} y={280} textAnchor="middle" fontSize="10.5" style={{ fill: mutedC }}>
        같은 문제를 token-refresh-playground에서 재현하고 NestJS 통합 테스트로 증명
      </text>
    </Frame>
  );
}

export function QrSseDiagram() {
  return (
    <Frame viewBox="0 0 640 285">
      <defs>
        <marker id="arw4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={mutedC} />
        </marker>
        <marker id="arw4a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={accent} />
        </marker>
      </defs>

      <Box x={20} y={30} w={160} h={56} title="PC 웹 (비즈센터)" sub="QR 표시 · SSE 대기" />
      <Box x={440} y={30} w={160} h={56} title="서버" sub="일회용 인증 키 발급" />
      <Box x={440} y={160} w={160} h={56} title="모바일 앱" sub="QR 스캔 · 인증" />

      <line x1={180} y1={48} x2={438} y2={48} stroke={mutedC} strokeWidth="1.3" markerEnd="url(#arw4)" />
      <text x={308} y={42} textAnchor="middle" fontSize="10.5" style={{ fill: mutedC }}>1. 키 요청 · SSE 연결</text>

      <line x1={520} y1={158} x2={520} y2={88} stroke={mutedC} strokeWidth="1.3" markerEnd="url(#arw4)" />
      <text x={532} y={128} fontSize="10.5" style={{ fill: mutedC }}>2. 앱 인증</text>

      <line x1={438} y1={70} x2={180} y2={70} stroke={accent} strokeWidth="1.5" markerEnd="url(#arw4a)" />
      <text x={308} y={86} textAnchor="middle" fontSize="10.5" style={{ fill: accent }}>3. SSE push → PC 자동 로그인</text>

      <text x={320} y={248} textAnchor="middle" fontSize="11" style={{ fill: textC }}>
        문제: 1번의 키가 서버 상태 캐시에 남아, 만료된 키가 다음 로그인에 재사용
      </text>
      <text x={320} y={268} textAnchor="middle" fontSize="10.5" style={{ fill: mutedC }}>
        staleTime: 0만으로는 부족 — gcTime: 0까지 적용해 매번 새 키를 발급받도록 해결
      </text>
    </Frame>
  );
}

export const troubleDiagrams: Record<string, () => ReactNode> = {
  "webview-modal-dim": BridgeDiagram,
  "cross-domain-cache": CacheDiagram,
  "webview-token-loop": TokenLoopDiagram,
  "sse-qr-cache": QrSseDiagram,
};
