import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize, Minimize, MonitorPlay, Grid3x3 } from "lucide-react";
import { ScaledSlide } from "@/components/deck/ScaledSlide";
import { SlideView } from "@/components/deck/SlideView";
import { slides, TOTAL, acts, clampIndex, CHANNEL } from "@/lib/deck";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { slide?: number } => (Number(s["slide"]) > 0 ? { slide: Number(s["slide"]) } : {}),
  head: () => ({
    meta: [
      { title: "p53: El Guardián del Genoma — Presentación" },
      { name: "description", content: "Presentación interactiva de divulgación sobre p53, basada en el libro de Sue Armstrong." },
      { property: "og:title", content: "p53: El Guardián del Genoma — Presentación" },
      { property: "og:description", content: "26 diapositivas en 5 actos sobre el gen que descifró el código del cáncer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

function Deck() {
  const { slide = 1 } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const index = clampIndex(slide - 1);
  const [fs, setFs] = useState(false);
  const [grid, setGrid] = useState(false);
  const [idle, setIdle] = useState(false);
  const chan = useRef<BroadcastChannel | null>(null);

  const go = useCallback(
    (i: number, broadcast = true) => {
      const n = clampIndex(i);
      navigate({ search: { slide: n + 1 }, replace: true });
      if (broadcast) chan.current?.postMessage({ type: "goto", index: n });
    },
    [navigate],
  );

  useEffect(() => {
    const c = new BroadcastChannel(CHANNEL);
    chan.current = c;
    c.onmessage = (e) => {
      if (e.data?.type === "goto") go(e.data.index, false);
      if (e.data?.type === "hello") c.postMessage({ type: "goto", index: indexRef.current });
    };
    return () => c.close();
  }, [go]);
  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    document.title = `${index + 1}/${TOTAL} — ${slides[index]!.label}`;
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(index + 1); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(index - 1); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(TOTAL - 1);
      else if (e.key === "f" || e.key === "F5") { e.preventDefault(); toggleFs(); }
      else if (e.key === "g") setGrid((g) => !g);
      else if (e.key === "p") openPresenter();
      else if (e.key === "Escape") setGrid(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  useEffect(() => {
    const h = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const move = () => { setIdle(false); clearTimeout(t); t = setTimeout(() => setIdle(true), 2500); };
    move();
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); clearTimeout(t); };
  }, []);

  // touch swipe
  const touchX = useRef<number | null>(null);

  function toggleFs() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }
  function openPresenter() {
    window.open(`/presenter?slide=${indexRef.current + 1}`, "p53-presenter", "width=1400,height=850");
  }

  const s = slides[index]!;
  const hide = idle && fs;

  return (
    <div className={`flex h-screen flex-col bg-[var(--deck-stage)] ${hide ? "cursor-none" : ""}`}>
      <div
        className="relative min-h-0 flex-1"
        onClick={(e) => {
          const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          go(e.clientX - r.left < r.width / 3 ? index - 1 : index + 1);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0]!.clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0]!.clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
          touchX.current = null;
        }}
      >
        <ScaledSlide className="h-full w-full">
          <div key={index} className="deck-fade">
            <SlideView s={s} />
          </div>
        </ScaledSlide>
      </div>

      {/* Progress bar by act */}
      <div className={`transition-opacity ${hide ? "opacity-0" : "opacity-100"}`}>
        <div className="flex h-2 w-full gap-[2px]" role="navigation" aria-label="Progreso">
          {slides.map((sl, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              title={`${sl.n}. ${sl.label}`}
              aria-label={`Ir a diapositiva ${sl.n}`}
              className={`flex-1 transition-colors ${i <= index ? "bg-primary" : "bg-muted"} ${sl.act !== slides[i - 1]?.act && i ? "ml-1" : ""} hover:bg-accent`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{s.actName}</span>
          <span className="hidden truncate sm:inline">{s.label}</span>
          <div className="ml-auto flex items-center gap-1">
            <IconBtn label="Anterior (←)" onClick={() => go(index - 1)}><ChevronLeft size={18} /></IconBtn>
            <span className="w-16 text-center tabular-nums">{index + 1} / {TOTAL}</span>
            <IconBtn label="Siguiente (→)" onClick={() => go(index + 1)}><ChevronRight size={18} /></IconBtn>
            <IconBtn label="Vista general (G)" onClick={() => setGrid(true)}><Grid3x3 size={18} /></IconBtn>
            <IconBtn label="Vista del orador (P)" onClick={openPresenter}><MonitorPlay size={18} /></IconBtn>
            <IconBtn label="Pantalla completa (F)" onClick={toggleFs}>{fs ? <Minimize size={18} /> : <Maximize size={18} />}</IconBtn>
          </div>
        </div>
      </div>

      {grid && (
        <div className="fixed inset-0 z-50 overflow-auto bg-background/95 p-8 backdrop-blur" onClick={() => setGrid(false)}>
          {acts.map((a) => (
            <section key={a.act} className="mb-8">
              <h3 className="mb-3 font-display text-xl text-foreground">{a.name} · <span className="text-muted-foreground">{a.title}</span></h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {slides.slice(a.first, a.first + a.count).map((sl) => (
                  <button
                    key={sl.n}
                    onClick={(e) => { e.stopPropagation(); go(sl.n - 1); setGrid(false); }}
                    className={`overflow-hidden rounded-lg border-2 text-left ${sl.n - 1 === index ? "border-primary" : "border-border"}`}
                  >
                    <ScaledSlide className="aspect-video w-full"><SlideView s={sl} /></ScaledSlide>
                    <div className="truncate px-2 py-1 text-xs text-muted-foreground">{sl.n}. {sl.label}</div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button aria-label={label} title={label} onClick={onClick} className="rounded-md p-2 hover:bg-muted hover:text-foreground">
      {children}
    </button>
  );
}
