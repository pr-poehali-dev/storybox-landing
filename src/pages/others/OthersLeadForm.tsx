import { useState } from "react";
import Icon from "@/components/ui/icon";
import { applyPhoneMask, validatePhone } from "@/utils/phoneMask";
import { reachGoal } from "@/utils/metrika";

const CHANNELS = [
  { key: "Telegram", label: "Telegram", icon: "Send" },
  { key: "Max", label: "Max", icon: "MessageSquare" },
  { key: "WhatsApp", label: "WhatsApp", icon: "MessageCircle" },
  { key: "Звонок", label: "Звонок", icon: "Phone" },
] as const;

const SUBMIT_URL = "https://functions.poehali.dev/261c487f-3a43-41db-9302-4b4ce0812db0";

interface OthersLeadFormProps {
  formId?: string;
  compact?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  tariff?: string;
  goal?: string;
  successTitle?: string;
  successText?: string;
}

export default function OthersLeadForm({
  formId,
  compact,
  title = "Обсудим создание книги",
  subtitle = "Напишем или позвоним вам, расскажем, как всё проходит, уточним детали и рассчитаем стоимость.",
  buttonText = "Обсудить книгу",
  tariff = "Ты глазами других",
  goal = "others_lead_submit",
  successTitle = "Спасибо, заявка у нас",
  successText = "расскажем, как всё проходит, и рассчитаем стоимость.",
}: OthersLeadFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", agreePersonal: false });
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]["key"]>("Telegram");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { masked, digits } = applyPhoneMask(e.target.value, phoneDigits);
    setPhoneDigits(digits);
    setForm({ ...form, phone: masked });
    if (phoneError) setPhoneError(validatePhone(masked));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const err = validatePhone(form.phone);
    if (err) { setPhoneError(err); return; }

    setSending(true);
    setSendError("");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          tariff,
          promo: "",
          source: `${tariff} (${channel}) — ${window.location.pathname}`,
          marketing_consent: "нет",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      reachGoal(goal, { channel });
      setSubmitted(true);
    } catch {
      setSendError("Не получилось отправить заявку. Попробуйте ещё раз или позвоните нам: +7 903 193 27 25");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div id={formId} className="bg-white rounded-3xl border border-[#F0F0F0] px-6 py-10 text-center" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl" style={{ background: "#00A4E3" }}>
          ✓
        </div>
        <h3 className="text-[19px] font-bold text-black mb-2">{successTitle}</h3>
        <p className="text-[14px] text-[#7A7A7A]">
          {channel === "Звонок" ? "Скоро позвоним" : `Скоро напишем в ${channel}`}, {successText}
        </p>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-[#F0F0F0] p-6 md:p-8 space-y-4"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
    >
      {!compact && (
        <div>
          <h3 className="text-[19px] font-bold text-black mb-1">{title}</h3>
          <p className="text-[13px] text-[#7A7A7A]">{subtitle}</p>
        </div>
      )}

      <input
        type="text"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Ваше имя"
        aria-label="Ваше имя"
        className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#00A4E3] transition-colors"
      />

      <div>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={handlePhoneInput}
          onBlur={() => setPhoneError(validatePhone(form.phone))}
          placeholder="Телефон"
          aria-label="Телефон"
          className="w-full rounded-xl px-4 py-3 text-[15px] focus:outline-none transition-colors"
          style={{ border: phoneError ? "1.5px solid #ED4463" : "1px solid #E5E5E5" }}
        />
        {phoneError && <p className="text-[12px] mt-1.5 font-medium" style={{ color: "#ED4463" }}>{phoneError}</p>}
      </div>

      <div>
        <p className="text-[13px] font-semibold text-[#222] mb-2">Как с вами удобнее связаться?</p>
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setChannel(c.key)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold transition-colors border"
              style={{
                background: channel === c.key ? "#00A4E3" : "transparent",
                color: channel === c.key ? "#fff" : "#7A7A7A",
                borderColor: channel === c.key ? "#00A4E3" : "#E5E5E5",
              }}
            >
              <Icon name={c.icon} size={14} fallback="MessageCircle" />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox" required checked={form.agreePersonal}
          onChange={(e) => setForm({ ...form, agreePersonal: e.target.checked })}
          className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: "#00A4E3" }}
        />
        <span className="text-[12px] text-[#7A7A7A] leading-snug">
          Согласен(-на) на <span>обработку персональных данных</span>
        </span>
      </label>

      {sendError && (
        <p className="text-[13px] font-medium leading-snug" style={{ color: "#ED4463" }} role="alert">
          {sendError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="btn-cta w-full text-center flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
      >
        {sending && <Icon name="Loader2" size={18} className="animate-spin" />}
        {sending ? "Отправляем…" : buttonText}
      </button>
    </form>
  );
}
