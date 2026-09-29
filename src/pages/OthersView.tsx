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
      <section className="py-8 md:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-stretch">
          <div className="flex flex-col justify-center">
            <span
              className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-5"
              style={{ color: "#ED4463", background: "rgba(237,68,99,0.08)" }}
            >
              <Icon name="Gift" size={14} />
              Книга в подарок
            </span>
            <h1
              className="text-[32px] md:text-[40px] lg:text-[52px] font-bold text-black leading-[1.1] tracking-tight mb-5"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Соберите истории близких <span style={{ color: "#00A4E3" }}>в книгу о&nbsp;дорогом человеке</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-[#555] leading-relaxed mb-6 max-w-[520px]">
              Поговорим с друзьями и родными героя, соберём трогательные, смешные и неожиданные истории, добавим фотографии — и превратим всё это в настоящую книгу в твёрдом переплёте.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-[14px] font-semibold text-[#222]">
              {[
                { icon: "Users", text: "3–5 голосов близких" },
                { icon: "Image", text: "Ваши фотографии" },
                { icon: "BookOpen", text: "Твёрдый переплёт" },
              ].map((b) => (
                <li key={b.text} className="flex items-center gap-2">
                  <Icon name={b.icon} size={18} style={{ color: "#00A4E3" }} />
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="md:hidden rounded-3xl overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
              <img src={HERO_IMG} alt="Близкий человек открывает подарок" className="w-full h-full object-cover block" />
            </div>

            <div id="others-final-form">
              <OthersLeadForm formId="others-hero-form" />
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 rounded-[28px] overflow-hidden">
              <img src={HERO_IMG} alt="Близкий человек открывает подарок" className="w-full h-full object-cover block" />
            </div>
            <div
              className="absolute left-6 right-6 bottom-6 lg:left-8 lg:right-auto lg:bottom-8 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 flex items-center gap-4 max-w-[360px]"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,164,227,0.1)", color: "#00A4E3" }}>
                <Icon name="Heart" size={20} />
              </div>
              <p className="text-[14px] leading-snug text-[#222]">
                <b>Подарок, который перечитывают.</b> Каждая глава — голос одного из близких.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. КАК ВЫГЛЯДИТ ВНУТРИ */}
      <section className="py-10 md:py-16 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-10">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2">Как выглядит внутри</h2>
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A]">У вас и у каждого из близких своя глава: ваши истории и общие фотографии</p>
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
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2">Как всё проходит</h2>
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A]">Вы предупреждаете близких героя о нашем звонке, а дальше мы всё берём на себя: проводим интервью, запрашиваем фото, превращаем рассказы в текст и печатаем книгу.</p>
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
          <h2 className="text-[22px] md:text-[30px] font-bold text-black mb-6">Когда подарить</h2>
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
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2 text-center">Полная конфиденциальность</h2>
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A] mb-8 md:mb-10 text-center">Всё, что расскажут ваши близкие, останется только между нами и внутри книги.</p>

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
            Цена зависит от того, сколько близких примут участие, и от объёма книги. Рассчитаем при первом разговоре — и сразу скажем, успеем ли к празднику.
          </p>
          <button onClick={scrollToForm} className="btn-cta">
            Узнать стоимость
          </button>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-6 md:mb-10 text-center">Вопросы и ответы</h2>

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
          <h2 className="text-[24px] md:text-[32px] font-bold text-black mb-2 text-center">Обсудим создание книги</h2>
          <p className="text-[14px] md:text-[15px] text-[#7A7A7A] mb-6 text-center">
            Напишем или позвоним вам, расскажем, как всё проходит, уточним детали и рассчитаем стоимость.
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