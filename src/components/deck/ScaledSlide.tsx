import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScaledSlide({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: 1920, height: 1080, marginLeft: -960, marginTop: -540, transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
