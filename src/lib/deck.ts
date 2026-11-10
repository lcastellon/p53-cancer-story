import raw from "@/data/slides.json";

export type Slide = {
  n: number;
  label: string;
  title: string;
  subtitle: string;
  points: string[];
  visual: string;
  notes: string[];
  act: number;
  actName: string;
  actTitle: string;
  minutes: number;
};

export const slides = raw as Slide[];
export const TOTAL = slides.length;

/** Minute mark (from start) at which each slide should begin. */
export const startMinute = slides.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + slides[i - 1].minutes);
  return acc;
}, []);

export const acts = Array.from(new Set(slides.map((s) => s.act))).map((a) => {
  const list = slides.filter((s) => s.act === a);
  return { act: a, name: list[0].actName, title: list[0].actTitle, first: list[0].n - 1, count: list.length };
});

export const clampIndex = (i: number) => Math.max(0, Math.min(TOTAL - 1, i));

export function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export const CHANNEL = "p53-deck";
