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

export const troubleDiagrams: Record<string, () => ReactNode> = {
  "webview-modal-dim": BridgeDiagram,
  "cross-domain-cache": CacheDiagram,
};
