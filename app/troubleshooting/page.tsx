import Link from "next/link";
import type { Metadata } from "next";
import { BackLink, SectionLabel, TagChip } from "@/components/ui";
import { troubles, moreTroubles } from "@/lib/troubles";

export const metadata: Metadata = {
  title: "트러블슈팅 · 현상민",
  description: "문제 → 원인 → 해결 과정으로 다룬 트러블슈팅 모음",
};

export default function TroubleshootingIndex() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="py-4">
        <BackLink href="/" label="홈으로" />
      </div>

      <header className="pt-10 pb-10">
        <h1 className="text-3xl font-medium tracking-tight mb-3">트러블슈팅</h1>
        <p className="text-base leading-relaxed max-w-xl" style={{ color: "var(--muted)" }}>
          관리자 웹과 하이브리드 앱(웹·네이티브) 양쪽에서 원인 분석부터 해결까지의 과정을 정리했습니다.
        </p>
      </header>

      <section className="pb-14">
        <SectionLabel index="01" title="자세히 정리한 사례" />
        <div className="space-y-3">
          {troubles.map((t) => (
            <Link
              key={t.slug}
              href={`/troubleshooting/${t.slug}`}
              className="card block p-5"
            >
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <h2 className="text-base font-medium">{t.title}</h2>
                <TagChip tag={t.tag} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {t.summary} <span className="mono text-xs" style={{ color: "var(--accent)" }}>자세히 →</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-14">
        <SectionLabel index="02" title="그 외 다룬 문제들" />
        <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {moreTroubles.map((m) => (
            <li key={m}>· {m}</li>
          ))}
        </ul>
      </section>

      <footer className="pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="pt-6"><BackLink href="/" label="홈으로" /></div>
      </footer>
    </main>
  );
}
