import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { TARIFFS, VALID_PROMOS } from "./data";

const CERT_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/291d5a8b-c4f4-4134-90e9-92ab9ef5f1de.png";

interface GiftPopupProps {
  open: boolean;
  onClose: () => void;
  initialTariff?: string;
}

export default function GiftPopup({ open, onClose, initialTariff = "" }: GiftPopupProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    recipientName: "",
    promo: "",
    agreePersonal: false,
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [promoStatus, setPromoStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const tariffData = TARIFFS.find((t) => t.fullName === initialTariff) ?? null;

  useEffect(() => {
    if (open) {
      setForm({ name: "", phone: "", recipientName: "", promo: "", agreePersonal: false, agreeTerms: false, agreeMarketing: false });
      setPromoStatus("idle");
      setPromoDiscount(0);
      setSubmitted(false);
      setPhoneError("");
    }
  }, [open]);

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!value.trim()) return "Введите номер телефона";
    if (digits.length < 10) return "Слишком короткий номер";
    if (digits.length > 12) return "Слишком длинный номер";
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, phone: e.target.value });
    if (phoneError) setPhoneError("");
  };

  const checkPromo = () => {
    const code = form.promo.trim().toUpperCase();
    if (VALID_PROMOS[code]) { setPromoStatus("valid"); setPromoDiscount(VALID_PROMOS[code]); }
    else { setPromoStatus("invalid"); setPromoDiscount(0); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePhone(form.phone);
    if (err) { setPhoneError(err); return; }
    setSubmitted(true);
  };

  if (!open) return null;

  const title = tariffData ? tariffData.fullName : initialTariff || "Подарочный сертификат";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[520px] max-h-[92vh] overflow-y-auto shadow-2xl"
        style={{ animation: "popup-in 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Шапка */}
        <div className="flex items-start justify-between px-7 pt-7 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#ED4463" }}>
              🎁 Подарочный сертификат
            </p>
            <h2 className="text-[22px] font-bold text-black leading-tight">{title}</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-[#7A7A7A] hover:bg-[#F2F2F2] transition-colors flex-shrink-0 mt-1">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Карточка тарифа */}
        {tariffData && (
          <div className="px-7 pb-2 pt-0">
            <div className="rounded-xl p-4 border" style={{ borderColor: "#ED446330", background: "#FFF5F7" }}>
              <div className="flex items-center gap-2 mb-1.5">
                {tariffData.priceOld && (
                  <span className="text-[12px] text-[#AAAAAA] line-through whitespace-nowrap">{tariffData.priceOld}</span>
                )}
                <span className="text-[22px] font-extrabold whitespace-nowrap" style={{ color: tariffData.color, lineHeight: 1 }}>
                  {tariffData.price}
                </span>
                {tariffData.discount > 0 && (
                  <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: "#ED4463" }}>
                    −{tariffData.discount}%
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#7A7A7A] whitespace-nowrap">{tariffData.duration}</span>
              </div>
            </div>
          </div>
        )}

        {/* Пример сертификата */}
        <div className="px-7 pt-4 pb-2">
          <p className="text-[12px] font-semibold text-[#7A7A7A] uppercase tracking-wide mb-2">Пример сертификата</p>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#F0F0F0" }}>
            <img src={CERT_IMG} alt="Пример подарочного сертификата StoryBox" className="w-full object-cover" />
          </div>
        </div>

        {submitted ? (
          <div className="px-7 pb-8 pt-6 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-white text-2xl" style={{ background: "#ED4463" }}>🎁</div>
            <h3 className="text-[20px] font-bold text-black mb-2">Заявка отправлена!</h3>
            <p className="text-[14px] text-[#7A7A7A] leading-relaxed mb-6">
              Мы свяжемся с вами в течение дня и вышлем подарочный сертификат{form.recipientName ? ` для ${form.recipientName}` : ""}.
            </p>
            <button onClick={onClose} className="btn-cta px-8 py-3 text-[15px]">Отлично!</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 pb-8 pt-5 space-y-4">
            {/* Ваше имя */}
            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1.5">Ваше имя <span style={{ color: "#ED4463" }}>*</span></label>
              <input
                type="text"
                required
                placeholder="Как вас зовут?"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors focus:border-[#ED4463]"
                style={{ borderColor: "#E5E5E5" }}
              />
            </div>

            {/* Для кого сертификат */}
            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                Для кого сертификат <span style={{ color: "#ED4463" }}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ФИО получателя подарка"
                value={form.recipientName}
                onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors focus:border-[#ED4463]"
                style={{ borderColor: "#E5E5E5" }}
              />
              <p className="text-[12px] text-[#AAAAAA] mt-1">Имя будет указано на сертификате</p>
            </div>

            {/* Телефон */}
            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1.5">Ваш телефон <span style={{ color: "#ED4463" }}>*</span></label>
              <input
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors focus:border-[#ED4463]"
                style={{ borderColor: phoneError ? "#ED4463" : "#E5E5E5" }}
              />
              {phoneError && <p className="text-[12px] mt-1" style={{ color: "#ED4463" }}>{phoneError}</p>}
            </div>

            {/* Промокод */}
            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1.5">Промокод</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Введите промокод"
                  value={form.promo}
                  onChange={(e) => { setForm({ ...form, promo: e.target.value }); setPromoStatus("idle"); }}
                  className="flex-1 px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors focus:border-[#ED4463] uppercase"
                  style={{ borderColor: promoStatus === "valid" ? "#22C55E" : promoStatus === "invalid" ? "#ED4463" : "#E5E5E5" }}
                />
                <button type="button" onClick={checkPromo} className="px-4 py-3 rounded-xl text-[13px] font-semibold transition-colors" style={{ background: "#F2F2F2", color: "#444" }}>
                  Применить
                </button>
              </div>
              {promoStatus === "valid" && <p className="text-[12px] text-green-600 mt-1 font-semibold">✓ Промокод применён — доп. скидка {promoDiscount}%</p>}
              {promoStatus === "invalid" && <p className="text-[12px] text-red-500 mt-1">Промокод не найден или уже использован</p>}
            </div>

            {/* Согласия */}
            <div className="border-t border-[#F0F0F0] pt-3 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox" required checked={form.agreePersonal}
                  onChange={(e) => setForm({ ...form, agreePersonal: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#ED4463" }}
                />
                <span className="text-[13px] text-[#444] leading-snug">
                  Согласен(-на) на <Link to="/legal/data-consent" target="_blank" className="underline hover:text-[#ED4463]">обработку персональных данных</Link> (ФЗ № 152) <span style={{ color: "#ED4463" }}>*</span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox" required checked={form.agreeTerms}
                  onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#ED4463" }}
                />
                <span className="text-[13px] text-[#444] leading-snug">
                  Принимаю условия <Link to="/legal/offer" target="_blank" className="underline hover:text-[#ED4463]">договора оферты</Link> <span style={{ color: "#ED4463" }}>*</span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox" checked={form.agreeMarketing}
                  onChange={(e) => setForm({ ...form, agreeMarketing: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#ED4463" }}
                />
                <span className="text-[13px] text-[#7A7A7A] leading-snug">
                  Хочу получать новости и специальные предложения
                </span>
              </label>
            </div>

            <button type="submit" className="w-full text-center text-[15px] py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90" style={{ background: "#ED4463" }}>
              🎁 Оформить подарочный сертификат
            </button>

            <p className="text-[11px] text-center" style={{ color: "#AAAAAA" }}>
              После оплаты вы получите красиво оформленный сертификат на email
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
