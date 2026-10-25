import { useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Item {
  img: string;
  role: string;
  topic: string;
}

interface Props {
  items: Item[];
  index: number | null;
  onChange: (i: number | null) => void;
}

export default function SpreadLightbox({ items, index, onChange }: Props) {
  const open = index !== null;
  const total = items.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange(((index as number) + 1) % total);
      if (e.key === "ArrowLeft") onChange(((index as number) - 1 + total) % total);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, total, onChange]);

  if (!open) return null;
  const item = items[index as number];
  const go = (d: number) => onChange(((index as number) + d + total) % total);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(10,14,18,0.92)" }}
      onClick={() => onChange(null)}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={() => onChange(null)}
        aria-label="Закрыть"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-colors"
      >
        <Icon name="X" size={22} />
      </button>

      <div className="relative w-full max-w-5xl flex-1 min-h-0 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img src={item.img} alt={`${item.role} — ${item.topic}`} className="max-w-full max-h-full object-contain rounded-2xl select-none" />
        {total > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Предыдущая глава"
              className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white bg-black/40 md:bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Следующая глава"
              className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white bg-black/40 md:bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </>
        )}
      </div>

      <div className="mt-4 md:mt-6 text-center text-white max-w-xl" onClick={(e) => e.stopPropagation()}>
        <p className="text-[12px] font-bold uppercase tracking-widest mb-1" style={{ color: "#ED4463" }}>
          Глава {(index as number) + 1} · {item.role}
        </p>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 26, fontWeight: 600, lineHeight: 1.2 }}>{item.topic}</p>
        <p className="text-[13px] mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          {(index as number) + 1} / {total} · пример разворота
        </p>
      </div>
    </div>
  );
}
