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
      {s.n !== 3 && s.layout !== "scribe" && s.layout !== "types" && (
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

function CancerTypesSlide({ s, step }: { s: Slide; step: number }) {
  const categories = [
    { name: "Carcinomas", percent: 90, tissue: "Epitelios y glándulas", color: "var(--slide-warm)", example: "Piel, colon, pulmón, mama" },
    { name: "Leucemias y linfomas", percent: 8, tissue: "Sangre y sistema inmunitario", color: "var(--slide-accent)", example: "Médula ósea, linfocitos" },
    { name: "Sarcomas", percent: 1, tissue: "Tejidos conectivos", color: "var(--slide-fg)", example: "Hueso, músculo, grasa" },
    { name: "Otros", percent: 1, tissue: "Otros orígenes celulares", color: "var(--slide-muted)", example: "Distintas neoplasias" },
  ];
  const summary = categories.reduce<{ start: number; percent: number; color: string }[]>((acc, category) => {
    const start = acc.length ? acc[acc.length - 1]!.start + acc[acc.length - 1]!.percent : 0;
    acc.push({ start, percent: category.percent, color: category.color });
    return acc;
  }, []);

  return (
    <div className="slide-content slide-bg">
      <Chrome s={s} />
      <div className="absolute left-[120px] top-[146px] w-[1680px]">
        <h2 className="slide-title font-display">{s.title}</h2>
        <p className="slide-caption mt-7 text-[var(--slide-muted)]">Proporciones históricas orientativas según el tejido de origen</p>
      </div>
      <div className="absolute left-[120px] top-[320px] w-[1680px]">
        <div className="flex h-[84px] w-full overflow-hidden rounded-[18px] bg-[var(--slide-line)]" role="img" aria-label="Distribución histórica aproximada: 90 por ciento carcinomas, 8 por ciento leucemias y linfomas, 1 por ciento sarcomas y 1 por ciento otros tipos">
          {summary.map((segment, i) => (
            <div key={i} style={{ width: `${segment.percent}%`, backgroundColor: segment.color }} className="h-full border-r-[2px] border-[var(--slide-bg)] last:border-r-0" />
          ))}
        </div>
        <div className="mt-9 grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="min-h-[250px] rounded-[24px] border border-[var(--slide-line)] bg-[var(--slide-card)] px-7 py-7">
              <div className="font-display text-[70px] leading-none" style={{ color: category.color }}>{category.percent}%</div>
              <div className="mt-5 text-[31px] font-semibold leading-tight">{category.name}</div>
              <div className="mt-3 text-[24px] leading-tight text-[var(--slide-muted)]">{category.tissue}</div>
              <div className="mt-5 text-[21px] leading-tight text-[var(--slide-muted)]">{category.example}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-[1fr_1fr] gap-8">
          <div aria-hidden={step < 1} className={`rounded-[22px] border-l-[8px] border-[var(--slide-warm)] bg-[var(--slide-card)] px-8 py-7 transition-all duration-500 ${step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 invisible"}`}>
            <p className="text-[34px] font-semibold leading-tight">¿Por qué son tan frecuentes los carcinomas?</p>
            <p className="mt-4 text-[27px] leading-snug text-[var(--slide-muted)]">Muchos epitelios se renuevan continuamente: más divisiones implican más oportunidades de errores de copia.</p>
          </div>
          <div aria-hidden={step < 2} className={`rounded-[22px] border-l-[8px] border-[var(--slide-accent)] bg-[var(--slide-card)] px-8 py-7 transition-all duration-500 ${step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 invisible"}`}>
            <p className="text-[34px] font-semibold leading-tight">También importa la exposición</p>
            <p className="mt-4 text-[27px] leading-snug text-[var(--slide-muted)]">Radiación UV, humo, sustancias químicas, inflamación y defensas propias del tejido modifican el riesgo.</p>
          </div>
        </div>
        <p className="mt-5 text-[20px] text-[var(--slide-muted)]">Fuente: Cooper, <em>The Cell</em> (2000); cifras redondeadas, variables según edad y población.</p>
      </div>
    </div>
  );
}

function Stat({ s }: { s: Slide }) {
  const segments = [
    { value: 50, label: "TP53 mutado", description: "Mutación directa del gen", color: "var(--slide-warm)" },
    { value: 45, label: "p53 desactivada", description: "Por otros mecanismos", color: "var(--slide-accent)" },
    { value: 5, label: "Otros casos", description: "Sin alteración clasificada", color: "var(--slide-muted)" },
  ];
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  let current = 0;

  return (
    <div className="slide-content slide-bg">
      <Chrome s={s} />
      <div className="absolute left-[120px] top-[154px] w-[1680px]">
        <h2 className="slide-title font-display">{s.title}</h2>
        <p className="slide-caption mt-7 text-[var(--slide-muted)]">
          Mutaciones directas y alteraciones de la vía p53
        </p>
      </div>
      <div className="absolute left-[120px] top-[302px] grid w-[1680px] grid-cols-[720px_1fr] items-center gap-[92px]">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 240 240" className="h-[640px] w-[640px]" role="img"
            aria-label="Gráfico conceptual: 50 por ciento TP53 mutado, 45 por ciento p53 desactivada por otros mecanismos y 5 por ciento otros casos">
            <circle cx="120" cy="120" r={radius} fill="none" stroke="var(--slide-line)" strokeWidth="29" />
            {segments.map((segment) => {
              const length = circumference * segment.value / 100;
              const offset = circumference * current / 100;
              current += segment.value;
              return (
                <circle key={segment.label} cx="120" cy="120" r={radius} fill="none"
                  stroke={segment.color} strokeWidth="29"
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={-offset}
                  transform="rotate(-90 120 120)"
                />
              );
            })}
            <text x="120" y="112" textAnchor="middle" fill="var(--slide-fg)"
              fontSize="26" fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">p53</text>
            <text x="120" y="135" textAnchor="middle" fill="var(--slide-muted)"
              fontSize="9" fontFamily="IBM Plex Sans, sans-serif">ESQUEMA</text>
          </svg>
        </div>
        <div className="flex flex-col gap-7">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center gap-9 rounded-[24px] border border-[var(--slide-line)] bg-[var(--slide-card)] px-9 py-8">
              <div className="h-[86px] w-[10px] shrink-0 rounded-full" style={{ backgroundColor: segment.color }} />
              <div className="w-[140px] shrink-0 font-display text-[72px] leading-none" style={{ color: segment.color }}>
                {segment.value}%
              </div>
              <div>
                <div className="text-[36px] font-semibold leading-tight text-[var(--slide-fg)]">{segment.label}</div>
                <div className="slide-caption mt-2 text-[var(--slide-muted)]">{segment.description}</div>
              </div>
            </div>
          ))}
          <p className="slide-caption mt-3 max-w-[820px] text-[var(--slide-muted)]">
            Valores aproximados. Pueden variar dependiendo del tipo de cáncer y de cada individuo.
          </p>
        </div>
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

function TwoHitsSlide({ s, step }: { s: Slide; step: number }) {
  const rows = [
    { id: "hereditary", name: "Cáncer hereditario", detail: "Primer golpe: heredado", second: "Segundo golpe: somático" },
    { id: "sporadic", name: "Cáncer esporádico", detail: "Primer golpe: somático", second: "Segundo golpe: somático" },
  ];
  const Allele = ({ altered, label }: { altered: boolean; label: string }) => (
    <div className={`flex h-[96px] w-[164px] flex-col items-center justify-center rounded-[18px] border-[3px] ${altered ? "border-[var(--slide-warm)] bg-[var(--slide-warm)]/10 text-[var(--slide-warm)]" : "border-[var(--slide-accent)] bg-[var(--slide-card)] text-[var(--slide-accent)]"}`}>
      <span className="text-[34px] font-semibold leading-none">{altered ? "RB1 −" : "RB1 +"}</span>
      <span className="mt-2 text-[19px]">{label}</span>
    </div>
  );
  return (
    <div className="slide-content slide-bg">
      <Chrome s={s} />
      <div className="absolute left-[120px] top-[145px] w-[1680px]">
        <h2 className="slide-title font-display">{s.title}</h2>
        <p className="slide-caption mt-6 text-[var(--slide-muted)]">¿Qué lo impulsó? Estudió 48 casos: tumores familiares tempranos y bilaterales frente a casos generalmente más tardíos y unilaterales.</p>
      </div>
      <div className="absolute left-[120px] top-[315px] w-[1680px]">
        <div className="grid grid-cols-[260px_1fr_1fr_1fr] gap-5 text-center text-[23px] font-semibold text-[var(--slide-muted)]">
          <span></span><span>Antes de los golpes</span><span>Primer golpe</span><span>Segundo golpe</span>
        </div>
        {rows.map((row) => (
          <div key={row.id} className="mt-5 grid grid-cols-[260px_1fr_1fr_1fr] items-center gap-5 rounded-[22px] border border-[var(--slide-line)] bg-[var(--slide-card)] p-6">
            <div><p className="text-[33px] font-semibold leading-tight">{row.name}</p><p className="mt-3 text-[21px] text-[var(--slide-muted)]">{row.id === "hereditary" ? "Predisposición desde el nacimiento" : "Sin predisposición heredada"}</p></div>
            <div className="flex items-center justify-center gap-3"><Allele altered={false} label="copia 1"/><Allele altered={false} label="copia 2"/></div>
            <div className={`transition-all duration-500 ${step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="flex items-center justify-center gap-3"><Allele altered={true} label="copia 1"/><Allele altered={false} label="copia 2"/></div>
              <p className="mt-3 text-center text-[21px] text-[var(--slide-muted)]">{row.detail}</p>
            </div>
            <div className={`transition-all duration-500 ${step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="flex items-center justify-center gap-3"><Allele altered={true} label="copia 1"/><Allele altered={true} label="copia 2"/></div>
              <p className="mt-3 text-center text-[21px] text-[var(--slide-muted)]">{row.second}</p>
            </div>
          </div>
        ))}
        <div className="mt-8 rounded-[20px] border-l-[8px] border-[var(--slide-warm)] bg-[var(--slide-card)] px-8 py-6">
          <p className="text-[27px] leading-tight"><span className="font-semibold">Importante:</span> el modelo clásico se aplica a <span className="font-semibold">RB1</span>. En <span className="font-semibold">TP53</span> pueden intervenir efectos dominantes negativos y otros mecanismos.</p>
        </div>
        <p className="mt-4 text-[19px] text-[var(--slide-muted)]">Fuente: Knudson, PNAS (1971); GeneReviews, síndrome de Li-Fraumeni.</p>
      </div>
    </div>
  );
}

function CarPedalsSlide({ s, step }: { s: Slide; step: number }) {
  const acceleratorStuck = step >= 1;
  const brakeBroken = step >= 2;
  return (
    <div className="slide-content slide-bg">
      <Chrome s={s} />
      <div className="absolute left-[120px] top-[138px] w-[1680px]">
        <h2 className="font-display text-[66px] leading-[1.08] tracking-[-0.03em]">{s.title}</h2>
        <p className="slide-caption mt-6 text-[var(--slide-muted)]">Una metáfora de los controles de crecimiento celular</p>
      </div>
      <div className="absolute left-[120px] top-[290px] grid w-[1680px] grid-cols-[830px_1fr] gap-[65px]">
        <div className="rounded-[32px] border border-[var(--slide-line)] bg-[var(--slide-card)] p-8">
          <svg viewBox="0 0 800 430" className="h-[400px] w-full" role="img" aria-label="Automóvil y velocímetro de una célula; su rapidez aumenta cuando el acelerador queda atascado y falla el freno">
            <defs>
              <linearGradient id="carFill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--slide-accent)" /><stop offset="1" stopColor="var(--slide-warm)" /></linearGradient>
            </defs>
            <path d="M96 306H705" stroke="var(--slide-line)" strokeWidth="12" strokeLinecap="round" />
            <path d="M145 232 L244 137 Q269 116 314 116 H492 Q532 116 562 152 L623 220 H685 Q711 221 719 250 L726 292 H96 L103 254 Q108 232 145 232Z" fill="url(#carFill)" opacity=".94" />
            <path d="M259 154 H487 Q508 154 534 182 L560 218 H216Z" fill="var(--slide-bg)" opacity=".85" />
            <path d="M386 155V220" stroke="var(--slide-muted)" strokeWidth="8" />
            <rect x="104" y="268" width="610" height="31" rx="12" fill="var(--slide-bg-2)" />
            {[220,610].map(x=><g key={x}><circle cx={x} cy="306" r="66" fill="var(--slide-bg)" stroke="var(--slide-muted)" strokeWidth="14"/><circle cx={x} cy="306" r="31" fill="var(--slide-line)" /></g>)}
            {acceleratorStuck && <g stroke="var(--slide-warm)" strokeWidth="7" strokeLinecap="round"><path d="M70 195 L22 185 M78 217L17 221 M72 241 L27 263" /><path d="M733 213L781 198 M736 238L785 241" /></g>}
            <g transform="translate(400 74)"><rect x="-200" y="-39" width="400" height="77" rx="37" fill="var(--slide-bg)" stroke="var(--slide-line)" strokeWidth="3"/>
              <text x="0" y="11" fontSize="31" textAnchor="middle" fill="var(--slide-fg)" fontWeight="600">
                {brakeBroken ? "SIN CONTROL" : acceleratorStuck ? "ACELERACIÓN EXCESIVA" : "CRECIMIENTO REGULADO"}
              </text>
            </g>
          </svg>
          <div className="mt-1 grid grid-cols-2 gap-10">
            <div className="flex flex-col items-center">
              <div className={`flex h-[170px] w-[185px] origin-top items-center justify-center rounded-[26px] border-[5px] transition-all duration-500 ${brakeBroken ? "rotate-[23deg] border-[var(--slide-warm)] bg-[var(--slide-warm)]/15" : "border-[var(--slide-accent)] bg-[var(--slide-bg)]"}`}>
                <span className="font-display text-[35px] font-semibold">FRENO</span>
              </div>
              <p className="mt-3 text-[27px] font-semibold" style={{ color: brakeBroken ? "var(--slide-warm)" : "var(--slide-accent)" }}>{brakeBroken ? "Averiado" : "Funcional"}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className={`flex h-[170px] w-[185px] origin-top items-center justify-center rounded-[26px] border-[5px] transition-all duration-500 ${acceleratorStuck ? "rotate-[-18deg] border-[var(--slide-warm)] bg-[var(--slide-warm)]/15" : "border-[var(--slide-accent)] bg-[var(--slide-bg)]"}`}>
                <span className="font-display text-[30px] font-semibold">ACELERADOR</span>
              </div>
              <p className="mt-3 text-[27px] font-semibold" style={{ color: acceleratorStuck ? "var(--slide-warm)" : "var(--slide-accent)" }}>{acceleratorStuck ? "Atascado" : "Regulado"}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6">
          <div className="rounded-[24px] border border-[var(--slide-line)] bg-[var(--slide-card)] px-10 py-8">
            <p className="text-[38px] font-semibold">Conducción normal</p>
            <p className="mt-3 text-[28px] leading-snug text-[var(--slide-muted)]">La célula acelera cuando necesita dividirse y se detiene cuando corresponde.</p>
          </div>
          <div className={`rounded-[24px] border-l-[10px] border-[var(--slide-warm)] bg-[var(--slide-card)] px-10 py-8 transition-all duration-500 ${acceleratorStuck ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 invisible"}`}>
            <p className="text-[38px] font-semibold">Oncogén: acelerador atascado</p>
            <p className="mt-3 text-[28px] leading-snug text-[var(--slide-muted)]">Una señal de crecimiento permanece activa. Ejemplos: RAS, MYC.</p>
          </div>
          <div className={`rounded-[24px] border-l-[10px] border-[var(--slide-accent)] bg-[var(--slide-card)] px-10 py-8 transition-all duration-500 ${brakeBroken ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 invisible"}`}>
            <p className="text-[38px] font-semibold">Gen supresor: freno averiado</p>
            <p className="mt-3 text-[28px] leading-snug text-[var(--slide-muted)]">Se pierde un mecanismo de control. Ejemplos: RB1 y TP53.</p>
          </div>
          <p className="text-[23px] leading-snug text-[var(--slide-muted)]">Analogía ilustrativa: no todos los tumores requieren ambas fallas.</p>
        </div>
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
  if (s.layout === "types") return <CancerTypesSlide s={s} step={step ?? 0} />;
  if (s.layout === "twohits") return <TwoHitsSlide s={s} step={step ?? 0} />;
  if (s.layout === "car") return <CarPedalsSlide s={s} step={step ?? 0} />;
  if (s.layout === "scribe") return <ScribeSlide s={s} />;
  if (s.layout === "stat") return <Stat s={s} />;
  if (s.n === TOTAL) return <Closing s={s} />;
  return <Standard s={s} />;
}
