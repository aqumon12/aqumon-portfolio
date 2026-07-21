import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BackLink } from "@/components/ui";
import { troubleDiagrams } from "@/components/diagrams";
import { troubles, getTrouble } from "@/lib/troubles";

export function generateStaticParams() {
  return troubles.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTrouble(slug);
  return { title: t ? `${t.title} · 현상민` : "트러블슈팅" };
}

export default async function TroublePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTrouble(slug);
  if (!t) notFound();

  const Diagram = troubleDiagrams[slug];

  const steps = [
    { label: "상황", body: t.situation },
    { label: "원인 분석", body: t.cause },
    { label: "시도 · 트레이드오프", body: t.attempts },
    { label: "해결", body: t.solution },
    { label: "결과 · 배운 점", body: t.result },
  ]
    .filter((s) => s.body)
    .map((s, i) => ({ ...s, index: String(i + 1).padStart(2, "0") }));

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="py-4">
        <BackLink href="/#troubleshooting" label="목록으로" />
      </div>

      <header className="pt-10 pb-10">
        <span className="mono text-xs px-2 py-1 rounded"
              style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}>{t.tag}</span>
        <h1 className="text-3xl font-medium tracking-tight mt-4 mb-3 leading-snug">{t.title}</h1>
        <p className="text-base leading-relaxed max-w-xl" style={{ color: "var(--muted)" }}>{t.summary}</p>
      </header>

      {Diagram && <Diagram />}

      <div className="space-y-10">
        {steps.map((s, i) => (
          <section key={s.index} className="relative pl-8">
            <span className="mono text-sm absolute left-0 top-0.5" style={{ color: "var(--accent)" }}>{s.index}</span>
            {i < steps.length - 1 && (
              <span className="absolute left-[6px] top-6 bottom-[-40px] w-px" style={{ background: "var(--border)" }} />
            )}
            <h2 className="text-lg font-medium mb-2">{s.label}</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.body}</p>
          </section>
        ))}
      </div>

      <footer className="pt-10 mt-10" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="pt-6"><BackLink href="/#troubleshooting" label="목록으로" /></div>
      </footer>
    </main>
  );
}
