import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import OthersLeadForm from "./others/OthersLeadForm";
import MotherDayHeader from "./motherday/MotherDayHeader";
import { SECTION_TITLE, SECTION_TEXT, CARD_SHADOW, VideoCard, BenefitGrid, FaqList, MotherFooter } from "./motherday/MotherDayParts";
import {
  MOTHER_DAY_DATE,
  HERO_IMG,
  GIFT_IMG,
  CERT_IMG,
  BOOK_MACRO_IMG,
  STUDIO_IMG,
  NAV,
  HERO_BULLETS,
  CERT_BULLETS,
  FORMATS,
  BOOK_BENEFITS,
  FILM_BENEFITS,
  VIDEOS,
  CERT_STEPS,
  SPREADS,
  WHY_CARDS,
  FAQ_ITEMS,
} from "./motherstory/motherStoryData";
import { reachGoal } from "@/utils/metrika";

const CTA = "Оформить сертификат";

const FORM_PROPS = {
  title: CTA,
  subtitle: "Свяжемся с вами, поможем выбрать книгу или видеоинтервью, рассчитаем стоимость и пришлём сертификат с именем мамы.",
  buttonText: CTA,
  tariff: "Сертификат: мама рассказывает о себе (книга или интервью)",
  goal: "motherstory_lead_submit",
  successTitle: "Спасибо, заявка у нас",
  successText: "поможем выбрать формат и пришлём сертификат к празднику.",
};

function daysLeft() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((MOTHER_DAY_DATE.getTime() - today.getTime()) / 86400000);
}

function pluralDays(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "день";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "дня";
  return "дней";
}

export default function MotherStoryView() {
  const [days, setDays] = useState(daysLeft());

  useEffect(() => {
    const t = setInterval(() => setDays(daysLeft()), 60 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string, goal = "motherstory_scroll_to_form") => {
    reachGoal(goal);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: id.endsWith("form") ? "center" : "start" });
  };

  const countdown =
    days > 0 ? `До Дня матери ${days} ${pluralDays(days)}` : days === 0 ? "День матери — сегодня" : "Подарок на любой праздник";

  const CtaButton = ({ className = "" }: { className?: string }) => (
    <button onClick={() => scrollTo("ms-bottom-form")} className={`btn-cta ${className}`}>
      {CTA}
    </button>
  );

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <MotherDayHeader ctaText={CTA} onCta={() => scrollTo("ms-bottom-form")} nav={NAV} goal="motherstory_nav_click" />

      {/* 1. ПЕРВЫЙ ЭКРАН */}
      <section className="py-8 md:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-stretch">
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-2 text-[14px] font-bold mb-4" style={{ color: "#ED4463" }}>
              <Icon name="CalendarHeart" size={18} fallback="Calendar" />
              29 ноября — День матери{days > 0 ? ` · осталось ${days} ${pluralDays(days)}` : ""}
            </p>
            <h1
              className="text-[32px] md:text-[40px] lg:text-[52px] font-bold text-black leading-[1.1] tracking-tight mb-5"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Подарите маме <span style={{ color: "#00A4E3" }}>историю её жизни</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-[#555] leading-relaxed mb-6 max-w-[520px]">
              Мама сама расскажет о детстве, молодости, любви и том, что она поняла за эти годы. Мы запишем её рассказ и превратим его в книгу в твёрдом переплёте или в видеоинтервью — для детей, родных и будущих внуков.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-[14px] font-semibold text-[#222]">
              {HERO_BULLETS.map((b) => (
                <li key={b.text} className="flex items-center gap-2">
                  <Icon name={b.icon} size={18} style={{ color: "#00A4E3" }} fallback="Check" />
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="md:hidden rounded-3xl overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
              <img src={HERO_IMG} alt="Мама рассказывает историю своей жизни" className="w-full h-full object-cover block" />
            </div>

            <OthersLeadForm formId="ms-hero-form" {...FORM_PROPS} />
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 rounded-[28px] overflow-hidden">
              <img src={HERO_IMG} alt="Мама рассказывает историю своей жизни" className="w-full h-full object-cover block" />
            </div>
            <div
              className="absolute left-6 right-6 bottom-6 lg:left-8 lg:right-auto lg:bottom-8 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 flex items-center gap-4 max-w-[380px]"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(237,68,99,0.1)", color: "#ED4463" }}>
                <Icon name="Mic" size={20} />
              </div>
              <p className="text-[14px] leading-snug text-[#222]">
                <b>Её история — её словами.</b> Книга или фильм, которые увидят внуки.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ПОДАРОЧНЫЙ СЕРТИФИКАТ */}
      <section id="ms-cert" className="scroll-mt-20 py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: "#ED4463" }}>Подарочный сертификат</p>
            <h2 className={`${SECTION_TITLE} mb-4`}>Что вы подарите</h2>
            <p className={`${SECTION_TEXT} mb-6`}>
              Именной сертификат на книгу воспоминаний или видеоинтервью. Вы вручаете его в праздник, а мама рассказывает свою историю позже — спокойно, без спешки и в удобное для неё время.
            </p>
            <ul className="space-y-4 mb-8">
              {CERT_BULLETS.map((b) => (
                <li key={b.text} className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,164,227,0.1)", color: "#00A4E3" }}>
                    <Icon name={b.icon} size={18} fallback="Check" />
                  </span>
                  <span className="text-[15px] md:text-[16px] text-[#222] leading-snug pt-1.5">{b.text}</span>
                </li>
              ))}
            </ul>
            <CtaButton className="w-full sm:w-auto" />
          </div>
          <div className="order-1 md:order-2 relative mb-10 md:mb-0">
            <div className="rounded-[28px] overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={GIFT_IMG} alt="Сертификат в подарок маме" loading="lazy" className="w-full h-full object-cover block" />
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

      {/* 3. ДВА ФОРМАТА */}
      <section className="py-14 md:py-20 mt-6 md:mt-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`${SECTION_TITLE} mb-3`}>Два формата на выбор</h2>
            <p className={`${SECTION_TEXT} max-w-[640px] mx-auto`}>
              В основе обоих — разговор с мамой о её жизни. Можно выбрать один или оба — со скидкой 25%.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {FORMATS.map((f) => (
              <article key={f.id} className="bg-white rounded-3xl p-3 flex flex-col border border-[#F0F0F0]" style={CARD_SHADOW}>
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <img src={f.img} alt={f.title} loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[12px] font-bold text-[#222]">{f.label}</span>
                </div>
                <div className="px-3 pt-5 pb-4 flex-1 flex flex-col">
                  <h3 className="flex items-center gap-2 text-[22px] md:text-[26px] font-bold text-black leading-snug mb-2">
                    <Icon name={f.icon} size={24} style={{ color: "#00A4E3" }} fallback="Star" />
                    {f.title}
                  </h3>
                  <p className="text-[15px] text-[#666] leading-relaxed mb-5 flex-1">{f.desc}</p>
                  <button
                    onClick={() => scrollTo(f.id, `motherstory_format_${f.id}`)}
                    className="self-start text-[15px] font-bold inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                    style={{ color: "#00A4E3" }}
                  >
                    Подробнее <Icon name="ArrowDown" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. КНИГА */}
      <section id="ms-book" className="py-14 md:py-20 scroll-mt-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="rounded-[28px] overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={BOOK_MACRO_IMG} alt="Книга воспоминаний мамы в твёрдом переплёте" loading="lazy" className="w-full h-full object-cover block" />
            </div>
            <div
              className="absolute left-4 bottom-4 md:left-6 md:bottom-6 bg-white/95 backdrop-blur rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
            >
              <Icon name="ZoomIn" size={20} style={{ color: "#00A4E3" }} />
              <span className="text-[13px] md:text-[14px] font-semibold text-[#222]">Твёрдый переплёт · плотная бумага</span>
            </div>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: "#ED4463" }}>Формат 1</p>
            <h2 className={`${SECTION_TITLE} mb-4`}>Книга воспоминаний</h2>
            <p className={`${SECTION_TEXT} mb-8`}>
              Настоящая книга, которую хочется держать в руках: история мамы её собственными словами.
            </p>
            <BenefitGrid items={BOOK_BENEFITS} color="#00A4E3" />
            <CtaButton className="w-full sm:w-auto mt-8" />
          </div>
        </div>
      </section>

      {/* 5. ЧТО БУДЕТ ВНУТРИ */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center">
          <h2 className={`${SECTION_TITLE} mb-3`}>Что будет внутри книги</h2>
          <p className={`${SECTION_TEXT} max-w-[640px] mx-auto`}>Главы о разных периодах жизни мамы — с её рассказами и семейными фотографиями</p>
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
                <img src={s.img} alt={`${s.role} — ${s.topic}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[12px] font-bold text-[#222]">Глава {i + 1}</span>
              </div>
              <div className="px-3 pt-5 pb-4 flex-1">
                <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: "#ED4463" }}>{s.role}</p>
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: 24, fontWeight: 600, color: "#222", lineHeight: 1.25 }}>{s.topic}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. ВИДЕОИНТЕРВЬЮ */}
      <section id="ms-film" className="py-14 md:py-20 scroll-mt-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16">
            <div className="order-2 md:order-1">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: "#ED4463" }}>Формат 2</p>
              <h2 className={`${SECTION_TITLE} mb-4`}>Видеоинтервью с мамой</h2>
              <p className={`${SECTION_TEXT} mb-8`}>
                Мама рассказывает о своей жизни на камеру — очно в студии или онлайн. Мы монтируем разговор в фильм, который семья будет пересматривать годами.
              </p>
              <BenefitGrid items={FILM_BENEFITS} color="#ED4463" />
              <CtaButton className="w-full sm:w-auto mt-8" />
            </div>
            <div className="order-1 md:order-2 rounded-[28px] overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img src={STUDIO_IMG} alt="Запись видеоинтервью с мамой в студии StoryBox" loading="lazy" className="w-full h-full object-cover block" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-[22px] md:text-[28px] font-bold text-black leading-snug mb-2">Посмотрите, как проходят наши интервью</h3>
            <p className={SECTION_TEXT}>Несколько фрагментов из реальных записей StoryBox</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {VIDEOS.map((v) => (
              <VideoCard key={v.id} id={v.id} title={v.title} cover={v.cover} goal="motherstory_video_play" />
            ))}
          </div>
        </div>
      </section>

      {/* 7. КОМПЛЕКТ СО СКИДКОЙ */}
      <section id="ms-combo" className="py-14 md:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className="relative overflow-hidden rounded-[32px] p-6 md:p-10 lg:p-14 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center"
            style={{ background: "linear-gradient(135deg, #00A4E3 0%, #0077B6 100%)" }}
          >
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="relative text-white">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-bold mb-5"
                style={{ background: "#ED4463", boxShadow: "0 8px 24px rgba(237,68,99,0.4)" }}
              >
                <Icon name="BadgePercent" size={18} fallback="Percent" />
                Скидка 25% на всё
              </span>
              <h2 className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-4">Сертификат на книгу и видеоинтервью</h2>
              <p className="text-[15px] md:text-[17px] leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.85)" }}>
                Один разговор с мамой — два подарка: книга, которую можно взять в руки, и фильм, где сохранятся её голос и улыбка.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: "BookOpen", text: "Книга воспоминаний в твёрдом переплёте" },
                  { icon: "Clapperboard", text: "Видеоинтервью, смонтированное в фильм" },
                  { icon: "Gift", text: "Один именной сертификат на оба формата" },
                  { icon: "BadgePercent", text: "Скидка 25% на весь заказ" },
                ].map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <Icon name={b.icon} size={18} fallback="Check" />
                    </span>
                    <span className="text-[15px] md:text-[16px] leading-snug pt-1.5 font-semibold">{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <OthersLeadForm
                formId="ms-combo-form"
                {...FORM_PROPS}
                title="Книга + интервью со скидкой 25%"
                subtitle="Оставьте контакты — рассчитаем стоимость комплекта и пришлём сертификат с именем мамы."
                tariff="Сертификат: мама рассказывает о себе — книга + интервью (скидка 25%)"
                goal="motherstory_combo_submit"
                successText="рассчитаем стоимость книги и интервью со скидкой 25%."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. КАК ЭТО РАБОТАЕТ */}
      <section id="ms-steps" className="scroll-mt-20 py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`${SECTION_TITLE} mb-3`}>Как это работает</h2>
            <p className={`${SECTION_TEXT} max-w-[640px] mx-auto`}>
              От заявки до готовой книги или фильма — вам остаётся только вручить сертификат, а маме — рассказать свою историю.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CERT_STEPS.map((s) => (
              <article
                key={s.n}
                className="group bg-white rounded-3xl p-3 flex flex-col border border-[#F0F0F0] transition-transform duration-300 md:hover:-translate-y-1"
                style={CARD_SHADOW}
              >
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
                  <span
                    className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-bold text-white"
                    style={{ background: "#00A4E3", boxShadow: "0 4px 12px rgba(0,164,227,0.35)" }}
                  >
                    {s.n}
                  </span>
                </div>
                <div className="px-3 pt-5 pb-4 flex-1 flex flex-col">
                  <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: "#ED4463" }}>Шаг {s.n}</p>
                  <h3 className="text-[18px] md:text-[19px] font-bold text-black leading-snug mb-2">{s.title}</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ПОЧЕМУ МАМЕ ПОНРАВИТСЯ */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={SECTION_TITLE}>Почему маме понравится</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {WHY_CARDS.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-3xl p-6 md:p-8 flex flex-col border border-[#F0F0F0] transition-transform duration-300 md:hover:-translate-y-1"
                style={CARD_SHADOW}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(237,68,99,0.08)", color: "#ED4463" }}>
                  <Icon name={c.icon} size={26} fallback="Heart" />
                </div>
                <h3 className="text-[18px] md:text-[19px] font-bold text-black leading-snug mb-2">{c.title}</h3>
                <p className="text-[14px] md:text-[15px] text-[#666] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="ms-faq" className="scroll-mt-20 py-14 md:py-20 section-soft">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={SECTION_TITLE}>Вопросы и ответы</h2>
          </div>
          <FaqList items={FAQ_ITEMS} />
        </div>
      </section>

      {/* 11. ФИНАЛЬНАЯ ФОРМА */}
      <section className="py-14 md:py-20">
        <div className="max-w-xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-10">
            <p className="inline-flex items-center gap-2 text-[14px] font-bold mb-3" style={{ color: "#ED4463" }}>
              <Icon name="Clock" size={16} />
              {countdown}
            </p>
            <h2 className={`${SECTION_TITLE} mb-3`}>Подарите маме возможность рассказать свою историю</h2>
            <p className={SECTION_TEXT}>Оставьте контакты — поможем выбрать книгу или видеоинтервью и пришлём сертификат к празднику.</p>
          </div>
          <OthersLeadForm formId="ms-bottom-form" compact {...FORM_PROPS} />
        </div>
      </section>

      <MotherFooter />
    </div>
  );
}
