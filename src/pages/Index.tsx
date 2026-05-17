import { useState } from "react";
import Icon from "@/components/ui/icon";

const BOOK_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/5c696408-eaef-4a98-af3e-834659b47ae3.jpg";
const INTERVIEW_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/330cc34e-c398-43bc-bd2f-3fcf37db66d9.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/5014b3da-2408-42a8-9c0f-0f4601788e53.jpg";
const SPREAD_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/d993614f-2c08-41f1-9c6b-6bbd63bb9689.jpg";
const COVERS_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/b1ec7a56-7caf-4ae9-8860-26aee6a4da56.jpg";

const NAV_LINKS = [
  { label: "О нас", href: "#about" },
  { label: "Книга", href: "#book" },
  { label: "Тарифы", href: "#tariffs" },
  { label: "Интервьюеры", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

const WHY_ITEMS = [
  { title: "Профессионализм", desc: "Наши интервьюеры — профессиональные психологи, умеющие задавать точные вопросы и обходить нежелательные темы." },
  { title: "Конфиденциальность", desc: "Интервьюеры и операторы подписывают соглашение о неразглашении, интервью хранятся в защищённых хранилищах." },
  { title: "Гибкость", desc: "Вы можете корректировать список вопросов и заказать несколько версий интервью — для себя и для публикации." },
  { title: "Бережность", desc: "Наши специалисты внимательно обсудят с вами темы, которые стоит раскрыть или обойти." },
];

// Скидки: Онлайн −10%, 3ч −15%, 5ч −25%, 8ч −5%
// Реальные цены (после скидки): 39 500, 54 500, 79 500, 119 500
// Старые цены (до скидки): /0.9, /0.85, /0.75, /0.95
const TARIFFS = [
  {
    name: "Онлайн",
    fullName: "Онлайн-книга",
    duration: "Интервью в Zoom",
    priceOld: "43 900 ₽",
    price: "39 500 ₽",
    discount: 10,
    tag: null,
    color: "#00A4E3",
    hook: "Первый шаг без студии — в удобное время из любой точки мира",
    features: [
      { text: "2 Zoom-сессии", included: true },
      { text: "~50 стр. авторского текста", included: true },
      { text: "Аудио по QR-коду", included: true },
      { text: "До 200 стр. фотоархива", included: true },
      { text: "1 экземпляр (твёрдая обложка)", included: true },
      { text: "Хранение 5 лет", included: true },
      { text: "Видео по QR-коду", included: false },
      { text: "Архивная работа", included: false },
      { text: "Несколько экземпляров", included: false },
    ],
  },
  {
    name: "3 часа",
    fullName: "Книга 3 часа",
    duration: "Студия · 3 камеры",
    priceOld: "64 100 ₽",
    price: "54 500 ₽",
    discount: 15,
    tag: null,
    color: "#00A4E3",
    hook: "Полноценная история жизни — профессиональное видео в студии",
    features: [
      { text: "3 часа в студии, 3 камеры", included: true },
      { text: "~70 стр. авторского текста", included: true },
      { text: "Видео по QR-коду", included: true },
      { text: "До 400 стр. фотоархива", included: true },
      { text: "2 версии монтажа", included: true },
      { text: "Хранение в 3 сервисах, 10 лет", included: true },
      { text: "Архивная работа", included: false },
      { text: "Несколько экземпляров", included: false },
    ],
  },
  {
    name: "5 часов",
    fullName: "Книга 5 часов",
    duration: "Студия · 3 камеры",
    priceOld: "106 000 ₽",
    price: "79 500 ₽",
    discount: 25,
    tag: "Максимальная скидка",
    color: "#ED4463",
    hook: "Самый популярный выбор — глубина, архив и два экземпляра",
    features: [
      { text: "5 часов в студии, 3 камеры", included: true },
      { text: "~120 стр. авторского текста", included: true },
      { text: "Видео + главы по отдельным QR", included: true },
      { text: "До 600 стр. фотоархива", included: true },
      { text: "2 версии монтажа", included: true },
      { text: "Архивная работа по гос. архивам", included: true },
      { text: "2 экземпляра · хранение 10 лет", included: true },
      { text: "Кожаная обложка с тиснением", included: false },
    ],
  },
  {
    name: "8 часов",
    fullName: "Книга 8 часов",
    duration: "Студия · премиум",
    priceOld: "125 800 ₽",
    price: "119 500 ₽",
    discount: 5,
    tag: null,
    color: "#00A4E3",
    hook: "Полная семейная хроника — кожа, тиснение, бессрочное хранение",
    features: [
      { text: "8 часов в студии", included: true },
      { text: "~200 стр. авторского текста", included: true },
      { text: "Видео-серия по главам с QR", included: true },
      { text: "Фотоархив без ограничений", included: true },
      { text: "2 версии монтажа", included: true },
      { text: "Расширенная архивная работа", included: true },
      { text: "3 экз. + USB · бессрочно", included: true },
      { text: "Кожаная обложка с тиснением", included: true },
    ],
  },
];

const GIFT_CARDS = [
  { name: "Онлайн-книга", priceOld: "43 900 ₽", price: "39 500 ₽", discount: 10, desc: "Интервью в Zoom, ~50 стр., аудио по QR" },
  { name: "Книга 3 часа", priceOld: "64 100 ₽", price: "54 500 ₽", discount: 15, desc: "Студия, профессиональное видео по QR" },
  { name: "Книга 5 часов", priceOld: "106 000 ₽", price: "79 500 ₽", discount: 25, desc: "Студия, архивная работа, 2 экземпляра" },
  { name: "Книга 8 часов", priceOld: "125 800 ₽", price: "119 500 ₽", discount: 5, desc: "Полная хроника, кожа, тиснение, бессрочно" },
];

const BOOK_FEATURES = [
  {
    icon: "BookOpen",
    title: "Литературная хроника",
    desc: "~70 страниц основного текста. AI-транскрипция через 3 модели, литературная редактура, согласование с заказчиком. Сохраняется голос, факты и интонация — без «нукания» и обрывов.",
  },
  {
    icon: "QrCode",
    title: "Видео по QR-коду",
    desc: "Внутри книги QR-код на закрытое видео-интервью. Открыли книгу, навели телефон — слышите живой голос. Хранение 10 лет в трёх независимых облачных сервисах.",
  },
  {
    icon: "Image",
    title: "Оцифрованный фотоархив",
    desc: "До 600 страниц. Сканируем, реставрируем и встраиваем в книгу все ваши семейные снимки. Никаких коробок на антресолях — всё в одном артефакте.",
  },
  {
    icon: "Search",
    title: "Архивная работа",
    desc: "Ищем данные в открытых архивах: ОБД «Мемориал», «Память народа». Особенно по родственникам ВОВ. Часто находим то, что семья искала десятилетиями.",
  },
  {
    icon: "FileText",
    title: "Дополнительные материалы",
    desc: "Стихи, письма, дневники близких. Если есть тетрадь со стихами деда или письма бабушки — включаем в книгу как самостоятельное приложение.",
  },
  {
    icon: "Layers",
    title: "Формат и печать",
    desc: "Твёрдый переплёт, премиум-печать, тактильная обложка, ~25×17 см. Эстетика без китча — настоящая семейная реликвия, которая встанет на полку и будет передаваться поколениям.",
  },
];

const PROCESS_STEPS = [
  { n: "1", title: "Бесплатная консультация", desc: "30 минут с куратором: обсуждаем историю семьи, выбираем формат." },
  { n: "2", title: "Интервью с психологом", desc: "В студии, онлайн или в любой локации. От 2 до 8 часов." },
  { n: "3", title: "Транскрипция и редактура", desc: "Расшифровка с сохранением живого голоса рассказчика." },
  { n: "4", title: "Авторский текст", desc: "Литературная адаптация в читаемую семейную хронику." },
  { n: "5", title: "Архив и фотоверстка", desc: "Оцифровка фото, поиск по архивам, вёрстка книги." },
  { n: "6", title: "Печать и доставка", desc: "Офсетная печать в твёрдой обложке, доставка по всему миру." },
];

const TEAM_MEMBERS = [
  { name: "Екатерина Чемрова", role: "Психолог, детский психолог" },
  { name: "Дарья Дараганова", role: "Психолог" },
  { name: "Екатерина Аникина", role: "Психолог" },
  { name: "Максим Третьяков", role: "Психолог" },
];

const FAQ_ITEMS = [
  { q: "Какие вопросы вы задаёте взрослым?", a: "Вопросы охватывают детство, семью, профессиональный путь, важные события жизни, ценности и воспоминания. Список согласовывается заранее — вы можете его скорректировать и закрыть любые темы." },
  { q: "Какие вопросы вы задаёте детям?", a: "Психолог работает по возрасту: мечты, друзья, что нравится и что пугает, взгляды на будущее. Беседа строится так, чтобы ребёнок говорил свободно, без ощущения «правильных ответов»." },
  { q: "Как проходит интервью?", a: "Психолог заранее обсуждает с вами список тем. В день записи — беседа в комфортном темпе. Никаких сценариев: живой разговор, который ведётся бережно и профессионально." },
  { q: "Как проходит интервью со старшими родственниками?", a: "Особый формат: психолог учитывает возраст, темп и эмоциональное состояние собеседника. Нежелательные темы обходятся. Можно проводить дома или в студии." },
  { q: "Как и где хранятся записи?", a: "Видео хранится в трёх независимых защищённых облачных сервисах. В зависимости от тарифа — 5 лет, 10 лет или бессрочно. Доступ — по QR-коду внутри книги." },
  { q: "Кто берёт интервью?", a: "Только профессиональные психологи из нашей команды. Каждый из них прошёл специальный отбор и подписал соглашение о конфиденциальности." },
  { q: "Можно ли заказать несколько версий интервью?", a: "Да — во всех студийных тарифах входят 2 версии монтажа: полная (для семьи) и сокращённая (для публикации или показа гостям)." },
  { q: "Работаете ли вы в других городах?", a: "Онлайн-формат доступен в любом городе мира. Студийные форматы — Москва. Уточните ваш город на консультации." },
];

const VALID_PROMOS: Record<string, number> = {
  "STORY10": 10,
  "GIFT15": 15,
  "VIP20": 20,
};

// ─── Popup ────────────────────────────────────────────────────────────────────

interface PopupProps { open: boolean; onClose: () => void; initialTariff?: string; }

function BookingPopup({ open, onClose, initialTariff = "" }: PopupProps) {
  const [form, setForm] = useState({ name: "", phone: "", tariff: initialTariff, promo: "", agreePersonal: false, agreeTerms: false, agreeMarketing: false });
  const [promoStatus, setPromoStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const checkPromo = () => {
    const code = form.promo.trim().toUpperCase();
    if (VALID_PROMOS[code]) { setPromoStatus("valid"); setPromoDiscount(VALID_PROMOS[code]); }
    else { setPromoStatus("invalid"); setPromoDiscount(0); }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm({ name: "", phone: "", tariff: initialTariff, promo: "", agreePersonal: false, agreeTerms: false, agreeMarketing: false });
      setPromoStatus("idle"); setPromoDiscount(0); setSubmitted(false);
    }, 300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="bg-white rounded-2xl w-full max-w-[460px] max-h-[90vh] overflow-y-auto shadow-2xl" style={{ animation: "popup-in 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-[#F0F0F0]">
          <div>
            <h2 className="text-[20px] font-bold text-black">Оплатить онлайн</h2>
            <p className="text-[13px] text-[#7A7A7A] mt-0.5">Свяжемся для подтверждения в течение дня</p>
          </div>
          <button onClick={handleClose} className="w-9 h-9 rounded-full flex items-center justify-center text-[#7A7A7A] hover:bg-[#F2F2F2] transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="px-7 pb-8 pt-6 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-white text-2xl" style={{ background: "#00A4E3" }}>✓</div>
            <h3 className="text-[20px] font-bold text-black mb-2">Заявка принята!</h3>
            <p className="text-[15px] text-[#7A7A7A] mb-6">Свяжемся с вами в ближайшее время для подтверждения и оплаты.</p>
            <button onClick={handleClose} className="btn-cta">Закрыть</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="px-7 pb-7 pt-5 space-y-4">
            <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "#F2F9FF" }}>
              <span className="text-xl flex-shrink-0">🔥</span>
              <p className="text-[13px] text-[#222] leading-snug">
                Скидки уже применены к ценам{promoDiscount > 0 && <> + <span className="font-bold text-[#ED4463]">{promoDiscount}% по промокоду</span></>}
              </p>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1">Имя</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя"
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1">Телефон</label>
              <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 999 123-45-67"
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1">Тариф</label>
              <select value={form.tariff} onChange={(e) => setForm({ ...form, tariff: e.target.value })}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors bg-white">
                <option value="">Ещё не определился</option>
                {TARIFFS.map((t) => <option key={t.name}>{t.fullName} — {t.price}</option>)}
                <option>Подарочный сертификат</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1">
                Промокод <span className="text-[#7A7A7A] font-normal">(необязательно)</span>
              </label>
              <div className="flex gap-2">
                <input type="text" value={form.promo} placeholder="Введите промокод"
                  onChange={(e) => { setForm({ ...form, promo: e.target.value }); setPromoStatus("idle"); setPromoDiscount(0); }}
                  className={`flex-1 border rounded-lg px-4 py-3 text-[15px] focus:outline-none transition-colors uppercase ${promoStatus === "valid" ? "border-green-500 bg-green-50" : promoStatus === "invalid" ? "border-red-400 bg-red-50" : "border-[#E5E5E5] focus:border-[#00A4E3]"}`} />
                <button type="button" onClick={checkPromo} disabled={!form.promo.trim()}
                  className="px-4 py-3 rounded-lg text-[14px] font-semibold border transition-colors disabled:opacity-40" style={{ borderColor: "#00A4E3", color: "#00A4E3" }}>
                  Применить
                </button>
              </div>
              {promoStatus === "valid" && <p className="text-[12px] text-green-600 mt-1 font-semibold">✓ Промокод применён — доп. скидка {promoDiscount}%</p>}
              {promoStatus === "invalid" && <p className="text-[12px] text-red-500 mt-1">Промокод не найден или уже использован</p>}
            </div>

            <div className="border-t border-[#F0F0F0] pt-3 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required checked={form.agreePersonal} onChange={(e) => setForm({ ...form, agreePersonal: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }} />
                <span className="text-[13px] text-[#444] leading-snug">
                  Согласен(-на) на <a href="#" className="underline hover:text-[#00A4E3]">обработку персональных данных</a> (ФЗ № 152) <span className="text-[#ED4463]">*</span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required checked={form.agreeTerms} onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }} />
                <span className="text-[13px] text-[#444] leading-snug">
                  Принимаю <a href="#" className="underline hover:text-[#00A4E3]">пользовательское соглашение</a> и <a href="#" className="underline hover:text-[#00A4E3]">условия оказания услуг</a> <span className="text-[#ED4463]">*</span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={form.agreeMarketing} onChange={(e) => setForm({ ...form, agreeMarketing: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }} />
                <span className="text-[13px] text-[#7A7A7A] leading-snug">Хочу получать специальные предложения и рекламные рассылки StoryBox</span>
              </label>
              <p className="text-[11px] text-[#AAAAAA]"><span className="text-[#ED4463]">*</span> — обязательные поля</p>
            </div>

            <button type="submit" className="btn-cta w-full text-center"
              disabled={!form.agreePersonal || !form.agreeTerms}
              style={{ opacity: (!form.agreePersonal || !form.agreeTerms) ? 0.45 : 1, cursor: (!form.agreePersonal || !form.agreeTerms) ? "not-allowed" : "pointer" }}>
              Оплатить онлайн
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTariff, setPopupTariff] = useState("");
  const [activeTariff, setActiveTariff] = useState(2); // 5 часов по умолчанию

  const openPopup = (tariff = "") => { setPopupTariff(tariff); setPopupOpen(true); };

  const t = TARIFFS[activeTariff];

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <BookingPopup open={popupOpen} onClose={() => setPopupOpen(false)} initialTariff={popupTariff} />

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
          <div className="flex items-center gap-4">
            <a href="tel:+79031932725" className="hidden lg:block text-[15px] font-semibold text-[#222] hover:text-[#00A4E3] transition-colors">+7 903 193 27 25</a>
            <button onClick={() => openPopup()} className="btn-cta" style={{ padding: "10px 20px", fontSize: 14 }}>Оплатить онлайн</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-[45fr_55fr] gap-12 items-center">
        <div>
          <h1 className="leading-tight mb-0" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#00A4E3" }}>
            Литературная семейная хроника на основе видео-интервью
          </h1>
          <hr className="hero-hr" />
          <p className="text-[18px] text-[#444] leading-relaxed mb-4 max-w-lg">
            QR-код на видео — внутри книги. Чтобы внуки услышали живой голос через 30 лет.
          </p>
          <p className="text-[15px] text-[#7A7A7A] mb-8">
            Интервью онлайн, в студии или дома. Работаем во всех крупных городах мира.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => openPopup()} className="btn-cta">Оплатить онлайн</button>
            <button onClick={() => openPopup()} className="btn-secondary">Бесплатная консультация</button>
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
          <div className="max-w-2xl mb-14">
            <h2 className="text-[36px] font-bold text-black mb-4">О нас</h2>
            <p className="text-[17px] text-[#444] leading-relaxed">
              Мы горим идеей создания дополнительной памяти, которая позволит людям не только лучше помнить, как прошёл очередной год, но и навсегда сохранить свои представления о будущем и образ мыслей накануне выпускного, свадьбы и других значимых событий. Интервью — это лучшее воплощение этой идеи.
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

      {/* BOOK SHOWCASE */}
      <section id="book" className="max-w-7xl mx-auto px-6 py-20">
        {/* Заголовок + определение продукта */}
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

        {/* Фото + «Почему это работает» */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img src={SPREAD_IMG} alt="Разворот книги" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img src={COVERS_IMG} alt="Варианты обложек" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Блок "Почему это работает" */}
        <div className="rounded-2xl p-8 md:p-10 mb-12" style={{ background: "#0F1419" }}>
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#00A4E3" }}>Почему это работает</p>
          <p className="text-[20px] md:text-[24px] font-semibold text-white leading-relaxed max-w-3xl">
            Через 30 лет внуки не вспомнят, как звучал её смех и какими словами она называла их в детстве.
          </p>
          <p className="text-[18px] mt-3 font-bold" style={{ color: "#00A4E3" }}>
            Кроме того, что мы запишем.
          </p>
          <p className="text-[15px] mt-4 max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Один артефакт, в котором соединяются текст, голос, фотографии и архивная правда — то, что останется навсегда.
          </p>
        </div>

        {/* 6 составляющих книги */}
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

            {/* Статы книги */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { val: "704", label: "страницы книги" },
                { val: "70", label: "стр. хроники" },
                { val: "600", label: "стр. фотоархива" },
                { val: "3 ч", label: "интервью" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl px-4 py-3 border border-[#E5E5E5] text-center min-w-[80px]">
                  <div className="text-[22px] font-extrabold text-black leading-none">{s.val}</div>
                  <div className="text-[11px] text-[#7A7A7A] mt-0.5">{s.label}</div>
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
            <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
              <img src={INTERVIEW_IMG} alt="Пример интервью" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                  <Icon name="Play" size={28} style={{ color: "#00A4E3", marginLeft: 4 }} />
                </div>
              </div>
            </div>

            {/* Карточка-цитата прямо рядом с фото */}
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

      {/* ── TARIFFS ──────────────────────────────────────────────────────────── */}
      <section id="tariffs" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <h2 className="text-[40px] font-bold text-black mb-3">Выберите тариф</h2>
          <p className="text-[17px] text-[#7A7A7A]">Запишитесь на бесплатную консультацию — поможем определиться</p>
        </div>

        {/* Табы-кнопки */}
        <div className="flex flex-wrap gap-3 mb-8">
          {TARIFFS.map((tariff, idx) => (
            <button
              key={tariff.name}
              onClick={() => setActiveTariff(idx)}
              className="relative px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200"
              style={
                activeTariff === idx
                  ? { background: tariff.color, color: "#fff", boxShadow: `0 4px 16px ${tariff.color}44` }
                  : { background: "#F2F2F2", color: "#444" }
              }
            >
              {tariff.name}
              {tariff.tag && (
                <span className="absolute -top-2 -right-2 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: "#ED4463" }}>−{tariff.discount}%</span>
              )}
              {!tariff.tag && (
                <span className="ml-2 text-[11px] font-bold opacity-60">−{tariff.discount}%</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Сравнительная таблица — на всю ширину сверху ── */}
        <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left px-5 py-4 text-[13px] font-semibold text-[#999] border-b border-[#F0F0F0] w-[160px] min-w-[130px]" style={{ background: "#FAFAFA" }}>
                  Параметр
                </th>
                {TARIFFS.map((tariff, vi) => (
                  <th key={vi} onClick={() => setActiveTariff(vi)}
                    className="px-4 py-4 text-center cursor-pointer border-b transition-all"
                    style={{
                      borderBottomWidth: 3,
                      borderBottomColor: activeTariff === vi ? tariff.color : "#F0F0F0",
                      background: activeTariff === vi ? `${tariff.color}08` : "#FAFAFA",
                    }}>
                    <div className="text-[13px] font-bold mb-1" style={{ color: activeTariff === vi ? tariff.color : "#555" }}>
                      {tariff.fullName}
                    </div>
                    <div className="text-[11px] text-[#AAAAAA] line-through leading-none">{tariff.priceOld}</div>
                    <div className="text-[15px] font-extrabold leading-tight" style={{ color: activeTariff === vi ? tariff.color : "#222" }}>
                      {tariff.price}
                    </div>
                    {tariff.tag && (
                      <div className="mt-1">
                        <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: "#ED4463" }}>
                          −{tariff.discount}%
                        </span>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Длительность",   vals: ["2 сессии Zoom", "3 ч в студии", "5 ч в студии", "8 ч в студии"] },
                { label: "Страниц текста", vals: ["~50", "~70", "~120", "~200"] },
                { label: "Фотоархив",      vals: ["до 200 стр.", "до 400 стр.", "до 600 стр.", "без лимита"] },
                { label: "Видео",          vals: ["Аудио", "Видео", "Видео + главы", "Видео-серия"] },
                { label: "Архивная работа",vals: ["—", "—", "✓", "Расширенная"] },
                { label: "Экземпляры",     vals: ["1", "1", "2", "3 + USB"] },
                { label: "Хранение видео", vals: ["5 лет", "10 лет", "10 лет", "Бессрочно"] },
                { label: "Обложка",        vals: ["Стандарт", "Стандарт", "Премиум", "Кожа + тиснение"] },
              ].map((row, ri) => (
                <tr key={row.label} style={{ background: ri % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                  <td className="px-5 py-3 text-[13px] font-semibold text-[#555] border-b border-[#F5F5F5] whitespace-nowrap">
                    {row.label}
                  </td>
                  {row.vals.map((v, vi) => (
                    <td key={vi} onClick={() => setActiveTariff(vi)}
                      className="px-4 py-3 text-center text-[13px] cursor-pointer border-b border-[#F5F5F5] transition-colors"
                      style={{
                        background: activeTariff === vi ? `${TARIFFS[vi].color}06` : "transparent",
                        color: v === "—" ? "#CCC" : activeTariff === vi ? TARIFFS[vi].color : "#333",
                        fontWeight: activeTariff === vi ? 600 : 400,
                      }}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Детальная карточка выбранного тарифа ── */}
        <div className="rounded-2xl border-2 p-6 md:p-8 transition-all duration-300"
          style={{ borderColor: t.color, background: "#fff" }}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-widest mb-1" style={{ color: t.color }}>
                {t.duration}
              </p>
              <h3 className="text-[26px] font-bold text-black mb-1">{t.fullName}</h3>
              <p className="text-[15px] text-[#7A7A7A]">{t.hook}</p>
            </div>
            <div className="flex-shrink-0 flex items-end gap-3">
              <div>
                <span className="text-[13px] text-[#AAAAAA] line-through block text-right">{t.priceOld}</span>
                <span className="text-[36px] font-extrabold text-black" style={{ lineHeight: 1 }}>{t.price}</span>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-white text-[12px] font-bold mb-1 flex-shrink-0"
                style={{ background: t.tag ? "#ED4463" : t.color }}>
                −{t.discount}%
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-7">
            {t.features.map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                  style={{ background: f.included ? `${t.color}18` : "#F5F5F5", color: f.included ? t.color : "#CCC" }}>
                  {f.included ? "✓" : "×"}
                </span>
                <span className={`text-[14px] leading-snug ${f.included ? "text-[#222]" : "line-through opacity-35"}`}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => openPopup(t.fullName)} className="btn-cta text-[15px] px-7 py-4">
              Оплатить онлайн — {t.price}
            </button>
            <button onClick={() => openPopup()} className="btn-secondary text-[14px] px-6 py-4">
              Бесплатная консультация
            </button>
          </div>
        </div>

        <p className="mt-4 text-[13px] text-[#7A7A7A]">Доп. экземпляр — от 9 500 ₽ · Оплата СБП, МИР · Рассрочка 2–6 мес.</p>
      </section>

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
                  <span className="text-[12px] text-[#BBBBB] line-through text-[#AAAAAA]">{g.priceOld}</span>
                  <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ background: "#ED4463" }}>−{g.discount}%</span>
                </div>
                <p className="text-[20px] font-extrabold mb-3" style={{ color: "#ED4463" }}>{g.price}</p>
                <p className="text-[13px] text-[#7A7A7A] leading-snug mb-4">{g.desc}</p>
                <button onClick={() => openPopup(g.name)} className="block w-full text-center text-[13px] font-semibold py-2.5 px-4 rounded-lg border-2 border-[#ED4463] text-[#ED4463] hover:bg-[#ED4463] hover:text-white transition-all duration-200">
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
                  <img src={TEAM_IMG} alt={m.name} className="w-full h-full object-cover"
                    style={{ objectPosition: idx === 0 ? "0% 0%" : idx === 1 ? "100% 0%" : idx === 2 ? "0% 100%" : "100% 100%" }} />
                </div>
                <h3 className="text-[15px] font-semibold text-black mb-1">{m.name}</h3>
                <p className="text-[13px] text-[#7A7A7A]">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-[800px]">
          <h2 className="text-[40px] font-bold text-black mb-3">FAQ</h2>
          <p className="text-[17px] text-[#7A7A7A] mb-10">
            Или пишите в WhatsApp:{" "}
            <a href="https://wa.me/79035069205" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#222] hover:text-[#00A4E3] transition-colors">+7 903 506 92 05</a>
          </p>
          <div>
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon"><span className="faq-icon-plus">+</span><span className="faq-icon-minus">−</span></span>
                </summary>
                <div className="faq-content">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="py-28 px-6" style={{ background: "#0F1419" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[40px] font-bold text-white mb-6">Запишитесь на бесплатную консультацию</h2>
            <p className="text-[17px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              Расскажите о вашей истории. Подберём формат и ответим на все вопросы.
            </p>
            <div className="space-y-3 text-[15px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <div className="flex items-center gap-3"><span style={{ color: "#00A4E3" }}>✓</span> Работаем во всех крупных городах мира</div>
              <div className="flex items-center gap-3"><span style={{ color: "#00A4E3" }}>✓</span> Интервью онлайн, в студии или дома</div>
              <div className="flex items-center gap-3"><span style={{ color: "#00A4E3" }}>✓</span> Подписываем NDA по запросу</div>
              <div className="flex items-center gap-3"><span style={{ color: "#ED4463" }}>🔥</span> Скидка до 25% на все тарифы сейчас</div>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-[360px]">
            <button onClick={() => openPopup()} className="btn-cta text-center text-[17px] py-5 w-full">
              Оплатить онлайн
            </button>
            <a href="https://wa.me/79031932725" target="_blank" rel="noopener noreferrer" className="btn-secondary text-center text-[16px] py-4">
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0F1419" }} className="border-t border-white/10 pt-14 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="text-[22px] text-white mb-3">
              <span style={{ fontWeight: 400 }}>Story</span><span style={{ fontWeight: 700 }}>Box</span>
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Интервью для будущего. Сохраняем внутренний мир и истории.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Тарифы</h4>
            <ul className="space-y-2">
              {TARIFFS.map((t) => (
                <li key={t.name}>
                  <button onClick={() => openPopup(t.fullName)} className="text-[14px] hover:text-white transition-colors text-left" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {t.fullName}
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
              <li><a href="https://wa.me/79035069205" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp +7 903 506 92 05</a></li>
              <li>Работаем во всех крупных городах</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-[13px]" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>© 2024 StoryBox. Все права защищены.</span>
          <span>Политика конфиденциальности · Договор оферты</span>
        </div>
      </footer>
    </div>
  );
}