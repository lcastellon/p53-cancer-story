import type { Slide } from "@/lib/deck";
import { TOTAL } from "@/lib/deck";
import { houseStages } from "@/lib/house-analogy";

function Person({ x, y, size = 1, child = false }: { x: number; y: number; size?: number; child?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`} data-person={child ? "child" : "parent"}>
    <circle cy="-36" r="12" fill="currentColor" />
    <path d="M-11-17 Q0-24 11-17 L17 19 H-17 Z" fill="currentColor" />
    <path d="M-8 18 V46 M8 18 V46 M-12-10 L-24 12 M12-10 L24 12" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
  </g>;
}

function House({ x, y, size = 1, children = 2, age = "small", parents = 2 }: { x: number; y: number; size?: number; children?: number; age?: string; parents?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`}>
    <path d="M-175-130 L0-245 L175-130" fill="none" stroke="currentColor" strokeWidth="9" strokeLinejoin="round" />
    <path d="M-153-140 V180 H153 V-140" fill="var(--slide-bg)" stroke="currentColor" strokeWidth="6" />
    <path d="M-195 182 H195" stroke="var(--slide-line)" strokeWidth="4" />
    {Array.from({ length: parents }, (_, i) => <Person key={`p${i}`} x={i === 0 ? -48 : 48} y={-67} />)}
    {Array.from({ length: children }, (_, i) => {
      const crowded = children > 2;
      const xChild = crowded ? -105 + (i % 5) * 52 : (i === 0 ? -48 : 48);
      const yChild = crowded ? 26 + Math.floor(i / 5) * 57 : 83;
      return <Person key={`c${i}`} x={xChild} y={yChild} size={crowded ? 0.55 : age === "small" ? 0.65 : age === "teen" ? 0.85 : 1} child />;
    })}
  </g>;
}

function Neighborhood({ cancer }: { cancer: boolean }) {
  if (!cancer) return <>
    <House x={380} y={210} size={0.67} children={0} />
    <path d="M320 335 Q240 385 180 412 M440 335 Q520 385 580 412" stroke="currentColor" strokeWidth="4" fill="none" />
    <House x={170} y={480} size={0.65} age="small" />
    <House x={590} y={480} size={0.65} age="small" />
  </>;
  return <>
    {Array.from({ length: 9 }, (_, i) => <House key={i} x={130 + (i % 3) * 250} y={155 + Math.floor(i / 3) * 210} size={0.4} children={15} />)}
    <path d="M225 155 H285 M475 365 H535 M380 245 V280" stroke="currentColor" strokeWidth="5" strokeDasharray="10 7" />
    {Array.from({ length: 12 }, (_, i) => <Person key={i} x={70 + i * 58} y={665} size={0.4} child />)}
  </>;
}

export function CancerSlide({ s, step }: { s: Slide; step: number }) {
  const stage = houseStages[step] ?? houseStages[0];
  return <div className="slide-content slide-bg house-slide" data-house-step={step + 1}>
    <div className="absolute left-[120px] right-[120px] top-[64px] flex justify-between">
      <span className="slide-kicker text-[var(--slide-accent)]">{s.actName} · {s.actTitle}</span>
      <span className="slide-page text-[var(--slide-muted)]">{String(s.n).padStart(2, "0")} / {TOTAL}</span>
    </div>
    <h2 className="slide-title font-display absolute left-[120px] top-[135px]">{s.title}</h2>
    <div className="absolute left-[120px] right-[120px] top-[238px] flex items-center gap-7">
      <p className="slide-body text-[var(--slide-muted)]">{stage.name}</p>
      <div className="flex gap-3" aria-label={`Paso ${step + 1} de 3`}>
        {houseStages.map((_, i) => <span key={i} className={`h-3 w-10 ${i <= step ? "bg-primary" : "bg-muted"}`} />)}
      </div>
    </div>
    <div className="absolute left-[120px] top-[325px] grid w-[1680px] grid-cols-2 gap-[120px]">
      {[false, true].map((cancer) => <section key={String(cancer)} className={cancer ? "house-cancer" : "house-healthy"} aria-label={cancer ? "Cáncer" : "Tejido sano / Homeostasis"}>
        <h3 className="slide-body-lg font-display">{cancer ? "Cáncer" : "Tejido sano / Homeostasis"}</h3>
        <svg key={step} viewBox="0 0 760 720" className="house-scene h-[510px] w-full" role="img" aria-label={cancer ? stage.cancerCaption : stage.healthyCaption}>
          {step === 2 ? <Neighborhood cancer={cancer} /> : <>
            <House x={cancer && step === 1 ? 260 : 380} y={360} children={cancer ? stage.cancerChildren : stage.healthyChildren} parents={cancer ? stage.cancerParents : stage.healthyParents} age={cancer && step === 1 ? "teen" : stage.healthyAge} />
            {cancer && step === 1 && <>
              <House x={650} y={240} size={0.4} parents={0} children={0} />
              <House x={650} y={560} size={0.4} parents={0} children={0} />
              <path d="M430 425 Q520 440 600 310 M430 425 Q520 440 600 570" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="12 8" />
              {Array.from({ length: stage.departing }, (_, i) => <Person key={i} x={450 + i * 58} y={410 + i * 32} size={0.6} child />)}
            </>}
          </>}
        </svg>
        <p className="slide-body">{cancer ? stage.cancerCaption : stage.healthyCaption}</p>
        <p className="slide-caption mt-3 text-[var(--slide-muted)]">{cancer ? (step === 0 ? "El cambio todavía no es visible." : step === 1 ? "Adolescentes salen a colonizar otras casas." : "Sin control ni límites: se extiende por la ciudad.") : (step === 2 ? "Renovación ordenada, respetando el espacio." : "Crecimiento regulado, respetando el espacio.")}</p>
      </section>)}
    </div>
    <p className="slide-footer absolute bottom-[42px] left-[120px] text-[var(--slide-muted)]">Analogía de la renovación celular · Las personas representan células, no familias reales.</p>
  </div>;
}