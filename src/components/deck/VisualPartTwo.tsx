import { ArrowRight, Ban, BookOpen, Brain, Check, CircleAlert, Dna, FlaskConical, HeartHandshake, Lock, Microscope, Pill, ScanSearch, Shield, ShieldCheck, Skull, Sparkles, Syringe, UserRound, Users, Wrench, X, Zap } from "lucide-react";
type Props = { kind: string; step: number };
const frame="h-full w-full overflow-hidden rounded-[28px] border border-[var(--slide-line)] bg-[var(--slide-card)] p-[30px]";
const panel="rounded-[22px] border border-[var(--slide-line)] bg-[var(--slide-bg)] p-6";
function Thumb({altered=false,round=false}:{altered?:boolean;round?:boolean}) {
  return <div className={"h-[60px] w-[60px] border-[5px] "+(round?"rounded-full":"rounded-[10px]")+(altered?" border-[var(--slide-warm)] bg-[var(--slide-warm)]/50":" border-[var(--slide-accent)] bg-[var(--slide-accent)]/15")}/>;
}
function PhotoCard({url,name,subtitle,credit}:{url:string;name:string;subtitle:string;credit:string}){
  return <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-[var(--slide-line)] bg-[var(--slide-bg)]">
    <div className="h-[410px] overflow-hidden"><img src={url} alt={name} className="h-full w-full object-cover"/></div>
    <div className="flex-1 px-7 py-6"><p className="font-display text-[34px]">{name}</p><p className="mt-2 text-[25px] text-[var(--slide-accent)]">{subtitle}</p><p className="mt-3 text-[18px] text-[var(--slide-muted)]">{credit}</p></div>
  </div>;
}
function Pedigree(){
  const groups=[
    [{type:"square",affected:false},{type:"circle",affected:true}],
    [{type:"square",affected:true},{type:"circle",affected:false},{type:"circle",affected:true},{type:"square",affected:false}],
    [{type:"circle",affected:true},{type:"square",affected:false},{type:"square",affected:true},{type:"circle",affected:false},{type:"circle",affected:true}]
  ];
  return <div className={frame+" flex flex-col justify-between"}>
    <div><p className="font-display text-[40px]">Árbol familiar · predisposición hereditaria</p><p className="mt-3 text-[22px] text-[var(--slide-muted)]">Pedigrí ilustrativo del síndrome de Li-Fraumeni</p></div>
    <div className="relative flex flex-col gap-16">
      <div className="absolute left-[50%] top-[33px] h-[280px] w-[3px] bg-[var(--slide-line)]"/>
      {groups.map((generation,i)=><div key={i} className="relative flex items-center justify-center gap-7"><span className="absolute left-0 text-[21px] text-[var(--slide-muted)]">Gen. {i+1}</span>{generation.map((person,j)=><Thumb key={j} altered={person.affected} round={person.type==="circle"}/>)}</div>)}
    </div>
    <div className="flex items-center justify-center gap-5 text-[21px]"><Thumb round/><span>No afectado</span><Thumb altered round/><span>Afectado</span></div>
    <p className="text-center text-[19px] italic text-[var(--slide-muted)]">Esquema explicativo, no árbol genealógico de una familia identificable.</p>
  </div>;
}
function Signatures(){
  const signatures=[
    {name:"Tabaco",detail:"Pulmón · G → T",peaks:[65,110,80,210,105,54,190,67],major:3},
    {name:"Radiación UV",detail:"Piel · CC → TT",peaks:[90,210,50,70,160,65,210,55],major:1},
    {name:"Aflatoxina",detail:"Hígado · TP53 R249S",peaks:[50,60,66,245,50,60,70,47],major:3},
  ];
  return <div className={frame+" flex flex-col justify-between"}>
    <div><p className="font-display text-[39px]">Huellas mutacionales diferentes</p><p className="mt-3 text-[21px] text-[var(--slide-muted)]">Firmas características según el agente carcinógeno</p></div>
    {signatures.map(sig=><div key={sig.name} className={panel+" flex items-center gap-6 py-4"}>
      <div className="w-[195px] shrink-0"><p className="text-[30px] font-semibold">{sig.name}</p><p className="text-[22px] text-[var(--slide-muted)]">{sig.detail}</p></div>
      <div className="flex h-[105px] flex-1 items-end gap-3 border-b-2 border-[var(--slide-line)]">{sig.peaks.map((peak,i)=><div key={i} style={{height:(peak/245*100)+"%"}} className={"flex-1 rounded-t-md "+(i===sig.major?"bg-[var(--slide-warm)]":"bg-[var(--slide-accent)] opacity-55")}/>)}</div>
    </div>)}
    <p className="text-[19px] italic text-[var(--slide-muted)]">Representación esquemática; la altura de las barras no corresponde a frecuencias experimentales.</p>
  </div>;
}
function HPVE6({step}: {step:number}){
  return <div className={frame+" flex flex-col justify-around"}>
    <p className="font-display text-[42px]">El virus no necesita mutar TP53</p>
    <div className="flex items-center justify-between gap-3">
      <div className={panel+" flex flex-col items-center gap-6 text-center"}><div className="relative flex h-[175px] w-[175px] items-center justify-center rounded-[42%] border-[8px] border-[var(--slide-warm)] bg-[var(--slide-warm)]/10"><span className="text-[45px] font-semibold">VPH</span>{Array.from({length:8},(_,i)=><span key={i} className="absolute h-3 w-3 rounded-full bg-[var(--slide-warm)]" style={{left:(50+42*Math.cos(i*Math.PI/4))+"%",top:(50+42*Math.sin(i*Math.PI/4))+"%"}}/>)}</div><p className="text-[27px]">Virus</p></div>
      <ArrowRight size={48} className="text-[var(--slide-accent)]"/>
      <div className={panel+" flex flex-col items-center gap-6 text-center transition-opacity duration-500 "+(step>=1?"opacity-100":"opacity-20")}><div className="flex h-[175px] w-[175px] items-center justify-center rounded-full border-[8px] border-[var(--slide-warm)]"><span className="font-display text-[55px]">E6</span></div><p className="text-[27px]">E6 y E6AP</p></div>
      <ArrowRight size={48} className="text-[var(--slide-accent)]"/>
      <div className={panel+" flex flex-col items-center gap-6 text-center transition-opacity duration-500 "+(step>=2?"opacity-100":"opacity-20")}><div className="relative flex h-[175px] w-[175px] items-center justify-center rounded-full border-[8px] border-[var(--slide-accent)]"><Shield size={95}/><X size={61} className="absolute text-[var(--slide-warm)]"/></div><p className="text-[27px]">p53 degradada</p></div>
    </div>
    <div className="flex items-center justify-center gap-5 rounded-[21px] bg-[var(--slide-bg)] py-6 text-[29px]"><Lock size={50} className="text-[var(--slide-warm)]"/>El gen TP53 puede permanecer intacto.</div>
  </div>;
}
function MutantPolice(){
  return <div className={frame+" flex flex-col justify-between"}>
    <div><p className="font-display text-[42px]">Cuando el guardián cambia de bando</p><p className="mt-3 text-[23px] text-[var(--slide-muted)]">Mutación con posible ganancia de función</p></div>
    <div className="flex items-center justify-between gap-5">
      <div className={panel+" flex flex-1 flex-col items-center gap-6"}><ShieldCheck size={154} strokeWidth={1.3} className="text-[var(--slide-accent)]"/><p className="font-display text-[34px]">p53 normal</p><p className="text-[24px] text-center text-[var(--slide-muted)]">Protege el genoma</p></div>
      <ArrowRight size={65} className="shrink-0 text-[var(--slide-warm)]"/>
      <div className={panel+" flex flex-1 flex-col items-center gap-6 border-[var(--slide-warm)]"}><div className="relative"><Shield size={154} strokeWidth={1.3} className="text-[var(--slide-warm)]"/><X size={64} className="absolute left-[46px] top-[50px] text-[var(--slide-warm)]"/></div><p className="font-display text-[34px]">p53 mutante</p><p className="text-[24px] text-center text-[var(--slide-muted)]">Pierde control; algunas variantes favorecen al tumor</p></div>
    </div>
    <div className="grid grid-cols-3 gap-5 text-center text-[24px]"><div className={panel}>Invasión</div><div className={panel}>Supervivencia</div><div className={panel}>Resistencia</div></div>
  </div>;
}
function Elephants(){
  return <div className={frame+" grid grid-cols-[1fr_1.5fr] gap-7"}>
    <div className={panel+" flex flex-col items-center justify-around"}><span className="text-[115px]" role="img" aria-label="Ser humano">🧍</span><p className="font-display text-[36px]">Humano</p><div className="flex gap-4"><Shield size={64} className="text-[var(--slide-accent)]"/><Shield size={64} className="text-[var(--slide-accent)]"/></div><p className="text-[28px]">2 alelos TP53</p></div>
    <div className={panel+" flex flex-col items-center justify-between border-[var(--slide-accent)]"}><span className="text-[115px]" role="img" aria-label="Elefante africano">🐘</span><p className="font-display text-[36px]">Elefante africano</p><div className="grid grid-cols-10 gap-2">{Array.from({length:40},(_,i)=><Shield key={i} size={31} strokeWidth={1.7} className={i%4===0?"text-[var(--slide-warm)]":"text-[var(--slide-accent)]"}/>)}</div><p className="text-[28px]">≈40 alelos relacionados con TP53</p><p className="text-[18px] text-[var(--slide-muted)]">Incluye copias retrotranspuestas; los escudos son una analogía.</p></div>
  </div>;
}
function OtherSpecies(){
  return <div className={frame+" grid grid-cols-2 gap-6"}>
    <PhotoCard url="https://upload.wikimedia.org/wikipedia/commons/d/d3/Bowhead_Whale_NOAA.jpg" name="Ballena de Groenlandia" subtitle="Longevidad excepcional · más de 200 años" credit="Fotografía: Vicki Beaver / NOAA Fisheries (dominio público)"/>
    <PhotoCard url="https://upload.wikimedia.org/wikipedia/commons/7/7c/Naked_Mole_Rats.jpg" name="Rata topo desnuda" subtitle="Resistencia notable al cáncer" credit="Fotografía: Edward Russell (CC BY 2.0)"/>
  </div>;
}
function Pharma(){
  return <div className={frame+" grid grid-cols-2 gap-6"}>
    <div className={panel+" flex flex-col items-center justify-around text-center"}><p className="font-display text-[38px]">Bloquear una proteína</p><div className="relative flex h-[260px] w-[260px] items-center justify-center rounded-[36px] border-[7px] border-[var(--slide-accent)]"><Lock size={175} strokeWidth={1.3} className="text-[var(--slide-accent)]"/><Pill size={71} className="absolute right-1 top-1 rotate-45 text-[var(--slide-warm)]"/></div><p className="text-[27px] text-[var(--slide-accent)]">Inhibición · más accesible</p></div>
    <div className={panel+" flex flex-col items-center justify-around text-center border-[var(--slide-warm)]"}><p className="font-display text-[38px]">Reparar una proteína</p><svg viewBox="0 0 320 260" className="h-[260px] w-[320px]" role="img" aria-label="Escultura de cristal partida en fragmentos que se intenta reconstruir"><path d="M152 15L214 40 234 98 212 180 165 222 104 181 88 97Z" fill="#7ac4ce" opacity=".15" stroke="#89cacf" strokeWidth="6" strokeDasharray="13 10"/>{["M145 38L194 53 171 110 118 95Z","M192 69L212 118 173 147 172 115Z","M119 116L151 130 136 194 101 161Z","M155 150L204 151 177 208 141 195Z"].map((p,i)=><path key={i} d={p} fill="#81ccd6" fillOpacity=".62" stroke="#b7e3e8" strokeWidth="3" transform={"translate("+(i%2?14:-11)+" "+(i%2?8:-5)+")"}/>)}</svg><p className="text-[27px] text-[var(--slide-warm)]">Reactivación · gran desafío</p></div>
  </div>;
}
function Therapies(){
  const treatments=[
    {name:"APR-246",desc:"Explora reactivación de p53 mutante",icon:<Wrench size={108} className="text-[var(--slide-accent)]"/>,number:"01"},
    {name:"Nutlins",desc:"Bloqueo de MDM2 para liberar p53",icon:<ShieldCheck size={108} className="text-[var(--slide-accent)]"/>,number:"02"},
    {name:"Virus oncolíticos",desc:"Plataformas de infección tumoral selectiva",icon:<Syringe size={108} className="text-[var(--slide-accent)]"/>,number:"03"},
  ];
  return <div className={frame+" flex flex-col gap-6"}><p className="font-display text-[42px]">Tres estrategias experimentales</p><div className="grid flex-1 grid-cols-3 gap-5">{treatments.map(t=><div key={t.name} className={panel+" flex flex-col justify-between gap-4 text-center"}><p className="text-[27px] font-semibold text-[var(--slide-warm)]">{t.number}</p><div className="flex justify-center">{t.icon}</div><p className="font-display text-[33px]">{t.name}</p><p className="text-[23px] text-[var(--slide-muted)]">{t.desc}</p></div>)}</div><p className="text-[19px] text-[var(--slide-muted)]">Son líneas de investigación: eficacia y aprobación dependen de cada tratamiento, tumor y ensayo clínico.</p></div>;
}
function Lessons(){
  const data=[
    {name:"Cooperación celular",desc:"La vigilancia permite la vida multicelular.",icon:<Dna size={128}/>},
    {name:"Ciencia autocorrectiva",desc:"Las hipótesis cambian con la evidencia.",icon:<Microscope size={128}/>},
    {name:"Medicina de precisión",desc:"El perfil genético ayuda a decidir tratamientos.",icon:<UserRound size={128}/>},
  ];
  return <div className={frame+" grid grid-cols-3 gap-5"}>{data.map((x,i)=><div key={x.name} className={panel+" flex flex-col items-center justify-around text-center"}><p className="text-[23px] text-[var(--slide-warm)]">0{i+1}</p><div className="text-[var(--slide-accent)]">{x.icon}</div><p className="font-display text-[33px] leading-tight">{x.name}</p><p className="text-[25px] text-[var(--slide-muted)]">{x.desc}</p></div>)}</div>;
}
function Finale(){
  return <div className={frame+" relative overflow-hidden !p-0"}>
    <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/FluorescentCells.jpg" alt="Microfotografía de células endoteliales bovinas: núcleos azules, microtúbulos verdes y actina roja" className="h-full w-full object-cover"/>
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-12 pb-12 pt-36">
      <p className="font-display text-[51px] text-white">Gracias por su atención</p><p className="mt-3 text-[26px] text-white/85">Microfotografía: fuente pública, Wikimedia Commons / NIH.</p>
    </div>
  </div>;
}
export function PartTwoVisual({kind,step}: Props){
  switch(kind) {
    case "pedigree": return <Pedigree/>;
    case "signatures": return <Signatures/>;
    case "hpv": return <HPVE6 step={step}/>;
    case "mutant": return <MutantPolice/>;
    case "elephant": return <Elephants/>;
    case "species": return <OtherSpecies/>;
    case "pharma": return <Pharma/>;
    case "therapies": return <Therapies/>;
    case "lessons": return <Lessons/>;
    case "finale": return <Finale/>;
    default: return null;
  }
}
