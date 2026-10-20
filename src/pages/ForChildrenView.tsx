import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import OthersLeadForm from "./others/OthersLeadForm";
import ChildrenFaq from "./forchildren/ChildrenFaq";
import { HERO_IMG, FINAL_IMG, AGES, BENEFITS, FORMATS, PROCESS_STEPS } from "./forchildren/forChildrenData";
import { reachGoal } from "@/utils/metrika";

const BLUE = "#00A4E3";
const PINK = "#ED4463";

const FORM_PROPS = {
  title: "Обсудим фильм о вашем ребёнке",
  subtitle: "Напишем или позвоним, расскажем, как проходят съёмки, подберём формат и рассчитаем стоимость.",
  buttonText: "Обсудить фильм",
  tariff: "Фильм о ребёнке",
  goal: "children_lead_submit",
  successTitle: "Спасибо, заявка у нас",
  successText: "расскажем о съёмках и рассчитаем стоимость фильма.",
};

const cardShadow = { boxShadow: "0 8px 32px rgba(0,0,0,0.06)" };
const scrollRow = { scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties;

export default function ForChildrenView() {
  const scrollToForm = () => {
    reachGoal("children_scroll_to_form");
    document.getElementById("children-final-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

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
          <button onClick={scrollToForm} className="btn-cta" style={{ padding: "10px 20px", fontSize: 14 }}>
            Обсудить фильм
          </button>
        </div>
      </header>

      {/* ПЕРВЫЙ ЭКРАН */}
      <section className="py-8 md:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-stretch">
          <div className="flex flex-col justify-center">
            <h1
              className="text-[32px] md:text-[40px] lg:text-[52px] font-bold text-black leading-[1.1] tracking-tight mb-5"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Фильм о вашем ребёнке, <span style={{ color: BLUE }}>который он посмотрит взрослым</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-[#555] leading-relaxed mb-6 max-w-[520px]">
              Снимаем интервью с детьми — один фильм или целый цикл на годы, как в документальном сериале «Рождённые в СССР». Его мечты, страхи, смешные ответы и серьёзные мысли сохранятся навсегда.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-[14px] font-semibold text-[#222]">
              {[
                { icon: "Video", text: "Профессиональная съёмка" },
                { icon: "CalendarRange", text: "Интервью на годы" },
                { icon: "Lock", text: "Только для семьи" },
              ].map((b) => (
                <li key={b.text} className="flex items-center gap-2">
                  <Icon name={b.icon} size={18} style={{ color: BLUE }} />
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="md:hidden rounded-3xl overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
              <img src={HERO_IMG} alt="Интервью с ребёнком на камеру" className="w-full h-full object-cover block" />
            </div>

            <OthersLeadForm formId="children-hero-form" {...FORM_PROPS} />
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 rounded-[28px] overflow-hidden">
              <img src={HERO_IMG} alt="Интервью с ребёнком на камеру" className="w-full h-full object-cover block" />
            </div>
            <div
              className="absolute left-6 right-6 bottom-6 lg:left-8 lg:right-auto lg:bottom-8 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 flex items-center gap-4 max-w-[360px]"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,164,227,0.1)", color: BLUE }}>
                <Icon name="Heart" size={20} />
              </div>
              <p className="text-[14px] leading-snug text-[#222]">
                <b>Детство не повторится.</b> А фильм о нём можно пересматривать всю жизнь.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ВДОХНОВЕНИЕ */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: PINK }}>
            Идея, проверенная временем
          </p>
          <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight mb-5">
            Как в «Рождённых в СССР», только о вашем ребёнке
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#555] leading-relaxed mb-4">
            В 1990 году режиссёр Сергей Мирошниченко снял детей семи лет и задал им простые вопросы: о счастье, о мечтах, о любви. Потом он возвращался к ним каждые семь лет.
          </p>
          <p className="text-[15px] md:text-[17px] text-[#555] leading-relaxed">
            Так появилась одна из самых пронзительных историй о том, как ребёнок становится взрослым. Мы делаем то же самое для одной семьи: бережно, лично и только для вас.
          </p>
        </div>
      </section>

      {/* ВЗРОСЛЕНИЕ */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center">
          <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight mb-3">Одни вопросы — разные годы</h2>
          <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed max-w-[640px] mx-auto">
            Каждая новая съёмка — глава взросления. Вот как может звучать ваш фильм
          </p>
        </div>

        <div
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-6 pb-2 md:pb-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4"
          style={scrollRow}
        >
          {AGES.map((a) => (
            <article
              key={a.age}
              className="group flex-shrink-0 w-[78vw] max-w-[320px] md:w-auto md:max-w-none snap-start bg-white rounded-3xl p-3 flex flex-col border border-[#F0F0F0] transition-transform duration-300 md:hover:-translate-y-1"
              style={cardShadow}
            >
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <img
                  src={a.img}
                  alt={`Интервью с ребёнком, ${a.age}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[12px] font-bold text-[#222]">
                  {a.age}
                </span>
              </div>
              <div className="px-3 pt-5 pb-4 flex-1">
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: 23, fontWeight: 600, color: "#222", lineHeight: 1.25 }}>
                  {a.quote}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight mb-3">Зачем снимать фильм о ребёнке</h2>
            <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed max-w-[640px] mx-auto">
              Дети вырастают быстрее, чем мы успеваем это заметить
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-3xl p-6 md:p-8 flex flex-col border border-[#F0F0F0] transition-transform duration-300 md:hover:-translate-y-1"
                style={cardShadow}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(0,164,227,0.1)", color: BLUE }}>
                  <Icon name={b.icon} size={26} fallback="Heart" />
                </div>
                <h3 className="text-[18px] md:text-[19px] font-bold text-black leading-snug mb-2">{b.title}</h3>
                <p className="text-[14px] md:text-[15px] text-[#666] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ФОРМАТЫ */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight">Два формата</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {FORMATS.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl p-6 md:p-8 flex flex-col border-2 bg-white"
                style={{ borderColor: f.accent ? BLUE : "#F0F0F0", ...cardShadow }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: f.accent ? BLUE : "rgba(0,164,227,0.1)", color: f.accent ? "#fff" : BLUE }}
                  >
                    <Icon name={f.icon} size={26} fallback="Film" />
                  </div>
                  {f.accent && (
                    <span className="px-3 py-1 rounded-full text-[12px] font-bold text-white" style={{ background: PINK }}>
                      Как в «Рождённых в СССР»
                    </span>
                  )}
                </div>
                <h3 className="text-[20px] md:text-[22px] font-bold text-black leading-snug mb-2">{f.title}</h3>
                <p className="text-[14px] md:text-[15px] text-[#666] leading-relaxed mb-5">{f.desc}</p>
                <ul className="space-y-2.5 mt-auto">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[14px] text-[#222]">
                      <Icon name="Check" size={18} className="flex-shrink-0 mt-0.5" style={{ color: BLUE }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАК ПРОХОДИТ */}
      <section className="py-14 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center">
          <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight mb-3">Как всё проходит</h2>
          <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed max-w-[680px] mx-auto">
            Вы рассказываете о ребёнке, а дальше мы всё берём на себя: от вопросов до готового фильма.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-6">
          {PROCESS_STEPS.map((s) => (
            <article key={s.n} className="bg-white rounded-3xl p-6 md:p-7 flex flex-col border border-[#F0F0F0]" style={cardShadow}>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,164,227,0.1)", color: BLUE }}>
                  <Icon name={s.icon} size={24} fallback="Circle" />
                </div>
                <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: PINK }}>
                  Шаг {s.n}
                </span>
              </div>
              <h3 className="text-[18px] md:text-[19px] font-bold text-black leading-snug mb-2">{s.title}</h3>
              <p className="text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ЦЕНА */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div
            className="bg-white rounded-3xl border border-[#F0F0F0] p-6 md:p-10 lg:p-12 grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-center"
            style={cardShadow}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-6 text-center md:text-left">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,164,227,0.1)", color: BLUE }}
              >
                <Icon name="Calculator" size={28} />
              </div>
              <div>
                <h2 className="text-[28px] md:text-[36px] font-bold text-black leading-[1.15] tracking-tight mb-3">Сколько это стоит</h2>
                <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed max-w-[520px]">
                  Каждый фильм уникален, поэтому стоимость индивидуальная. Она зависит от формата, числа съёмочных дней и участников. Рассчитаем при первом разговоре.
                </p>
              </div>
            </div>
            <button onClick={scrollToForm} className="btn-cta w-full md:w-auto whitespace-nowrap justify-self-center">
              Узнать стоимость
            </button>
          </div>
        </div>
      </section>

      <ChildrenFaq />

      {/* ФИНАЛЬНАЯ ФОРМА */}
      <section id="children-final-form" className="py-14 md:py-20 section-soft">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
            <img src={FINAL_IMG} alt="Семья смотрит фильм о детстве дочери" loading="lazy" className="w-full h-full object-cover block" />
          </div>
          <div>
            <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight mb-3">
              Однажды вы посмотрите его вместе
            </h2>
            <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed mb-6">
              Оставьте заявку — свяжемся, расскажем о съёмках и рассчитаем стоимость фильма о вашем ребёнке.
            </p>
            <OthersLeadForm formId="children-bottom-form" compact {...FORM_PROPS} />
          </div>
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
            <Link to="/legal/privacy" className="hover:text-white">Конфиденциальность</Link>
            <span>·</span>
            <Link to="/legal/offer" className="hover:text-white">Оферта</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}