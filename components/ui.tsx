import Link from "next/link";

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="mono text-sm" style={{ color: "var(--accent)" }}>
        {index}
      </span>
      <h2 className="text-lg font-medium">{title}</h2>
      <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mono text-sm inline-flex items-center gap-1.5 hover:opacity-70"
      style={{ color: "var(--muted)" }}
    >
      <span aria-hidden>←</span> {label}
    </Link>
  );
}


// 트러블슈팅 태그 색상 (앞 분류 기준)
const TAG_COLORS: Record<string, string> = {
  "웹뷰": "#7c5cff",
  "웹": "#2f4bd0",
  "앱": "#0f9d58",
  "레거시": "#d97706",
  "인프라": "#dc2626",
};

export function TagChip({ tag }: { tag: string }) {
  const key = Object.keys(TAG_COLORS).find((k) => tag.startsWith(k));
  const color = key ? TAG_COLORS[key] : "var(--muted)";
  return (
    <span className="mono text-xs shrink-0 px-2 py-0.5 rounded"
          style={{
            color,
            background: `color-mix(in srgb, ${color} 9%, transparent)`,
            border: `1px solid color-mix(in srgb, ${color} 28%, transparent)`,
          }}>
      {tag}
    </span>
  );
}
