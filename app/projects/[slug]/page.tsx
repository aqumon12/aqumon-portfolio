import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BackLink, SectionLabel } from "@/components/ui";
import { BridgeDiagram } from "@/components/diagrams";
import { projects, getProject } from "@/lib/projects";
import { getTrouble } from "@/lib/troubles";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} · 현상민` : "프로젝트" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const meta = [
    ["기간", p.period],
    ["역할", p.role],
    ["기여", p.contribution],
    ["팀", p.team],
  ];

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="py-4">
        <BackLink href="/#projects" label="목록으로" />
      </div>

      <header className="pt-10 pb-10">
        <h1 className="text-3xl font-medium tracking-tight mb-3">{p.title}</h1>
        <p className="text-base leading-relaxed max-w-xl" style={{ color: "var(--muted)" }}>{p.oneLiner}</p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-6 text-sm">
          {meta.map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <dt className="mono text-xs w-14 shrink-0 pt-0.5" style={{ color: "var(--muted)" }}>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-2 mt-5">
          {p.tags.map((t) => (
            <span key={t} className="mono text-xs px-2 py-1 rounded"
                  style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}>{t}</span>
          ))}
        </div>
      </header>

      <section className="pb-12">
        <SectionLabel index="01" title="배경" />
        <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {p.background.map((b, i) => <p key={i}>{b}</p>)}
        </div>
      </section>

      <section className="pb-12">
        <SectionLabel index="02" title="기술 선택" />
        <div className="space-y-3">
          {p.stack.map((s) => (
            <div key={s.name} className="flex flex-col sm:flex-row gap-1 sm:gap-4">
              <span className="text-sm font-medium sm:w-52 shrink-0">{s.name}</span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.why}</span>
            </div>
          ))}
        </div>
      </section>

      {p.slug === "hybrid-app" && (
        <section className="pb-12">
          <SectionLabel index="—" title="구조" />
          <BridgeDiagram />
        </section>
      )}

      <section className="pb-12">
        <SectionLabel index="03" title="주요 기여" />
        <div className="space-y-5">
          {p.contributions.map((c) => (
            <div key={c.title} className="pl-4" style={{ borderLeft: "2px solid var(--border)" }}>
              <h3 className="text-base font-medium mb-1">{c.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {p.troubleSlugs.length > 0 && (
        <section className="pb-12">
          <SectionLabel index="04" title="대표 트러블슈팅" />
          <div className="space-y-3">
            {p.troubleSlugs.map((ts) => {
              const t = getTrouble(ts);
              if (!t) return null;
              return (
                <Link key={ts} href={`/troubleshooting/${ts}`}
                      className="block pl-4 py-2 rounded-r-md transition-colors hover:bg-[var(--surface)]"
                      style={{ borderLeft: "2px solid var(--accent)" }}>
                  <h3 className="text-base font-medium">{t.title}</h3>
                  <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{t.summary} <span className="mono text-xs" style={{ color: "var(--accent)" }}>자세히 →</span></p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="pb-12">
        <SectionLabel index={p.troubleSlugs.length > 0 ? "05" : "04"} title="결과 · 배운 점" />
        <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {p.results.map((r, i) => <li key={i}>· {r}</li>)}
        </ul>
      </section>

      <footer className="pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="pt-6"><BackLink href="/#projects" label="목록으로" /></div>
      </footer>
    </main>
  );
}
