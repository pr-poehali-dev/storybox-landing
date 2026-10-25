import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/utils/metrika";

export type NavItem = { id: string; label: string; badge?: string };

const DEFAULT_NAV: NavItem[] = [
  { id: "md-formats", label: "Форматы" },
  { id: "md-book", label: "Книга" },
  { id: "md-film", label: "Фильм" },
  { id: "md-combo", label: "Книга + фильм", badge: "−25%" },
  { id: "md-steps", label: "Как это работает" },
  { id: "md-faq", label: "Вопросы" },
];

interface Props {
  ctaText: string;
  onCta: () => void;
  nav?: NavItem[];
  goal?: string;
}

export default function MotherDayHeader({ ctaText, onCta, nav = DEFAULT_NAV, goal = "motherday_nav_click" }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [nav]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    reachGoal(goal);
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center select-none flex-shrink-0">
          <img
            src="https://static.tildacdn.one/tild3937-3830-4361-a239-323264653433/_2023-11-07_12181908.png"
            alt="StoryBox"
            className="h-[44px] md:h-[52px] w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {nav.map((n) => {
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="relative px-2.5 xl:px-3 py-2 rounded-full text-[14px] font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5"
                style={{
                  color: isActive ? "#00A4E3" : "#333",
                  background: isActive ? "rgba(0,164,227,0.08)" : "transparent",
                }}
              >
                {n.label}
                {n.badge && (
                  <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "#ED4463" }}>
                    {n.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={onCta} className="btn-cta hidden sm:inline-flex" style={{ padding: "10px 20px", fontSize: 14 }}>
            {ctaText}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,164,227,0.1)", color: "#00A4E3" }}
          >
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white overflow-y-auto border-t border-[#F0F0F0]">
          <nav className="px-4 py-4 flex flex-col">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="flex items-center justify-between py-4 border-b border-[#F0F0F0] text-left text-[17px] font-semibold"
                style={{ color: active === n.id ? "#00A4E3" : "#1A1A1A" }}
              >
                <span className="flex items-center gap-2">
                  {n.label}
                  {n.badge && (
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#ED4463" }}>
                      {n.badge}
                    </span>
                  )}
                </span>
                <Icon name="ChevronRight" size={20} style={{ color: "#BBB" }} />
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onCta();
              }}
              className="btn-cta w-full mt-6"
            >
              {ctaText}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
