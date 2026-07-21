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
