import Icon from "@/components/ui/icon";
import { BookTier, TIER_DIFF } from "./priceCalc";

interface TierCompareProps {
  tier: BookTier;
  onChange: (t: BookTier) => void;
  premiumColor: string;
}

const PHOTOS: { key: BookTier; src: string; alt: string }[] = [
  {
    key: "standard",
    src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/e7e1e33b-cb86-47f9-8bfa-4c04f98a1551.jpg",
    alt: "Книга Стандарт: простая одноцветная обложка и обычная бумага",
  },
  {
    key: "premium",
    src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/1e6b9cb3-8e56-4d44-935f-5bf196f1b68b.jpg",
    alt: "Книга Premium: дизайнерская обложка и бумага «под старину»",
  },
];

export default function TierCompare({ tier, onChange, premiumColor }: TierCompareProps) {
  const isPremium = tier === "premium";

  return (
    <div>
      <p className="text-[15px] font-bold text-black mb-3">Чем отличаются книги</p>
      <div className="rounded-2xl border border-[#EEF1F4] overflow-hidden">
        <div className="grid grid-cols-2">
          {PHOTOS.map((ph) => {
            const active = tier === ph.key;
            return (
              <button
                key={ph.key}
                type="button"
                onClick={() => onChange(ph.key)}
                className="relative aspect-square overflow-hidden"
                aria-label={ph.alt}
              >
                <img
                  src={ph.src}
                  alt={ph.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ filter: active ? "none" : "grayscale(0.6)", opacity: active ? 1 : 0.6 }}
                />
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 text-[12px] md:text-[13px] font-bold">
          <button
            type="button"
            onClick={() => onChange("standard")}
            className="px-3 py-2.5 text-left transition-colors"
            style={{ background: !isPremium ? "#4A5560" : "#F7F8F9", color: !isPremium ? "#fff" : "#7A7A7A" }}
          >
            Стандарт
          </button>
          <button
            type="button"
            onClick={() => onChange("premium")}
            className="px-3 py-2.5 text-left transition-colors"
            style={{ background: isPremium ? premiumColor : "#F7F8F9", color: isPremium ? "#fff" : "#7A7A7A" }}
          >
            Premium
          </button>
        </div>
        {TIER_DIFF.map((d) => (
          <div key={d.label} className="border-t border-[#EEF1F4]">
            <p className="flex items-center gap-1.5 px-3 pt-2.5 text-[12px] font-semibold uppercase tracking-wide text-[#9AA3AB]">
              <Icon name={d.icon} size={13} fallback="Circle" />
              {d.label}
            </p>
            <div className="grid grid-cols-2">
              <p
                className="px-3 pt-1 pb-2.5 text-[13px] leading-snug flex items-start gap-1.5 transition-opacity"
                style={{ color: "#555", opacity: isPremium ? 0.55 : 1 }}
              >
                <Icon name="Minus" size={13} className="flex-shrink-0 mt-0.5 text-[#9AA3AB]" />
                {d.standard}
              </p>
              <p
                className="px-3 pt-1 pb-2.5 text-[13px] leading-snug flex items-start gap-1.5 transition-opacity"
                style={{ color: "#222", opacity: isPremium ? 1 : 0.55 }}
              >
                <Icon name="Check" size={13} className="flex-shrink-0 mt-0.5" style={{ color: premiumColor }} />
                {d.premium}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}