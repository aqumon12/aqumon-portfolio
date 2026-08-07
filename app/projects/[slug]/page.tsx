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
        {p.highlights && p.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {p.highlights.map((h) => (
              <span key={h} className="text-sm font-medium px-3 py-1.5 rounded-md"
                    style={{ background: "color-mix(in srgb, var(--accent) 8%, transparent)", color: "var(--accent)", border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)" }}>
                {h}
              </span>
            ))}
          </div>
        )}
        {p.links && p.links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-5">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
                 className="mono text-xs px-3 py-1.5 rounded-md hover:opacity-70 inline-flex items-center gap-1.5"
                 style={{ border: "1px solid var(--border)", color: "var(--accent)" }}>
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-5">
          {[...p.tags, ...p.stack.map((st) => st.name)].map((t) => (
            <span key={t} className="mono text-xs px-2 py-1 rounded"
                  style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}>{t}</span>
          ))}
        </div>
      </header>

      {p.screenshots && p.screenshots.length > 0 && (
        <section className="pb-12">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {p.screenshots.map((sc) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={sc.src} src={sc.src} alt={sc.alt}
                   className="h-72 w-auto rounded-xl shrink-0"
                   style={{ border: "1px solid var(--border)" }} />
            ))}
          </div>
          <p className="mono text-xs mt-2" style={{ color: "var(--muted)" }}>스토어 공개 이미지</p>
        </section>
      )}

      {p.slug === "hybrid-app" && (
        <section className="pb-12">
          <SectionLabel index="—" title="구조" />
          <BridgeDiagram />
        </section>
      )}

      <section id="s-contrib" className="pb-12 scroll-mt-20">
        <SectionLabel index="01" title="주요 기여" />
        <p className="text-xs mb-4 -mt-2 mono" style={{ color: "var(--muted)" }}>항목을 누르면 상세 내용이 열립니다</p>
        <div className="space-y-2">
          {p.contributions.map((c, ci) => (
            <details key={c.title} open={ci === 0} className="group rounded-lg"
                     style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
              <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer list-none select-none">
                <span aria-hidden className="shrink-0 w-1 h-4 rounded-full" style={{ background: "var(--accent)" }} />
                <h3 className="text-[15px] font-medium leading-snug flex-1">{c.title}</h3>
                <span aria-hidden className="text-xs transition-transform group-open:rotate-90" style={{ color: "var(--muted)" }}>▸</span>
              </summary>
              <ul className="space-y-1.5 px-5 pb-4 pt-1">
                {c.details.map((d) => (
                  <li key={d} className="text-sm leading-relaxed flex gap-2" style={{ color: "var(--muted)" }}>
                    <span aria-hidden style={{ color: "var(--accent)" }}>·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      {p.troubleSlugs.length > 0 && (
        <section id="s-troubles" className="pb-12 scroll-mt-20">
          <SectionLabel index="02" title="대표 트러블슈팅" />
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

      <footer className="pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="pt-6"><BackLink href="/#projects" label="목록으로" /></div>
      </footer>
    </main>
  );
}
