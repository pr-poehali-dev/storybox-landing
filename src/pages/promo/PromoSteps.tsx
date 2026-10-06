import Icon from "@/components/ui/icon";
import Reveal from "./Reveal";
import { IMG, STEPS } from "./promoData";
import { useScrollProgress } from "./useInView";

const BROWN = "#3B2E24";
const MUTED = "#7A6A5C";
const GOLD = "#B07D48";

export default function PromoSteps() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const line = Math.min(1, Math.max(0, (progress - 0.2) / 0.5));

  return (
    <section id="how" className="relative py-20 md:py-32 overflow-hidden" style={{ background: "#F5ECE0" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-20 items-start">
        <div className="md:sticky md:top-28">
          <Reveal>
            <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: GOLD }}>
              Как это работает
            </p>
            <h2 className="promo-serif font-semibold leading-tight mb-5" style={{ color: BROWN, fontSize: "clamp(30px, 4.2vw, 54px)" }}>
              От первой встречи <span className="italic font-medium" style={{ color: GOLD }}>до книги в руках</span>
            </h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed mb-8" style={{ color: MUTED }}>
              Вам не нужно ничего писать самим. Мы бережно проведём героя через каждый шаг — от разговора за чаем до
              доставки готовой книги.
            </p>
          </Reveal>
          <Reveal effect="zoom" delay={150} className="hidden md:block">
            <div className="overflow-hidden rounded-[28px] aspect-[4/3]" style={{ boxShadow: "0 30px 60px -30px rgba(90,60,30,0.45)" }}>
              <img src={IMG.hands} alt="Бабушка листает семейную книгу за чаем" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-[2px] rounded-full" style={{ background: "#E6D3BC" }} />
          <div
            className="absolute left-[23px] md:left-[27px] top-4 w-[2px] rounded-full origin-top"
            style={{ background: GOLD, height: "calc(100% - 32px)", transform: `scaleY(${line})` }}
          />
          <ol className="space-y-10 md:space-y-14">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} effect="right" delay={i * 80} className="relative pl-16 md:pl-20">
                <span
                  className="absolute left-0 top-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white"
                  style={{ background: line >= i / (STEPS.length - 1) - 0.02 ? GOLD : "#D9C4AA", transition: "background 0.4s" }}
                >
                  <Icon name={s.icon} size={20} fallback="Circle" />
                </span>
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-1.5" style={{ color: GOLD }}>
                  Шаг {i + 1}
                </p>
                <h3 className="promo-serif text-[22px] md:text-[28px] font-semibold mb-2 leading-snug" style={{ color: BROWN }}>
                  {s.title}
                </h3>
                <p className="text-[15px] md:text-[17px] leading-relaxed" style={{ color: MUTED }}>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
