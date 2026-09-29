import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import OthersLeadForm from "./others/OthersLeadForm";
import {
  FATHER_DAY_DATE,
  HERO_IMG,
  GIFT_IMG,
  CERT_IMG,
  HERO_BULLETS,
  CERT_STEPS,
  SPREADS,
  WHY_CARDS,
  FAQ_ITEMS,
} from "./fatherday/fatherDayData";
import { reachGoal } from "@/utils/metrika";

const FORM_PROPS = {
  title: "Оформить сертификат",
  subtitle: "Свяжемся с вами, расскажем, как всё проходит, рассчитаем стоимость и пришлём сертификат с именем папы.",
  buttonText: "Оформить сертификат",
  tariff: "Сертификат на День отца",
  goal: "fatherday_lead_submit",
  successTitle: "Спасибо, заявка у нас",
  successText: "расскажем, как всё проходит, и пришлём сертификат к празднику.",
};

const SECTION_TITLE = "text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight";
const SECTION_TEXT = "text-[15px] md:text-[17px] text-[#666] leading-relaxed";
const CARD_SHADOW = { boxShadow: "0 8px 32px rgba(0,0,0,0.06)" };

function daysLeft() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((FATHER_DAY_DATE.getTime() - today.getTime()) / 86400000);
}

function pluralDays(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "день";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "дня";
  return "дней";
}

export default function FatherDayView() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [days, setDays] = useState(daysLeft());

  useEffect(() => {
    document.title = "Книга о папе в подарок на День отца — StoryBox";
    const t = setInterval(() => setDays(daysLeft()), 60 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => {
    reachGoal("fatherday_scroll_to_form");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const countdown =
    days > 0 ? `До Дня отца ${days} ${pluralDays(days)}` : days === 0 ? "День отца — сегодня" : "Подарок на любой праздник";

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center select-none">
            <img
              src="https://static.tildacdn.one/tild3937-3830-4361-a239-323264653433/_2023-11-07_12181908.png"
              alt="StoryBox"
              className="h-[48px] md:h-[56px] w-auto object-contain"
            />
          </Link>
          <button onClick={() => scrollTo("fd-hero-form")} className="btn-cta" style={{ padding: "10px 20px", fontSize: 14 }}>
            Оформить сертификат
          </button>
        </div>
      </header>

      {/* 1. ПЕРВЫЙ ЭКРАН */}
      <section className="py-8 md:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-stretch">
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-2 text-[14px] font-bold mb-4" style={{ color: "#ED4463" }}>
              <Icon name="CalendarHeart" size={18} fallback="Calendar" />
              18 октября — День отца{days > 0 ? ` · осталось ${days} ${pluralDays(days)}` : ""}
            </p>
            <h1
              className="text-[32px] md:text-[40px] lg:text-[52px] font-bold text-black leading-[1.1] tracking-tight mb-5"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Подарите папе <span style={{ color: "#00A4E3" }}>книгу о&nbsp;нём самом</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-[#555] leading-relaxed mb-6 max-w-[520px]">
              Сертификат на книгу, в которой родные и друзья расскажут, каким они видят папу: трогательные, смешные и неожиданные истории с фотографиями, в твёрдом переплёте.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-[14px] font-semibold text-[#222]">
              {HERO_BULLETS.map((b) => (
                <li key={b.text} className="flex items-center gap-2">
                  <Icon name={b.icon} size={18} style={{ color: "#00A4E3" }} />
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="md:hidden rounded-3xl overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
              <img src={HERO_IMG} alt="Папа открывает подарок на День отца" className="w-full h-full object-cover block" />
            </div>

            <OthersLeadForm formId="fd-hero-form" {...FORM_PROPS} />
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 rounded-[28px] overflow-hidden">
              <img src={HERO_IMG} alt="Папа открывает подарок на День отца" className="w-full h-full object-cover block" />
            </div>
            <div
              className="absolute left-6 right-6 bottom-6 lg:left-8 lg:right-auto lg:bottom-8 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 flex items-center gap-4 max-w-[380px]"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(237,68,99,0.1)", color: "#ED4463" }}>
                <Icon name="Mail" size={20} />
              </div>
              <p className="text-[14px] leading-snug text-[#222]">
                <b>Сертификат пришлём сразу.</b> Останется только вручить его в праздник.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. СЕРТИФИКАТ */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className={`${SECTION_TITLE} mb-4`}>Что вы подарите</h2>
            <p className={`${SECTION_TEXT} mb-6`}>
              Именной подарочный сертификат на книгу о папе. Его можно вручить в сам праздник, а историю мы соберём после — спокойно и без спешки.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                { icon: "BadgeCheck", text: "С именем папы — красиво оформлен и готов к вручению" },
                { icon: "Mail", text: "Пришлём в мессенджер или на почту — можно распечатать" },
                { icon: "Clock", text: "Не сгорит после праздника — книгу начнём, когда удобно вам" },
              ].map((b) => (
                <li key={b.text} className="flex items-start gap-3">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,164,227,0.1)", color: "#00A4E3" }}
                  >
                    <Icon name={b.icon} size={18} fallback="Check" />
                  </span>
                  <span className="text-[15px] md:text-[16px] text-[#222] leading-snug pt-1.5">{b.text}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => scrollTo("fd-bottom-form")} className="btn-cta w-full sm:w-auto">
              Оформить сертификат
            </button>
          </div>
          <div className="order-1 md:order-2 relative mb-10 md:mb-0">
            <div className="rounded-[28px] overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={GIFT_IMG} alt="Сертификат в подарок папе" className="w-full h-full object-cover block" />
            </div>
            <div
              className="absolute -bottom-8 left-3 w-[58%] md:-bottom-6 md:-left-8 md:w-[62%] bg-white rounded-xl md:rounded-2xl p-1.5 md:p-2"
              style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.16)", transform: "rotate(-3deg)" }}
            >
              <img src={CERT_IMG} alt="Пример подарочного сертификата StoryBox" className="w-full rounded-xl block" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. КАК ЭТО РАБОТАЕТ */}
      <section className="py-14 md:py-20 mt-6 md:mt-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`${SECTION_TITLE} mb-3`}>Как это работает</h2>
            <p className={`${SECTION_TEXT} max-w-[640px] mx-auto`}>
              От заявки до готовой книги — вам остаётся только вручить подарок.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CERT_STEPS.map((s) => (
              <div
                key={s.n}
                className="bg-white rounded-3xl p-6 md:p-7 flex flex-col border border-[#F0F0F0] transition-transform duration-300 md:hover:-translate-y-1"
                style={CARD_SHADOW}
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(0,164,227,0.1)", color: "#00A4E3" }}
                  >
                    <Icon name={s.icon} size={26} fallback="Circle" />
                  </div>
                  <span className="text-[40px] font-bold leading-none" style={{ color: "#EEF3F7" }}>{s.n}</span>
                </div>
                <h3 className="text-[18px] md:text-[19px] font-bold text-black leading-snug mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ЧТО БУДЕТ ВНУТРИ */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center">
          <h2 className={`${SECTION_TITLE} mb-3`}>Что будет внутри книги</h2>
          <p className={`${SECTION_TEXT} max-w-[640px] mx-auto`}>
            У каждого из близких своя глава: истории о папе и общие фотографии
          </p>
        </div>
        <div
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-6 pb-2 md:pb-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {SPREADS.map((s, i) => (
            <article
              key={s.role}
              className="group flex-shrink-0 w-[78vw] max-w-[320px] md:w-auto md:max-w-none snap-start bg-white rounded-3xl p-3 flex flex-col transition-transform duration-300 md:hover:-translate-y-1"
              style={CARD_SHADOW}
            >
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <img src={s.img} alt={`${s.role} — ${s.topic}`} className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[12px] font-bold text-[#222]">
                  Глава {i + 1}
                </span>
              </div>
              <div className="px-3 pt-5 pb-4 flex-1">
                <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: "#ED4463" }}>{s.role}</p>
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: 24, fontWeight: 600, color: "#222", lineHeight: 1.25 }}>{s.topic}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. ПОЧЕМУ ЭТО ЛУЧШИЙ ПОДАРОК */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={SECTION_TITLE}>Почему папе понравится</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {WHY_CARDS.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-3xl p-6 md:p-8 flex flex-col border border-[#F0F0F0] transition-transform duration-300 md:hover:-translate-y-1"
                style={CARD_SHADOW}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(237,68,99,0.08)", color: "#ED4463" }}
                >
                  <Icon name={c.icon} size={26} fallback="Heart" />
                </div>
                <h3 className="text-[18px] md:text-[19px] font-bold text-black leading-snug mb-2">{c.title}</h3>
                <p className="text-[14px] md:text-[15px] text-[#666] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ЦЕНА */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div
            className="bg-white rounded-3xl border border-[#F0F0F0] p-6 md:p-10 lg:p-12 grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-center"
            style={CARD_SHADOW}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-6 text-center md:text-left">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,164,227,0.1)", color: "#00A4E3" }}
              >
                <Icon name="Calculator" size={28} />
              </div>
              <div>
                <h2 className="text-[28px] md:text-[36px] font-bold text-black leading-[1.15] tracking-tight mb-3">Сколько стоит сертификат</h2>
                <p className={`${SECTION_TEXT} max-w-[520px]`}>
                  Цена зависит от того, сколько близких примут участие, и от объёма книги. Рассчитаем при первом разговоре и сразу пришлём сертификат.
                </p>
              </div>
            </div>
            <button onClick={() => scrollTo("fd-bottom-form")} className="btn-cta w-full md:w-auto whitespace-nowrap justify-self-center">
              Узнать стоимость
            </button>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={SECTION_TITLE}>Вопросы и ответы</h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
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
                      <p className="px-5 md:px-7 pb-6 -mt-1 pr-16 md:pr-20 text-[14px] md:text-[15px] leading-relaxed text-[#555]">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. ФИНАЛЬНАЯ ФОРМА */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-10">
            <p className="inline-flex items-center gap-2 text-[14px] font-bold mb-3" style={{ color: "#ED4463" }}>
              <Icon name="Clock" size={16} />
              {countdown}
            </p>
            <h2 className={`${SECTION_TITLE} mb-3`}>Оформите сертификат заранее</h2>
            <p className={SECTION_TEXT}>
              Свяжемся с вами, рассчитаем стоимость и пришлём сертификат с именем папы — к празднику всё будет готово.
            </p>
          </div>
          <OthersLeadForm formId="fd-bottom-form" compact {...FORM_PROPS} />
        </div>
      </section>

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