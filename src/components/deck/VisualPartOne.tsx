import { ArrowRight, Ban, BookOpen, CarFront, Check, CircleAlert, Dna, FlaskConical, Gauge, LockKeyhole, Microscope, Pause, RotateCcw, Shield, ShieldCheck, Sun, Tag, Trash2, Wrench, X, Zap } from "lucide-react";

type Props = { kind: string; step: number };
const frame = "h-full w-full rounded-[28px] border border-[var(--slide-line)] bg-[var(--slide-card)] p-[32px] overflow-hidden";
const panel = "rounded-[22px] border border-[var(--slide-line)] bg-[var(--slide-bg)] p-6";
const muted = "text-[var(--slide-muted)]";
function Arrow(){ return <ArrowRight size={42} className="shrink-0 text-[var(--slide-accent)]" />; }
function MiniCar({ warning = false, brake = false }: { warning?: boolean; brake?: boolean }) {
  return <div className="relative flex h-[175px] items-center justify-center rounded-[24px] border border-[var(--slide-line)] bg-[var(--slide-bg)]">
    <CarFront size={137} strokeWidth={1.3} className={warning ? "text-[var(--slide-warm)]" : "text-[var(--slide-accent)]"}/>
    {brake && <ShieldCheck size={70} className="absolute right-9 bottom-3 text-[var(--slide-accent)]" />}
    {warning && <Zap size={48} className="absolute right-10 top-4 text-[var(--slide-warm)]" />}
  </div>;
}
function DnaDamage({ broken = false }: { broken?: boolean }){
  return <svg viewBox="0 0 400 235" className="h-[240px] w-full" role="img" aria-label="Doble hélice de ADN con una lesión en el centro">
    {Array.from({length:12},(_,i)=>{const y=15+i*19;const x=190+84*Math.sin(i*.57);const opposite=380-x;const damage=broken&&i>=5&&i<=7;
      return <g key={i} opacity={damage ? 0.23 : 1}>
        <line x1={x} x2={opposite} y1={y} y2={y} stroke={damage?"#d97737":"var(--slide-line)"} strokeWidth="6"/>
        <circle cx={x} cy={y} r="9" fill="var(--slide-accent)"/><circle cx={opposite} cy={y} r="9" fill="var(--slide-warm)"/>
      </g>;
    })}
    {broken&&<g stroke="#f5bf4c" strokeWidth="5" strokeLinecap="round"><path d="M160 91l-20 26 21 2-18 30"/><path d="M241 91l19 22-16 7 24 27"/></g>}
  </svg>;
}
function MediaCard({icon,title,body,visible=true}:{icon:React.ReactNode;title:string;body:string;visible?:boolean}){
  return <div className={panel+" flex flex-1 flex-col items-center justify-center gap-4 text-center transition-all duration-500 "+(visible?"opacity-100":"opacity-20")}>
    <div className="text-[var(--slide-accent)]">{icon}</div>
    <p className="font-display text-[29px] leading-tight">{title}</p>
    <p className={"text-[21px] leading-snug "+muted}>{body}</p>
  </div>;
}
function ScienceRecognition(){
  return <div className={frame+" flex items-center gap-8"}>
    <div className="h-full w-[47%] overflow-hidden rounded-[16px] border border-[var(--slide-line)] bg-black">
      <img src="https://culturacientifica.com/app/uploads/2018/03/p53-640x846.jpg" alt="Portada auténtica de Science del 24 de diciembre de 1993: p53, Molecule of the Year" className="h-full w-full object-contain" />
    </div>
    <div className="flex min-w-0 flex-1 flex-col justify-center gap-7">
      <div className={panel}><p className={"text-[25px] "+muted}>1992 · Nature</p><p className="mt-2 font-display text-[44px] leading-tight">Guardian of the Genome</p><p className={"mt-3 text-[23px] "+muted}>David Lane</p></div>
      <div className={panel}><p className={"text-[25px] "+muted}>1993 · Science</p><p className="mt-2 font-display text-[48px] leading-tight text-[var(--slide-warm)]">Molecule of the Year</p><p className={"mt-3 text-[22px] "+muted}>Portada de la edición del 24 de diciembre</p></div>
    </div>
  </div>;
}
export function PartOneVisual({kind,step}:Props){
  switch(kind){
    case "suspect": return <div className={frame+" flex flex-col justify-between"}>
      <div className="flex items-center justify-between gap-6"><div><p className={"text-[25px] "+muted}>Década de 1980 · Interpretación inicial</p><h3 className="mt-3 font-display text-[48px]">El «sospechoso» equivocado</h3></div><CircleAlert size={72} className="text-[var(--slide-warm)]"/></div>
      <MiniCar warning/>
      <div className="flex gap-6">
        <div className={panel+" flex-1"}><p className="text-[24px]">Gen clonado de células tumorales</p><p className={"mt-2 text-[21px] "+muted}>p53 mutante + RAS</p></div><Arrow/><div className={panel+" flex-1 border-[var(--slide-warm)]"}><p className="font-display text-[36px] text-[var(--slide-warm)]">«ONCOGÉN»</p><p className={"text-[21px] "+muted}>Veredicto histórico erróneo</p></div>
      </div><div className="rounded-[14px] border-t-2 border-[var(--slide-line)] pt-5 text-center font-display text-[28px] italic">Archivo científico · 1980–1988</div>
    </div>;
    case "reversal": return <div className={frame+" flex flex-col justify-between"}>
      <div className="flex justify-between gap-6">
        <div className={panel+" flex-1"}><p className={"text-[24px] "+muted}>Clon tumoral</p><MiniCar warning/><p className="mt-3 text-center text-[26px]">p53 mutante</p></div>
        <div className="flex flex-col items-center justify-center gap-4"><X size={70} className="text-[var(--slide-warm)]"/><Arrow/></div>
        <div className={panel+" flex-1 border-[var(--slide-accent)]"}><p className={"text-[24px] "+muted}>Gen normal (wild-type)</p><MiniCar brake/><p className="mt-3 text-center text-[26px]">p53 protector</p></div>
      </div>
      <div className="flex items-center justify-center gap-7 rounded-[22px] bg-[var(--slide-bg)] py-6"><ShieldCheck size={83} className="text-[var(--slide-accent)]"/><div><p className="font-display text-[44px]">No era el acelerador.</p><p className="text-[30px] text-[var(--slide-warm)]">¡Era el freno de emergencia!</p></div></div>
    </div>;
    case "recognition": return <ScienceRecognition/>;
    case "bias": return <div className={frame+" grid grid-cols-2 gap-7"}>
      <div className="flex flex-col justify-between rounded-[24px] border border-[var(--slide-warm)] bg-[var(--slide-bg)] px-8 py-7"><div className="flex items-center gap-4 text-[var(--slide-warm)]"><CircleAlert size={44}/><h3 className="font-display text-[37px]">Sesgo de confirmación</h3></div>{["Se espera un oncogén","Se usa un clon tumoral","Se observa transformación","Se confirma la hipótesis inicial"].map((t,i)=><div key={i} className="flex items-center gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slide-warm)] text-[20px] text-[var(--slide-bg)]">{i+1}</span><span className="text-[25px]">{t}</span></div>)}<p className="text-[23px] text-[var(--slide-warm)]">Conclusión equivocada</p></div>
      <div className="flex flex-col justify-between rounded-[24px] border border-[var(--slide-accent)] bg-[var(--slide-bg)] px-8 py-7"><div className="flex items-center gap-4 text-[var(--slide-accent)]"><Microscope size={44}/><h3 className="font-display text-[37px]">Verificación independiente</h3></div>{["Cuestionar el material inicial","Comparar con células sanas","Secuenciar p53 normal y mutante","Repetir y contrastar resultados"].map((t,i)=><div key={i} className="flex items-center gap-4"><Check size={35} className="text-[var(--slide-accent)]"/><span className="text-[25px]">{t}</span></div>)}<p className="text-[23px] text-[var(--slide-accent)]">p53: gen supresor tumoral</p></div>
    </div>;
    case "turnover": return <div className={frame+" flex flex-col justify-around"}>
      <h3 className="font-display text-[37px]">Vida media corta de p53 en condiciones normales</h3>
      <div className="flex items-center justify-between gap-2">
        <MediaCard icon={<ShieldCheck size={65}/>} title="1. p53" body="Síntesis continua"/>
        <Arrow/><MediaCard visible={step>=1} icon={<Tag size={65}/>} title="2. MDM2" body="Ubiquitinación"/><Arrow/>
        <MediaCard visible={step>=2} icon={<Trash2 size={65}/>} title="3. Proteasoma" body="Degradación"/>
      </div>
      <div className="flex items-center justify-between gap-6 rounded-[20px] bg-[var(--slide-bg)] px-8 py-6">
        <p className="font-display text-[40px]">≈20 minutos</p>
        <div className="h-[18px] flex-1 overflow-hidden rounded-full bg-[var(--slide-line)]"><div className="h-full w-[15%] rounded-full bg-[var(--slide-accent)]"/></div>
        <p className="text-[27px]">p53 basal baja</p>
      </div>
    </div>;
    case "alarm": return <div className={frame+" flex flex-col justify-between"}>
      <div className="flex items-center justify-between"><h3 className="font-display text-[42px]">Daño en el ADN</h3><Sun size={70} className="text-[var(--slide-warm)]"/></div>
      <DnaDamage broken/>
      <div className="flex items-center justify-between gap-4">
        <MediaCard icon={<CircleAlert size={65}/>} title="Sensores" body="ATM / ATR"/>
        <Arrow/><MediaCard visible={step>=1} icon={<Zap size={65}/>} title="Señalización" body="Fosforilación y estabilización"/>
        <Arrow/><MediaCard visible={step>=2} icon={<ShieldCheck size={65}/>} title="p53 activo" body="Respuesta nuclear"/>
      </div>
    </div>;
    case "options": return <div className={frame+" flex flex-col gap-8"}>
      <div className="flex items-center justify-center gap-6 rounded-[20px] bg-[var(--slide-bg)] py-5 text-[32px]"><Dna size={54} className="text-[var(--slide-warm)]"/>Daño en ADN <ArrowRight size={45}/><Shield size={58} className="text-[var(--slide-accent)]"/> p53</div>
      <div className="flex flex-1 items-center gap-4">
        <MediaCard icon={<Pause size={92} className="text-[#e6bd55]"/>} title="Pausa" body="Arresto del ciclo · p21"/>
        <MediaCard icon={<Wrench size={92}/>} title="Reparación" body="Maquinaria de reparación de ADN"/>
        <MediaCard icon={<X size={92} className="text-[var(--slide-warm)]"/>} title="Apoptosis" body="Eliminación celular programada"/>
      </div>
      <p className={"text-center text-[23px] "+muted}>El resultado depende del daño, el contexto celular y las señales concurrentes.</p>
    </div>;
    case "p21": return <div className={frame+" flex flex-col justify-between"}>
      <div className="flex items-center justify-around gap-6"><div className={panel+" text-center"}><Shield size={78} className="mx-auto text-[var(--slide-accent)]"/><p className="mt-4 text-[31px]">p53</p></div><Arrow/><div className={panel+" text-center border-[var(--slide-warm)]"}><p className="font-display text-[49px] text-[var(--slide-warm)]">p21</p><p className={"mt-2 text-[24px] "+muted}>Cuña molecular</p></div><Arrow/><div className={panel+" text-center"}><Pause size={70} className="mx-auto text-[var(--slide-accent)]"/><p className="mt-4 text-[29px]">Ciclo detenido</p></div></div>
      <svg viewBox="0 0 890 245" className="w-full h-[235px]" role="img" aria-label="Engranajes de ciclinas y CDK bloqueados por una cuña marcada p21"><g transform="translate(245 124)"><circle r="94" fill="none" stroke="var(--slide-line)" strokeWidth="40" strokeDasharray="32 17"/><circle r="52" fill="var(--slide-bg)"/><text textAnchor="middle" y="10" fontSize="30" fill="var(--slide-fg)">CDK</text></g><g transform="translate(495 124)"><circle r="89" fill="none" stroke="var(--slide-line)" strokeWidth="37" strokeDasharray="30 20"/><circle r="47" fill="var(--slide-bg)"/><text textAnchor="middle" y="10" fontSize="26" fill="var(--slide-fg)">Ciclina</text></g><path d="M366 10L443 10 408 206 395 206Z" fill="var(--slide-warm)"/><text x="399" y="92" textAnchor="middle" fontSize="29" fontWeight="bold" fill="var(--slide-bg)">p21</text><text x="715" y="131" fontSize="41" fill="var(--slide-accent)">PAUSA</text></svg>
      <div className="flex justify-center gap-6 text-[27px]"><Wrench className="text-[var(--slide-accent)]" size={39}/><p>Tiempo para reparar el ADN antes de dividirse</p></div>
    </div>;
    case "apoptosis": return <div className={frame+" flex flex-col items-center justify-around"}>
      <div className="text-center">
        <p className="font-display text-[42px] leading-tight">Cuando el daño es demasiado grave</p>
        <p className="mt-3 text-[26px] text-[var(--slide-muted)]">p53 puede activar una respuesta de muerte celular</p>
      </div>
      <svg viewBox="0 0 925 365" className="h-[350px] w-full" role="img" aria-label="Una célula con ADN gravemente dañado activa p53 y genes como BAX, PUMA y NOXA; se inicia una respuesta de muerte celular">
        <defs>
          <radialGradient id="apoptosis-cell-fill">
            <stop offset="0%" stopColor="var(--slide-accent)" stopOpacity=".17" />
            <stop offset="100%" stopColor="var(--slide-accent)" stopOpacity=".03" />
          </radialGradient>
        </defs>
        <circle cx="214" cy="180" r="140" fill="url(#apoptosis-cell-fill)" stroke="var(--slide-accent)" strokeWidth="7" />
        <circle cx="214" cy="180" r="78" fill="var(--slide-bg)" stroke="var(--slide-line)" strokeWidth="5"/>
        <path d="M163 179 Q186 123 213 175 Q239 222 268 163" fill="none" stroke="var(--slide-accent)" strokeWidth="9" strokeLinecap="round"/>
        <path d="M174 163 L191 186 M231 167 L248 145" stroke="var(--slide-warm)" strokeWidth="9" strokeLinecap="round"/>
        <path d="M275 108 l-12 20 15 4 -8 18" fill="none" stroke="var(--slide-warm)" strokeWidth="7" strokeLinejoin="round"/>
        <text x="214" y="344" textAnchor="middle" fontSize="29" fill="var(--slide-fg)">ADN con daño grave</text>
        <path d="M364 179 H445" fill="none" stroke="var(--slide-accent)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M432 165 L452 179 L432 193" fill="none" stroke="var(--slide-accent)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="457" y="102" width="144" height="155" rx="36" fill="var(--slide-bg)" stroke="var(--slide-accent)" strokeWidth="6"/>
        <path d="M485 144 L505 118 L531 139 L552 121 L574 144 L564 174 L538 193 L510 174Z" fill="var(--slide-accent)" fillOpacity=".20" stroke="var(--slide-accent)" strokeWidth="5"/>
        <text x="529" y="229" textAnchor="middle" fontSize="42" fontWeight="700" fill="var(--slide-fg)">p53</text>
        <path d="M610 179 H680" fill="none" stroke="var(--slide-warm)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M667 165 L687 179 L667 193" fill="none" stroke="var(--slide-warm)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="698" y="93" width="214" height="174" rx="32" fill="var(--slide-bg)" stroke="var(--slide-warm)" strokeWidth="6"/>
        <text x="805" y="143" textAnchor="middle" fontSize="31" fontWeight="700" fill="var(--slide-fg)">BAX · PUMA</text>
        <text x="805" y="184" textAnchor="middle" fontSize="31" fontWeight="700" fill="var(--slide-fg)">NOXA</text>
        <text x="805" y="231" textAnchor="middle" fontSize="24" fill="var(--slide-muted)">Señales de muerte</text>
      </svg>
      <div className="flex w-full items-center justify-center gap-5 rounded-[20px] border border-[var(--slide-line)] bg-[var(--slide-bg)] px-7 py-5 text-center">
        <ShieldCheck size={53} className="shrink-0 text-[var(--slide-accent)]"/>
        <p className="font-display text-[31px] leading-snug">La célula dañada deja de representar un riesgo para el tejido.</p>
      </div>
    </div>;
    case "senescence": return <div className={frame+" flex flex-col items-center justify-around"}>
      <p className="font-display text-[43px]">Célula viva · División detenida</p>
      <div className="relative flex h-[370px] w-[500px] items-center justify-center rounded-[47%] border-[8px] border-[var(--slide-accent)] bg-[var(--slide-accent)]/5">
        <div className="flex h-[240px] w-[260px] items-center justify-center rounded-[45%] border-[6px] border-[var(--slide-line)] bg-[var(--slide-bg)]"><Dna size={150} strokeWidth={1.2} className="text-[var(--slide-accent)]"/></div>
        <div className="absolute -bottom-5 right-[-32px] rounded-[30px] border-4 border-[var(--slide-warm)] bg-[var(--slide-bg)] p-7"><LockKeyhole size={120} className="text-[var(--slide-warm)]"/></div>
      </div>
      <div className="flex items-center gap-6 text-[30px]"><Ban size={47} className="text-[var(--slide-warm)]"/>Sin proliferación <span className="text-[var(--slide-line)]">·</span> <Check size={45} className="text-[var(--slide-accent)]"/>Actividad metabólica</div>
    </div>;
    default: return null;
  }
}
