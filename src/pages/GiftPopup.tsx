import { useState, useEffect } from "react";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { TARIFFS, VALID_PROMOS } from "./data";
import { applyPhoneMask, validatePhone } from "@/utils/phoneMask";

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
  const [phoneDigits, setPhoneDigits] = useState("");
  const [lightbox, setLightbox] = useState(false);

  const tariffData = TARIFFS.find((t) => t.fullName === initialTariff) ?? null;

  useEffect(() => {
    if (open) {
      setForm({ name: "", phone: "", recipientName: "", promo: "", agreePersonal: false, agreeTerms: false, agreeMarketing: false });
      setPromoStatus("idle");
      setPromoDiscount(0);
      setSubmitted(false);
      setPhoneError("");
      setPhoneDigits("");
      setLightbox(false);
    }
  }, [open]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { masked, digits } = applyPhoneMask(e.target.value, phoneDigits);
    setPhoneDigits(digits);
    setForm({ ...form, phone: masked });
    if (phoneError) setPhoneError(validatePhone(masked));
  };

  const checkPromo = () => {
    const code = form.promo.trim().toUpperCase();
    if (VALID_PROMOS[code]) { setPromoStatus("valid"); setPromoDiscount(VALID_PROMOS[code]); }
    else { setPromoStatus("invalid"); setPromoDiscount(0); }
  };

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
        source: `Подарок${form.recipientName ? " (получатель: " + form.recipientName + ")" : ""}`,
        marketing_consent: form.agreeMarketing ? "да" : "нет",
      }),
    }).catch(() => {});

    setSubmitted(true);
  };

  const { sheetRef, sheetStyle, onHandleTouchStart, onHandleTouchMove, onHandleTouchEnd } = useBottomSheet({ onClose, isOpen: open });

  if (!open) return null;

  const title = tariffData ? tariffData.fullName : initialTariff || "Подарочный сертификат";

  return (
    <>
      {/* Лайтбокс сертификата */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(false)}
          >
            <Icon name="X" size={22} />
          </button>
          <img
            src={CERT_IMG}
            alt="Подарочный сертификат StoryBox"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Основной попап */}
      <div
        className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-center md:p-6"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div
          ref={sheetRef}
          className="bottom-sheet-enter bg-white w-full rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
          style={{ ...sheetStyle, maxWidth: 860, maxHeight: "92vh" } as React.CSSProperties}
        >
          {/* Drag handle + крестик — только на мобайле */}
          <div
            className="md:hidden flex items-center justify-between px-4 pt-3 pb-2 w-full flex-shrink-0 cursor-grab active:cursor-grabbing"
            onTouchStart={onHandleTouchStart}
            onTouchMove={onHandleTouchMove}
            onTouchEnd={onHandleTouchEnd}
          >
            <div className="flex-1" />
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: "#F0F0F0" }}>
              <Icon name="X" size={20} />
            </button>
          </div>
          {/* Левая колонка — сертификат */}
          <div
            className="hidden md:flex flex-col justify-between p-6 flex-shrink-0"
            style={{ width: 320, background: "#FFF5F7", borderRight: "1px solid #FFD6DF" }}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#ED4463" }}>🎁 Подарочный сертификат</p>
              {tariffData && (
                <div className="rounded-xl p-3 mb-4 border" style={{ borderColor: "#ED446330", background: "#fff" }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    {tariffData.priceOld && (
                      <span className="text-[12px] text-[#AAAAAA] line-through">{tariffData.priceOld}</span>
                    )}
                    <span className="text-[20px] font-extrabold" style={{ color: tariffData.color }}>{tariffData.price}</span>
                    {tariffData.discount > 0 && (
                      <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: "#ED4463" }}>−{tariffData.discount}%</span>
                    )}
                  </div>
                  <span className="text-[12px] text-[#7A7A7A]">{tariffData.duration}</span>
                </div>
              )}
              <p className="text-[12px] font-semibold text-[#7A7A7A] uppercase tracking-wide mb-2">Пример сертификата</p>
              <button
                onClick={() => setLightbox(true)}
                className="relative w-full rounded-xl overflow-hidden group border"
                style={{ borderColor: "#F0F0F0" }}
              >
                <img src={CERT_IMG} alt="Пример сертификата" className="w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.35)" }}>
                  <div className="flex items-center gap-1.5 text-white text-[13px] font-semibold">
                    <Icon name="ZoomIn" size={16} />
                    Увеличить
                  </div>
                </div>
              </button>
              <p className="text-[12px] text-[#AAAAAA] mt-2 text-center">Нажмите для увеличения</p>
            </div>
          </div>

          {/* Правая колонка — форма */}
          <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
            {/* Шапка */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 flex-shrink-0">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-1 md:hidden" style={{ color: "#ED4463" }}>🎁 Подарочный сертификат</p>
                <h2 className="text-[20px] font-bold text-black leading-tight">{title}</h2>
              </div>
              <button onClick={onClose} className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-[#7A7A7A] hover:bg-[#F2F2F2] transition-colors flex-shrink-0 ml-2">
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Мобильный превью сертификата */}
            <div className="md:hidden px-6 pb-4">
              {tariffData && (
                <div className="rounded-xl p-3 mb-3 border" style={{ borderColor: "#ED446330", background: "#FFF5F7" }}>
                  <div className="flex items-center gap-2">
                    {tariffData.priceOld && <span className="text-[12px] text-[#AAAAAA] line-through">{tariffData.priceOld}</span>}
                    <span className="text-[20px] font-extrabold" style={{ color: tariffData.color }}>{tariffData.price}</span>
                    {tariffData.discount > 0 && <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: "#ED4463" }}>−{tariffData.discount}%</span>}
                  </div>
                </div>
              )}
              <button onClick={() => setLightbox(true)} className="relative w-full rounded-xl overflow-hidden border" style={{ borderColor: "#F0F0F0" }}>
                <img src={CERT_IMG} alt="Пример сертификата" className="w-full object-cover" style={{ maxHeight: 120 }} />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.25)" }}>
                  <div className="flex items-center gap-1.5 text-white text-[13px] font-semibold">
                    <Icon name="ZoomIn" size={16} /> Увеличить
                  </div>
                </div>
              </button>
            </div>

            {submitted ? (
              <div className="px-6 pb-8 pt-4 text-center flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl" style={{ background: "#ED4463" }}>🎁</div>
                <h3 className="text-[20px] font-bold text-black mb-2">Заявка отправлена!</h3>
                <p className="text-[14px] text-[#7A7A7A] leading-relaxed mb-6">
                  Свяжемся в течение дня и вышлем сертификат{form.recipientName ? ` для ${form.recipientName}` : ""}.
                </p>
                <button onClick={onClose} className="btn-cta px-8 py-3 text-[15px]">Отлично!</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 pb-6 pt-1 space-y-3 flex-1">
                {/* Ваше имя */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1">Ваше имя <span style={{ color: "#ED4463" }}>*</span></label>
                  <input
                    type="text" required placeholder="Как вас зовут?"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-[14px] outline-none transition-colors focus:border-[#ED4463]"
                    style={{ borderColor: "#E5E5E5" }}
                  />
                </div>

                {/* Для кого */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1">Для кого сертификат <span style={{ color: "#ED4463" }}>*</span></label>
                  <input
                    type="text" required placeholder="ФИО получателя подарка"
                    value={form.recipientName} onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-[14px] outline-none transition-colors focus:border-[#ED4463]"
                    style={{ borderColor: "#E5E5E5" }}
                  />
                  <p className="text-[11px] text-[#AAAAAA] mt-0.5">Будет указано на сертификате</p>
                </div>

                {/* Телефон */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1">Ваш телефон <span style={{ color: "#ED4463" }}>*</span></label>
                  <input
                    type="tel" required placeholder="+7 (___) ___-__-__"
                    value={form.phone} onChange={handlePhoneChange}
                    className="w-full px-4 py-2.5 rounded-xl border text-[14px] outline-none transition-colors focus:border-[#ED4463]"
                    style={{ borderColor: phoneError ? "#ED4463" : "#E5E5E5" }}
                  />
                  {phoneError && <p className="text-[12px] mt-0.5" style={{ color: "#ED4463" }}>{phoneError}</p>}
                </div>

                {/* Промокод */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1">Промокод</label>
                  <div className="flex gap-2">
                    <input
                      type="text" placeholder="Промокод"
                      value={form.promo}
                      onChange={(e) => { setForm({ ...form, promo: e.target.value }); setPromoStatus("idle"); }}
                      className="flex-1 px-4 py-2.5 rounded-xl border text-[14px] outline-none uppercase"
                      style={{ borderColor: promoStatus === "valid" ? "#22C55E" : promoStatus === "invalid" ? "#ED4463" : "#E5E5E5" }}
                    />
                    <button type="button" onClick={checkPromo} className="px-4 py-2.5 rounded-xl text-[13px] font-semibold" style={{ background: "#F2F2F2", color: "#444" }}>
                      Применить
                    </button>
                  </div>
                  {promoStatus === "valid" && <p className="text-[12px] text-green-600 mt-0.5 font-semibold">✓ Скидка {promoDiscount}%</p>}
                  {promoStatus === "invalid" && <p className="text-[12px] mt-0.5" style={{ color: "#ED4463" }}>Промокод не найден</p>}
                </div>

                {/* Согласия */}
                <div className="border-t border-[#F0F0F0] pt-3 space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" required checked={form.agreePersonal} onChange={(e) => setForm({ ...form, agreePersonal: e.target.checked })}
                      className="mt-0.5 w-4 h-4 flex-shrink-0" style={{ accentColor: "#ED4463" }} />
                    <span className="text-[12px] text-[#444] leading-snug">
                      Согласен(-на) на <Link to="/legal/data-consent" target="_blank" className="underline hover:text-[#ED4463]">обработку персональных данных</Link> (ФЗ № 152) <span style={{ color: "#ED4463" }}>*</span>
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" required checked={form.agreeTerms} onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                      className="mt-0.5 w-4 h-4 flex-shrink-0" style={{ accentColor: "#ED4463" }} />
                    <span className="text-[12px] text-[#444] leading-snug">
                      Принимаю <Link to="/legal/offer" target="_blank" className="underline hover:text-[#ED4463]">договор оферты</Link> <span style={{ color: "#ED4463" }}>*</span>
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.agreeMarketing} onChange={(e) => setForm({ ...form, agreeMarketing: e.target.checked })}
                      className="mt-0.5 w-4 h-4 flex-shrink-0" style={{ accentColor: "#ED4463" }} />
                    <span className="text-[12px] text-[#7A7A7A] leading-snug">Хочу получать новости и предложения</span>
                  </label>
                </div>

                <button type="submit" className="w-full text-center text-[15px] py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90" style={{ background: "#ED4463" }}>
                  🎁 Оформить подарочный сертификат
                </button>
                <p className="text-[11px] text-center" style={{ color: "#AAAAAA" }}>После оплаты — красиво оформленный сертификат на email</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}