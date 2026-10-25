import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import OthersLeadForm from "./others/OthersLeadForm";
import MotherDayHeader from "./motherday/MotherDayHeader";
import CrossPageBanner from "./motherday/CrossPageBanner";
import {
  MOTHER_DAY_DATE,
  HERO_IMG,
  BOOK_MACRO_IMG,
  STUDIO_IMG,
  HERO_BULLETS,
  FORMATS,
  BOOK_BENEFITS,
  FILM_BENEFITS,
  VIDEOS,
  STEPS,
  SPREADS,
  WHY_CARDS,
  FAQ_ITEMS,
} from "./motherday/motherDayData";
import { reachGoal } from "@/utils/metrika";

const CTA = "Оставить заявку";

const FORM_PROPS = {
  title: CTA,
  subtitle: "Оставьте контакты — свяжемся, поможем выбрать формат и рассчитаем стоимость.",
  buttonText: CTA,
  tariff: "День матери: книга или фильм о маме",
  goal: "motherday_lead_submit",
  successTitle: "Спасибо, заявка у нас",
  successText: "поможем выбрать формат и рассчитаем стоимость.",
};

const SECTION_TITLE = "text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight";
const SECTION_TEXT = "text-[15px] md:text-[17px] text-[#666] leading-relaxed";
const CARD_SHADOW = { boxShadow: "0 8px 32px rgba(0,0,0,0.06)" };

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

function VideoCard({ id, title, cover }: { id: string; title: string; cover: string }) {
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
              reachGoal("motherday_video_play");
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

function BenefitGrid({ items, color }: { items: { icon: string; title: string; desc: string }[]; color: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
      {items.map((b) => (
        <div key={b.title} className="flex items-start gap-4">
          <span
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}1A`, color }}
          >
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

export default function MotherDayView() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [days, setDays] = useState(daysLeft());

  useEffect(() => {
    const t = setInterval(() => setDays(daysLeft()), 60 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string, goal = "motherday_scroll_to_form") => {
    reachGoal(goal);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: id.endsWith("form") ? "center" : "start" });
  };

  const countdown =
    days > 0 ? `До Дня матери ${days} ${pluralDays(days)}` : days === 0 ? "День матери — сегодня" : "Подарок на любой праздник";

  const CtaButton = ({ className = "" }: { className?: string }) => (
    <button onClick={() => scrollTo("md-bottom-form")} className={`btn-cta ${className}`}>
      {CTA}
    </button>
  );

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <MotherDayHeader ctaText={CTA} onCta={() => scrollTo("md-bottom-form")} />

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
              Уникальный подарок <span style={{ color: "#00A4E3" }}>для любимой мамы</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-[#555] leading-relaxed mb-6 max-w-[520px]">
              Соберём рассказы родных, друзей и знакомых о маме — какой они её видят, за что любят, что помнят. И превратим их в книгу в твёрдом переплёте или в фильм о ней.
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
              <img src={HERO_IMG} alt="Мама с книгой, в которой близкие рассказывают о ней" className="w-full h-full object-cover block" />
            </div>

            <OthersLeadForm formId="md-hero-form" {...FORM_PROPS} />
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 rounded-[28px] overflow-hidden">
              <img src={HERO_IMG} alt="Мама с книгой, в которой близкие рассказывают о ней" className="w-full h-full object-cover block" />
            </div>
            <div
              className="absolute left-6 right-6 bottom-6 lg:left-8 lg:right-auto lg:bottom-8 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 flex items-center gap-4 max-w-[380px]"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(237,68,99,0.1)", color: "#ED4463" }}>
                <Icon name="Heart" size={20} />
              </div>
              <p className="text-[14px] leading-snug text-[#222]">
                <b>Истории от каждого близкого.</b> Мама узнает, какой её видят другие.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ДВА ФОРМАТА */}
      <section id="md-formats" className="scroll-mt-20 py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`${SECTION_TITLE} mb-3`}>Два формата на выбор</h2>
            <p className={`${SECTION_TEXT} max-w-[640px] mx-auto`}>
              В основе обоих — интервью с людьми, которые любят маму. Можно выбрать один или оба — со скидкой 25%.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {FORMATS.map((f) => (
              <article key={f.id} className="bg-white rounded-3xl p-3 flex flex-col border border-[#F0F0F0]" style={CARD_SHADOW}>
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <img src={f.img} alt={f.title} loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[12px] font-bold text-[#222]">
                    {f.label}
                  </span>
                </div>
                <div className="px-3 pt-5 pb-4 flex-1 flex flex-col">
                  <h3 className="flex items-center gap-2 text-[22px] md:text-[26px] font-bold text-black leading-snug mb-2">
                    <Icon name={f.icon} size={24} style={{ color: "#00A4E3" }} fallback="Star" />
                    {f.title}
                  </h3>
                  <p className="text-[15px] text-[#666] leading-relaxed mb-5 flex-1">{f.desc}</p>
                  <button
                    onClick={() => scrollTo(f.id, `motherday_format_${f.id}`)}
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

      {/* 3. КНИГА — ПРЕИМУЩЕСТВА */}
      <section id="md-book" className="py-14 md:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="rounded-[28px] overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={BOOK_MACRO_IMG} alt="Твёрдый переплёт и плотная бумага книги StoryBox крупным планом" loading="lazy" className="w-full h-full object-cover block" />
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
            <h2 className={`${SECTION_TITLE} mb-4`}>Книга о маме</h2>
            <p className={`${SECTION_TEXT} mb-8`}>
              Настоящая книга, которую хочется держать в руках: каждую главу рассказывает один из близких.
            </p>
            <BenefitGrid items={BOOK_BENEFITS} color="#00A4E3" />
            <CtaButton className="w-full sm:w-auto mt-8" />
          </div>
        </div>
      </section>

      {/* 4. ЧТО БУДЕТ ВНУТРИ */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center">
          <h2 className={`${SECTION_TITLE} mb-3`}>Что будет внутри книги</h2>
          <p className={`${SECTION_TEXT} max-w-[640px] mx-auto`}>
            У каждого из близких своя глава: истории о маме и общие фотографии
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
                <img src={s.img} alt={`${s.role} — ${s.topic}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
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

      {/* 5. ФИЛЬМ — ПРЕИМУЩЕСТВА */}
      <section id="md-film" className="py-14 md:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16">
            <div className="order-2 md:order-1">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: "#ED4463" }}>Формат 2</p>
              <h2 className={`${SECTION_TITLE} mb-4`}>Фильм о маме</h2>
              <p className={`${SECTION_TEXT} mb-8`}>
                Видеоинтервью с родными, близкими и друзьями — очно в студии или онлайн. Мы монтируем их в один фильм о том, какая она в глазах других людей.
              </p>
              <BenefitGrid items={FILM_BENEFITS} color="#ED4463" />
              <CtaButton className="w-full sm:w-auto mt-8" />
            </div>
            <div className="order-1 md:order-2 rounded-[28px] overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img src={STUDIO_IMG} alt="Запись видеоинтервью StoryBox" loading="lazy" className="w-full h-full object-cover block" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-[22px] md:text-[28px] font-bold text-black leading-snug mb-2">Посмотрите, как проходят наши интервью</h3>
            <p className={SECTION_TEXT}>Несколько фрагментов из реальных записей StoryBox</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {VIDEOS.map((v) => (
              <VideoCard key={v.id} id={v.id} title={v.title} cover={v.cover} />
            ))}
          </div>
        </div>
      </section>

      {/* 5.1 КОМПЛЕКТ СО СКИДКОЙ */}
      <section id="md-combo" className="pb-14 md:pb-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className="relative overflow-hidden rounded-[32px] p-6 md:p-10 lg:p-14 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center"
            style={{ background: "linear-gradient(135deg, #00A4E3 0%, #0077B6 100%)" }}
          >
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <div className="relative text-white">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-bold mb-5"
                style={{ background: "#ED4463", boxShadow: "0 8px 24px rgba(237,68,99,0.4)" }}
              >
                <Icon name="BadgePercent" size={18} fallback="Percent" />
                Скидка 25% на всё
              </span>
              <h2 className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-4">
                Книга и фильм о маме в одном заказе
              </h2>
              <p className="text-[15px] md:text-[17px] leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.85)" }}>
                Одни и те же интервью с близкими становятся сразу двумя подарками: книгой, которую можно взять в руки, и фильмом, где мама увидит и услышит каждого.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: "BookOpen", text: "Книга в твёрдом переплёте на плотной бумаге" },
                  { icon: "Clapperboard", text: "Фильм из видеоинтервью с родными и друзьями" },
                  { icon: "BadgePercent", text: "Скидка 25% на весь заказ — и на книгу, и на фильм" },
                ].map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <Icon name={b.icon} size={18} fallback="Check" />
                    </span>
                    <span className="text-[15px] md:text-[16px] leading-snug pt-1.5 font-semibold">{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <OthersLeadForm
                formId="md-combo-form"
                {...FORM_PROPS}
                title="Книга + фильм со скидкой 25%"
                subtitle="Оставьте контакты — свяжемся и рассчитаем стоимость комплекта со скидкой."
                tariff="День матери: книга + фильм (скидка 25%)"
                goal="motherday_combo_submit"
                successText="рассчитаем стоимость книги и фильма со скидкой 25%."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. КАК ЭТО РАБОТАЕТ */}
      <section id="md-steps" className="scroll-mt-20 py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`${SECTION_TITLE} mb-3`}>Как это работает</h2>
            <p className={`${SECTION_TEXT} max-w-[640px] mx-auto`}>
              Всё организуем сами — от вас нужна только заявка и список близких.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {STEPS.map((s) => (
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

      {/* 7. ПОЧЕМУ МАМЕ ПОНРАВИТСЯ */}
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

      {/* 8. FAQ */}
      <section id="md-faq" className="scroll-mt-20 py-14 md:py-20 section-soft">
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

      {/* 8.1 ПЕРЕХОД НА СОСЕДНЮЮ СТРАНИЦУ */}
      <CrossPageBanner
        to="/den-materi-istoriya"
        img="https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/421aa11d-086e-4dfb-af35-ef54abc09647.jpg"
        eyebrow="Другой формат подарка"
        title="Хотите, чтобы мама сама рассказала свою историю?"
        text="Подарите сертификат на книгу воспоминаний или видеоинтервью, где мама от первого лица расскажет о детстве, молодости, любви и том, что поняла за эти годы."
        button="Подробнее о формате"
        goal="motherday_cross_to_story"
      />

      {/* 9. ФИНАЛЬНАЯ ФОРМА */}
      <section className="py-14 md:py-20">
        <div className="max-w-xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-10">
            <p className="inline-flex items-center gap-2 text-[14px] font-bold mb-3" style={{ color: "#ED4463" }}>
              <Icon name="Clock" size={16} />
              {countdown}
            </p>
            <h2 className={`${SECTION_TITLE} mb-3`}>Сделайте уникальный и неповторимый подарок для своей мамы</h2>
            <p className={SECTION_TEXT}>
              Оставьте контакты — свяжемся, поможем выбрать книгу или фильм и рассчитаем стоимость.
            </p>
          </div>
          <OthersLeadForm formId="md-bottom-form" compact {...FORM_PROPS} />
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
            <span>Конфиденциальность</span>
            <span>·</span>
            <span>Оферта</span>
          </div>
        </div>
      </footer>
    </div>
  );
}