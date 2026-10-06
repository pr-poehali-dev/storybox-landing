import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/utils/metrika";
import { PROMO_NAV } from "./promoData";

const LOGO = "https://static.tildacdn.one/tild3937-3830-4361-a239-323264653433/_2023-11-07_12181908.png";

export default function PromoHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = solid || open;

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: light ? "rgba(253,249,243,0.94)" : "transparent",
        backdropFilter: light ? "blur(12px)" : "none",
        boxShadow: solid ? "0 1px 0 rgba(90,60,30,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="flex items-center select-none">
          {light ? (
            <img src={LOGO} alt="StoryBox" className="h-10 md:h-12 w-auto object-contain" />
          ) : (
            <span className="text-white text-[24px] md:text-[28px] leading-none">
              <span className="font-normal">Story</span><span className="font-bold">Box</span>
            </span>
          )}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {PROMO_NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-semibold transition-colors"
              style={{ color: light ? "#3B2E24" : "rgba(255,255,255,0.9)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#lead"
            onClick={() => reachGoal("cta_click", { place: "promo_header" })}
            className="hidden md:inline-flex btn-cta"
            style={{ padding: "11px 22px", fontSize: 14 }}
          >
            Оставить заявку
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ color: light ? "#3B2E24" : "#fff" }}
            aria-label="Меню"
          >
            <Icon name={open ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden px-5 pb-5 flex flex-col gap-1" style={{ background: "rgba(253,249,243,0.98)" }}>
          {PROMO_NAV.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-[17px] font-semibold border-b" style={{ color: "#3B2E24", borderColor: "#EFE5D8" }}>
              {l.label}
            </a>
          ))}
          <a href="#lead" onClick={() => setOpen(false)} className="btn-cta text-center mt-4">
            Оставить заявку
          </a>
        </nav>
      )}
    </header>
  );
}
