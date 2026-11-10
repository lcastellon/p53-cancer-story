import type { Slide } from "@/lib/deck";
import { TOTAL } from "@/lib/deck";

// Premise risk figure — placeholder until a sourced value is provided.
const RISK = "[RIESGO POR DIVISIÓN — reemplazar]";

const Mouse = () => (
  <svg viewBox="0 0 200 120" className="h-[120px]">
    <ellipse cx="95" cy="75" rx="60" ry="35" fill="currentColor" />
    <circle cx="150" cy="58" r="22" fill="currentColor" />
    <circle cx="145" cy="34" r="14" fill="currentColor" />
    <path d="M38 80 Q0 90 10 115" stroke="currentColor" strokeWidth="6" fill="none" />
  </svg>
);
const Human = () => (
  <svg viewBox="0 0 120 300" className="h-[300px]">
    <circle cx="60" cy="30" r="26" fill="currentColor" />
    <rect x="30" y="62" width="60" height="110" rx="22" fill="currentColor" />
    <rect x="8" y="68" width="18" height="100" rx="9" fill="currentColor" />
    <rect x="94" y="68" width="18" height="100" rx="9" fill="currentColor" />
    <rect x="34" y="160" width="22" height="135" rx="10" fill="currentColor" />
    <rect x="64" y="160" width="22" height="135" rx="10" fill="currentColor" />
  </svg>
);
const Elephant = () => (
  <svg viewBox="0 0 420 300" className="h-[360px]">
    <ellipse cx="200" cy="140" rx="150" ry="95" fill="currentColor" />
    <circle cx="350" cy="110" r="62" fill="currentColor" />
    <ellipse cx="320" cy="105" rx="45" ry="60" fill="currentColor" opacity="0.8" />
    <path d="M395 125 Q420 210 385 260" stroke="currentColor" strokeWidth="26" fill="none" strokeLinecap="round" />
    {[90, 150, 240, 300].map((x) => <rect key={x} x={x} y="190" width="42" height="105" rx="14" fill="currentColor" />)}
  </svg>
);

const animals = [
  { name: "Ratón", cells: <>~10<sup>10</sup></>, rate: "~30-40%", Icon: Mouse },
  { name: "Humano", cells: <>~3.7 × 10<sup>13</sup></>, rate: "20-25%", Icon: Human },
  { name: "Elefante", cells: <>~10<sup>15</sup></>, rate: "< 5%", Icon: Elephant },
];

export function PetoSlide({ s, step }: { s: Slide; step: number }) {
  const reveal = step >= 2;
  return (
    <div className="slide-content slide-bg">
      <div className="absolute left-[120px] right-[120px] top-[64px] flex items-center justify-between">
        <span className="slide-kicker text-[var(--slide-accent)]">{s.actName} · {s.actTitle}</span>
        <span className="slide-page text-[var(--slide-muted)]">{String(s.n).padStart(2, "0")} / {TOTAL}</span>
      </div>
      <div className="absolute left-[120px] top-[140px] w-[1680px]">
        <h2 className="slide-title font-display">{s.title}</h2>
        <p className="slide-body mt-6 max-w-[1500px] text-[var(--slide-muted)]">
          Premisa: cada división celular tiene un riesgo fijo de mutación maligna (<span className="text-[var(--slide-warm)]">{RISK}</span>). Más células × más años = más cáncer.
        </p>
        <p className="slide-subtitle mt-6 font-display text-[var(--slide-accent)]">
          {reveal ? "Realidad: la tasa está invertida. ¿Por qué?" : "¿Cuál creen que sea menos susceptible al cáncer?"}
        </p>
      </div>
      <div className={`absolute bottom-[110px] left-[120px] grid w-[1680px] grid-cols-3 items-end gap-10 transition-opacity duration-700 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
        {animals.map(({ name, cells, rate, Icon }) => {
          const glow = reveal && name === "Elefante";
          return (
            <div key={name} className="flex flex-col items-center text-center">
              <div
                className="flex h-[380px] items-end transition-all duration-700"
                style={{
                  color: glow ? "var(--slide-warm)" : "var(--slide-fg)",
                  opacity: reveal && !glow ? 0.45 : 1,
                  filter: glow ? "drop-shadow(0 0 40px var(--slide-warm))" : "none",
                }}
              >
                <Icon />
              </div>
              <div className="slide-body-lg mt-6 font-display">{name}</div>
              <div className="slide-body text-[var(--slide-muted)]">{cells} células</div>
              <div className={`mt-3 font-display text-[64px] leading-none transition-all duration-700 ${reveal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ color: glow ? "var(--slide-warm)" : "var(--slide-accent)" }}>
                {rate}
                <span className="slide-caption ml-3 text-[var(--slide-muted)]">con cáncer</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
