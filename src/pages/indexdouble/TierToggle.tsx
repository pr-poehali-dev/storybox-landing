import Icon from "@/components/ui/icon";
import { BookTier, calcTierPrice, formatRub } from "./priceCalc";

interface TierToggleProps {
  tier: BookTier;
  hours: number;
  onChange: (t: BookTier) => void;
  premiumColor: string;
}

const STANDARD_COLOR = "#4A5560";

export default function TierToggle({ tier, hours, onChange, premiumColor }: TierToggleProps) {
  const options: { key: BookTier; title: string; hint: string; color: string; badge?: string }[] = [
    { key: "standard", title: "Стандарт", hint: "Простая вёрстка и обложка", color: STANDARD_COLOR },
    { key: "premium", title: "Premium", hint: "Дизайн, особая бумага, авторская вёрстка", color: premiumColor, badge: "Выбирают чаще" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-3 rounded-2xl p-1.5 md:p-2" style={{ background: "#F0F0F0" }} role="tablist">
      {options.map((o) => {
        const active = tier === o.key;
        const price = calcTierPrice(hours, o.key).total;
        return (
          <button
            key={o.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.key)}
            className="relative text-left rounded-xl px-3 py-3 md:px-5 md:py-4 transition-all duration-200"
            style={active
              ? { background: "#fff", boxShadow: `0 6px 20px rgba(0,0,0,0.08), inset 0 0 0 2px ${o.color}` }
              : { background: "transparent" }}
          >
            {o.badge && (
              <span
                className="absolute -top-2.5 right-2 md:right-3 text-[10px] md:text-[11px] font-bold text-white px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{ background: "#ED4463" }}
              >
                {o.badge}
              </span>
            )}
            <span className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-colors"
                style={{ border: `2px solid ${active ? o.color : "#BFC6CC"}`, background: active ? o.color : "transparent" }}
              >
                {active && <Icon name="Check" size={12} className="text-white" />}
              </span>
              <span className="text-[15px] md:text-[17px] font-extrabold" style={{ color: active ? "#000" : "#555" }}>
                {o.title}
              </span>
            </span>
            <span className="block text-[12px] md:text-[13px] text-[#7A7A7A] leading-snug mt-1 md:pl-7">{o.hint}</span>
            <span className="block text-[14px] md:text-[15px] font-bold mt-1.5 md:pl-7" style={{ color: active ? o.color : "#555" }}>
              {formatRub(price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
