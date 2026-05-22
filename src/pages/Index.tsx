import { useState } from "react";
import Icon from "@/components/ui/icon";
import BookingPopup from "./BookingPopup";
import ConsultPopup from "./ConsultPopup";
import TariffsSection from "./TariffsSection";
import FaqSection from "./FaqSection";
import {
  SPREAD_IMG, COVERS_IMG,
  NAV_LINKS, BOOK_FEATURES, PROCESS_STEPS,
  TEAM_MEMBERS,
} from "./data";

const HERO_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/fd310fb0-c335-470c-b966-732b344805cf.jpg";
const BOOK_SPREAD_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/092dd021-1b7d-4089-94bf-c958bff5c481.jpg";

export default function Index() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTariff, setPopupTariff] = useState("");
  const [consultOpen, setConsultOpen] = useState(false);
  const [activeTariff, setActiveTariff] = useState(2);

  const openPopup = (tariff = "") => { setPopupTariff(tariff); setPopupOpen(true); };
  const openConsult = () => setConsultOpen(true);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <BookingPopup open={popupOpen} onClose={() => setPopupOpen(false)} initialTariff={popupTariff} />
      <ConsultPopup open={consultOpen} onClose={() => setConsultOpen(false)} />

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-0 text-[22px] md:text-[24px] select-none">
            <span style={{ fontWeight: 400, color: "#000" }}>Story</span>
            <span style={{ fontWeight: 700, color: "#000" }}>Box</span>
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
          </div>
        </div>
      </header>

      {/* HERO — фото на всю ширину, текст снизу */}
      <section className="w-full">
        <div className="w-full overflow-hidden" style={{ maxHeight: "70vw", minHeight: 260 }}>
          <img
            src={HERO_IMG}
            alt="Бабушка держит семейную книгу воспоминаний"
            className="w-full object-cover object-center"
            style={{ display: "block", maxHeight: "70vw", minHeight: 260 }}
          />
        </div>
        <div className="bg-white px-4 md:px-8 pt-8 pb-10 max-w-7xl mx-auto">
          <h1 className="leading-tight mb-4" style={{ fontSize: "clamp(28px, 6vw, 54px)", fontWeight: 700, color: "#000" }}>
            Превращаем воспоминания<br className="hidden md:block" /> в книги
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#444] leading-relaxed mb-8 max-w-2xl">
            Мы бережно интервьюируем ваших близких, помогаем собрать фотографии и создаём красивую книгу, которая сохранит семейные истории на годы.
          </p>
          <a href="#tariffs" className="btn-cta inline-block" style={{ fontSize: 16, padding: "14px 32px" }}>
            Выбрать тариф
          </a>
        </div>
      </section>

      {/* РАЗВОРОТ КНИГИ — zoom-фото */}
      <section className="w-full bg-[#F8F8F8] py-2">
        <div className="overflow-hidden" style={{ maxHeight: "56vw", minHeight: 200 }}>
          <img
            src={BOOK_SPREAD_IMG}
            alt="Разворот семейной книги StoryBox"
            className="w-full object-cover object-center"
            style={{ display: "block" }}
          />
        </div>
      </section>

      {/* ИЗ ЧЕГО СОСТОИТ КНИГА — горизонтальный скролл */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-[28px] md:text-[40px] font-bold text-black mb-2">Из чего состоит каждая книга</h2>
          <p className="text-[15px] md:text-[17px] text-[#7A7A7A] mb-8">Шесть составляющих, которые входят в каждый проект</p>
        </div>
        <div
          className="flex gap-4 px-4 md:px-6 pb-2"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {BOOK_FEATURES.map((f) => (
            <div
              key={f.title}
              className="sb-card flex-shrink-0"
              style={{ width: "clamp(260px, 75vw, 320px)" }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "#F2F9FF" }}>
                <Icon name={f.icon as Parameters<typeof Icon>[0]["name"]} size={20} style={{ color: "#00A4E3" }} fallback="BookOpen" />
              </div>
              <h4 className="text-[16px] font-semibold text-black mb-2">{f.title}</h4>
              <p className="text-[14px] text-[#7A7A7A] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* КАК ЭТО РАБОТАЕТ — горизонтальный скролл */}
      <section className="py-12 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-[28px] md:text-[40px] font-bold text-black mb-2">Как это работает</h2>
          <p className="text-[15px] md:text-[17px] text-[#7A7A7A] mb-8">От первой встречи до книги в ваших руках — 3 простых шага</p>
        </div>
        <div
          className="flex gap-4 px-4 md:px-6 pb-2"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[
            {
              n: "1",
              title: "Созвон и запись интервью",
              desc: "Обсуждаем историю семьи, подбираем вопросы и проводим видео-интервью с психологом — онлайн, в студии или дома.",
            },
            {
              n: "2",
              title: "Литературная обработка",
              desc: "Расшифровываем интервью, редактируем в живой текст, собираем и оцифровываем фотоархив, ищем данные в архивах.",
            },
            {
              n: "3",
              title: "Верстка, печать и доставка",
              desc: "Создаём красивую книгу в твёрдой обложке и доставляем прямо к вашей двери — в любую точку мира.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="sb-card flex-shrink-0 flex flex-col"
              style={{ width: "clamp(260px, 75vw, 340px)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[20px] mb-5 flex-shrink-0"
                style={{ background: "#00A4E3" }}
              >
                {s.n}
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-3">{s.title}</h3>
              <p className="text-[14px] text-[#7A7A7A] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ТАРИФЫ */}
      <TariffsSection
        activeTariff={activeTariff}
        setActiveTariff={setActiveTariff}
        openPopup={openPopup}
        openConsult={openConsult}
      />

      {/* ОТЗЫВ ИРИНЫ АЛЕКСАНДРОВНЫ */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#00A4E3" }}>
                Пример готовой книги
              </p>
              <h2 className="text-[28px] md:text-[34px] font-bold text-black mb-1">
                Ирина Александровна, 85 лет
              </h2>
              <p className="text-[13px] mb-6" style={{ color: "#7A7A7A" }}>
                Реальный клиент StoryBox · тариф «Выездная съёмка» · осень 2025
              </p>

              <p className="text-[15px] md:text-[16px] text-[#444] leading-relaxed mb-4">
                Внучка Виктория записала бабушкин голос осенью 2025 года. Команда StoryBox приехала к Ирине Александровне домой в Иваново — без поездок в студию, в привычном кресле, рядом семейные фотографии. 3-часовое интервью с психологом превратилось в книгу: 70 страниц литературной хроники, 600 страниц оцифрованного фотоархива и QR-код на полное видео-интервью внутри обложки.
              </p>

              <div className="grid grid-cols-4 gap-2 mb-8">
                {[
                  { val: "704", label: "стр. книги" },
                  { val: "70", label: "стр. хроники" },
                  { val: "600", label: "стр. фото" },
                  { val: "3 ч", label: "интервью" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl px-2 py-3 border border-[#E5E5E5] text-center">
                    <div className="text-[18px] md:text-[22px] font-extrabold text-black leading-none">{s.val}</div>
                    <div className="text-[10px] md:text-[11px] text-[#7A7A7A] mt-0.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F2F9FF] rounded-2xl p-6 mb-6">
                <div className="text-[40px] leading-none mb-2" style={{ color: "#00A4E3", opacity: 0.3 }}>"</div>
                <p className="text-[15px] md:text-[16px] leading-relaxed text-[#222] mb-4" style={{ fontStyle: "italic", marginTop: -16 }}>
                  Я хочу быть похожей на бабушку. Теперь у моих детей будет повод гордиться прабабушкой, даже когда её не станет рядом. Книгу будут держать в руках их внуки.
                </p>
                <p className="text-[13px] font-semibold text-[#7A7A7A]">— Виктория Гурбатова, внучка</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => alert("PDF будет доступен в ближайшее время")}
                  className="btn-cta flex items-center gap-2"
                >
                  <Icon name="Download" size={16} />
                  Пример книги (PDF)
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
      <section id="about" className="section-soft py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-12">
            <div>
              <h2 className="text-[28px] md:text-[40px] font-bold text-black mb-5">О нас</h2>
              <p className="text-[15px] md:text-[17px] text-[#444] leading-relaxed mb-6">
                Мы горим идеей создания дополнительной памяти, которая позволит людям не только лучше помнить, как прошёл очередной год, но и навсегда сохранить свои представления о будущем и образ мыслей накануне выпускного, свадьбы и других значимых событий.
              </p>
              <p className="text-[15px] text-[#7A7A7A] leading-relaxed">
                Интервью — это лучшее воплощение этой идеи. Профессиональный психолог задаёт вопросы, которые открывают то, о чём никогда не спрашивают.
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

          {/* Интервьюеры */}
          <h3 className="text-[22px] md:text-[28px] font-bold text-black mb-2">Наши интервьюеры</h3>
          <p className="text-[15px] text-[#7A7A7A] mb-8">Проверенные психологи, умеющие профессионально и бережно задавать вопросы</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TEAM_MEMBERS.map((m) => (
              <div key={m.name} className="sb-card overflow-hidden p-0">
                <div className="w-full aspect-[3/4] overflow-hidden bg-[#F2F9FF]">
                  <img src={m.photo!} alt={m.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="px-3 md:px-4 py-3 md:py-4 text-center">
                  <h3 className="text-[13px] md:text-[15px] font-semibold text-black mb-0.5">{m.name}</h3>
                  <p className="text-[12px] md:text-[13px] text-[#7A7A7A]">{m.role}</p>
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
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10">
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
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-[13px]"
          style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>© 2024 StoryBox. Все права защищены.</span>
          <span>Политика конфиденциальности · Договор оферты</span>
        </div>
      </footer>
    </div>
  );
}
