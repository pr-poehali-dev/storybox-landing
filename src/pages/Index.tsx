import { useState } from "react";
import Icon from "@/components/ui/icon";

const BOOK_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/5c696408-eaef-4a98-af3e-834659b47ae3.jpg";
const INTERVIEW_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/330cc34e-c398-43bc-bd2f-3fcf37db66d9.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/5014b3da-2408-42a8-9c0f-0f4601788e53.jpg";

const NAV_LINKS = [
  { label: "Что внутри", href: "#inside" },
  { label: "Тарифы", href: "#tariffs" },
  { label: "Кейс", href: "#case" },
  { label: "Как работаем", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const INSIDE_CARDS = [
  { emoji: "📖", title: "Литературная хроника", desc: "~70 страниц авторского текста на основе ваших семейных историй, написанных профессиональным редактором." },
  { emoji: "▶️", title: "Видео по QR-коду", desc: "Полное видео-интервью с QR-кодом внутри книги. Хранение в 3 облаках на 10 лет." },
  { emoji: "🖼️", title: "Оцифрованный фотоархив", desc: "До 600 страниц семейных фотографий с подписями, бережно оцифрованных и систематизированных." },
  { emoji: "🔍", title: "Архивная работа", desc: "Поиск по государственным архивам, военным спискам, историческим документам вашей семьи." },
];

const TARIFFS = [
  {
    name: "Онлайн-книга",
    price: "от 39 500 ₽",
    tag: null,
    features: [
      "2 Zoom-сессии",
      "~50 стр. текста",
      "Аудио по QR-коду",
      "До 200 стр. фото",
      "1 экземпляр",
    ],
  },
  {
    name: "Книга 3 часа",
    price: "от 54 500 ₽",
    tag: null,
    features: [
      "Студия 3ч, 3 камеры",
      "~70 стр. текста",
      "Видео по QR-коду",
      "До 400 стр. фото",
      "10 лет хранения",
    ],
  },
  {
    name: "Книга 5 часов",
    price: "от 79 500 ₽",
    tag: "★ РЕКОМЕНДУЕМ",
    features: [
      "Студия 5ч, 3 камеры",
      "~120 стр. текста",
      "Видео + главы по QR",
      "До 600 стр. фото",
      "Архивная работа",
      "2 экземпляра",
    ],
  },
  {
    name: "Книга 8 часов",
    price: "от 119 500 ₽",
    tag: null,
    features: [
      "8ч в студии",
      "~200 стр. текста",
      "Видео-серия по QR",
      "Без ограничений фото",
      "Расш. архивная работа",
      "Кожа + тиснение",
      "3 экз. + USB",
      "Хранение бессрочно",
    ],
  },
];

const COMPARISON = [
  { param: "Формат", vals: ["Zoom", "Студия", "Студия", "Студия"] },
  { param: "Длительность", vals: ["2 сессии", "3 ч", "5 ч", "8 ч"] },
  { param: "Страниц текста", vals: ["~50", "~70", "~120", "~200"] },
  { param: "Фотоархив", vals: ["до 200 стр.", "до 400 стр.", "до 600 стр.", "без ограничений"] },
  { param: "Видео", vals: ["Аудио", "Видео", "Видео + главы", "Видео-серия"] },
  { param: "Архивная работа", vals: ["—", "—", "✓", "Расширенная"] },
  { param: "Экземпляры", vals: ["1", "1", "2", "3 + USB"] },
  { param: "Обложка", vals: ["Стандарт", "Стандарт", "Премиум", "Кожа + тиснение"] },
  { param: "Хранение видео", vals: ["5 лет", "10 лет", "10 лет", "Бессрочно"] },
  { param: "Срок работы", vals: ["6–8 нед.", "8–10 нед.", "10–14 нед.", "12–16 нед."] },
];

const PROCESS_STEPS = [
  { n: "1", title: "Установочная встреча", desc: "Бесплатная 30-минутная встреча с куратором. Обсуждаем историю семьи, выбираем формат." },
  { n: "2", title: "Видео-интервью", desc: "Психолог проводит интервью с вашим родителем — в студии или онлайн. От 2 до 8 часов." },
  { n: "3", title: "AI-транскрипция", desc: "Разборчивая расшифровка разговора с помощью ИИ. Редактор сохраняет живой голос и стиль." },
  { n: "4", title: "Литературная адаптация", desc: "Авторский текст из расшифровки — с сохранением характера и манеры речи рассказчика." },
  { n: "5", title: "Архив и фото", desc: "Оцифровка фотографий, поиск по архивам, вёрстка книги с иллюстрациями." },
  { n: "6", title: "Печать и доставка", desc: "Офсетная печать в твёрдой обложке, доставка по России и за рубеж." },
];

const TEAM_MEMBERS = [
  { name: "Анна Чемрова", role: "Семейный психолог, нарративная практика" },
  { name: "Елена Дараганова", role: "Клинический психолог, 12 лет опыта" },
  { name: "Мария Аникина", role: "Психолог, биографические интервью" },
  { name: "Кирилл Третьяков", role: "Психолог, работа с пожилыми людьми" },
];

const FAQ_ITEMS = [
  { q: "Нужно ли согласие самого родителя?", a: "Да, участие только добровольное. Наш психолог на установочной встрече объяснит формат и убедится, что человек понимает и принимает условия." },
  { q: "Какие темы затрагиваются в интервью?", a: "Детство, семья, профессия, важные события жизни, ценности, воспоминания. Психолог ведёт беседу мягко, без давления — рассказчик сам выбирает, что раскрывать." },
  { q: "Чем тариф «5 часов» отличается от «3 часов»?", a: "Объём текста вдвое больше (~120 против ~70 стр.), входит архивная работа по государственным архивам, 2 экземпляра книги и видео разбито на главы с отдельными QR-кодами." },
  { q: "Что включает тариф «8 часов»?", a: "Максимальная глубина: расширенная архивная работа, обложка из натуральной кожи с тиснением, 3 экземпляра плюс USB-носитель, бессрочное хранение видео в облаке." },
  { q: "Можно ли заказать дополнительные экземпляры?", a: "Да, дополнительный экземпляр — от 9 500 ₽. Заказать можно при оформлении или после получения первой партии." },
  { q: "Что такое архивная работа?", a: "Поиск по государственным архивам России: военные списки, метрические книги, документы ЗАГСа, региональные хроники. Входит в тарифы «5 часов» и «8 часов»." },
  { q: "Где хранится видео?", a: "Видео сохраняется в трёх независимых облачных хранилищах. В зависимости от тарифа — 5 лет, 10 лет или бессрочно." },
  { q: "Можно ли провести интервью удалённо?", a: "Да, тариф «Онлайн-книга» полностью проходит в Zoom. Остальные тарифы — в нашей студии в Москве, выезд обсуждается отдельно." },
  { q: "Сколько времени занимает весь процесс?", a: "От 6 до 16 недель в зависимости от тарифа. Срок по каждому тарифу указан в таблице сравнения." },
  { q: "Можно ли сделать парную книгу о двух людях?", a: "Да, мы делаем парные и даже семейные хроники о нескольких поколениях. Стоимость рассчитывается индивидуально — уточняйте на установочной встрече." },
];

export default function Index() {
  const [toast, setToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "", contact: "", about: "", tariff: "", agree: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    setFormData({ name: "", contact: "", about: "", tariff: "", agree: false });
  };

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-0 text-[24px] select-none">
            <span style={{ fontWeight: 400, color: "#000" }}>Story</span>
            <span style={{ fontWeight: 700, color: "#000" }}>Box</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[15px] text-[#222] hover:text-[#00A4E3] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[14px] font-bold transition-opacity hover:opacity-80"
              style={{ background: "#00A4E3" }}
            >
              W
            </a>
            <a
              href="https://t.me/"
              aria-label="Telegram"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[14px] font-bold transition-opacity hover:opacity-80"
              style={{ background: "#00A4E3" }}
            >
              T
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-[45fr_55fr] gap-12 items-center">
        <div>
          <h1
            className="leading-tight mb-0"
            style={{ fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 700, color: "#00A4E3" }}
          >
            Книга, в которой будет звучать её голос
          </h1>
          <hr className="hero-hr" />
          <p className="text-[18px] text-[#222] leading-relaxed mb-8 max-w-lg">
            Литературная семейная хроника на основе видео-интервью с вашими родителями. QR-код на полное видео — внутри книги. Чтобы внуки услышали живой голос через 30 лет.
          </p>
          <a href="#tariffs" className="btn-cta">Записаться</a>
          <p className="mt-4 text-[14px] text-[#7A7A7A]">Бесплатная установочная встреча. 30 минут.</p>
        </div>
        <div className="rounded-2xl overflow-hidden bg-[#F2F9FF] relative" style={{ aspectRatio: "4/3" }}>
          <img src={BOOK_IMG} alt="Семейная книга воспоминаний" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
            >
              <Icon name="Play" size={28} style={{ color: "#00A4E3", marginLeft: 4 }} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center text-[13px] py-2">
            Видео разлистывания книги
          </div>
        </div>
      </section>

      {/* EMOTIONAL HOOK */}
      <section className="section-soft py-20">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <p className="text-[20px] text-[#222] leading-relaxed mb-6">
            Через 30 лет ваши внуки не вспомнят, как пахла её квартира, как звучал её смех, какими словами она называла вас в детстве.
          </p>
          <p style={{ fontSize: 28, fontWeight: 700, color: "#00A4E3" }}>
            Кроме того, что мы запишем.
          </p>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section id="inside" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-[40px] font-bold text-black mb-3">Это не дневник. Это семейная хроника.</h2>
        <p className="text-[#7A7A7A] mb-12 text-[17px]">Четыре составляющих каждого проекта</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {INSIDE_CARDS.map((c) => (
            <div key={c.title} className="sb-card">
              <div className="text-4xl mb-4">{c.emoji}</div>
              <h3 className="text-[22px] font-semibold text-black mb-3">{c.title}</h3>
              <p className="text-[#7A7A7A] text-[16px] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TARIFFS */}
      <section id="tariffs" className="section-soft py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[40px] font-bold text-black mb-3">Четыре уровня глубины</h2>
          <p className="text-[#7A7A7A] mb-12 text-[17px]">Выберите формат под вашу историю</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TARIFFS.map((t) => (
              <div
                key={t.name}
                className={`sb-card flex flex-col relative ${t.tag ? "tariff-recommended" : ""}`}
              >
                {t.tag && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-[12px] font-bold whitespace-nowrap"
                    style={{ background: "#ED4463" }}
                  >
                    {t.tag}
                  </div>
                )}
                <h3 className="text-[20px] font-semibold text-black mb-2">{t.name}</h3>
                <p className="text-[36px] font-extrabold mb-6" style={{ color: "#00A4E3" }}>{t.price}</p>
                <ul className="flex-1 space-y-3 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[15px] text-[#222]">
                      <span style={{ color: "#00A4E3", marginTop: 2, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" className="btn-cta text-center block">Записаться</a>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-[15px] text-[#7A7A7A]">
            Доп. экз — от 9 500 ₽&nbsp;·&nbsp;Оплата СБП, МИР, Юmoney&nbsp;·&nbsp;Рассрочка 2–6 мес.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-[40px] font-bold text-black mb-10">Сравнение тарифов</h2>
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-[#E5E5E5]">
          <table className="w-full border-collapse text-[15px]">
            <thead>
              <tr style={{ background: "#00A4E3", color: "#fff" }}>
                <th className="text-left py-4 px-5 font-semibold">Параметр</th>
                {TARIFFS.map((t) => (
                  <th key={t.name} className="text-left py-4 px-5 font-semibold">{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.param} className={i % 2 === 0 ? "bg-white" : "bg-[#F2F9FF]"}>
                  <td className="py-3 px-5 font-semibold text-[#222]">{row.param}</td>
                  {row.vals.map((v, vi) => (
                    <td key={vi} className={`py-3 px-5 ${vi === 2 ? "font-semibold text-black" : "text-[#7A7A7A]"}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile stacked */}
        <div className="md:hidden space-y-6">
          {TARIFFS.map((t, ti) => (
            <div key={t.name} className={`sb-card ${t.tag ? "tariff-recommended" : ""}`}>
              <h3 className="text-[18px] font-bold mb-1 text-black">{t.name}</h3>
              <p className="text-[28px] font-extrabold mb-4" style={{ color: "#00A4E3" }}>{t.price}</p>
              <div className="space-y-2">
                {COMPARISON.map((row) => (
                  <div key={row.param} className="flex justify-between text-[14px] border-b border-[#E5E5E5] pb-2">
                    <span className="text-[#7A7A7A]">{row.param}</span>
                    <span className="font-semibold text-[#000]">{row.vals[ti]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE */}
      <section id="case" className="section-soft py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[40px] font-bold text-black mb-8">Ирина Александровна, 85 лет</h2>
          <div className="rounded-2xl overflow-hidden mb-8 relative" style={{ aspectRatio: "16/9" }}>
            <img src={INTERVIEW_IMG} alt="Кейс" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                <Icon name="Play" size={28} style={{ color: "#00A4E3", marginLeft: 4 }} />
              </div>
            </div>
          </div>
          <p className="text-[17px] text-[#222] leading-relaxed mb-6">
            Ирина Александровна родилась в Ленинграде в 1939 году. Когда наш архивист начал работу, выяснилось, что её дед находился в немецком плену в 1942 году — и это было задокументировано в федеральном архиве. Семья не знала об этом 80 лет. Теперь это глава в книге.
          </p>
          <a href="#" className="btn-secondary">Скачать PDF, 5 страниц</a>
        </div>
      </section>

      {/* QUOTE */}
      <section className="max-w-[800px] mx-auto px-6 py-20 text-center">
        <p className="text-[22px] leading-relaxed text-[#222] mb-6" style={{ fontStyle: "italic" }}>
          «Я хочу быть похожей на бабушку. Теперь у моих детей будет повод гордиться прабабушкой. Книгу будут держать в руках их внуки.»
        </p>
        <p className="text-[16px] font-semibold text-[#7A7A7A]">— Виктория Гурбатова, внучка</p>
      </section>

      {/* PROCESS */}
      <section id="process" className="section-soft py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[40px] font-bold text-black mb-3">Как мы работаем</h2>
          <p className="text-[#7A7A7A] mb-12 text-[17px]">6–16 недель от первой встречи до вашей двери</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((s) => (
              <div key={s.n} className="sb-card flex gap-5 items-start">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[18px]"
                  style={{ background: "#00A4E3" }}
                >
                  {s.n}
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-black mb-2">{s.title}</h3>
                  <p className="text-[15px] text-[#7A7A7A] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-[40px] font-bold text-black mb-3">Наша команда</h2>
        <p className="text-[#7A7A7A] mb-12 text-[17px]">Психологи с опытом работы с семейными историями</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((m, idx) => (
            <div key={m.name} className="sb-card text-center p-6">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-[#F2F9FF]">
                <img
                  src={TEAM_IMG}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition:
                      idx === 0 ? "0% 0%" :
                      idx === 1 ? "100% 0%" :
                      idx === 2 ? "0% 100%" :
                      "100% 100%",
                  }}
                />
              </div>
              <h3 className="text-[16px] font-semibold text-black mb-1">{m.name}</h3>
              <p className="text-[13px] text-[#7A7A7A] leading-snug">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-soft py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[40px] font-bold text-black mb-10">Частые вопросы</h2>
          <div>
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon">
                    <span className="faq-icon-plus">+</span>
                    <span className="faq-icon-minus">−</span>
                  </span>
                </summary>
                <div className="faq-content">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="py-32 px-6" style={{ background: "#0F1419" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[40px] font-bold text-white mb-6">
              Самый сложный шаг — первый звонок
            </h2>
            <p className="text-[17px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Расскажите нам об истории вашей семьи. Мы слушаем с вниманием и уважением — и вместе поймём, какой формат подходит именно вам.
            </p>
          </div>
          <div className="bg-white rounded-[12px] p-8 max-w-[500px] w-full">
            <h3 className="text-[20px] font-bold text-black mb-6">Записаться на встречу</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[14px] font-semibold text-[#222] mb-1">Ваше имя</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Имя"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#222] mb-1">Телефон или Telegram</label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="+7 999 123-45-67 или @username"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#222] mb-1">О ком книга?</label>
                <select
                  required
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors bg-white"
                >
                  <option value="">Выберите вариант</option>
                  <option>О маме</option>
                  <option>Об отце</option>
                  <option>О бабушке</option>
                  <option>О дедушке</option>
                  <option>О другом родственнике</option>
                  <option>Парная книга</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#222] mb-1">Тариф</label>
                <select
                  value={formData.tariff}
                  onChange={(e) => setFormData({ ...formData, tariff: e.target.value })}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors bg-white"
                >
                  <option value="">Пока не знаю</option>
                  {TARIFFS.map((t) => (
                    <option key={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  required
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-1 w-4 h-4 cursor-pointer"
                  style={{ accentColor: "#00A4E3" }}
                />
                <label htmlFor="agree" className="text-[13px] text-[#7A7A7A] leading-snug cursor-pointer">
                  Я согласен(-на) на обработку персональных данных в соответствии с политикой конфиденциальности
                </label>
              </div>
              <button type="submit" className="btn-cta w-full text-center">
                Записать установочную встречу
              </button>
            </form>
            <div className="flex flex-wrap gap-4 mt-5 text-[13px] text-[#7A7A7A]">
              <span>✓ Возврат в течение 24ч</span>
              <span>✓ NDA по запросу</span>
              <span>✓ Оплата СБП</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0F1419" }} className="border-t border-white/10 pt-16 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="text-[22px] text-white mb-3">
              <span style={{ fontWeight: 400 }}>Story</span>
              <span style={{ fontWeight: 700 }}>Box</span>
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Семейные книги воспоминаний на основе видео-интервью с психологом.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Продукты</h4>
            <ul className="space-y-2">
              {["Онлайн-книга", "Книга 3 часа", "Книга 5 часов", "Книга 8 часов", "Доп. экземпляр"].map((i) => (
                <li key={i}>
                  <a href="#tariffs" className="text-[14px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">О нас</h4>
            <ul className="space-y-2">
              {["Как работаем", "Наша команда", "Кейсы", "Архивная работа"].map((i) => (
                <li key={i}>
                  <a href="#process" className="text-[14px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Контакты</h4>
            <ul className="space-y-2 text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li><a href="https://wa.me/" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="https://t.me/" className="hover:text-white transition-colors">Telegram</a></li>
              <li>hello@storybox.ru</li>
              <li>Москва, Россия</li>
            </ul>
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

      {/* TOAST */}
      {toast && (
        <div className="toast-success">
          ✓ Заявка принята — мы свяжемся с вами в течение дня
        </div>
      )}
    </div>
  );
}
