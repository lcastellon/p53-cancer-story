import type { Slide } from "@/lib/deck";
import { TOTAL } from "@/lib/deck";
import { Rich } from "./Rich";
import { PetoSlide } from "./PetoSlide";
import { CancerSlide } from "./CancerSlide";

function Helix({ className = "" }: { className?: string }) {
  const rungs = Array.from({ length: 22 });
  return (
    <svg viewBox="0 0 200 1000" className={className} aria-hidden>
      {rungs.map((_, i) => {
        const y = 20 + i * 44;
        const x = Math.sin(i * 0.55) * 70;
        return (
          <g key={i}>
            <line x1={100 - x} y1={y} x2={100 + x} y2={y} stroke="var(--slide-line)" strokeWidth="3" />
            <circle cx={100 - x} cy={y} r="9" fill="var(--slide-accent)" />
            <circle cx={100 + x} cy={y} r="9" fill="var(--slide-warm)" />
          </g>
        );
      })}
    </svg>
  );
}

function Chrome({ s }: { s: Slide }) {
  return (
    <>
      <div className="absolute left-[120px] right-[120px] top-[64px] flex items-center justify-between">
        <span className="slide-kicker text-[var(--slide-accent)]">
          {s.actName} · {s.actTitle}
        </span>
        <span className="slide-page text-[var(--slide-muted)]">
          {String(s.n).padStart(2, "0")} / {TOTAL}
        </span>
      </div>
      {s.n !== 3 && s.n !== 4 && (
        <div className="slide-footer absolute bottom-[56px] left-[120px] text-[var(--slide-muted)]">
          p53 · El guardián del genoma — basado en Sue Armstrong
        </div>
      )}
    </>
  );
}

function Cover({ s }: { s: Slide }) {
  return (
    <div className="slide-content slide-bg">
      <div className="absolute left-[125px] top-[205px] flex h-[670px] w-[975px] flex-col justify-center">
        <div className="slide-kicker mb-12 text-[var(--slide-accent)]">Sue Armstrong</div>
        <h1 className="font-display text-[83px] leading-[1.08] tracking-[-0.035em] text-[var(--slide-fg)]">
          {s.title}
        </h1>
        <div className="mt-12 h-[4px] w-[115px] rounded-full bg-[var(--slide-warm)]" aria-hidden="true" />
        <p className="slide-body-lg mt-10 text-[var(--slide-muted)]">{s.subtitle}</p>
        <p className="mt-14 text-[27px] tracking-[0.015em] text-[var(--slide-muted)]">Presentado por <span className="font-semibold text-[var(--slide-fg)]">M. C. León Felipe Castellón</span></p>
      </div>
      <div className="absolute right-[125px] top-[125px] flex h-[830px] w-[600px] items-center justify-center">
        <img
          src="https://mpd-biblio-covers.imgix.net/9781472910523.jpg?w=800"
          alt="Portada original del libro p53: The Gene That Cracked the Cancer Code, de Sue Armstrong"
          className="max-h-full max-w-full rounded-[8px] object-contain shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
        />
      </div>
    </div>
  );
}

function Stat({ s }: { s: Slide }) {
  return (
    <div className="slide-content slide-bg">
      <Chrome s={s} />
      <div className="absolute left-[120px] top-[170px] grid w-[1680px] grid-cols-[640px_1fr] items-center gap-[100px]">
        <svg viewBox="0 0 200 200" className="h-[640px] w-[640px] -rotate-90">
          <circle cx="100" cy="100" r="80" fill="none" stroke="var(--slide-line)" strokeWidth="26" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="var(--slide-warm)" strokeWidth="26" strokeDasharray="251.3 502.6" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="var(--slide-accent)" strokeWidth="26" strokeDasharray="0 251.3 251.3 0" strokeOpacity="0.55" />
        </svg>
        <div>
          <h2 className="slide-title font-display">{s.title}</h2>
          <ul className="mt-12 space-y-8">
            {s.points.map((p, i) => (
              <li key={i} className="slide-body flex gap-6">
                <span className="mt-[14px] h-4 w-4 shrink-0 rounded-full" style={{ background: i === 0 ? "var(--slide-warm)" : "var(--slide-accent)" }} />
                <span><Rich text={p} /></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute left-[120px] top-[400px] w-[640px] text-center">
        <div className="font-display text-[150px] leading-none text-[var(--slide-fg)]">50%</div>
        <div className="slide-caption text-[var(--slide-muted)]">con p53 mutado</div>
      </div>
    </div>
  );
}

function Closing({ s }: { s: Slide }) {
  return (
    <div className="slide-content slide-bg">
      <Helix className="absolute left-[80px] top-[40px] h-[1000px] opacity-60" />
      <div className="absolute left-[420px] top-[260px] w-[1300px]">
        <div className="slide-kicker text-[var(--slide-accent)]">Cierre</div>
        <h2 className="slide-title-lg mt-8 font-display">{s.title}</h2>
        <ul className="mt-14 space-y-6">
          {s.points.map((p, i) => (
            <li key={i} className="slide-body-lg text-[var(--slide-muted)]"><Rich text={p} /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScribeSlide({ s }: { s: Slide }) {
  return (
    <div className="slide-content slide-bg">
      <Chrome s={s} />
      <div className="absolute left-[120px] top-[150px] w-[1680px]">
        <h2 className="slide-title font-display max-w-[1580px]">{s.title}</h2>
      </div>
      <div className="absolute left-[120px] top-[320px] grid w-[1680px] grid-cols-[800px_1fr] items-center gap-[75px]">
        <ul className="space-y-8">
          {s.points.map((p, i) => (
            <li key={i} className="slide-body flex gap-6">
              <span className="mt-[0.45em] h-[0.5em] w-[0.5em] shrink-0 rotate-45 bg-[var(--slide-accent)]" />
              <span><Rich text={p} /></span>
            </li>
          ))}
        </ul>
        <img
          src="/monje-copista-animado.svg"
          alt="Animación de un monje copista que escribe rápidamente rodeado de enciclopedias mientras llueve"
          className="h-[600px] w-full rounded-[28px] border border-[var(--slide-line)] object-contain"
        />
      </div>
    </div>
  );
}

function Standard({ s }: { s: Slide }) {
  const cards = s.points.length <= 3 && s.points.every((p) => p.length < 200);
  const dense = s.points.length > 4;
  return (
    <div className="slide-content slide-bg">
      <Chrome s={s} />
      <Helix className="absolute -right-[20px] top-[40px] h-[1000px] opacity-20" />
      <div className="absolute left-[120px] top-[150px] w-[1560px]">
        <h2 className="slide-title font-display max-w-[1500px]">{s.title}</h2>
        {cards ? (
          <div className="mt-16 grid grid-cols-3 gap-10">
            {s.points.map((p, i) => (
              <div key={i} className="min-h-[420px] rounded-[28px] border border-[var(--slide-line)] bg-[var(--slide-card)] p-12">
                <div className="font-display text-[72px] leading-none text-[var(--slide-warm)]">0{i + 1}</div>
                <p className="slide-body mt-8"><Rich text={p} /></p>
              </div>
            ))}
          </div>
        ) : (
          <ul className={dense ? "mt-12 space-y-5" : "mt-16 space-y-9"}>
            {s.points.map((p, i) => (
              <li key={i} className={`${dense ? "slide-caption !text-[27px]" : "slide-body"} flex max-w-[1500px] gap-7`}>
                <span className="mt-[0.45em] h-[0.5em] w-[0.5em] shrink-0 rotate-45 bg-[var(--slide-accent)]" />
                <span><Rich text={p} /></span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function SlideView({ s, step }: { s: Slide; step?: number }) {
  if (s.layout === "houses") return <CancerSlide s={s} step={step ?? 0} />;
  if (s.layout === "peto") return <PetoSlide s={s} step={step ?? (s.steps ?? 1) - 1} />;
  if (s.n === 1) return <Cover s={s} />;
  if (s.n === 4) return <ScribeSlide s={s} />;
  if (s.layout === "stat") return <Stat s={s} />;
  if (s.n === TOTAL) return <Closing s={s} />;
  return <Standard s={s} />;
}
