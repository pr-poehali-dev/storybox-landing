import { useState } from "react";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/utils/metrika";

export const SECTION_TITLE = "text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight";
export const SECTION_TEXT = "text-[15px] md:text-[17px] text-[#666] leading-relaxed";
export const CARD_SHADOW = { boxShadow: "0 8px 32px rgba(0,0,0,0.06)" };

export function VideoCard({ id, title, cover, goal = "motherday_video_play" }: { id: string; title: string; cover: string; goal?: string }) {
  const [play, setPlay] = useState(false);
  return (
    <article className="bg-white rounded-3xl p-3 flex flex-col border border-[#F0F0F0]" style={CARD_SHADOW}>
      <div className="relative rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => {
              reachGoal(goal);
              setPlay(true);
            }}
            className="group absolute inset-0 w-full h-full"
            aria-label={`Смотреть: ${title}`}
          >
            <img src={cover} alt={title} loading="lazy" className="w-full h-full object-cover object-top" />
            <span className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110"
              style={{ background: "#ED4463", boxShadow: "0 8px 24px rgba(237,68,99,0.45)" }}
            >
              <Icon name="Play" size={26} className="ml-1" />
            </span>
          </button>
        )}
      </div>
      <p className="px-3 pt-4 pb-3 text-[15px] font-bold text-[#222] leading-snug">{title}</p>
    </article>
  );
}

export function BenefitGrid({ items, color }: { items: { icon: string; title: string; desc: string }[]; color: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
      {items.map((b) => (
        <div key={b.title} className="flex items-start gap-4">
          <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}1A`, color }}>
            <Icon name={b.icon} size={20} fallback="Check" />
          </span>
          <div>
            <h3 className="text-[16px] md:text-[17px] font-bold text-black leading-snug mb-1">{b.title}</h3>
            <p className="text-[14px] text-[#666] leading-relaxed">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="space-y-3 md:space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={item.q}
            className="bg-white rounded-2xl border transition-all duration-300"
            style={{
              borderColor: isOpen ? "rgba(0,164,227,0.4)" : "#F0F0F0",
              boxShadow: isOpen ? "0 12px 36px rgba(0,164,227,0.10)" : "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-7 py-5"
            >
              <span className="text-[15px] md:text-[17px] font-bold leading-snug transition-colors duration-300" style={{ color: isOpen ? "#00A4E3" : "#1A1A1A" }}>
                {item.q}
              </span>
              <span
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: isOpen ? "#00A4E3" : "rgba(0,164,227,0.1)",
                  color: isOpen ? "#fff" : "#00A4E3",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <Icon name="Plus" size={18} />
              </span>
            </button>
            <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="px-5 md:px-7 pb-6 -mt-1 md:pr-20 text-[14px] md:text-[15px] leading-relaxed text-[#555]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MotherFooter() {
  return (
    <footer style={{ background: "#0F1419" }} className="pt-10 pb-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[18px] text-white">
          <span style={{ fontWeight: 400 }}>Story</span>
          <span style={{ fontWeight: 700 }}>Box</span>
        </div>
        <div className="text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
          © 2026 StoryBox. Все права защищены.
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span>Конфиденциальность</span>
          <span>·</span>
          <span>Оферта</span>
        </div>
      </div>
    </footer>
  );
}
