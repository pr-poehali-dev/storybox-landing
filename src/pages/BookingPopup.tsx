import { useState, useEffect } from "react";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { TARIFFS, VALID_PROMOS } from "./data";
import { applyPhoneMask, validatePhone } from "@/utils/phoneMask";
import { PaymentButton } from "@/components/extensions/robokassa/PaymentButton";

const ROBOKASSA_URL = "https://functions.poehali.dev/b0b464a9-7187-4ddf-91f5-a292f1793a94";

function parsePriceToNumber(priceStr: string): number {
  return Number(priceStr.replace(/[^\d]/g, ""));
}

interface BookingPopupProps {
  open: boolean;
  onClose: () => void;
  initialTariff?: string;
}

export default function BookingPopup({ open, onClose, initialTariff = "" }: BookingPopupProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    promo: "",
    agreePersonal: false,
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [promoStatus, setPromoStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");

  // Находим тариф по fullName
  const tariffData = TARIFFS.find((t) => t.fullName === initialTariff) ?? null;

  // Сбрасываем форму при открытии
  useEffect(() => {
    if (open) {
      setForm({ name: "", phone: "", email: "", promo: "", agreePersonal: false, agreeTerms: false, agreeMarketing: false });
      setPromoStatus("idle");
      setPromoDiscount(0);
      setSubmitted(false);
      setPhoneError("");
      setPhoneDigits("");
    }
  }, [open]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { masked, digits } = applyPhoneMask(e.target.value, phoneDigits);
    setPhoneDigits(digits);
    setForm({ ...form, phone: masked });
    if (phoneError) setPhoneError(validatePhone(masked));
  };

  const handlePhoneBlur = () => setPhoneError(validatePhone(form.phone));

  const checkPromo = () => {
    const code = form.promo.trim().toUpperCase();
    if (VALID_PROMOS[code]) { setPromoStatus("valid"); setPromoDiscount(VALID_PROMOS[code]); }
    else { setPromoStatus("invalid"); setPromoDiscount(0); }
  };

  const handleClose = () => onClose();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePhone(form.phone);
    if (err) { setPhoneError(err); return; }

    fetch("https://functions.poehali.dev/261c487f-3a43-41db-9302-4b4ce0812db0", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        tariff: initialTariff || "не указан",
        promo: form.promo,
        source: "Для себя",
      }),
    }).catch(() => {});

    setSubmitted(true);
  };

  const { sheetRef, sheetStyle, onHandleTouchStart, onHandleTouchMove, onHandleTouchEnd } = useBottomSheet({ onClose: handleClose, isOpen: open });

  if (!open) return null;

  const title = tariffData ? tariffData.fullName : initialTariff || "Заказать книгу";
  const subtitle = tariffData ? tariffData.hook : "Свяжемся для подтверждения в течение дня";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-center md:p-3"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        ref={sheetRef}
        className="bottom-sheet-enter bg-white w-full rounded-t-3xl md:rounded-2xl md:max-w-[480px] max-h-[92vh] shadow-2xl md:mb-0 relative flex flex-col"
        style={sheetStyle}
      >
        {/* Drag handle — только на мобайле, закреплён */}
        <div
          className="md:hidden flex-shrink-0 flex items-center justify-between px-4 pt-3 pb-2 cursor-grab active:cursor-grabbing rounded-t-3xl bg-white z-10"
          onTouchStart={onHandleTouchStart}
          onTouchMove={onHandleTouchMove}
          onTouchEnd={onHandleTouchEnd}
        >
          <div className="flex-1" />
          <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: "#F0F0F0" }}>
            <Icon name="X" size={20} />
          </button>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-1">
        {/* Шапка */}
        <div
          className="flex items-start justify-between px-7 pt-4 md:pt-7 pb-5"
          style={{ borderBottom: tariffData ? "none" : "1px solid #F0F0F0" }}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: tariffData?.color ?? "#00A4E3" }}>
              Оплатить онлайн
            </p>
            <h2 className="text-[22px] font-bold text-black leading-tight">{title}</h2>
          </div>
          <button onClick={handleClose} className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-[#7A7A7A] hover:bg-[#F2F2F2] transition-colors flex-shrink-0 mt-1">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Карточка тарифа */}
        {tariffData && (
          <div className="px-7 pb-2 pt-0">
            <div
              className="rounded-xl p-4 border"
              style={{
                borderColor: tariffData.discount > 0 ? "#ED446330" : "#E5E5E5",
                background: tariffData.discount > 0 ? "#FFF5F7" : "#FAFAFA",
              }}
            >
              {/* Строка 1: цена + скидка */}
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
              {/* Строка 2: формат */}
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#7A7A7A] whitespace-nowrap">{tariffData.duration}</span>
              </div>
            </div>
          </div>
        )}

        {submitted ? (
          <div className="px-7 pb-8 pt-6 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-white text-2xl" style={{ background: "#00A4E3" }}>✓</div>
            <h3 className="text-[20px] font-bold text-black mb-2">Заявка принята!</h3>
            <p className="text-[15px] text-[#7A7A7A] mb-6">Свяжемся с вами в ближайшее время для подтверждения и оплаты.</p>
            <button onClick={handleClose} className="btn-cta">Закрыть</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 pb-7 pt-5 space-y-4">
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
                type="tel" required value={form.phone}
                onChange={handlePhoneChange} onBlur={handlePhoneBlur}
                placeholder="+7 (999) 123-45-67"
                className="w-full rounded-lg px-4 py-3 text-[15px] focus:outline-none transition-colors"
                style={{ border: phoneError ? "1.5px solid #ED4463" : "1px solid #E5E5E5" }}
              />
              {phoneError && <p className="text-[12px] mt-1.5 font-medium" style={{ color: "#ED4463" }}>{phoneError}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1">Email</label>
              <input
                type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ваш@email.com"
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1">
                Промокод <span className="text-[#7A7A7A] font-normal">(необязательно)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text" value={form.promo} placeholder="Промокод"
                  onChange={(e) => { setForm({ ...form, promo: e.target.value }); setPromoStatus("idle"); setPromoDiscount(0); }}
                  className={`flex-1 min-w-0 border rounded-lg px-3 py-3 text-[14px] focus:outline-none transition-colors uppercase ${
                    promoStatus === "valid" ? "border-green-500 bg-green-50"
                    : promoStatus === "invalid" ? "border-red-400 bg-red-50"
                    : "border-[#E5E5E5] focus:border-[#00A4E3]"
                  }`}
                />
                <button
                  type="button" onClick={checkPromo} disabled={!form.promo.trim()}
                  className="flex-shrink-0 px-3 py-3 rounded-lg text-[13px] font-semibold border transition-colors disabled:opacity-40 whitespace-nowrap"
                  style={{ borderColor: "#00A4E3", color: "#00A4E3" }}
                >
                  Применить
                </button>
              </div>
              {promoStatus === "valid" && <p className="text-[12px] text-green-600 mt-1 font-semibold">✓ Промокод применён — доп. скидка {promoDiscount}%</p>}
              {promoStatus === "invalid" && <p className="text-[12px] text-red-500 mt-1">Промокод не найден или уже использован</p>}
            </div>

            <div className="border-t border-[#F0F0F0] pt-3 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox" required checked={form.agreePersonal}
                  onChange={(e) => setForm({ ...form, agreePersonal: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }}
                />
                <span className="text-[13px] text-[#444] leading-snug">
                  Согласен(-на) на <Link to="/legal/data-consent" target="_blank" className="underline hover:text-[#00A4E3]">обработку персональных данных</Link> (ФЗ № 152) <span className="text-[#ED4463]">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox" required checked={form.agreeTerms}
                  onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }}
                />
                <span className="text-[13px] text-[#444] leading-snug">
                  Принимаю условия <Link to="/legal/offer" target="_blank" className="underline hover:text-[#00A4E3]">договора оферты</Link> <span className="text-[#ED4463]">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox" checked={form.agreeMarketing}
                  onChange={(e) => setForm({ ...form, agreeMarketing: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }}
                />
                <span className="text-[13px] text-[#7A7A7A] leading-snug">
                  Хочу получать новости и специальные предложения
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <PaymentButton
                apiUrl={ROBOKASSA_URL}
                amount={(() => {
                  const base = tariffData ? parsePriceToNumber(tariffData.price) : 0;
                  return promoStatus === "valid" ? Math.round(base * (1 - promoDiscount / 100)) : base;
                })()}
                userName={form.name}
                userEmail={form.email}
                userPhone={form.phone}
                cartItems={tariffData ? [{ id: tariffData.name, name: tariffData.fullName, price: parsePriceToNumber(tariffData.price), quantity: 1 }] : []}
                successUrl={window.location.origin + "/?payment=success"}
                failUrl={window.location.origin + "/?payment=fail"}
                buttonText="Оплатить онлайн"
                className="w-full text-center text-[15px] py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90 bg-[#ED4463]"
                disabled={!form.name || !form.email || !form.agreePersonal || !form.agreeTerms || !tariffData}
              />
              <div className="text-center text-[13px] font-semibold" style={{ color: "#AAAAAA" }}>или</div>
              <button type="submit" className="w-full text-center text-[17px] font-bold transition-opacity hover:opacity-70 py-1" style={{ color: "#00A4E3", background: "none", border: "none" }}>
                Отправить заявку
              </button>
            </div>

            <p className="text-[11px] text-center" style={{ color: "#AAAAAA" }}>
              После отправки мы свяжемся в течение дня для подтверждения и оплаты
            </p>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}