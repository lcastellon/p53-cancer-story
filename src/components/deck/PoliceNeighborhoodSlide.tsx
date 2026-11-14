import type { Slide } from "@/lib/deck";
import { TOTAL } from "@/lib/deck";
import { House, Person } from "./CancerSlide";

const scenes = [
  {
    name: "El barrio pierde el equilibrio",
    healthy: "Las células respetan el espacio y las reglas.",
    cancer: "Algunas células se multiplican sin control.",
  },
  {
    name: "La policía recibe una alerta",
    healthy: "La cooperación mantiene el tejido en orden.",
    cancer: "p53 responde a señales de daño o estrés celular.",
  },
  {
    name: "p53 detiene el ciclo celular",
    healthy: "La división sigue bajo control.",
    cancer: "p53 detiene temporalmente el ciclo celular.",
  },
  {
    name: "¿Reparación o retirada definitiva?",
    healthy: "Las células sanas continúan su actividad.",
    cancer: "Si no hay reparación, senescencia o apoptosis.",
  },
] as const;

function Officer({ x = 583, y = 449 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cy="-67" r="20" fill="var(--slide-accent)" />
      <path d="M-28-88 H28 L21-103 H-21 Z" fill="var(--slide-accent)" />
      <path d="M-32-87 H32" stroke="var(--slide-fg)" strokeWidth="6" strokeLinecap="round" />
      <path d="M-21-38 Q0-49 21-38 L29 28 H-29 Z" fill="var(--slide-accent)" />
      <path d="M-17 29 V73 M17 29 V73 M-20-28 L-46 1 M20-28 L46 1" stroke="var(--slide-accent)" strokeWidth="16" strokeLinecap="round" />
      <path d="M0-33 l13 8 -3 16 -10 8 -10-8 -3-16Z" fill="var(--slide-warm)" />
      <text x="0" y="20" textAnchor="middle" fontWeight="800" fontSize="23" fill="var(--slide-bg)">p53</text>
    </g>
  );
}

function CellAlert({ stage }: { stage: number }) {
  return (
    <g className="house-scene" key={stage}>
      {stage >= 1 && stage <= 2 && (
        <g>
          <circle cx="512" cy="433" r="48" fill="none" stroke="var(--slide-warm)" strokeWidth="7" strokeDasharray="12 8" />
          <path d="M486 405 L492 416 L505 400" fill="none" stroke="var(--slide-warm)" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {stage === 2 && (
        <g>
          <path d="M480 440 Q511 462 537 445" fill="none" stroke="var(--slide-accent)" strokeWidth="7" strokeDasharray="9 8"/>
          <rect x="439" y="334" rx="13" width="140" height="55" stroke="var(--slide-warm)" strokeWidth="5" fill="var(--slide-bg)" />
          <text x="509" y="371" textAnchor="middle" fontSize="35" fontWeight="800" fill="var(--slide-warm)">ALTO</text>
        </g>
      )}
      {stage === 3 && (
        <g>
          <path d="M476 435 L530 435" stroke="var(--slide-accent)" strokeWidth="6" strokeLinecap="round" />
          <path d="M513 421 L531 435 L513 450" fill="none" stroke="var(--slide-accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <g transform="translate(470 310)">
            <rect width="242" height="52" rx="14" fill="var(--slide-bg)" stroke="var(--slide-accent)" strokeWidth="3" />
            <text x="121" y="35" textAnchor="middle" fontSize="25" fill="var(--slide-fg)">REPARACIÓN ✓</text>
          </g>
          <g transform="translate(470 376)">
            <rect width="242" height="52" rx="14" fill="var(--slide-bg)" stroke="var(--slide-warm)" strokeWidth="3" />
            <text x="121" y="35" textAnchor="middle" fontSize="24" fill="var(--slide-fg)">SENESCENCIA</text>
          </g>
          <g transform="translate(470 442)">
            <rect width="242" height="52" rx="14" fill="var(--slide-bg)" stroke="var(--slide-warm)" strokeWidth="3" />
            <text x="121" y="35" textAnchor="middle" fontSize="25" fill="var(--slide-fg)">APOPTOSIS</text>
          </g>
        </g>
      )}
    </g>
  );
}

export function PoliceNeighborhoodSlide({ s, step }: { s: Slide; step: number }) {
  const stage = Math.min(Math.max(step, 0), scenes.length - 1);
  const current = scenes[stage]!;
  return (
    <div className="slide-content slide-bg house-slide" data-police-step={stage + 1}>
      <div className="absolute left-[120px] right-[120px] top-[64px] flex justify-between">
        <span className="slide-kicker text-[var(--slide-accent)]">{s.actName} · {s.actTitle}</span>
        <span className="slide-page text-[var(--slide-muted)]">{String(s.n).padStart(2, "0")} / {TOTAL}</span>
      </div>
      <h2 className="slide-title font-display absolute left-[120px] top-[135px]">{s.title}</h2>
      <div className="absolute left-[120px] right-[120px] top-[245px] flex items-center gap-7">
        <p className="slide-body text-[var(--slide-muted)]">{current.name}</p>
        <div className="flex gap-3" aria-label={`Paso ${stage + 1} de 4`}>
          {scenes.map((_, i) => <span key={i} className={`h-3 w-10 ${i <= stage ? "bg-primary" : "bg-muted"}`} />)}
        </div>
      </div>
      <div className="absolute left-[120px] top-[326px] grid w-[1680px] grid-cols-2 gap-[120px]">
        <section className="house-healthy" aria-label="Tejido sano">
          <h3 className="slide-body-lg font-display">Tejido sano</h3>
          <svg viewBox="0 0 760 620" className="house-scene h-[450px] w-full" role="img" aria-label="Casa con personas que representan un tejido con proliferación regulada">
            <House x={370} y={320} size={0.85} children={2} age="teen" />
            <path d="M185 480 H560" stroke="currentColor" strokeWidth="3" opacity=".45"/>
          </svg>
          <p className="text-[36px] leading-[1.2]">{current.healthy}</p>
        </section>
        <section className="house-cancer" aria-label="Tejido alterado con vigilancia de p53">
          <h3 className="slide-body-lg font-display">Tejido alterado</h3>
          <svg key={stage} viewBox="0 0 760 620" className="house-scene h-[450px] w-full" role="img" aria-label="Casa con demasiados habitantes y policía p53 que detiene células dañadas">
            <House x={255} y={320} size={0.82} children={15} age="teen" />
            {stage === 2 && (
              <g aria-label="La casa se transforma en una cárcel que representa el arresto del ciclo celular">
                {/* Fachada con barrotes y travesaños metálicos: arresto de la división. */}
                <rect x="128" y="204" width="254" height="265" rx="5" fill="var(--slide-bg)" fillOpacity=".13" stroke="var(--slide-muted)" strokeWidth="8" />
                {Array.from({ length: 8 }, (_, i) => (
                  <line key={i} x1={145 + i * 31} y1="206" x2={145 + i * 31} y2="465" stroke="var(--slide-muted)" strokeWidth="9" strokeLinecap="round" />
                ))}
                <path d="M130 265 H381 M130 341 H381 M130 465 H381" fill="none" stroke="var(--slide-muted)" strokeWidth="9" strokeLinecap="round" />
                {/* Puerta de celda con cerradura central, delante de las personas. */}
                <rect x="224" y="337" width="78" height="130" rx="4" fill="var(--slide-bg)" fillOpacity=".13" stroke="var(--slide-fg)" strokeWidth="8" />
                {[239, 260, 281].map((x) => (
                  <line key={x} x1={x} y1="344" x2={x} y2="462" stroke="var(--slide-fg)" strokeWidth="7" />
                ))}
                <rect x="270" y="396" width="24" height="29" rx="5" fill="var(--slide-warm)" />
                <path d="M275 396 V388 A7 7 0 0 1 289 388 V396" fill="none" stroke="var(--slide-warm)" strokeWidth="5" />
                <circle cx="282" cy="409" r="3" fill="var(--slide-bg)" />
                {/* Rótulo penitenciario sobre el tejado. */}
                <rect x="163" y="115" width="184" height="43" rx="9" fill="var(--slide-bg)" stroke="var(--slide-muted)" strokeWidth="4" />
                <text x="255" y="144" fontSize="23" fontWeight="800" textAnchor="middle" fill="var(--slide-fg)">CICLO EN PAUSA</text>
              </g>
            )}
            {stage === 0 && (
              <g>
                <Person x={491} y={474} size={0.65} child />
                <Person x={549} y={474} size={0.65} child />
                <path d="M410 439 Q463 432 483 455" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 8"/>
              </g>
            )}
            {stage >= 1 && stage <= 2 && <Officer x={590} y={503} />}
            <CellAlert stage={stage} />
          </svg>
          <p className="text-[36px] leading-[1.2]">{current.cancer}</p>
        </section>
      </div>
      {stage === 3 && (
        <div className="absolute bottom-[90px] left-[120px] w-[1680px] rounded-[17px] border border-[var(--slide-line)] bg-[var(--slide-bg)] px-6 py-3 text-center font-display text-[29px] text-[var(--slide-accent)]">
          ¿Qué sucede cuando el guardián también falla?
        </div>
      )}
    </div>
  );
}
