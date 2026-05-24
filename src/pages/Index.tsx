import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import BookingPopup from "./BookingPopup";
import GiftPopup from "./GiftPopup";
import ConsultPopup from "./ConsultPopup";
import TariffsSection from "./TariffsSection";
import FaqSection from "./FaqSection";
import {
  NAV_LINKS, BOOK_FEATURES,
  TEAM_MEMBERS,
} from "./data";

const HERO_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/fd310fb0-c335-470c-b966-732b344805cf.jpg";
const BOOK_SPREAD_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/092dd021-1b7d-4089-94bf-c958bff5c481.jpg";

export default function Index() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTariff, setPopupTariff] = useState("");
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftTariff, setGiftTariff] = useState("");
  const [consultOpen, setConsultOpen] = useState(false);
  const [activeTariff, setActiveTariff] = useState(3);

  const openPopup = (tariff = "") => { setPopupTariff(tariff); setPopupOpen(true); };
  const openGiftPopup = (tariff = "") => { setGiftTariff(tariff); setGiftOpen(true); };
  const openConsult = () => setConsultOpen(true);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <BookingPopup open={popupOpen} onClose={() => setPopupOpen(false)} initialTariff={popupTariff} />
      <GiftPopup open={giftOpen} onClose={() => setGiftOpen(false)} initialTariff={giftTariff} />
      <ConsultPopup open={consultOpen} onClose={() => setConsultOpen(false)} />

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <a href="#" className="flex items-center select-none">
            <img
              src="https://static.tildacdn.one/tild3937-3830-4361-a239-323264653433/_2023-11-07_12181908.png"
              alt="StoryBox"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-[15px] text-[#222] hover:text-[#00A4E3] transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/79031932725"
              target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold hover:opacity-85 transition-opacity flex-shrink-0"
              style={{ background: "#25D366" }}
            >W</a>
            <a
              href="https://t.me/storybox_ru"
              target="_blank" rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold hover:opacity-85 transition-opacity flex-shrink-0"
              style={{ background: "#2AABEE" }}
            >T</a>
            <a
              href="#tariffs"
              className="hidden md:inline-flex items-center btn-cta ml-2"
              style={{ padding: "10px 20px", fontSize: 14 }}
            >
              Книга со скидкой 25% →
            </a>
          </div>
        </div>
      </header>

      {/* HERO — десктоп: сетка 50/50, мобайл: фото сверху, текст снизу */}
      <section className="w-full">
        {/* Mobile layout */}
        <div className="md:hidden">
          <div className="w-full overflow-hidden" style={{ maxHeight: "80vw" }}>
            <img
              src={HERO_IMG}
              alt="Бабушка держит семейную книгу воспоминаний"
              className="w-full object-cover object-center"
              style={{ display: "block", maxHeight: "80vw" }}
            />
          </div>
          <div className="bg-white px-5 pt-7 pb-10">
            <h1 className="leading-tight mb-4 text-[32px] font-bold text-black">
              Превращаем воспоминания в книги
            </h1>
            <p className="text-[16px] text-[#444] leading-relaxed mb-6">
              Мы бережно интервьюируем ваших близких, помогаем собрать фотографии и создаём красивую книгу, которая сохранит семейные истории на годы.
            </p>
            <a href="#tariffs" className="btn-cta w-full text-center block" style={{ fontSize: 16, padding: "16px 20px" }}>
              Книга со скидкой 25% →
            </a>
            <p className="text-[12px] text-[#AAAAAA] mt-2 text-center">Консультация бесплатно · без предоплаты</p>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-2 max-w-7xl mx-auto" style={{ minHeight: 520 }}>
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16">
            <h1 className="leading-tight mb-5" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#000" }}>
              Превращаем воспоминания в книги
            </h1>
            <p className="text-[17px] text-[#444] leading-relaxed mb-8 max-w-lg">
              Мы бережно интервьюируем ваших близких, помогаем собрать фотографии и создаём красивую книгу, которая сохранит семейные истории на годы.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a href="#tariffs" className="btn-cta" style={{ fontSize: 16, padding: "16px 32px" }}>
                Книга со скидкой 25% →
              </a>
              <button onClick={openConsult} className="btn-secondary" style={{ fontSize: 15, padding: "15px 28px" }}>
                Бесплатная консультация
              </button>
            </div>

          </div>
          <div className="overflow-hidden" style={{ maxHeight: 600 }}>
            <img
              src={HERO_IMG}
              alt="Бабушка держит семейную книгу воспоминаний"
              className="w-full h-full object-cover object-center"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </section>



      {/* ГАЛЕРЕЯ КНИГ — автоматическая прокрутка */}
      <section className="w-full overflow-hidden py-6 md:py-10" style={{ background: "#FAFAFA" }}>
        <style>{`
          @keyframes book-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .book-scroll-track {
            display: flex;
            width: max-content;
            animation: book-scroll 22s linear infinite;
          }
          .book-scroll-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="book-scroll-track">
          {[
            { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/0d069a37-552f-48da-b1e8-605a5f113e74.png", alt: "Коллекция семейных книг StoryBox" },
            { src: BOOK_SPREAD_IMG, alt: "Разворот семейной книги StoryBox" },
            { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/b4c7ee0d-1be8-4d00-a733-e20e61158248.jpg", alt: "Премиальные обложки книг StoryBox" },
            { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/c09e7ca1-eb4b-4a20-88c1-8c06b7101416.jpg", alt: "Семейные мемуары в твёрдой обложке" },
            { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/0d069a37-552f-48da-b1e8-605a5f113e74.png", alt: "Коллекция семейных книг StoryBox" },
            { src: BOOK_SPREAD_IMG, alt: "Разворот семейной книги StoryBox" },
            { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/b4c7ee0d-1be8-4d00-a733-e20e61158248.jpg", alt: "Премиальные обложки книг StoryBox" },
            { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/c09e7ca1-eb4b-4a20-88c1-8c06b7101416.jpg", alt: "Семейные мемуары в твёрдой обложке" },
          ].map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-xl overflow-hidden mx-2 md:mx-3"
              style={{ width: "clamp(280px, 50vw, 560px)", height: "clamp(180px, 32vw, 360px)" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ИЗ ЧЕГО СОСТОИТ КНИГА */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-8">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2">Из чего состоит каждая книга</h2>
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A]">Пять составляющих, которые входят в каждый проект</p>
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
        {/* Desktop: сетка */}
        <div className="hidden md:grid max-w-7xl mx-auto px-6 grid-cols-3 gap-5">
          {BOOK_FEATURES.map((f, i) => (
            <div key={f.title} className={`sb-card overflow-hidden !p-0${i === 4 ? " md:col-start-2" : ""}`}>
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
      </section>

      {/* КАК ЭТО РАБОТАЕТ */}
      <section className="py-10 md:py-16 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-10">
          <h2 className="text-[24px] md:text-[36px] font-bold text-black mb-2">Как это работает</h2>
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A]">От первой встречи до книги в ваших руках — 4 шага</p>
        </div>

        {/* Шаги с фото — единый список для mobile и desktop */}
        {(() => {
          const steps = [
            {
              n: "1",
              title: "Установочная встреча",
              desc: "Перед началом работы мы проводим подробную встречу, чтобы книга получилась по-настоящему личной и отражала именно вашего близкого человека. Мы обсуждаем важные темы, семейные истории, атмосферу будущей книги, людей, на которых стоит сделать акцент, воспоминания и даже фразы, которые важно сохранить.",
              img: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/2c2f29ad-9e9a-4c10-b168-c9168dde8c80.jpg",
            },
            {
              n: "2",
              title: "Интервью",
              desc: "Мы проводим глубокие интервью по тщательно подготовленному сценарию, чтобы бережно раскрыть историю жизни человека, его характер, взгляды и воспоминания. Беседы проходят в несколько сессий по 1,5 часа и записываются на аудио, а список вопросов заранее отправляется герою, чтобы можно было спокойно подготовиться и вспомнить важные истории.",
              img: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/2c2f29ad-9e9a-4c10-b168-c9168dde8c80.jpg",
            },
            {
              n: "3",
              title: "Литературная обработка",
              desc: "Перед началом работы мы согласовываем стиль будущей книги: тёплый семейный рассказ, глубокая биография, живая разговорная история или более художественное повествование. Затем наши редакторы бережно превращают интервью в книгу, которую действительно интересно читать.",
              img: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/3328f699-4625-44b1-8039-95f75d8b8bbc.jpg",
            },
            {
              n: "4",
              title: "Печать и доставка",
              desc: "После согласования финального макета мы печатаем книгу в твёрдом переплёте на качественной дизайнерской бумаге и помогаем организовать доставку вашей семье в любой точке мира. При желании также подготовим электронную версию книги для удобного хранения и передачи близким.",
              img: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/3c8715ac-4a6d-498a-8fc6-02d22c42f2a4.jpg",
            },
          ];
          return (
            <>
              {/* Mobile: горизонтальный скролл */}
              <div
                className="md:hidden flex gap-4 px-4 pb-2"
                style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
              >
                {steps.map((s) => (
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
                {steps.map((s) => (
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
            </>
          );
        })()}

      </section>

      {/* ТАРИФЫ */}
      <TariffsSection
        activeTariff={activeTariff}
        setActiveTariff={setActiveTariff}
        openPopup={openPopup}
        openGiftPopup={openGiftPopup}
        openConsult={openConsult}
      />

      {/* ОТЗЫВ ИРИНЫ АЛЕКСАНДРОВНЫ */}
      <section className="py-10 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#00A4E3" }}>
                Реальный результат
              </p>
              <h2 className="text-[24px] md:text-[34px] font-bold text-black mb-1">
                Ирина Александровна, 85 лет
              </h2>
              <p className="text-[13px] mb-6" style={{ color: "#7A7A7A" }}>
                Иваново · тариф «Выездная съёмка» · осень 2025
              </p>

              <div className="grid grid-cols-4 gap-2 mb-6">
                {[
                  { val: "704", label: "стр. книги" },
                  { val: "70", label: "стр. текста" },
                  { val: "600", label: "стр. фото" },
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
                  onClick={() => alert("PDF будет доступен в ближайшее время")}
                  className="btn-cta flex items-center justify-center gap-2"
                >
                  <Icon name="Download" size={16} />
                  Скачать пример книги
                </button>
                <button onClick={() => openPopup()} className="btn-secondary">Заказать такую же</button>
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
      <section className="py-10 md:py-16">
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

      {/* FAQ */}
      <FaqSection openConsult={openConsult} />

      {/* FOOTER */}
      <footer style={{ background: "#0F1419" }} className="border-t border-white/10 pt-12 pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="text-[22px] text-white mb-3">
              <span style={{ fontWeight: 400 }}>Story</span><span style={{ fontWeight: 700 }}>Box</span>
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Интервью для будущего. Сохраняем внутренний мир и истории.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Тарифы</h4>
            <ul className="space-y-2">
              {["Онлайн-книга", "Книга 3 часа", "Книга 5 часов", "Книга 8 часов"].map((name) => (
                <li key={name}>
                  <button onClick={() => openPopup(name)} className="text-[14px] hover:text-white transition-colors text-left" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Разделы</h4>
            <ul className="space-y-2">
              {[["О нас", "#about"], ["Тарифы", "#tariffs"], ["FAQ", "#faq"]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[14px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Контакты</h4>
            <ul className="space-y-2 text-[14px] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li><a href="tel:+79031932725" className="hover:text-white transition-colors">+7 903 193 27 25</a></li>
              <li>Работаем во всех крупных городах</li>
            </ul>
            <div className="flex gap-2">
              <a href="https://wa.me/79031932725" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "#25D366", color: "#fff" }}>
                <span>W</span> WhatsApp
              </a>
              <a href="https://t.me/storybox_ru" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "#2AABEE", color: "#fff" }}>
                <span>T</span> Telegram
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Мы в соцсетях</h4>
            <ul className="space-y-2">
              {[
                { label: "ВКонтакте", href: "https://vk.com/club239010528" },
                { label: "Дзен", href: "https://dzen.ru/user/oirptu9saqakc6dcdz8weitgz8m?share_to=link" },
                { label: "Telegram канал", href: "https://t.me/+V5oog1-jZNZiNzNi" },
                { label: "RuTube", href: "https://rutube.ru/channel/65993772/" },
                { label: "YouTube", href: "https://www.youtube.com/@StoryBox_interviews" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] hover:text-white transition-colors"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-[13px]"
          style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>© 2024 StoryBox. Все права защищены.</span>
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            <Link to="/legal/privacy" className="hover:text-white/60 transition-colors">Политика конфиденциальности</Link>
            <span>·</span>
            <Link to="/legal/offer" className="hover:text-white/60 transition-colors">Договор оферты</Link>
            <span>·</span>
            <Link to="/legal/data-consent" className="hover:text-white/60 transition-colors">Согласие на обработку данных</Link>
            <span>·</span>
            <Link to="/legal/marketing-consent" className="hover:text-white/60 transition-colors">Политика и согласие на рассылки</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}