import { useState } from "react";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface ConsultPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ConsultPopup({ open, onClose }: ConsultPopupProps) {
  const [form, setForm] = useState({ name: "", contact: "", agreePersonal: false, agreeTerms: false, agreeMarketing: false });
  const [contactType, setContactType] = useState<"phone" | "email">("phone");
  const [contactError, setContactError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateContact = (value: string, type: "phone" | "email") => {
    if (!value.trim()) return "Заполните это поле";
    if (type === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10) return "Слишком короткий номер";
      if (digits.length > 12) return "Слишком длинный номер";
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Введите корректный e-mail";
    }
    return "";
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // разрешаем только цифры, +, пробел, скобки, дефис
    const filtered = raw.replace(/[^\d\s+()/-]/g, "");
    setForm({ ...form, contact: filtered });
    if (contactError) setContactError(validateContact(filtered, "phone"));
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, contact: e.target.value });
    if (contactError) setContactError(validateContact(e.target.value, "email"));
  };

  const handleContactBlur = () => {
    setContactError(validateContact(form.contact, contactType));
  };

  const switchType = (type: "phone" | "email") => {
    setContactType(type);
    setForm({ ...form, contact: "" });
    setContactError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateContact(form.contact, contactType);
    if (err) { setContactError(err); return; }

    try {
      await fetch("https://functions.poehali.dev/261c487f-3a43-41db-9302-4b4ce0812db0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: contactType === "phone" ? form.contact : form.contact,
          tariff: "Консультация",
          promo: "",
          source: `Консультация (${contactType === "phone" ? "телефон" : "email"})`,
        }),
      });
    } catch (_e) { /* отправляем форму даже при ошибке сети */ }

    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm({ name: "", contact: "", agreePersonal: false, agreeTerms: false, agreeMarketing: false });
      setContactType("phone");
      setContactError("");
      setSubmitted(false);
    }, 300);
  };

  const { sheetRef, sheetStyle, onHandleTouchStart, onHandleTouchMove, onHandleTouchEnd } = useBottomSheet({ onClose: handleClose, isOpen: open });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-center md:p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        ref={sheetRef}
        className="bottom-sheet-enter bg-white w-full rounded-t-3xl md:rounded-2xl md:max-w-[420px] shadow-2xl overflow-hidden"
        style={sheetStyle}
      >
        {/* Drag handle + крестик — только на мобайле */}
        <div
          className="md:hidden flex items-center justify-between px-4 pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={onHandleTouchStart}
          onTouchMove={onHandleTouchMove}
          onTouchEnd={onHandleTouchEnd}
        >
          <div className="flex-1" />
          <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: "#F0F0F0" }}>
            <Icon name="X" size={20} />
          </button>
        </div>
        {/* Шапка */}
        <div className="px-7 pt-4 md:pt-7 pb-5 border-b border-[#F0F0F0]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-bold text-black leading-tight">
                Бесплатная консультация
              </h2>
              <p className="text-[13px] text-[#7A7A7A] mt-1">
                30 минут · онлайн · бесплатно
              </p>
            </div>
            <button
              onClick={handleClose}
              className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-[#7A7A7A] hover:bg-[#F2F2F2] transition-colors flex-shrink-0"
            >
              <Icon name="X" size={18} />
            </button>
          </div>
        </div>

        {submitted ? (
          /* Успех */
          <div className="px-7 py-10 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-white text-2xl"
              style={{ background: "#00A4E3" }}
            >
              ✓
            </div>
            <h3 className="text-[20px] font-bold text-black mb-2">Заявка принята!</h3>
            <p className="text-[15px] text-[#7A7A7A] mb-6">
              Свяжемся с вами в ближайшее время и подберём удобное время для встречи.
            </p>
            <button onClick={handleClose} className="btn-cta">Закрыть</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">

            {/* Что будет на встрече */}
            <div className="rounded-xl px-4 py-3 flex gap-3" style={{ background: "#F2F9FF" }}>
              <span className="text-xl flex-shrink-0 mt-0.5">💬</span>
              <p className="text-[13px] text-[#444] leading-snug">
                Расскажем, как проходит создание книги, обсудим ваши задачи и ответим на любые вопросы.
              </p>
            </div>

            {/* Имя */}
            <div>
              <label className="block text-[13px] font-semibold text-[#222] mb-1.5">Ваше имя</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Как к вам обращаться?"
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors"
              />
            </div>

            {/* Переключатель телефон / email */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-semibold text-[#222]">Как с вами связаться?</label>
                <div className="flex rounded-lg overflow-hidden border border-[#E5E5E5]">
                  <button
                    type="button"
                    onClick={() => switchType("phone")}
                    className="px-3 py-1 text-[12px] font-semibold transition-colors"
                    style={{
                      background: contactType === "phone" ? "#00A4E3" : "transparent",
                      color: contactType === "phone" ? "#fff" : "#7A7A7A",
                    }}
                  >
                    Телефон
                  </button>
                  <button
                    type="button"
                    onClick={() => switchType("email")}
                    className="px-3 py-1 text-[12px] font-semibold transition-colors"
                    style={{
                      background: contactType === "email" ? "#00A4E3" : "transparent",
                      color: contactType === "email" ? "#fff" : "#7A7A7A",
                    }}
                  >
                    E-mail
                  </button>
                </div>
              </div>

              {contactType === "phone" ? (
                <input
                  type="tel"
                  required
                  value={form.contact}
                  onChange={handlePhoneInput}
                  onBlur={handleContactBlur}
                  placeholder="+7 999 123-45-67"
                  className="w-full rounded-lg px-4 py-3 text-[15px] focus:outline-none transition-colors"
                  style={{
                    border: contactError ? "1.5px solid #ED4463" : "1px solid #E5E5E5",
                  }}
                />
              ) : (
                <input
                  type="email"
                  required
                  value={form.contact}
                  onChange={handleEmailInput}
                  onBlur={handleContactBlur}
                  placeholder="your@email.com"
                  className="w-full rounded-lg px-4 py-3 text-[15px] focus:outline-none transition-colors"
                  style={{
                    border: contactError ? "1.5px solid #ED4463" : "1px solid #E5E5E5",
                  }}
                />
              )}

              {contactError && (
                <p className="text-[12px] mt-1.5 font-medium" style={{ color: "#ED4463" }}>
                  {contactError}
                </p>
              )}
            </div>

            <div className="border-t border-[#F0F0F0] pt-3 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox" required checked={form.agreePersonal}
                  onChange={(e) => setForm({ ...form, agreePersonal: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }}
                />
                <span className="text-[13px] text-[#444] leading-snug">
                  Согласен(-на) на <Link to="/legal/data-consent" target="_blank" className="underline hover:text-[#00A4E3]">обработку персональных данных</Link> (ФЗ № 152) <span style={{ color: "#ED4463" }}>*</span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox" required checked={form.agreeTerms}
                  onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }}
                />
                <span className="text-[13px] text-[#444] leading-snug">
                  Принимаю условия <Link to="/legal/offer" target="_blank" className="underline hover:text-[#00A4E3]">договора оферты</Link> <span style={{ color: "#ED4463" }}>*</span>
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

            <button type="submit" className="btn-cta w-full text-center text-[15px] py-4">
              Записаться на бесплатную консультацию
            </button>
          </form>
        )}
      </div>
    </div>
  );
}