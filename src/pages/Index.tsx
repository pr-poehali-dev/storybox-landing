import { useState } from "react";
import Icon from "@/components/ui/icon";

const BOOK_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/5c696408-eaef-4a98-af3e-834659b47ae3.jpg";
const INTERVIEW_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/330cc34e-c398-43bc-bd2f-3fcf37db66d9.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/5014b3da-2408-42a8-9c0f-0f4601788e53.jpg";

const NAV_LINKS = [
  { label: "О нас", href: "#about" },
  { label: "Тарифы", href: "#tariffs" },
  { label: "Интервьюеры", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#cta" },
];

const WHY_ITEMS = [
  {
    title: "Профессионализм",
    desc: "Наши интервьюеры — профессиональные психологи, умеющие задавать точные вопросы и обходить нежелательные темы.",
  },
  {
    title: "Конфиденциальность",
    desc: "Интервьюеры и операторы подписывают соглашение о неразглашении, интервью хранятся в защищённых хранилищах.",
  },
  {
    title: "Гибкость",
    desc: "Вы можете корректировать список вопросов и заказать несколько версий интервью — для себя и для публикации.",
  },
  {
    title: "Бережность",
    desc: "Наши специалисты внимательно обсудят с вами темы, которые стоит раскрыть или обойти.",
  },
];

const TARIFFS = [
  {
    name: "Онлайн-книга",
    duration: "Интервью в Zoom",
    price: "от 39 500 ₽",
    tag: null,
    hook: "Первый шаг — записать. Без студии, в удобное время.",
    features: [
      { text: "2 Zoom-сессии", highlight: false },
      { text: "~50 страниц авторского текста", highlight: false },
      { text: "Аудио по QR-коду внутри книги", highlight: false },
      { text: "До 200 страниц фотоархива", highlight: false },
      { text: "1 экземпляр в твёрдой обложке", highlight: false },
      { text: "Хранение записи 5 лет", highlight: false },
    ],
  },
  {
    name: "Книга 3 часа",
    duration: "Студия · 3 камеры",
    price: "от 54 500 ₽",
    tag: null,
    hook: "Полноценная история жизни с профессиональным видео.",
    features: [
      { text: "3 часа в студии, 3 камеры", highlight: false },
      { text: "~70 страниц авторского текста", highlight: false },
      { text: "Полное видео по QR-коду", highlight: true },
      { text: "До 400 страниц фотоархива", highlight: false },
      { text: "2 версии: для себя и для публикации", highlight: false },
      { text: "Хранение видео в 3 сервисах · 10 лет", highlight: false },
    ],
  },
  {
    name: "Книга 5 часов",
    duration: "Студия · 3 камеры",
    price: "от 79 500 ₽",
    tag: "Чаще всего выбирают",
    hook: "Глубина, которую помнят внуки. Архив + 2 экземпляра.",
    features: [
      { text: "5 часов в студии, 3 камеры", highlight: false },
      { text: "~120 страниц авторского текста", highlight: true },
      { text: "Видео + главы с отдельными QR-кодами", highlight: true },
      { text: "До 600 страниц фотоархива", highlight: false },
      { text: "Архивная работа по гос. архивам", highlight: true },
      { text: "2 версии: для себя и для публикации", highlight: false },
      { text: "2 экземпляра · хранение видео 10 лет", highlight: false },
    ],
  },
  {
    name: "Книга 8 часов",
    duration: "Студия · максимум",
    price: "от 119 500 ₽",
    tag: null,
    hook: "Полная семейная хроника. Кожа, тиснение, бессрочно.",
    features: [
      { text: "8 часов в студии", highlight: false },
      { text: "~200 страниц авторского текста", highlight: true },
      { text: "Видео-серия по главам с QR-кодами", highlight: true },
      { text: "Фотоархив без ограничений", highlight: false },
      { text: "Расширенная архивная работа", highlight: true },
      { text: "Обложка из натуральной кожи с тиснением", highlight: true },
      { text: "3 экземпляра + USB-носитель", highlight: false },
      { text: "Бессрочное хранение в облаке", highlight: true },
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

const GIFT_CARDS = [
  { name: "Онлайн-книга", price: "от 39 500 ₽", desc: "Интервью в Zoom, ~50 стр., аудио по QR" },
  { name: "Книга 3 часа", price: "от 54 500 ₽", desc: "Студия, профессиональное видео по QR" },
  { name: "Книга 5 часов", price: "от 79 500 ₽", desc: "Студия, архивная работа, 2 экземпляра" },
  { name: "Книга 8 часов", price: "от 119 500 ₽", desc: "Полная хроника, кожа, тиснение, бессрочно" },
];

const PROCESS_STEPS = [
  { n: "1", title: "Бесплатная консультация", desc: "30 минут с куратором: обсуждаем историю семьи, выбираем формат и договариваемся о темах." },
  { n: "2", title: "Интервью с психологом", desc: "Психолог проводит интервью — в студии, онлайн или в любой локации. От 2 до 8 часов." },
  { n: "3", title: "Транскрипция и редактура", desc: "Расшифровка с сохранением живого голоса и характера речи рассказчика." },
  { n: "4", title: "Авторский текст", desc: "Литературная адаптация: редактор превращает расшифровку в читаемую семейную хронику." },
  { n: "5", title: "Архив и фотоверстка", desc: "Оцифровка фотографий, поиск по архивам, вёрстка книги с иллюстрациями." },
  { n: "6", title: "Печать и доставка", desc: "Офсетная печать в твёрдой обложке. Доставка по России и за рубеж." },
];

const TEAM_MEMBERS = [
  { name: "Екатерина Чемрова", role: "Психолог, детский психолог" },
  { name: "Дарья Дараганова", role: "Психолог" },
  { name: "Екатерина Аникина", role: "Психолог" },
  { name: "Максим Третьяков", role: "Психолог" },
];

const FAQ_ITEMS = [
  {
    q: "Какие вопросы вы задаёте взрослым?",
    a: "Вопросы охватывают детство, семью, профессиональный путь, важные события жизни, ценности и воспоминания. Список согласовывается заранее — вы можете его скорректировать и закрыть любые темы.",
  },
  {
    q: "Какие вопросы вы задаёте детям?",
    a: "Психолог работает по возрасту: мечты, друзья, что нравится и что пугает, взгляды на будущее. Беседа строится так, чтобы ребёнок говорил свободно, без ощущения «правильных ответов».",
  },
  {
    q: "Как проходит интервью?",
    a: "Психолог заранее обсуждает с вами список тем. В день записи — беседа в комфортном темпе. Никаких сценариев: живой разговор, который ведётся бережно и профессионально.",
  },
  {
    q: "Как проходит интервью со старшими родственниками?",
    a: "Особый формат: психолог учитывает возраст, темп и эмоциональное состояние собеседника. Нежелательные темы обходятся. Можно проводить дома или в студии — в зависимости от самочувствия.",
  },
  {
    q: "Как и где хранятся записи?",
    a: "Видео хранится в трёх независимых защищённых облачных сервисах. В зависимости от тарифа — 5 лет, 10 лет или бессрочно. Доступ — по QR-коду внутри книги.",
  },
  {
    q: "Кто берёт интервью?",
    a: "Только профессиональные психологи из нашей команды. Каждый из них прошёл специальный отбор и подписал соглашение о конфиденциальности.",
  },
  {
    q: "Можно ли заказать несколько версий интервью?",
    a: "Да — во всех студийных тарифах входят 2 версии монтажа: полная (для семьи) и сокращённая (для публикации или показа гостям).",
  },
  {
    q: "Работаете ли вы в других городах?",
    a: "Онлайн-формат доступен в любом городе мира. Студийные форматы — Москва, и мы работаем во всех крупных городах. Уточните ваш город на консультации.",
  },
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
              <a key={l.label} href={l.href} className="text-[15px] text-[#222] hover:text-[#00A4E3] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+79031932725" className="hidden md:block text-[15px] font-semibold text-[#222] hover:text-[#00A4E3] transition-colors">
              +7 903 193 27 25
            </a>
            <a href="#cta" className="btn-cta" style={{ padding: "10px 20px", fontSize: 14 }}>
              Записаться
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-[45fr_55fr] gap-12 items-center">
        <div>
          <h1
            className="leading-tight mb-0"
            style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#00A4E3" }}
          >
            Сохраним внутренний мир и истории
          </h1>
          <hr className="hero-hr" />
          <p className="text-[18px] text-[#444] leading-relaxed mb-4 max-w-lg">
            Запишем интервью, которые сохранят в вечности ваш внутренний мир, истории старших родственников, а также мысли ваших детей в разные периоды жизни.
          </p>
          <p className="text-[15px] text-[#7A7A7A] mb-8">
            Интервью онлайн, в студии или в любой другой локации. Работаем во всех крупных городах мира.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#tariffs" className="btn-cta">Выбрать тариф</a>
            <a href="#cta" className="btn-secondary">Бесплатная консультация</a>
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

      {/* ABOUT + WHY */}
      <section id="about" className="section-soft py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="text-[36px] font-bold text-black mb-4">О нас</h2>
            <p className="text-[17px] text-[#444] leading-relaxed">
              Мы горим идеей создания дополнительной памяти, которая позволит людям не только лучше помнить, как прошёл очередной год, но и навсегда сохранить свои представления о будущем и образ мыслей накануне выпускного, свадьбы и других значимых событий. И интервью — это пока лучшее воплощение этой идеи.
            </p>
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

      {/* TARIFFS */}
      <section id="tariffs" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-[40px] font-bold text-black mb-3">Выберите тариф</h2>
          <p className="text-[17px] text-[#7A7A7A]">Запишитесь на бесплатную консультацию — поможем определиться</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {TARIFFS.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col relative rounded-xl border transition-all duration-200 hover:shadow-lg ${
                t.tag
                  ? "border-[#ED4463] shadow-md"
                  : "border-[#E5E5E5] hover:border-[#00A4E3]"
              }`}
              style={{ background: "#fff" }}
            >
              {t.tag && (
                <div
                  className="absolute -top-3.5 left-6 px-3 py-1 rounded-full text-white text-[11px] font-bold tracking-wide uppercase"
                  style={{ background: "#ED4463" }}
                >
                  {t.tag}
                </div>
              )}

              <div className="p-7 pb-0">
                <p className="text-[12px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#00A4E3" }}>
                  {t.duration}
                </p>
                <h3 className="text-[22px] font-bold text-black mb-3">{t.name}</h3>
                <p className="text-[14px] text-[#7A7A7A] leading-snug mb-5 min-h-[40px]">{t.hook}</p>
                <p className="text-[34px] font-extrabold text-black mb-1" style={{ lineHeight: 1 }}>
                  {t.price}
                </p>
              </div>

              <div className="px-7 pt-5 pb-2">
                <div className="border-t border-[#F0F0F0] pt-5 space-y-2.5">
                  {t.features.map((f) => (
                    <div key={f.text} className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 flex-shrink-0 text-[13px] font-bold"
                        style={{ color: f.highlight ? "#ED4463" : "#00A4E3" }}
                      >
                        {f.highlight ? "★" : "✓"}
                      </span>
                      <span className={`text-[14px] leading-snug ${f.highlight ? "font-semibold text-black" : "text-[#444]"}`}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-7 pt-6 mt-auto">
                <a href="#cta" className="btn-cta block text-center w-full">
                  Записаться
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[14px] text-[#7A7A7A]">
          Доп. экземпляр — от 9 500 ₽&nbsp;·&nbsp;Оплата СБП, МИР, Юmoney&nbsp;·&nbsp;Рассрочка 2–6 месяцев
        </p>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section-soft py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-[24px] font-bold text-black mb-8">Сравнение тарифов</h3>
          <div className="hidden md:block overflow-x-auto rounded-xl border border-[#E5E5E5]">
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr style={{ background: "#00A4E3", color: "#fff" }}>
                  <th className="text-left py-3.5 px-5 font-semibold">Параметр</th>
                  {TARIFFS.map((t) => (
                    <th key={t.name} className="text-left py-3.5 px-5 font-semibold">{t.name}</th>
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
        </div>
      </section>

      {/* GIFT CERTIFICATES */}
      <section id="gift" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#ED4463" }}>Подарок</p>
          <h2 className="text-[40px] font-bold text-black mb-3">Оформляем подарочные сертификаты</h2>
          <p className="text-[17px] text-[#7A7A7A] max-w-xl">
            Подарите близким интервью, которое сохранится навсегда. Сертификат оформляется на любой тариф и не имеет срока давности.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {GIFT_CARDS.map((g) => (
            <div
              key={g.name}
              className="rounded-xl border border-[#E5E5E5] p-6 hover:border-[#ED4463] hover:shadow-md transition-all duration-200 bg-white group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white text-lg group-hover:scale-110 transition-transform"
                style={{ background: "#ED4463" }}
              >
                🎁
              </div>
              <h4 className="text-[17px] font-bold text-black mb-1">{g.name}</h4>
              <p className="text-[22px] font-extrabold mb-3" style={{ color: "#ED4463" }}>{g.price}</p>
              <p className="text-[13px] text-[#7A7A7A] leading-snug mb-5">{g.desc}</p>
              <a href="#cta" className="block text-center text-[14px] font-semibold py-2.5 px-4 rounded-lg border-2 border-[#ED4463] text-[#ED4463] hover:bg-[#ED4463] hover:text-white transition-all duration-200">
                Заказать сертификат
              </a>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8" style={{ background: "#FFF5F7" }}>
          <div className="flex-1">
            <h3 className="text-[24px] font-bold text-black mb-2">Как это работает?</h3>
            <p className="text-[16px] text-[#444] leading-relaxed">
              Вы выбираете тариф и оплачиваете сертификат. Мы присылаем красиво оформленный документ — его можно распечатать или отправить в мессенджер. Получатель записывается на интервью сам, в удобное время.
            </p>
          </div>
          <a href="#cta" className="btn-cta flex-shrink-0" style={{ background: "#ED4463" }}>
            Заказать сертификат
          </a>
        </div>
      </section>

      {/* CASE */}
      <section id="case" className="section-soft py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[55fr_45fr] gap-12 items-center">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#00A4E3" }}>Примеры интервью</p>
            <h2 className="text-[36px] font-bold text-black mb-6">Ирина Александровна — история семьи для потомков</h2>
            <p className="text-[17px] text-[#444] leading-relaxed mb-4">
              Родилась в Ленинграде в 1939 году. Когда наш архивист начал работу, выяснилось, что её дед числился в немецком плену в 1942 году — это было задокументировано в федеральном архиве. Семья не знала об этом 80 лет.
            </p>
            <p className="text-[17px] text-[#444] leading-relaxed mb-8">
              Теперь это отдельная глава в книге. С документами. С фотографиями. С её голосом.
            </p>
            <div className="flex flex-wrap gap-4 text-[14px] font-semibold" style={{ color: "#7A7A7A" }}>
              <span>Артём и Маргарита — что происходит с отношениями за 7 лет</span>
              <span>·</span>
              <span>Интервью с 6-летним Петром</span>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
            <img src={INTERVIEW_IMG} alt="Пример интервью" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                <Icon name="Play" size={28} style={{ color: "#00A4E3", marginLeft: 4 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="max-w-[760px] mx-auto px-6 py-20 text-center">
        <div className="text-[64px] leading-none mb-4" style={{ color: "#00A4E3", opacity: 0.25 }}>"</div>
        <p className="text-[22px] leading-relaxed text-[#222] mb-6" style={{ fontStyle: "italic", marginTop: -24 }}>
          Я хочу быть похожей на бабушку. Теперь у моих детей будет повод гордиться прабабушкой. Книгу будут держать в руках их внуки.
        </p>
        <p className="text-[15px] font-semibold text-[#7A7A7A]">— Виктория Гурбатова, внучка</p>
      </section>

      {/* PROCESS */}
      <section id="process" className="section-soft py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[40px] font-bold text-black mb-3">Как проходит работа</h2>
          <p className="text-[17px] text-[#7A7A7A] mb-12">6–16 недель от первой встречи до вашей двери</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((s) => (
              <div key={s.n} className="sb-card flex gap-5 items-start">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-[16px]"
                  style={{ background: "#00A4E3" }}
                >
                  {s.n}
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-black mb-2">{s.title}</h3>
                  <p className="text-[14px] text-[#7A7A7A] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-[40px] font-bold text-black mb-3">Наши интервьюеры</h2>
        <p className="text-[17px] text-[#7A7A7A] mb-12">
          Проверенные психологи, умеющие профессионально и бережно задавать вопросы
        </p>
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
              <h3 className="text-[15px] font-semibold text-black mb-1">{m.name}</h3>
              <p className="text-[13px] text-[#7A7A7A]">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-soft py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[40px] font-bold text-black mb-3">FAQ</h2>
          <p className="text-[17px] text-[#7A7A7A] mb-10">
            Или пишите в WhatsApp: <a href="tel:+79035069205" className="font-semibold text-[#222] hover:text-[#00A4E3] transition-colors">+7 903 506 92 05</a>
          </p>
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
              Запишитесь на бесплатную консультацию
            </h2>
            <p className="text-[17px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              Внесите свои контактные данные и мы свяжемся с вами в ближайшее время.
            </p>
            <div className="space-y-3 text-[15px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <div className="flex items-center gap-3">
                <span style={{ color: "#00A4E3" }}>✓</span> Работаем во всех крупных городах мира
              </div>
              <div className="flex items-center gap-3">
                <span style={{ color: "#00A4E3" }}>✓</span> Интервью онлайн, в студии или дома
              </div>
              <div className="flex items-center gap-3">
                <span style={{ color: "#00A4E3" }}>✓</span> Подписываем NDA по запросу
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[12px] p-8 max-w-[500px] w-full">
            <h3 className="text-[20px] font-bold text-black mb-6">Записаться</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[14px] font-semibold text-[#222] mb-1">Имя</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#222] mb-1">Телефон</label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="+7 999 123-45-67"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#222] mb-1">Тип интервью</label>
                <select
                  value={formData.tariff}
                  onChange={(e) => setFormData({ ...formData, tariff: e.target.value })}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors bg-white"
                >
                  <option value="">Ещё не определился</option>
                  {TARIFFS.map((t) => (
                    <option key={t.name}>{t.name}</option>
                  ))}
                  <option>Подарочный сертификат</option>
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
                  Нажимая «Записаться» вы соглашаетесь с политикой обработки персональных данных
                </label>
              </div>
              <button type="submit" className="btn-cta w-full text-center">
                Записаться
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0F1419" }} className="border-t border-white/10 pt-14 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="text-[22px] text-white mb-3">
              <span style={{ fontWeight: 400 }}>Story</span>
              <span style={{ fontWeight: 700 }}>Box</span>
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Интервью для будущего. Сохраняем внутренний мир и истории.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Тарифы</h4>
            <ul className="space-y-2">
              {TARIFFS.map((t) => (
                <li key={t.name}>
                  <a href="#tariffs" className="text-[14px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Разделы</h4>
            <ul className="space-y-2">
              {[["О нас", "#about"], ["Интервьюеры", "#team"], ["Кейсы", "#case"], ["FAQ", "#faq"]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[14px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Контакты</h4>
            <ul className="space-y-2 text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li><a href="tel:+79031932725" className="hover:text-white transition-colors">+7 903 193 27 25</a></li>
              <li><a href="https://wa.me/79035069205" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li>Работаем во всех крупных городах</li>
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

      {toast && (
        <div className="toast-success">
          ✓ Заявка принята — свяжемся с вами в ближайшее время
        </div>
      )}
    </div>
  );
}
