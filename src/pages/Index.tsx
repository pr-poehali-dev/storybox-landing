import { useState } from "react";
import Icon from "@/components/ui/icon";
import BookingPopup from "./BookingPopup";
import ConsultPopup from "./ConsultPopup";
import TariffsSection from "./TariffsSection";
import WhyOneBook from "./WhyOneBook";
import FaqSection from "./FaqSection";
import {
  BOOK_IMG, INTERVIEW_IMG, TEAM_IMG, SPREAD_IMG, COVERS_IMG,
  NAV_LINKS, WHY_ITEMS, BOOK_FEATURES, GIFT_CARDS, PROCESS_STEPS,
  TEAM_MEMBERS, FAQ_ITEMS,
} from "./data";

export default function Index() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTariff, setPopupTariff] = useState("");
  const [consultOpen, setConsultOpen] = useState(false);
  const [activeTariff, setActiveTariff] = useState(2); // 5 часов по умолчанию

  const openPopup = (tariff = "") => { setPopupTariff(tariff); setPopupOpen(true); };
  const openConsult = () => setConsultOpen(true);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <BookingPopup open={popupOpen} onClose={() => setPopupOpen(false)} initialTariff={popupTariff} />
      <ConsultPopup open={consultOpen} onClose={() => setConsultOpen(false)} />

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-0 text-[24px] select-none">
            <span style={{ fontWeight: 400, color: "#000" }}>Story</span>
            <span style={{ fontWeight: 700, color: "#000" }}>Box</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-[15px] text-[#222] hover:text-[#00A4E3] transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/79031932725"
              target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-white text-[13px] font-bold hover:opacity-85 transition-opacity flex-shrink-0"
              style={{ background: "#25D366" }}
            >
              W
            </a>
            <a
              href="https://t.me/storybox_ru"
              target="_blank" rel="noopener noreferrer"
              aria-label="Telegram"
              className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-white text-[13px] font-bold hover:opacity-85 transition-opacity flex-shrink-0"
              style={{ background: "#2AABEE" }}
            >
              T
            </a>
            <button onClick={openConsult} className="btn-cta" style={{ padding: "10px 20px", fontSize: 14 }}>Бесплатная консультация</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-28 grid md:grid-cols-[45fr_55fr] gap-8 md:gap-12 items-center">
        <div>
          <h1 className="leading-tight mb-0" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#00A4E3" }}>
            Литературная семейная хроника на основе видео-интервью
          </h1>
          <hr className="hero-hr" />
          <p className="text-[16px] md:text-[18px] text-[#444] leading-relaxed mb-4 max-w-lg">
            QR-код на видео — внутри книги. Чтобы внуки услышали живой голос через 30 лет.
          </p>
          <p className="text-[14px] md:text-[15px] text-[#7A7A7A] mb-7">
            Интервью онлайн, в студии или дома. Работаем во всех крупных городах мира.
          </p>
          <div className="flex flex-wrap items-start gap-4">
            <a href="#tariffs" className="btn-cta">Выбрать тариф</a>
            <div>
              <button onClick={openConsult} className="btn-secondary">Бесплатная консультация</button>
              <p className="text-[12px] mt-1.5" style={{ color: "#AAAAAA" }}>
                Поможем подобрать тариф · до 30 минут · онлайн · бесплатно
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden bg-[#F2F9FF] relative" style={{ aspectRatio: "4/3" }}>
          <img src={BOOK_IMG} alt="Семейная книга воспоминаний" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
              <Icon name="Play" size={28} style={{ color: "#00A4E3", marginLeft: 4 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-soft py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <h2 className="text-[36px] font-bold text-black mb-4">О нас</h2>
              <p className="text-[17px] text-[#444] leading-relaxed">
                Мы горим идеей создания дополнительной памяти, которая позволит людям не только лучше помнить, как прошёл очередной год, но и навсегда сохранить свои представления о будущем и образ мыслей накануне выпускного, свадьбы и других значимых событий. Интервью — это лучшее воплощение этой идеи.
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
          <h3 className="text-[22px] font-bold text-black mb-8">Почему стоит выбрать StoryBox</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="sb-card">
                <h4 className="text-[18px] font-semibold text-black mb-3">{item.title}</h4>
                <p className="text-[15px] text-[#7A7A7A] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK SHOWCASE */}
      <section id="book" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 mb-14 items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#00A4E3" }}>Готовый продукт</p>
            <h2 className="text-[40px] font-bold text-black mb-0">StoryBox «Книга»</h2>
          </div>
          <div>
            <p className="text-[17px] text-[#444] leading-relaxed">
              Это не дневник и не транскрипт. Это профессиональная литературная хроника жизни вашего родителя, бабушки или дедушки, созданная из видео-интервью с психологом и оформленная как семейная реликвия.
            </p>
            <p className="text-[15px] text-[#7A7A7A] mt-3">
              От установочной встречи до книги в руках — <strong className="text-black">8 недель.</strong>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img src={SPREAD_IMG} alt="Разворот книги" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img src={COVERS_IMG} alt="Варианты обложек" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ── Почему одной книги достаточно ── */}
        <WhyOneBook openConsult={openConsult} />

        <h3 className="text-[24px] font-bold text-black mb-2">Из чего состоит каждая книга</h3>
        <p className="text-[15px] text-[#7A7A7A] mb-8">Шесть составляющих, которые входят в каждый проект</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BOOK_FEATURES.map((f) => (
            <div key={f.title} className="sb-card">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "#F2F9FF" }}>
                <Icon name={f.icon as Parameters<typeof Icon>[0]["name"]} size={20} style={{ color: "#00A4E3" }} fallback="BookOpen" />
              </div>
              <h4 className="text-[16px] font-semibold text-black mb-2">{f.title}</h4>
              <p className="text-[14px] text-[#7A7A7A] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CASE + PDF */}
      <section id="case" className="section-soft py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[55fr_45fr] gap-12 items-start">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#00A4E3" }}>
              Пример готовой книги
            </p>
            <h2 className="text-[34px] font-bold text-black mb-1">
              Ирина Александровна, 85 лет, Иваново
            </h2>
            <p className="text-[13px] mb-6" style={{ color: "#7A7A7A" }}>
              Реальный клиент StoryBox · тариф «Выездная съёмка» · осень 2025
            </p>

            <p className="text-[16px] text-[#444] leading-relaxed mb-4">
              Внучка Виктория записала бабушкин голос осенью 2025 года. Команда StoryBox приехала к Ирине Александровне домой в Иваново — без поездок в студию, в привычном кресле, рядом семейные фотографии. 3-часовое интервью с психологом превратилось в книгу: 70 страниц литературной хроники, 600 страниц оцифрованного фотоархива и QR-код на полное видео-интервью внутри обложки.
            </p>
            <p className="text-[16px] text-[#444] leading-relaxed mb-8">
              В книге есть то, чего нет в видео. Команда нашла в архивах данные о свёкре Ирины — Иване Ивановиче Гурбатове, погибшем в плену 14 мая 1942 года в лагере под бывшим Фурманово. Место, которое семья искала десятилетиями, теперь — часть семейной хроники. В приложении — стихи мужа Ирины, Валерия Ивановича, которые она много лет записывала в отдельную тетрадь.
            </p>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {[
                { val: "704", label: "стр. книги" },
                { val: "70",  label: "стр. хроники" },
                { val: "600", label: "стр. фото" },
                { val: "3 ч", label: "интервью" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl px-2 py-3 border border-[#E5E5E5] text-center">
                  <div className="text-[18px] md:text-[22px] font-extrabold text-black leading-none">{s.val}</div>
                  <div className="text-[10px] md:text-[11px] text-[#7A7A7A] mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => alert("PDF будет доступен в ближайшее время")}
                className="btn-cta flex items-center gap-2"
              >
                <Icon name="Download" size={16} />
                Скачать пример книги (PDF)
              </button>
              <button onClick={() => openPopup()} className="btn-secondary">Заказать такую же</button>
            </div>
            <p className="text-[12px] text-[#AAAAAA] mt-3">5 страниц · PDF · 2.4 МБ</p>
          </div>

          <div className="flex flex-col gap-5">
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
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
              <div className="text-[36px] leading-none mb-2" style={{ color: "#00A4E3", opacity: 0.2 }}>"</div>
              <p className="text-[15px] leading-relaxed text-[#222] mb-4" style={{ fontStyle: "italic", marginTop: -16 }}>
                Я хочу быть похожей на бабушку. Теперь у моих детей будет повод гордиться прабабушкой, даже когда её не станет рядом. Книгу будут держать в руках их внуки.
              </p>
              <p className="text-[13px] font-semibold text-[#7A7A7A]">— Виктория Гурбатова, внучка</p>
            </div>
          </div>
        </div>
      </section>

      {/* TARIFFS */}
      <TariffsSection
        activeTariff={activeTariff}
        setActiveTariff={setActiveTariff}
        openPopup={openPopup}
        openConsult={openConsult}
      />

      {/* GIFT CERTIFICATES */}
      <section id="gift" className="section-soft py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#ED4463" }}>Подарок</p>
            <h2 className="text-[40px] font-bold text-black mb-3">Оформляем подарочные сертификаты</h2>
            <p className="text-[17px] text-[#7A7A7A] max-w-xl">Подарите близким интервью, которое сохранится навсегда. Сертификат не имеет срока давности.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {GIFT_CARDS.map((g) => (
              <div key={g.name} className="rounded-xl border border-[#E5E5E5] p-6 hover:border-[#ED4463] hover:shadow-md transition-all duration-200 bg-white group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-lg group-hover:scale-110 transition-transform" style={{ background: "#FFF5F7" }}>🎁</div>
                <h4 className="text-[16px] font-bold text-black mb-1">{g.name}</h4>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[12px] text-[#AAAAAA] line-through">{g.priceOld}</span>
                  <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ background: "#ED4463" }}>−{g.discount}%</span>
                </div>
                <p className="text-[20px] font-extrabold mb-3" style={{ color: "#ED4463" }}>{g.price}</p>
                <p className="text-[13px] text-[#7A7A7A] leading-snug mb-4">{g.desc}</p>
                <button
                  onClick={() => openPopup(g.name)}
                  className="block w-full text-center text-[13px] font-semibold py-2.5 px-4 rounded-lg border-2 border-[#ED4463] text-[#ED4463] hover:bg-[#ED4463] hover:text-white transition-all duration-200"
                >
                  Заказать сертификат
                </button>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8" style={{ background: "#FFF5F7" }}>
            <div className="flex-1">
              <h3 className="text-[22px] font-bold text-black mb-2">Как это работает?</h3>
              <p className="text-[16px] text-[#444] leading-relaxed">Выбираете тариф, оплачиваете. Присылаем оформленный сертификат — распечатать или отправить в мессенджер. Получатель записывается сам, в удобное время.</p>
            </div>
            <button onClick={() => openPopup("Подарочный сертификат")} className="btn-cta flex-shrink-0" style={{ background: "#ED4463" }}>
              Заказать сертификат
            </button>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-[40px] font-bold text-black mb-3">Как проходит работа</h2>
        <p className="text-[17px] text-[#7A7A7A] mb-12">6–16 недель от первой встречи до вашей двери</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((s) => (
            <div key={s.n} className="sb-card flex gap-5 items-start">
              <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-[16px]" style={{ background: "#00A4E3" }}>
                {s.n}
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-black mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#7A7A7A] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="section-soft py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[40px] font-bold text-black mb-3">Наши интервьюеры</h2>
          <p className="text-[17px] text-[#7A7A7A] mb-12">Проверенные психологи, умеющие профессионально и бережно задавать вопросы</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((m, idx) => (
              <div key={m.name} className="sb-card text-center p-6">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-[#F2F9FF]">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <img
                      src={TEAM_IMG} alt={m.name} className="w-full h-full object-cover"
                      style={{ objectPosition: idx === 1 ? "100% 0%" : idx === 2 ? "0% 100%" : "100% 100%" }}
                    />
                  )}
                </div>
                <h3 className="text-[15px] font-semibold text-black mb-1">{m.name}</h3>
                <p className="text-[13px] text-[#7A7A7A]">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection openConsult={openConsult} />

      {/* FOOTER */}
      <footer style={{ background: "#0F1419" }} className="border-t border-white/10 pt-14 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div>
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
              {[["О нас", "#about"], ["Книга", "#book"], ["Интервьюеры", "#team"], ["FAQ", "#faq"]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[14px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Контакты</h4>
            <ul className="space-y-2 text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li><a href="tel:+79031932725" className="hover:text-white transition-colors">+7 903 193 27 25</a></li>
              <li>Работаем во всех крупных городах</li>
            </ul>
            <div className="flex gap-2 mt-4">
              <a
                href="https://wa.me/79031932725"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <span>W</span> WhatsApp
              </a>
              <a
                href="https://t.me/storybox_ru"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "#2AABEE", color: "#fff" }}
              >
                <span>T</span> Telegram
              </a>
            </div>
          </div>
        </div>
        <div
          className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-[13px]"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <span>© 2024 StoryBox. Все права защищены.</span>
          <span>Политика конфиденциальности · Договор оферты</span>
        </div>
      </footer>
    </div>
  );
}