import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { applyPhoneMask, validatePhone } from "@/utils/phoneMask";
import { reachGoal } from "@/utils/metrika";

const CHANNELS = [
  { key: "Telegram", label: "Telegram", icon: "Send" },
  { key: "Max", label: "Max", icon: "MessageSquare" },
  { key: "WhatsApp", label: "WhatsApp", icon: "MessageCircle" },
  { key: "Звонок", label: "Звонок", icon: "Phone" },
] as const;

interface OthersLeadFormProps {
  formId?: string;
  compact?: boolean;
}

export default function OthersLeadForm({ formId, compact }: OthersLeadFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", agreePersonal: false });
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]["key"]>("Telegram");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { masked, digits } = applyPhoneMask(e.target.value, phoneDigits);
    setPhoneDigits(digits);
    setForm({ ...form, phone: masked });
    if (phoneError) setPhoneError(validatePhone(masked));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePhone(form.phone);
    if (err) { setPhoneError(err); return; }

    fetch("https://functions.poehali.dev/261c487f-3a43-41db-9302-4b4ce0812db0", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        tariff: "Ты глазами других",
        promo: "",
        source: `Ты глазами других (${channel})`,
        marketing_consent: "нет",
      }),
    }).catch(() => {});

    reachGoal("others_lead_submit", { channel });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div id={formId} className="bg-white rounded-3xl border border-[#F0F0F0] px-6 py-10 text-center" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl" style={{ background: "#00A4E3" }}>
          ✓
        </div>
        <h3 className="text-[19px] font-bold text-black mb-2">Спасибо, заявка у нас</h3>
        <p className="text-[14px] text-[#7A7A7A]">
          {channel === "Звонок" ? "Скоро позвоним" : `Скоро напишем в ${channel}`}, расскажем, как всё проходит, и рассчитаем стоимость.
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
          <h3 className="text-[19px] font-bold text-black mb-1">Обсудим создание книги</h3>
          <p className="text-[13px] text-[#7A7A7A]">Напишем или позвоним вам, расскажем, как всё проходит, уточним детали и рассчитаем стоимость.</p>
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
          Согласен(-на) на <Link to="/legal/data-consent" target="_blank" className="underline hover:text-[#00A4E3]">обработку персональных данных</Link>
        </span>
      </label>

      <button type="submit" className="btn-cta w-full text-center block">
        Обсудить книгу
      </button>
    </form>
  );
}
