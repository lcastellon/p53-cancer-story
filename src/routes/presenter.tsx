import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { ScaledSlide } from "@/components/deck/ScaledSlide";
import { SlideView } from "@/components/deck/SlideView";
import { slides, TOTAL, clampIndex, CHANNEL, startMinute, fmtTime, stepsOf } from "@/lib/deck";

export const Route = createFileRoute("/presenter")({
  validateSearch: (s: Record<string, unknown>): { slide?: number } => (Number(s["slide"]) > 0 ? { slide: Number(s["slide"]) } : {}),
  head: () => ({
    meta: [
      { title: "Vista del orador — p53" },
      { name: "description", content: "Notas, tiempos y vista previa para el orador de la presentación sobre p53." },
      { property: "og:title", content: "Vista del orador — p53" },
      { property: "og:description", content: "Notas del orador y cronómetro de la presentación p53." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Presenter,
});

function Presenter() {
  const initial = (Route.useSearch().slide ?? 1) - 1;
  const [index, setIndex] = useState(clampIndex(initial));
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const [slideStart, setSlideStart] = useState(0);
  const chan = useRef<BroadcastChannel | null>(null);
  const elapsedRef = useRef(0);
  elapsedRef.current = elapsed;

  useEffect(() => {
    const c = new BroadcastChannel(CHANNEL);
    chan.current = c;
    c.onmessage = (e) => {
      if (e.data?.type === "goto") {
        setIndex((old) => { if (old !== e.data.index) setSlideStart(elapsedRef.current); return e.data.index; });
        setStep(e.data.step ?? 0);
      }
    };
    c.postMessage({ type: "hello" });
    return () => c.close();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const go = (i: number, st = 0) => {
    const n = clampIndex(i);
    if (n !== index) setSlideStart(elapsed);
    setIndex(n);
    setStep(st);
    chan.current?.postMessage({ type: "goto", index: n, step: st });
  };
  const nextStep = () => (step < stepsOf(index) - 1 ? go(index, step + 1) : go(index + 1));
  const prevStep = () => (step > 0 ? go(index, step - 1) : go(index - 1, stepsOf(index - 1) - 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); nextStep(); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); prevStep(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const s = slides[index]!;
  const next = slides[index + 1];
  const target = (startMinute[index] ?? 0) * 60;
  const diff = elapsed - target; // + = behind schedule
  const onSlide = elapsed - slideStart;
  const budget = s.minutes * 60;

  return (
    <div className="flex h-screen flex-col gap-4 bg-background p-4 text-foreground">
      <header className="flex flex-wrap items-center gap-6">
        <div className="font-display text-2xl">{s.n} / {TOTAL} · <span className="text-muted-foreground">{s.actName}</span></div>
        <Stat label="Tiempo total" value={fmtTime(elapsed)} />
        <Stat label="En esta diapositiva" value={`${fmtTime(onSlide)} / ${fmtTime(budget)}`} warn={onSlide > budget} />
        <Stat
          label="Ritmo"
          value={Math.abs(diff) < 30 ? "A tiempo" : diff > 0 ? `+${fmtTime(diff)} retrasado` : `−${fmtTime(-diff)} adelantado`}
          warn={diff > 60}
        />
        <div className="ml-auto flex gap-2">
          <Btn onClick={() => setRunning((r) => !r)} label={running ? "Pausar" : "Reanudar"}>{running ? <Pause size={18} /> : <Play size={18} />}</Btn>
          <Btn onClick={() => { setElapsed(0); setSlideStart(0); }} label="Reiniciar"><RotateCcw size={18} /></Btn>
          <Btn onClick={prevStep} label="Anterior"><ChevronLeft size={18} /></Btn>
          <Btn onClick={nextStep} label="Siguiente"><ChevronRight size={18} /></Btn>
        </div>
      </header>
      <div className="grid min-h-0 flex-1 grid-cols-[3fr_2fr] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <ScaledSlide className="aspect-video w-full rounded-lg border border-border"><SlideView s={s} step={step} /></ScaledSlide>
          <div className="min-h-0 flex-1 overflow-auto rounded-lg bg-card p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Elementos visuales sugeridos</div>
            <p className="mt-1 text-sm text-muted-foreground">{s.visual}</p>
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <div>
            <div className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">Siguiente</div>
            {next ? (
              <ScaledSlide className="aspect-video w-full rounded-lg border border-border opacity-80"><SlideView s={next} step={0} /></ScaledSlide>
            ) : <div className="rounded-lg border border-border p-6 text-muted-foreground">Fin — Preguntas (~10 min)</div>}
          </div>
          <div className="min-h-0 flex-1 overflow-auto rounded-lg bg-card p-5">
            <div className="mb-2 text-xs uppercase tracking-widest text-primary">Qué decir · {s.minutes} min{s.steps ? ` · paso ${step + 1} de ${s.steps}` : ""}</div>
            {s.notes.map((n, i) => <p key={i} className={`mb-3 text-lg leading-relaxed ${s.steps && i !== step ? "opacity-40" : ""}`}>{n}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-display text-xl tabular-nums ${warn ? "text-destructive" : ""}`}>{value}</div>
    </div>
  );
}
function Btn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return <button onClick={onClick} aria-label={label} title={label} className="rounded-md bg-secondary p-2 hover:bg-muted">{children}</button>;
}
