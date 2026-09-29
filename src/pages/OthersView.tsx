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
                { icon: "Users", text: "Уникальный и неповторимый подарок" },
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
                <b>Подарок, который перечитывают.</b> Каждая глава — история одного из близких героя.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. КАК ВЫГЛЯДИТ ВНУТРИ */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-4"
            style={{ color: "#00A4E3", background: "rgba(0,164,227,0.1)" }}
          >
            <Icon name="BookOpen" size={14} />
            Внутри книги
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight mb-3">Как выглядит внутри</h2>
          <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed max-w-[640px] mx-auto">
            У вас и у каждого из близких своя глава: ваши истории и общие фотографии
          </p>
        </div>

        <div
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-6 pb-2 md:pb-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {SPREADS.map((s, i) => {
            const [role, topic] = s.caption.split(" — ");
            return (
              <article
                key={s.caption}
                className="group flex-shrink-0 w-[78vw] max-w-[320px] md:w-auto md:max-w-none snap-start bg-white rounded-3xl p-3 flex flex-col transition-transform duration-300 md:hover:-translate-y-1"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}
              >
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img
                    src={s.img}
                    alt={s.caption}
                    className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[12px] font-bold text-[#222]">
                    Глава {i + 1}
                  </span>
                </div>
                <div className="px-3 pt-5 pb-4 flex-1 flex flex-col">
                  <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: "#ED4463" }}>
                    {role}
                  </p>
                  <p style={{ fontFamily: "'Caveat', cursive", fontSize: 24, fontWeight: 600, color: "#222", lineHeight: 1.25 }}>
                    {topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : s.caption}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. КАК ПРОХОДИТ */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-4"
            style={{ color: "#00A4E3", background: "rgba(0,164,227,0.1)" }}
          >
            <Icon name="Route" size={14} />
            4 простых шага
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight mb-3">Как всё проходит</h2>
          <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed max-w-[680px] mx-auto">
            Вы предупреждаете близких героя о нашем звонке, а дальше мы всё берём на себя: проводим интервью, запрашиваем фото, превращаем рассказы в текст и печатаем книгу.
          </p>
        </div>

        <div
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-6 pb-2 md:pb-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {PROCESS_STEPS.map((s) => (
            <article
              key={s.n}
              className="group flex-shrink-0 w-[78vw] max-w-[320px] md:w-auto md:max-w-none snap-start bg-white rounded-3xl p-3 flex flex-col border border-[#F0F0F0] transition-transform duration-300 md:hover:-translate-y-1"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}
            >
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                />
                <span
                  className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-bold text-white"
                  style={{ background: "#00A4E3", boxShadow: "0 4px 12px rgba(0,164,227,0.35)" }}
                >
                  {s.n}
                </span>
              </div>
              <div className="px-3 pt-5 pb-4 flex-1 flex flex-col">
                <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: "#ED4463" }}>
                  Шаг {s.n}
                </p>
                <h3 className="text-[18px] md:text-[19px] font-bold text-black leading-snug mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. ПОВОДЫ */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-4"
              style={{ color: "#ED4463", background: "rgba(237,68,99,0.08)" }}
            >
              <Icon name="CalendarHeart" size={14} fallback="Calendar" />
              Поводы
            </span>
            <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight">Когда подарить</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
            {OCCASIONS.map((o, i) => (
              <div
                key={o.title}
                className={`bg-white rounded-3xl px-4 py-6 md:py-8 flex flex-col items-center text-center gap-4 border border-[#F0F0F0] transition-transform duration-300 md:hover:-translate-y-1 ${
                  i === OCCASIONS.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,164,227,0.1)", color: "#00A4E3" }}
                >
                  <Icon name={o.icon} size={28} fallback="Gift" />
                </div>
                <p className="text-[15px] md:text-[16px] font-bold text-black leading-snug">{o.title}</p>
              </div>
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