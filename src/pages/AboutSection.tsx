import { useState } from "react";
import Icon from "@/components/ui/icon";
import { TEAM_MEMBERS } from "./data";

const PDF_URL = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/0c989fac-5b3e-44bf-ae44-b377cbe28535.pdf";

interface AboutSectionProps {
  openPopup: (tariff?: string) => void;
}

export default function AboutSection({ openPopup }: AboutSectionProps) {
  const [pdfOpen, setPdfOpen] = useState(false);
  return (
    <>
      {/* ОТЗЫВ ИРИНЫ АЛЕКСАНДРОВНЫ */}
      <section className="py-10 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#00A4E3" }}>
                Пример книги
              </p>
              <h2 className="text-[24px] md:text-[34px] font-bold text-black mb-1">
                Ирина Александровна, 85 лет
              </h2>
              <p className="text-[13px] mb-6" style={{ color: "#7A7A7A" }}>
                Иваново · тариф «Выездная съёмка» · осень 2025
              </p>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { val: "88", label: "стр. книги" },
                  { val: "38 шт", label: "фото" },
                  { val: "3 ч", label: "интервью" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl px-2 py-3 border border-[#E5E5E5] text-center shadow-sm">
                    <div className="text-[18px] md:text-[22px] font-extrabold text-black leading-none">{s.val}</div>
                    <div className="text-[10px] text-[#7A7A7A] mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 md:p-7 mb-6">
                <div className="text-[40px] leading-none mb-1" style={{ color: "#00A4E3", opacity: 0.2 }}>"</div>
                <p className="text-[15px] md:text-[16px] leading-relaxed text-[#222] mb-4" style={{ fontStyle: "italic", marginTop: -16 }}>
                  Я хочу быть похожей на бабушку. Теперь у моих детей будет повод гордиться прабабушкой, даже когда её не станет рядом.
                </p>
                <p className="text-[13px] font-semibold text-[#7A7A7A]">— Виктория Гурбатова, внучка</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setPdfOpen(true)}
                  className="btn-cta flex items-center justify-center gap-2"
                >
                  <Icon name="BookOpen" size={16} />
                  Посмотреть пример книги
                </button>
                <button onClick={() => openPopup("Книга Light")} className="btn-secondary">Заказать такую же</button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <iframe
                src="https://www.youtube.com/embed/SyRnCEncSh8"
                title="Ирина Александровна — семейная хроника StoryBox"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: "none", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* О НАС */}
      <section id="about" className="py-10 md:py-20 hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-12">
            <div>
              <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-5">О нас</h2>
              <p className="text-[15px] md:text-[17px] text-[#444] leading-relaxed mb-4">
                Мы горим идеей создания дополнительной памяти, которая позволит людям не только лучше помнить, как прошёл очередной год, но и навсегда сохранить свои представления о будущем и образ мыслей накануне выпускного, свадьбы и других значимых событий.
              </p>
              <p className="text-[15px] text-[#7A7A7A] leading-relaxed">
                Профессиональный психолог задаёт вопросы, которые открывают то, о чём никогда не спрашивают.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <iframe
                src="https://www.youtube.com/embed/X1tRmSymfZM"
                title="О компании StoryBox"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: "none", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ИНТЕРВЬЮЕРЫ */}
      <section id="team" className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2">Наши интервьюеры</h2>
          <p className="text-[14px] md:text-[15px] text-[#7A7A7A] mb-6 md:mb-8">Проверенные психологи, умеющие профессионально и бережно задавать вопросы</p>
          {/* Mobile: горизонтальный скролл */}
          <div
            className="md:hidden flex gap-4 -mx-4 px-4 pb-2"
            style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            {TEAM_MEMBERS.map((m) => (
              <div key={m.name} className="sb-card overflow-hidden p-0 flex-shrink-0" style={{ width: 160 }}>
                <div className="w-full overflow-hidden bg-[#F2F9FF]" style={{ height: 200 }}>
                  <img src={m.photo!} alt={m.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="px-3 py-3 text-center">
                  <h3 className="text-[13px] font-semibold text-black mb-0.5">{m.name}</h3>
                  <p className="text-[11px] text-[#7A7A7A]">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop: сетка */}
          <div className="hidden md:grid grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((m) => (
              <div key={m.name} className="sb-card overflow-hidden p-0">
                <div className="w-full aspect-[3/4] overflow-hidden bg-[#F2F9FF]">
                  <img src={m.photo!} alt={m.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="px-4 py-4 text-center">
                  <h3 className="text-[15px] font-semibold text-black mb-0.5">{m.name}</h3>
                  <p className="text-[13px] text-[#7A7A7A]">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF модалка */}
      {pdfOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={() => setPdfOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden flex flex-col"
            style={{ width: "min(900px, 95vw)", height: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#F0F0F0]">
              <span className="font-semibold text-[15px] text-black">Пример книги</span>
              <div className="flex items-center gap-2">
                <a
                  href={PDF_URL}
                  download
                  className="flex items-center gap-1.5 text-[13px] text-[#00A4E3] hover:opacity-80 transition-opacity font-medium"
                >
                  <Icon name="Download" size={15} />
                  Скачать
                </a>
                <button
                  onClick={() => setPdfOpen(false)}
                  className="ml-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F5F5] transition-colors"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
            </div>
            <iframe
              src={`${PDF_URL}#toolbar=1&navpanes=1`}
              className="flex-1 w-full"
              title="Пример книги"
            />
          </div>
        </div>
      )}
    </>
  );
}