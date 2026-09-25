import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import OthersLeadForm from "./others/OthersLeadForm";
import { HERO_IMG, SPREADS, PROCESS_STEPS, OCCASIONS, DISCRETION_CARDS, FAQ_ITEMS } from "./others/othersData";
import { reachGoal } from "@/utils/metrika";

export default function OthersView() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const scrollToForm = () => {
    reachGoal("others_scroll_to_form");
    document.getElementById("others-final-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center select-none">
            <img
              src="https://static.tildacdn.one/tild3937-3830-4361-a239-323264653433/_2023-11-07_12181908.png"
              alt="StoryBox"
              className="h-[48px] md:h-[56px] w-auto object-contain"
            />
          </Link>
          <button onClick={scrollToForm} className="btn-cta" style={{ padding: "10px 20px", fontSize: 14 }}>
            Обсудить книгу
          </button>
        </div>
      </header>

      {/* 1. ПЕРВЫЙ ЭКРАН */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: "#ED4463" }}>
              Книга в подарок
            </p>
            <h1 className="text-[30px] md:text-[46px] font-bold text-black leading-tight mb-5">
              Уникальный подарок близкому человеку — <em className="not-italic" style={{ color: "#00A4E3" }}>книга его собственной жизни</em>
            </h1>
            <p className="text-[15px] md:text-[17px] text-[#444] leading-relaxed mb-6 max-w-lg">
              Мама, жена, друг и коллега рассказывают о нём психологу — каждый в своём разговоре. Мы собираем их истории и фотографии в книгу, которая существует в единственном экземпляре. Такую нельзя купить в магазине — только создать вместе с теми, кто его любит.
            </p>
            <div className="hidden md:block">
              <div className="rounded-2xl overflow-hidden" style={{ maxHeight: 420 }}>
                <img src={HERO_IMG} alt="Мужчина получает книгу воспоминаний в подарок" className="w-full h-full object-cover" style={{ display: "block" }} />
              </div>
            </div>
          </div>

          <div className="md:hidden rounded-2xl overflow-hidden mb-2" style={{ maxHeight: "70vw" }}>
            <img src={HERO_IMG} alt="Мужчина получает книгу воспоминаний в подарок" className="w-full object-cover" style={{ display: "block", maxHeight: "70vw" }} />
          </div>

          <div id="others-final-form">
            <OthersLeadForm formId="others-hero-form" />
          </div>
        </div>
      </section>

      {/* 2. КАК ВЫГЛЯДИТ ВНУТРИ */}
      <section className="py-10 md:py-16 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-10">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2">Как выглядит внутри</h2>
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A]">Каждый разворот — голос одного из тех, кто его любит</p>
        </div>

        <div
          className="md:hidden flex gap-4 px-4 pb-2"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {SPREADS.map((s) => (
            <div key={s.caption} className="flex-shrink-0 rounded-xl overflow-hidden bg-white shadow-sm border border-[#EEEEEE]" style={{ width: "76vw", maxWidth: 300 }}>
              <div style={{ aspectRatio: "1/1", overflow: "hidden" }}>
                <img src={s.img} alt={s.caption} className="w-full h-full object-cover" />
              </div>
              <div className="px-4 py-4">
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: 24, fontWeight: 600, color: "#222", lineHeight: 1.3 }}>
                  {s.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:grid grid-cols-4 gap-5 max-w-7xl mx-auto px-6">
          {SPREADS.map((s) => (
            <div key={s.caption} className="rounded-xl overflow-hidden bg-white shadow-sm border border-[#EEEEEE]">
              <div style={{ aspectRatio: "1/1", overflow: "hidden" }}>
                <img src={s.img} alt={s.caption} className="w-full h-full object-cover" />
              </div>
              <div className="px-4 py-4">
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: 24, fontWeight: 600, color: "#222", lineHeight: 1.3 }}>
                  {s.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. КАК ПРОХОДИТ */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-10">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2">Как проходит</h2>
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A]">От первой встречи до вручения — 4 шага</p>
        </div>

        <div
          className="md:hidden flex gap-4 px-4 pb-2"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {PROCESS_STEPS.map((s) => (
            <div key={s.n} className="flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EEEEEE]" style={{ width: "76vw", maxWidth: 300 }}>
              <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#00A4E3" }}>Шаг {s.n}</p>
                <h3 className="text-[16px] font-bold text-black mb-2">{s.title}</h3>
                <p className="text-[13px] text-[#7A7A7A] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:grid max-w-7xl mx-auto px-6 grid-cols-4 gap-6">
          {PROCESS_STEPS.map((s) => (
            <div key={s.n} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EEEEEE]">
              <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#00A4E3" }}>Шаг {s.n}</p>
                <h3 className="text-[19px] font-bold text-black mb-3">{s.title}</h3>
                <p className="text-[14px] text-[#7A7A7A] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ПОВОДЫ */}
      <section className="py-10 md:py-14 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-[22px] md:text-[30px] font-bold text-black mb-6">Для какого повода</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {OCCASIONS.map((o) => (
              <span
                key={o}
                className="px-5 py-2.5 rounded-full text-[14px] font-semibold bg-white border"
                style={{ borderColor: "#00A4E3", color: "#00A4E3" }}
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ДЕЛИКАТНОСТЬ */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2 text-center">Деликатность прежде всего</h2>
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A] mb-8 md:mb-10 text-center">Сюрприз должен остаться сюрпризом</p>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {DISCRETION_CARDS.map((c) => (
              <div key={c.title} className="sb-card">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "#F2F9FF" }}>
                  <Icon name={c.icon} size={22} style={{ color: "#00A4E3" }} fallback="ShieldCheck" />
                </div>
                <h3 className="text-[16px] font-bold text-black mb-2">{c.title}</h3>
                <p className="text-[14px] text-[#7A7A7A] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ЦЕНА */}
      <section className="py-10 md:py-14 section-soft">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-[22px] md:text-[30px] font-bold text-black mb-4">Сколько это стоит</h2>
          <p className="text-[15px] md:text-[17px] text-[#444] leading-relaxed mb-7">
            Зависит от числа рассказчиков и объёма книги. Считаем на встрече. Назовите дату праздника — сразу скажем, успеваем ли.
          </p>
          <button onClick={scrollToForm} className="btn-cta">
            Узнать стоимость
          </button>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-6 md:mb-10 text-center">Частые вопросы</h2>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: "#fff",
                    border: isOpen ? "1.5px solid #00A4E3" : "1.5px solid #E8EEF3",
                  }}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 text-left"
                    style={{ padding: "16px 18px" }}
                  >
                    <span className="text-[14px] md:text-[15px] font-semibold" style={{ color: isOpen ? "#00A4E3" : "#1A1A1A" }}>
                      {item.q}
                    </span>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[17px] font-light transition-transform"
                      style={{
                        background: isOpen ? "#00A4E3" : "#F0F4F8",
                        color: isOpen ? "#fff" : "#7A7A7A",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 18px 18px" }}>
                      <p className="text-[14px] leading-relaxed" style={{ color: "#555" }}>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. ФИНАЛЬНАЯ ФОРМА */}
      <section id="others-final-form" className="py-10 md:py-16 section-soft">
        <div className="max-w-xl mx-auto px-4 md:px-6">
          <h2 className="text-[24px] md:text-[32px] font-bold text-black mb-2 text-center">Обсудим книгу</h2>
          <p className="text-[14px] md:text-[15px] text-[#7A7A7A] mb-6 text-center">
            Первая встреча — 30 минут, бесплатно
          </p>
          <OthersLeadForm formId="others-bottom-form" compact />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0F1419" }} className="pt-10 pb-6 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[18px] text-white">
            <span style={{ fontWeight: 400 }}>Story</span><span style={{ fontWeight: 700 }}>Box</span>
          </div>
          <div className="text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            © 2026 StoryBox. Все права защищены.
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Link to="/legal/privacy" className="hover:text-white/70 transition-colors">Конфиденциальность</Link>
            <span>·</span>
            <Link to="/legal/offer" className="hover:text-white/70 transition-colors">Оферта</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}