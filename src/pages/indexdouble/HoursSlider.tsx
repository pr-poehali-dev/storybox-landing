import * as SliderPrimitive from "@radix-ui/react-slider";
import { MAX_HOURS, MIN_HOURS, TICKS, hoursLabel } from "./priceCalc";

interface HoursSliderProps {
  hours: number;
  setHours: (h: number) => void;
  accent: string;
  onCommit?: (h: number) => void;
}

const pct = (h: number) => ((h - MIN_HOURS) / (MAX_HOURS - MIN_HOURS)) * 100;

export default function HoursSlider({ hours, setHours, accent, onCommit }: HoursSliderProps) {
  return (
    <div className="px-1 md:px-2">
      <SliderPrimitive.Root
        value={[hours]}
        min={MIN_HOURS}
        max={MAX_HOURS}
        step={1}
        onValueChange={(v) => setHours(v[0])}
        onValueCommit={(v) => onCommit?.(v[0])}
        className="relative flex w-full touch-none select-none items-center h-8 cursor-pointer"
        aria-label="Количество часов интервью"
      >
        <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full" style={{ background: "#E8EEF3" }}>
          <SliderPrimitive.Range className="absolute h-full rounded-full transition-colors" style={{ background: accent }} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block w-7 h-7 rounded-full bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 transition-transform active:scale-110"
          style={{ border: `4px solid ${accent}`, boxShadow: `0 4px 14px ${accent}59` }}
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
              <span className="block w-px" style={{ height: major ? 12 : 6, background: active ? accent : "#C9D3DB" }} />
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
  );
}
