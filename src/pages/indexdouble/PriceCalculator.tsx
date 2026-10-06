import * as SliderPrimitive from "@radix-ui/react-slider";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/utils/metrika";
import {
  CALC_FEATURES,
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
  onOrder: () => void;
}

const pct = (h: number) => ((h - MIN_HOURS) / (MAX_HOURS - MIN_HOURS)) * 100;

export default function PriceCalculator({ hours, setHours, onOrder }: PriceCalculatorProps) {
  const p = calcPrice(hours);
  const base = calcPrice(MIN_HOURS);

  return (
    <div
      className="bg-white rounded-3xl border border-[#F0F0F0] p-5 md:p-10"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-8">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#00A4E3" }}>
            Часы интервью
          </p>
          <p className="text-[34px] md:text-[44px] font-extrabold text-black leading-none">{hoursLabel(p.hours)}</p>
        </div>
        <p className="text-[14px] text-[#7A7A7A] md:text-right max-w-xs">
          Передвиньте ползунок — стоимость книги пересчитается сразу
        </p>
      </div>

      <div className="px-1 md:px-2">
        <SliderPrimitive.Root
          value={[hours]}
          min={MIN_HOURS}
          max={MAX_HOURS}
          step={1}
          onValueChange={(v) => setHours(v[0])}
          onValueCommit={(v) => reachGoal("calc_hours_change", { hours: v[0] })}
          className="relative flex w-full touch-none select-none items-center h-8 cursor-pointer"
          aria-label="Количество часов интервью"
        >
          <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full" style={{ background: "#E8EEF3" }}>
            <SliderPrimitive.Range className="absolute h-full rounded-full" style={{ background: "#00A4E3" }} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className="block w-7 h-7 rounded-full bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00A4E3]/30 transition-transform active:scale-110"
            style={{ border: "4px solid #00A4E3", boxShadow: "0 4px 14px rgba(0,164,227,0.35)" }}
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
                  style={{ height: major ? 12 : 6, background: active ? "#00A4E3" : "#C9D3DB" }}
                />
                {major && (
                  <span
                    className={`mt-1.5 text-[12px] md:text-[13px] font-semibold whitespace-nowrap transition-colors ${mobileHidden ? "hidden md:block" : ""}`}
                    style={{ color: h === hours ? "#00A4E3" : "#7A7A7A" }}
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
        <div className="rounded-2xl p-5 md:p-7" style={{ background: "#F5FAFE" }}>
          <p className="text-[14px] text-[#555] mb-1">Стоимость книги</p>
          <div className="flex flex-wrap items-baseline gap-3 mb-4">
            <span className="text-[36px] md:text-[48px] font-extrabold text-black leading-none">{formatRub(p.total)}</span>
            {p.savingPercent > 0 && (
              <span className="text-[13px] font-bold text-white px-2.5 py-1 rounded-full" style={{ background: "#ED4463" }}>
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
          <button type="button" onClick={onOrder} className="btn-cta w-full text-center block mt-5 whitespace-nowrap">
            Обсудить книгу
          </button>
        </div>

        <div>
          <p className="text-[15px] font-bold text-black mb-3">Что входит</p>
          <ul className="space-y-2.5 mb-5">
            {CALC_FEATURES(p.hours).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#444]">
                <span
                  className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(0,164,227,0.12)", color: "#00A4E3" }}
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
      </div>
    </div>
  );
}
