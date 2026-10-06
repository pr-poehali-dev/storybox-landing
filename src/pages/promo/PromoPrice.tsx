import PriceCalculator from "@/pages/indexdouble/PriceCalculator";
import Reveal from "./Reveal";

const BROWN = "#3B2E24";
const MUTED = "#7A6A5C";
const GOLD = "#B07D48";

interface PromoPriceProps {
  hours: number;
  setHours: (h: number) => void;
  isGift: boolean;
  setIsGift: (v: boolean) => void;
}

export default function PromoPrice({ hours, setHours, isGift, setIsGift }: PromoPriceProps) {
  const toForm = () => document.getElementById("lead")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="price" className="py-20 md:py-32" style={{ background: "#FDF9F3" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-10">
        <Reveal className="text-center mb-10 md:mb-14">
          <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: GOLD }}>
            Стоимость
          </p>
          <h2 className="promo-serif font-semibold leading-tight mb-5" style={{ color: BROWN, fontSize: "clamp(30px, 4.2vw, 54px)" }}>
            {isGift ? (
              <>Сколько часов <span className="italic font-medium" style={{ color: GOLD }}>подарить</span>?</>
            ) : (
              <>Сколько историй <span className="italic font-medium" style={{ color: GOLD }}>вы хотите сохранить</span>?</>
            )}
          </h2>
          <p className="text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto" style={{ color: MUTED }}>
            Цена зависит только от часов интервью: от 3 до 25. Чем больше часов, тем дешевле каждый час.
          </p>
        </Reveal>
        <Reveal effect="zoom" delay={100}>
          <PriceCalculator
            hours={hours}
            setHours={setHours}
            isGift={isGift}
            setIsGift={setIsGift}
            onOrder={toForm}
            selfColor={GOLD}
            selfSoft="#FBF4EA"
          />
        </Reveal>
      </div>
    </section>
  );
}
