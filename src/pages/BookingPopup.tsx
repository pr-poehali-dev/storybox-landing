import { useState } from "react";
import Icon from "@/components/ui/icon";
import { TARIFFS, VALID_PROMOS } from "./data";

interface BookingPopupProps {
  open: boolean;
  onClose: () => void;
  initialTariff?: string;
}

export default function BookingPopup({ open, onClose, initialTariff = "" }: BookingPopupProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    tariff: initialTariff,
    promo: "",
    agreePersonal: false,
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [promoStatus, setPromoStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!value.trim()) return "Введите номер телефона";
    if (digits.length < 10) return "Слишком короткий номер";
    if (digits.length > 12) return "Слишком длинный номер";
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm({ ...form, phone: value });
    if (phoneError) setPhoneError(validatePhone(value));
  };

  const handlePhoneBlur = () => {
    setPhoneError(validatePhone(form.phone));
  };

  const checkPromo = () => {
    const code = form.promo.trim().toUpperCase();
    if (VALID_PROMOS[code]) { setPromoStatus("valid"); setPromoDiscount(VALID_PROMOS[code]); }
    else { setPromoStatus("invalid"); setPromoDiscount(0); }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm({ name: "", phone: "", tariff: initialTariff, promo: "", agreePersonal: false, agreeTerms: false, agreeMarketing: false });
      setPromoStatus("idle"); setPromoDiscount(0); setSubmitted(false); setPhoneError("");
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePhone(form.phone);
    if (err) { setPhoneError(err); return; }
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[460px] max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ animation: "popup-in 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
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
          <form onSubmit={handleSubmit} className="px-7 pb-7 pt-5 space-y-4">
            <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "#F2F9FF" }}>
              <span className="text-xl flex-shrink-0">🔥</span>
              <p className="text-[13px] text-[#222] leading-snug">
                Скидки уже применены к ценам{promoDiscount > 0 && <> + <span className="font-bold text-[#ED4463]">{promoDiscount}% по промокоду</span></>}
              </p>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1">Имя</label>
              <input
                type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ваше имя"
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1">Телефон</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                placeholder="+7 999 123-45-67"
                className="w-full rounded-lg px-4 py-3 text-[15px] focus:outline-none transition-colors"
                style={{
                  border: phoneError ? "1.5px solid #ED4463" : "1px solid #E5E5E5",
                  outline: "none",
                }}
              />
              {phoneError && (
                <p className="text-[12px] mt-1.5 font-medium" style={{ color: "#ED4463" }}>
                  {phoneError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1">Тариф</label>
              <select
                value={form.tariff}
                onChange={(e) => setForm({ ...form, tariff: e.target.value })}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors bg-white"
              >
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
                <input
                  type="text" value={form.promo} placeholder="Введите промокод"
                  onChange={(e) => { setForm({ ...form, promo: e.target.value }); setPromoStatus("idle"); setPromoDiscount(0); }}
                  className={`flex-1 border rounded-lg px-4 py-3 text-[15px] focus:outline-none transition-colors uppercase ${
                    promoStatus === "valid" ? "border-green-500 bg-green-50"
                    : promoStatus === "invalid" ? "border-red-400 bg-red-50"
                    : "border-[#E5E5E5] focus:border-[#00A4E3]"
                  }`}
                />
                <button
                  type="button" onClick={checkPromo} disabled={!form.promo.trim()}
                  className="px-4 py-3 rounded-lg text-[14px] font-semibold border transition-colors disabled:opacity-40"
                  style={{ borderColor: "#00A4E3", color: "#00A4E3" }}
                >
                  Применить
                </button>
              </div>
              {promoStatus === "valid" && <p className="text-[12px] text-green-600 mt-1 font-semibold">✓ Промокод применён — доп. скидка {promoDiscount}%</p>}
              {promoStatus === "invalid" && <p className="text-[12px] text-red-500 mt-1">Промокод не найден или уже использован</p>}
            </div>

            <div className="border-t border-[#F0F0F0] pt-3 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox" required checked={form.agreePersonal}
                  onChange={(e) => setForm({ ...form, agreePersonal: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }}
                />
                <span className="text-[13px] text-[#444] leading-snug">
                  Согласен(-на) на <a href="#" className="underline hover:text-[#00A4E3]">обработку персональных данных</a> (ФЗ № 152) <span className="text-[#ED4463]">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox" required checked={form.agreeTerms}
                  onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }}
                />
                <span className="text-[13px] text-[#444] leading-snug">
                  Принимаю <a href="#" className="underline hover:text-[#00A4E3]">пользовательское соглашение</a> и <a href="#" className="underline hover:text-[#00A4E3]">условия оказания услуг</a> <span className="text-[#ED4463]">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox" checked={form.agreeMarketing}
                  onChange={(e) => setForm({ ...form, agreeMarketing: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }}
                />
                <span className="text-[13px] text-[#7A7A7A] leading-snug">Хочу получать специальные предложения и рекламные рассылки StoryBox</span>
              </label>

              <p className="text-[11px] text-[#AAAAAA]"><span className="text-[#ED4463]">*</span> — обязательные поля</p>
            </div>

            <button
              type="submit" className="btn-cta w-full text-center"
              disabled={!form.agreePersonal || !form.agreeTerms}
              style={{
                opacity: (!form.agreePersonal || !form.agreeTerms) ? 0.45 : 1,
                cursor: (!form.agreePersonal || !form.agreeTerms) ? "not-allowed" : "pointer",
              }}
            >
              Оплатить онлайн
            </button>
          </form>
        )}
      </div>
    </div>
  );
}