import { useState, useRef } from "react";
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

const HERO_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/f344c56f-9b25-43a5-ab69-a4c8fe51dcd8.jpg";
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

  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const GALLERY_ITEMS = [
    { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/0d069a37-552f-48da-b1e8-605a5f113e74.png", alt: "Коллекция семейных книг StoryBox" },
    { src: BOOK_SPREAD_IMG, alt: "Разворот семейной книги StoryBox" },
    { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/b4c7ee0d-1be8-4d00-a733-e20e61158248.jpg", alt: "Премиальные обложки книг StoryBox" },
    { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/c09e7ca1-eb4b-4a20-88c1-8c06b7101416.jpg", alt: "Семейные мемуары в твёрдой обложке" },
  ];
  const scrollGallery = (dir: 1 | -1) => {
    const next = Math.max(0, Math.min(GALLERY_ITEMS.length - 1, galleryIndex + dir));
    setGalleryIndex(next);
    const el = galleryRef.current;
    if (!el) return;
    const card = el.children[next] as HTMLElement;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

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
              className="hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <svg role="presentation" width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM69.7626 28.9928C64.6172 23.841 57.7739 21.0027 50.4832 21C35.4616 21 23.2346 33.2252 23.2292 48.2522C23.2274 53.0557 24.4823 57.7446 26.8668 61.8769L23 76L37.4477 72.2105C41.4282 74.3822 45.9107 75.5262 50.4714 75.528H50.4823C65.5029 75.528 77.7299 63.301 77.7363 48.2749C77.7408 40.9915 74.9089 34.1446 69.7626 28.9928ZM62.9086 53.9588C62.2274 53.6178 58.8799 51.9708 58.2551 51.7435C57.6313 51.5161 57.1766 51.4024 56.7228 52.0845C56.269 52.7666 54.964 54.2998 54.5666 54.7545C54.1692 55.2092 53.7718 55.2656 53.0915 54.9246C52.9802 54.8688 52.8283 54.803 52.6409 54.7217C51.6819 54.3057 49.7905 53.4855 47.6151 51.5443C45.5907 49.7382 44.2239 47.5084 43.8265 46.8272C43.4291 46.1452 43.7837 45.7769 44.1248 45.4376C44.3292 45.2338 44.564 44.9478 44.7987 44.662C44.9157 44.5194 45.0328 44.3768 45.146 44.2445C45.4345 43.9075 45.56 43.6516 45.7302 43.3049C45.7607 43.2427 45.7926 43.1776 45.8272 43.1087C46.0545 42.654 45.9409 42.2565 45.7708 41.9155C45.6572 41.6877 45.0118 40.1167 44.4265 38.6923C44.1355 37.984 43.8594 37.3119 43.671 36.8592C43.1828 35.687 42.6883 35.69 42.2913 35.6924C42.2386 35.6928 42.1876 35.6931 42.1386 35.6906C41.7421 35.6706 41.2874 35.667 40.8336 35.667C40.3798 35.667 39.6423 35.837 39.0175 36.5191C38.9773 36.5631 38.9323 36.6111 38.8834 36.6633C38.1738 37.4209 36.634 39.0648 36.634 42.2002C36.634 45.544 39.062 48.7748 39.4124 49.2411L39.415 49.2444C39.4371 49.274 39.4767 49.3309 39.5333 49.4121C40.3462 50.5782 44.6615 56.7691 51.0481 59.5271C52.6732 60.2291 53.9409 60.6475 54.9303 60.9612C56.5618 61.4796 58.046 61.4068 59.22 61.2313C60.5286 61.0358 63.2487 59.5844 63.8161 57.9938C64.3836 56.4033 64.3836 55.0392 64.2136 54.7554C64.0764 54.5258 63.7545 54.3701 63.2776 54.1395C63.1633 54.0843 63.0401 54.0247 62.9086 53.9588Z" fill="#00a4e3"/></svg>
            </a>
            <a
              href="https://t.me/storybox_ru"
              target="_blank" rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:opacity-85 transition-opacity flex-shrink-0"
              style={{ background: "#2AABEE" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>
            </a>
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



      {/* ГАЛЕРЕЯ КНИГ */}
      <section className="w-full py-6 md:py-10" style={{ background: "#FAFAFA" }}>
        {/* Мобайл: ручной горизонтальный скролл */}
        <div
          className="md:hidden flex gap-3 px-4"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {[
            { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/0d069a37-552f-48da-b1e8-605a5f113e74.png", alt: "Коллекция семейных книг StoryBox" },
            { src: BOOK_SPREAD_IMG, alt: "Разворот семейной книги StoryBox" },
            { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/b4c7ee0d-1be8-4d00-a733-e20e61158248.jpg", alt: "Премиальные обложки книг StoryBox" },
            { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/c09e7ca1-eb4b-4a20-88c1-8c06b7101416.jpg", alt: "Семейные мемуары в твёрдой обложке" },
          ].map((img, i) => (
            <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: "72vw", height: "48vw" }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" style={{ display: "block" }} />
            </div>
          ))}
        </div>

        {/* Десктоп: слайдер с кнопками */}
        <div className="hidden md:block relative px-6">
          <div
            ref={galleryRef}
            className="flex gap-4 overflow-x-hidden"
          >
            {GALLERY_ITEMS.map((img, i) => (
              <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: "clamp(280px, 45vw, 560px)", height: "clamp(180px, 29vw, 360px)" }}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" style={{ display: "block" }} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollGallery(-1)}
            disabled={galleryIndex === 0}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-opacity"
            style={{ opacity: galleryIndex === 0 ? 0.3 : 1 }}
          >
            <Icon name="ChevronLeft" size={22} />
          </button>
          <button
            onClick={() => scrollGallery(1)}
            disabled={galleryIndex === GALLERY_ITEMS.length - 1}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-opacity"
            style={{ opacity: galleryIndex === GALLERY_ITEMS.length - 1 ? 0.3 : 1 }}
          >
            <Icon name="ChevronRight" size={22} />
          </button>
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
              {["Электронная книга", "Книга Light", "Книга Standard", "Книга Premium"].map((name) => (
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
            <div className="flex flex-col sm:flex-row gap-2">
              <a href="https://wa.me/79031932725" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "#25D366", color: "#fff" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.529 5.845L0 24l6.335-1.509A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.977.994-3.634-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
                WhatsApp
              </a>
              <a href="https://t.me/storybox_ru" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "#2AABEE", color: "#fff" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>
                Telegram
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