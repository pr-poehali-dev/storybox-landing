import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { BOOK_FEATURES } from "./data";

const STEPS = [
  {
    n: "1",
    title: "Установочная встреча",
    desc: "Перед началом работы мы проводим подробную встречу, чтобы книга получилась по-настоящему личной и отражала именно вашего близкого человека. Мы обсуждаем важные темы, семейные истории, атмосферу будущей книги, людей, на которых стоит сделать акцент, воспоминания и даже фразы, которые важно сохранить.",
    img: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/aadf5b39-d609-48f5-a2d4-daeccd5bf7f1.png",
  },
  {
    n: "2",
    title: "Интервью",
    desc: "Мы проводим глубокие интервью по тщательно подготовленному сценарию, чтобы раскрыть историю жизни человека, его характер, взгляды и воспоминания. Беседы проходят в несколько сессий по 1,5 часа и записываются на аудио, а список вопросов заранее отправляется герою, чтобы можно было спокойно подготовиться и вспомнить важные истории.",
    img: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/0517b187-33fa-4460-9e69-b118336d1824.png",
  },
  {
    n: "3",
    title: "Литературная обработка",
    desc: "Перед началом работы мы согласовываем стиль будущей книги: тёплый семейный рассказ, глубокая биография, живая разговорная история или более художественное повествование. Затем наши редакторы превращают интервью в книгу, которую действительно интересно читать.",
    img: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/b2e88ea6-26cc-4c85-b026-4ea588113ba3.jpg",
  },
  {
    n: "4",
    title: "Печать и доставка",
    desc: "После согласования финального макета мы печатаем книгу в твёрдом переплёте на качественной дизайнерской бумаге и помогаем организовать доставку вашей семье в любой точке мира. При желании также подготовим электронную версию книги для удобного хранения и передачи близким.",
    img: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/fe58146f-66a4-4163-97c1-5b0489b957cd.png",
  },
];

const CARD_WIDTH = 300;
const CARD_GAP = 20;

export default function BookFeaturesSection() {
  const bookScrollRef = useRef<HTMLDivElement>(null);
  const [bookIdx, setBookIdx] = useState(0);

  const scrollBook = (dir: 1 | -1) => {
    const next = Math.max(0, Math.min(BOOK_FEATURES.length - 1, bookIdx + dir));
    setBookIdx(next);
    const el = bookScrollRef.current;
    if (!el) return;
    el.scrollTo({ left: next * (CARD_WIDTH + CARD_GAP), behavior: "smooth" });
  };

  return (
    <>
      {/* ИЗ ЧЕГО СОСТОИТ КНИГА */}
      <section id="book" className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2">Из чего состоит каждая книга</h2>
            <p className="text-[14px] md:text-[16px] text-[#7A7A7A]">Пять составляющих, которые входят в каждый проект</p>
          </div>
          {/* Desktop: кнопки влево/вправо */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0 ml-6">
            <button
              onClick={() => scrollBook(-1)}
              disabled={bookIdx === 0}
              className="w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#00A4E3] hover:text-[#00A4E3] transition-colors disabled:opacity-30 disabled:cursor-default"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={() => scrollBook(1)}
              disabled={bookIdx >= BOOK_FEATURES.length - 1}
              className="w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#00A4E3] hover:text-[#00A4E3] transition-colors disabled:opacity-30 disabled:cursor-default"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Mobile: горизонтальный скролл */}
        <div
          className="md:hidden flex gap-4 px-4 pb-2"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {BOOK_FEATURES.map((f) => (
            <div key={f.title} className="sb-card flex-shrink-0 overflow-hidden !p-0" style={{ width: "76vw", maxWidth: 300 }}>
              {f.image && (
                <div className="w-full overflow-hidden" style={{ height: 160 }}>
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "#F2F9FF" }}>
                    <Icon name={f.icon as Parameters<typeof Icon>[0]["name"]} size={16} style={{ color: "#00A4E3" }} fallback="BookOpen" />
                  </div>
                  <h4 className="text-[15px] font-semibold text-black">{f.title}</h4>
                </div>
                <p className="text-[13px] text-[#7A7A7A] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: горизонтальный скролл */}
        <div className="hidden md:block max-w-7xl mx-auto px-6 overflow-hidden">
          <div
            ref={bookScrollRef}
            className="flex gap-5 pb-2"
            style={{ overflowX: "auto", scrollbarWidth: "none" } as React.CSSProperties}
          >
            {BOOK_FEATURES.map((f) => (
              <div key={f.title} className="sb-card flex-shrink-0 overflow-hidden !p-0" style={{ width: CARD_WIDTH }}>
                {f.image && (
                  <div className="w-full overflow-hidden" style={{ height: 200 }}>
                    <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F2F9FF" }}>
                      <Icon name={f.icon as Parameters<typeof Icon>[0]["name"]} size={18} style={{ color: "#00A4E3" }} fallback="BookOpen" />
                    </div>
                    <h4 className="text-[16px] font-semibold text-black">{f.title}</h4>
                  </div>
                  <p className="text-[14px] text-[#7A7A7A] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАК ЭТО РАБОТАЕТ */}
      <section id="how" className="py-10 md:py-16 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-10">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2">Как это работает</h2>
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A]">От первой встречи до книги в ваших руках — 4 шага</p>
        </div>

        {/* Mobile: горизонтальный скролл */}
        <div
          className="md:hidden flex gap-4 px-4 pb-2"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {STEPS.map((s) => (
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

        {/* Desktop: четыре карточки в ряд */}
        <div className="hidden md:grid max-w-7xl mx-auto px-6 grid-cols-4 gap-6">
          {STEPS.map((s) => (
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
    </>
  );
}