import Icon from "@/components/ui/icon";
import { reachGoal } from "@/utils/metrika";
import HoursSlider from "./HoursSlider";
import TierToggle from "./TierToggle";
import TierCompare from "./TierCompare";
import GiftCertificate from "./GiftCertificate";
import { BOOK_CONTENT, BookTier, GIFT_POINTS, calcTierPrice, formatRub, hoursLabel } from "./priceCalc";

interface TierCalculatorProps {
  hours: number;
  setHours: (h: number) => void;
  tier: BookTier;
  setTier: (t: BookTier) => void;
  isGift: boolean;
  setIsGift: (v: boolean) => void;
  onOrder: () => void;
}

const BLUE = "#00A4E3";
const GREY = "#4A5560";
const PINK = "#ED4463";

export default function TierCalculator({ hours, setHours, tier, setTier, isGift, setIsGift, onOrder }: TierCalculatorProps) {
  const toggleGift = () => {
    setIsGift(!isGift);
    reachGoal("calc_mode_switch", { mode: !isGift ? "gift" : "self", tier });
  };
  const isPremium = tier === "premium";
  const accent = isPremium ? BLUE : GREY;
  const p = calcTierPrice(hours, tier);
  const other = calcTierPrice(hours, isPremium ? "standard" : "premium");
  const diff = Math.abs(p.total - other.total);

  const changeTier = (t: BookTier) => {
    if (t === tier) return;
    setTier(t);
    reachGoal("calc_tier_switch", { tier: t, hours: p.hours });
  };

  return (
    <div
      className="bg-white rounded-3xl border border-[#F0F0F0] p-5 md:p-10"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
    >
      <p className="text-[13px] font-semibold uppercase tracking-widest mb-3 text-[#7A7A7A]">1. Выберите вариант книги</p>
      <TierToggle tier={tier} hours={hours} onChange={changeTier} premiumColor={BLUE} />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mt-8 mb-6">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-widest mb-1 text-[#7A7A7A]">2. Часы интервью</p>
          <p className="text-[34px] md:text-[44px] font-extrabold text-black leading-none">{hoursLabel(p.hours)}</p>
        </div>
        <p className="text-[14px] text-[#7A7A7A] md:text-right max-w-xs">
          Передвиньте ползунок — стоимость пересчитается сразу
        </p>
      </div>

      <HoursSlider
        hours={hours}
        setHours={setHours}
        accent={accent}
        onCommit={(h) => reachGoal("calc_hours_change", { hours: h, tier })}
      />

      <div className="grid md:grid-cols-[1fr_1.1fr] gap-6 md:gap-10 mt-6 md:mt-8">
        <div className="rounded-2xl p-5 md:p-7" style={{ background: isPremium ? "#F5FAFE" : "#F4F5F6" }}>
          <p className="text-[14px] text-[#555] mb-1">
            Книга <b className="text-black">{isPremium ? "Premium" : "Стандарт"}</b>
          </p>
          <div className="flex flex-wrap items-baseline gap-3 mb-4">
            <span className="text-[36px] md:text-[48px] font-extrabold text-black leading-none">{formatRub(p.total)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <div className="bg-white rounded-xl p-2.5 md:p-3">
              <p className="text-[15px] md:text-[20px] font-bold text-black leading-tight whitespace-nowrap">{formatRub(p.perHour)}</p>
              <p className="text-[12px] text-[#7A7A7A] leading-snug">за час</p>
            </div>
            <div className="bg-white rounded-xl p-2.5 md:p-3">
              <p className="text-[15px] md:text-[20px] font-bold text-black leading-tight whitespace-nowrap">~{p.pages}</p>
              <p className="text-[12px] text-[#7A7A7A] leading-snug">страниц</p>
            </div>
          </div>

          <p className="text-[14px] font-bold text-black mt-5 mb-2.5">В обоих вариантах</p>
          <ul className="space-y-2">
            {BOOK_CONTENT(p.hours).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#444]">
                <span
                  className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: `${accent}1F`, color: accent }}
                >
                  <Icon name="Check" size={13} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onOrder}
            className="btn-cta w-full text-center mt-6 whitespace-nowrap flex items-center justify-center gap-2"
          >
            {isGift && <Icon name="Gift" size={18} />}
            {isGift ? "Оформить сертификат" : "Обсудить книгу"}
          </button>
        </div>

        <div>
          <TierCompare tier={tier} onChange={changeTier} premiumColor={BLUE} />
          <div className="rounded-2xl p-4 mt-4 flex items-start gap-3" style={{ background: isPremium ? "#F4F5F6" : "#F5FAFE" }}>
            <Icon name={isPremium ? "Wallet" : "Sparkles"} size={20} className="flex-shrink-0 mt-0.5" style={{ color: isPremium ? GREY : BLUE }} />
            <p className="text-[13px] text-[#555] leading-relaxed">
              {isPremium ? (
                <>
                  Нужно скромнее? Книга «Стандарт» на {hoursLabel(p.hours)} — <b className="text-black">{formatRub(other.total)}</b>,
                  на {formatRub(diff)} дешевле. Истории те же, проще только оформление.{" "}
                  <button type="button" onClick={() => changeTier("standard")} className="font-semibold underline" style={{ color: GREY }}>
                    Посмотреть
                  </button>
                </>
              ) : (
                <>
                  Хотите книгу, которая станет семейной реликвией? Premium на {hoursLabel(p.hours)} стоит{" "}
                  <b className="text-black">{formatRub(other.total)}</b> — это на {formatRub(diff)} дороже. За эту разницу: особая
                  бумага «под старину», авторская вёрстка и дизайнерская обложка.{" "}
                  <button type="button" onClick={() => changeTier("premium")} className="font-semibold underline" style={{ color: BLUE }}>
                    Выбрать Premium
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-[#F0F0F0]">
        <label
          className="flex items-center gap-3 cursor-pointer select-none rounded-2xl px-4 py-3.5 transition-colors"
          style={{ background: isGift ? "#FFF5F7" : "#F7F8F9", boxShadow: isGift ? `inset 0 0 0 2px ${PINK}` : "none" }}
        >
          <input type="checkbox" checked={isGift} onChange={toggleGift} className="sr-only" />
          <span
            className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center transition-colors"
            style={{ border: `2px solid ${isGift ? PINK : "#BFC6CC"}`, background: isGift ? PINK : "#fff" }}
          >
            {isGift && <Icon name="Check" size={15} className="text-white" />}
          </span>
          <Icon name="Gift" size={20} className="flex-shrink-0" style={{ color: PINK }} />
          <span>
            <span className="block text-[15px] md:text-[16px] font-bold text-black">Оформить как подарок</span>
            <span className="block text-[13px] text-[#7A7A7A] leading-snug">
              Пришлём именной сертификат — получатель сам выберет время интервью
            </span>
          </span>
        </label>

        {isGift && (
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 mt-6 items-center">
            <GiftCertificate hours={p.hours} total={p.total} tierName={isPremium ? "Premium" : "Стандарт"} />
            <ul className="space-y-2.5">
              {GIFT_POINTS.map((g) => (
                <li key={g.text} className="flex items-start gap-2.5 text-[14px] text-[#444]">
                  <span
                    className="mt-0.5 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(237,68,99,0.12)", color: PINK }}
                  >
                    <Icon name={g.icon} size={13} fallback="Check" />
                  </span>
                  {g.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}