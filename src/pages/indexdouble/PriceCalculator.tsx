import * as SliderPrimitive from "@radix-ui/react-slider";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/utils/metrika";
import GiftCertificate from "./GiftCertificate";
import {
  CALC_FEATURES,
  GIFT_POINTS,
  MAX_HOURS,
  MIN_HOURS,
  TICKS,
  calcPrice,
  formatRub,
  hoursLabel,
} from "./priceCalc";

interface PriceCalculatorProps {
  hours: number;
  setHours: (h: number) => void;
  isGift: boolean;
  setIsGift: (v: boolean) => void;
  onOrder: () => void;
  selfColor?: string;
  selfSoft?: string;
}

const PINK = "#ED4463";

const pct = (h: number) => ((h - MIN_HOURS) / (MAX_HOURS - MIN_HOURS)) * 100;

export default function PriceCalculator({
  hours,
  setHours,
  isGift,
  setIsGift,
  onOrder,
  selfColor = "#00A4E3",
  selfSoft = "#F5FAFE",
}: PriceCalculatorProps) {
  const BLUE = selfColor;
  const p = calcPrice(hours);
  const base = calcPrice(MIN_HOURS);
  const accent = isGift ? PINK : BLUE;

  const switchMode = (gift: boolean) => {
    if (gift === isGift) return;
    setIsGift(gift);
    reachGoal("calc_mode_switch", { mode: gift ? "gift" : "self" });
  };

  return (
    <div
      className="bg-white rounded-3xl border border-[#F0F0F0] p-5 md:p-10"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
    >
      <div className="flex justify-center mb-7 md:mb-9">
        <div className="inline-flex rounded-2xl p-1.5 gap-1.5 w-full sm:w-auto" style={{ background: "#F0F0F0" }} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={!isGift}
            onClick={() => switchMode(false)}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl text-[15px] font-bold whitespace-nowrap transition-all duration-200"
            style={!isGift
              ? { background: BLUE, color: "#fff", boxShadow: `0 4px 14px ${BLUE}59` }
              : { background: "transparent", color: "#7A7A7A" }}
          >
            Для себя
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isGift}
            onClick={() => switchMode(true)}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl text-[15px] font-bold whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-1.5"
            style={isGift
              ? { background: PINK, color: "#fff", boxShadow: "0 4px 14px rgba(237,68,99,0.35)" }
              : { background: "transparent", color: "#7A7A7A" }}
          >
            <Icon name="Gift" size={16} />
            В подарок
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-8">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-widest mb-1" style={{ color: accent }}>
            {isGift ? "Часы интервью в подарке" : "Часы интервью"}
          </p>
          <p className="text-[34px] md:text-[44px] font-extrabold text-black leading-none">{hoursLabel(p.hours)}</p>
        </div>
        <p className="text-[14px] text-[#7A7A7A] md:text-right max-w-xs">
          {isGift
            ? "Передвиньте ползунок — сумма сертификата пересчитается сразу"
            : "Передвиньте ползунок — стоимость книги пересчитается сразу"}
        </p>
      </div>

      <div className="px-1 md:px-2">
        <SliderPrimitive.Root
          value={[hours]}
          min={MIN_HOURS}
          max={MAX_HOURS}
          step={1}
          onValueChange={(v) => setHours(v[0])}
          onValueCommit={(v) => reachGoal("calc_hours_change", { hours: v[0], mode: isGift ? "gift" : "self" })}
          className="relative flex w-full touch-none select-none items-center h-8 cursor-pointer"
          aria-label="Количество часов интервью"
        >
          <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full" style={{ background: "#E8EEF3" }}>
            <SliderPrimitive.Range className="absolute h-full rounded-full transition-colors" style={{ background: accent }} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className="block w-7 h-7 rounded-full bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 transition-transform active:scale-110"
            style={{
              border: `4px solid ${accent}`,
              boxShadow: isGift ? "0 4px 14px rgba(237,68,99,0.35)" : `0 4px 14px ${BLUE}59`,
            }}
          />
        </SliderPrimitive.Root>

        <div className="relative h-12 mt-1">
          {Array.from({ length: MAX_HOURS - MIN_HOURS + 1 }, (_, i) => MIN_HOURS + i).map((h) => {
            const major = TICKS.includes(h);
            const mobileHidden = h === 5;
            const active = h <= hours;
            return (
              <button
                key={h}
                type="button"
                onClick={() => setHours(h)}
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center group"
                style={{ left: `${pct(h)}%` }}
                aria-label={hoursLabel(h)}
                tabIndex={-1}
              >
                <span
                  className="block w-px"
                  style={{ height: major ? 12 : 6, background: active ? accent : "#C9D3DB" }}
                />
                {major && (
                  <span
                    className={`mt-1.5 text-[12px] md:text-[13px] font-semibold whitespace-nowrap transition-colors ${mobileHidden ? "hidden md:block" : ""}`}
                    style={{ color: h === hours ? accent : "#7A7A7A" }}
                  >
                    {h} ч
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 mt-6 md:mt-8">
        <div className="rounded-2xl p-5 md:p-7" style={{ background: isGift ? "#FFF5F7" : selfSoft }}>
          <p className="text-[14px] text-[#555] mb-1">{isGift ? "Сумма сертификата" : "Стоимость книги"}</p>
          <div className="flex flex-wrap items-baseline gap-3 mb-4">
            <span className="text-[36px] md:text-[48px] font-extrabold text-black leading-none">{formatRub(p.total)}</span>
            {p.savingPercent > 0 && (
              <span className="text-[13px] font-bold text-white px-2.5 py-1 rounded-full" style={{ background: PINK }}>
                −{p.savingPercent}% за час
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            <div className="bg-white rounded-xl p-2.5 md:p-3">
              <p className="text-[15px] md:text-[20px] font-bold text-black leading-tight whitespace-nowrap">{formatRub(p.perHour)}</p>
              <p className="text-[12px] text-[#7A7A7A] leading-snug">
                за час
                {p.savingPercent > 0 && (
                  <>
                    {" "}вместо <span className="line-through">{formatRub(base.perHour)}</span>
                  </>
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-2.5 md:p-3">
              <p className="text-[15px] md:text-[20px] font-bold text-black leading-tight whitespace-nowrap">~{p.pages}</p>
              <p className="text-[12px] text-[#7A7A7A] leading-snug">страниц</p>
            </div>
            <div className="bg-white rounded-xl p-2.5 md:p-3">
              <p className="text-[15px] md:text-[20px] font-bold text-black leading-tight whitespace-nowrap">до {p.photos}</p>
              <p className="text-[12px] text-[#7A7A7A] leading-snug">фотографий</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOrder}
            className="btn-cta w-full text-center mt-5 whitespace-nowrap flex items-center justify-center gap-2"
          >
            {isGift && <Icon name="Gift" size={18} />}
            {isGift ? "Подарить книгу" : "Обсудить книгу"}
          </button>
        </div>

        {isGift ? (
          <div>
            <GiftCertificate hours={p.hours} total={p.total} />
            <ul className="space-y-2.5 mt-5">
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
        ) : (
          <div>
            <p className="text-[15px] font-bold text-black mb-3">Что входит</p>
            <ul className="space-y-2.5 mb-5">
              {CALC_FEATURES(p.hours).map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#444]">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: `${BLUE}1F`, color: BLUE }}
                  >
                    <Icon name="Check" size={13} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: "#FFF5F7" }}>
              <Icon name="TrendingDown" size={20} className="flex-shrink-0 mt-0.5 text-[#ED4463]" />
              <p className="text-[13px] text-[#555] leading-relaxed">
                Чем больше часов, тем дешевле каждый час: при {hoursLabel(MAX_HOURS)} час стоит{" "}
                <b className="text-black">{formatRub(calcPrice(MAX_HOURS).perHour)}</b> вместо{" "}
                {formatRub(base.perHour)}. Не знаете, сколько нужно? Поможем рассчитать на бесплатной консультации.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
