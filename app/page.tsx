import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SectionLabel } from "@/components/ui";
import { profile, stacks, aiWorkflow, featuredWorks } from "@/lib/content";
import { projects } from "@/lib/projects";
import { troubles } from "@/lib/troubles";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <nav className="flex items-center justify-between py-4 sticky top-0 z-10" style={{ background: "var(--bg)" }}>
        <span className="mono text-sm font-medium">HSM</span>
        <div className="flex items-center gap-3 sm:gap-5 text-sm" style={{ color: "var(--muted)" }}>
          <a href="#projects" className="hover:opacity-70">프로젝트</a>
          <a href="#troubleshooting" className="hover:opacity-70">대표 작업</a>
          <a href="https://github.com/aqumon12" target="_blank" rel="noreferrer" className="hover:opacity-70">GitHub</a>
        </div>
      </nav>

      <header className="pt-8 pb-20">
        <Reveal>
          <p className="mono text-sm mb-4" style={{ color: "var(--accent)" }}>➜ ~ whoami</p>
          <h1 className="text-4xl font-medium tracking-tight mb-4">
            {profile.name}
            <span className="text-2xl ml-3" style={{ color: "var(--muted)" }}>{profile.role}</span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "var(--muted)" }}>{profile.tagline}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
            <a href={`mailto:${profile.email}`} className="mono hover:opacity-70" style={{ color: "var(--muted)" }}>
              <span className="mr-2" style={{ color: "var(--accent)" }}>email</span>{profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="mono hover:opacity-70" style={{ color: "var(--muted)" }}>
              <span className="mr-2" style={{ color: "var(--accent)" }}>github</span>github.com/aqumon12
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {[
              ["−54%", "화면 멈춤 시간(TBT) 실측 개선"],
              ["폼 34개", "공통 구조로 만든 관리자 화면"],
              ["104개", "핵심 로직 단위 테스트"],
              ["96건", "동료 PR 리뷰 후 머지"],
            ].map(([v, k]) => (
              <div key={v} className="rounded-lg px-4 py-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="text-xl font-semibold" style={{ color: "var(--accent)" }}>{v}</div>
                <div className="text-xs mt-1 leading-snug" style={{ color: "var(--muted)" }}>{k}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </header>

      <section className="pb-20">
        <Reveal>
          <SectionLabel index="01" title="기술 스택" />
          <div className="space-y-3">
            {stacks.map((g) => (
              <div key={g.label} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="mono text-xs w-24 shrink-0" style={{ color: "var(--muted)" }}>{g.label}</span>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="text-sm px-3 py-1 rounded-md"
                          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="troubleshooting" className="pb-20 scroll-mt-16">
        <Reveal><SectionLabel index="02" title="대표 작업" /></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredWorks.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <div className="h-full p-5 rounded-lg flex flex-col" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h3 className="text-base font-semibold leading-snug">{w.title}</h3>
                <p className="text-sm leading-relaxed mt-2 flex-1" style={{ color: "var(--muted)" }}>{w.desc}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                  {w.links.map((l) => (
                    <Link key={l.href + l.label} href={l.href} className="mono text-xs hover:opacity-70" style={{ color: "var(--accent)" }}>
                      {l.label} →
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link href="/troubleshooting" className="mono text-sm inline-flex items-center gap-1.5 mt-5 hover:opacity-70" style={{ color: "var(--muted)" }}>
            트러블슈팅 {troubles.length}건 전체 보기 <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </section>

      <section id="projects" className="pb-20 scroll-mt-16">
        <Reveal><SectionLabel index="03" title="프로젝트" /></Reveal>
        <div className="space-y-4">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link href={`/projects/${p.slug}`} className="card block p-5">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-2">
                  <h3 className="text-base font-medium">{p.title}</h3>
                  <span className="mono text-xs shrink-0" style={{ color: "var(--muted)" }}>{p.period}</span>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{p.summary}</p>
                {p.highlights && p.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.highlights.map((h) => (
                      <span key={h} className="text-xs font-medium px-2 py-1 rounded"
                            style={{ background: "color-mix(in srgb, var(--accent) 8%, transparent)", color: "var(--accent)", border: "1px solid color-mix(in srgb, var(--accent) 22%, transparent)" }}>
                        {h}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="mono text-xs px-2 py-1 rounded"
                          style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}>{t}</span>
                  ))}
                  <span className="mono text-xs ml-auto" style={{ color: "var(--accent)" }}>자세히 →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="ai" className="pb-20 scroll-mt-16">
        <Reveal>
          <SectionLabel index="04" title="AI 활용" />
          <p className="text-sm leading-relaxed mb-6 -mt-2" style={{ color: "var(--muted)" }}>{aiWorkflow.intro}</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {aiWorkflow.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="h-full p-4 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="pt-8 text-sm" style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}>
        <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="mono text-xs">© 2026 {profile.name}</p>
          <a href={`mailto:${profile.email}`} className="mono text-xs hover:opacity-70">{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="mono text-xs hover:opacity-70">github.com/aqumon12</a>
        </div>
      </footer>
    </main>
  );
}
