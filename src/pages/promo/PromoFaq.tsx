import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FAQ_ITEMS } from "@/pages/data";
import Reveal from "./Reveal";

const BROWN = "#3B2E24";
const MUTED = "#7A6A5C";
const GOLD = "#B07D48";

export default function PromoFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32" style={{ background: "#F5ECE0" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-20 items-start">
        <Reveal className="md:sticky md:top-28">
          <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: GOLD }}>
            Вопросы и ответы
          </p>
          <h2 className="promo-serif font-semibold leading-tight mb-5" style={{ color: BROWN, fontSize: "clamp(30px, 4.2vw, 54px)" }}>
            Всё, что <span className="italic font-medium" style={{ color: GOLD }}>важно знать</span>
          </h2>
          <p className="text-[16px] md:text-[17px] leading-relaxed" style={{ color: MUTED }}>
            Не нашли свой вопрос? Напишите нам в{" "}
            <a href="https://t.me/StoryBox_support" target="_blank" rel="noopener noreferrer" className="underline font-semibold" style={{ color: BROWN }}>
              Telegram
            </a>{" "}
            или позвоните:{" "}
            <a href="tel:+79031932725" className="underline font-semibold whitespace-nowrap" style={{ color: BROWN }}>
              +7 903 193 27 25
            </a>
          </p>
        </Reveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i, 5) * 60}>
                <div
                  className="rounded-2xl transition-colors"
                  style={{ background: isOpen ? "#FFFDF9" : "rgba(255,253,249,0.55)", boxShadow: isOpen ? "0 16px 40px -24px rgba(90,60,30,0.4)" : "none" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-7 py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[16px] md:text-[18px] font-semibold leading-snug" style={{ color: BROWN }}>{f.q}</span>
                    <span
                      className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-transform duration-300"
                      style={{ background: isOpen ? GOLD : "#EADBC8", color: isOpen ? "#fff" : BROWN, transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      <Icon name="Plus" size={16} />
                    </span>
                  </button>
                  <div className="grid transition-all duration-500" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-5 md:px-7 pb-6 text-[15px] md:text-[16px] leading-relaxed" style={{ color: MUTED }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
