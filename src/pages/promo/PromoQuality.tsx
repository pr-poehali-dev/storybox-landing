import Reveal from "./Reveal";
import { IMG, QUALITY } from "./promoData";
import { useScrollProgress } from "./useInView";

const BROWN = "#3B2E24";
const MUTED = "#7A6A5C";
const GOLD = "#B07D48";

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[28px] aspect-[4/3] md:aspect-[5/4]" style={{ boxShadow: "0 30px 60px -30px rgba(90,60,30,0.45)" }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-[118%] object-cover"
        style={{ transform: `translateY(${-progress * 15}%)`, willChange: "transform" }}
      />
    </div>
  );
}

export default function PromoQuality() {
  const { ref: wideRef, progress: wideP } = useScrollProgress<HTMLDivElement>();
  const scale = 0.82 + Math.min(wideP * 1.6, 1) * 0.18;
  const radius = 40 - Math.min(wideP * 1.6, 1) * 40;

  return (
    <section id="quality" style={{ background: "#FDF9F3" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-20 md:pt-32 pb-10 md:pb-16 text-center">
        <Reveal>
          <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: GOLD }}>
            Качество, которое чувствуется в руках
          </p>
          <h2 className="promo-serif font-semibold leading-tight mb-5" style={{ color: BROWN, fontSize: "clamp(30px, 4.6vw, 60px)" }}>
            Не альбом и не распечатка. <br className="hidden md:block" />
            <span className="italic font-medium" style={{ color: GOLD }}>Настоящая книга</span> вашей семьи
          </h2>
          <p className="text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto" style={{ color: MUTED }}>
            Её хочется бережно хранить и передавать дальше — детям, внукам и тем, кто ещё не родился.
          </p>
        </Reveal>
      </div>

      <div className="space-y-20 md:space-y-32 pb-20 md:pb-32">
        {QUALITY.map((q, i) => {
          const reverse = i % 2 === 1;
          return (
            <div key={q.kicker} className="max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <Reveal effect={reverse ? "right" : "left"} className={reverse ? "md:order-2" : ""}>
                <ParallaxImage src={q.image} alt={q.alt} />
              </Reveal>
              <Reveal effect="up" delay={150} className={reverse ? "md:order-1" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="promo-serif italic text-[40px] md:text-[56px] leading-none" style={{ color: "#E6D3BC" }}>
                    0{i + 1}
                  </span>
                  <span className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
                    {q.kicker}
                  </span>
                </div>
                <h3 className="promo-serif font-semibold leading-snug mb-4" style={{ color: BROWN, fontSize: "clamp(24px, 2.8vw, 38px)" }}>
                  {q.title}
                </h3>
                <p className="text-[16px] md:text-[17px] leading-relaxed" style={{ color: MUTED }}>{q.text}</p>
              </Reveal>
            </div>
          );
        })}
      </div>

      <div ref={wideRef} className="px-3 md:px-6 pb-20 md:pb-32">
        <div
          className="relative mx-auto overflow-hidden aspect-[4/5] sm:aspect-[16/9] max-h-[88vh]"
          style={{ transform: `scale(${scale})`, borderRadius: `${radius + 16}px`, willChange: "transform" }}
        >
          <img src={IMG.family} alt="Три поколения семьи читают книгу воспоминаний" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(42,31,23,0) 40%, rgba(42,31,23,0.75) 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-14">
            <p className="promo-serif text-white font-medium italic leading-snug max-w-3xl" style={{ fontSize: "clamp(22px, 3.4vw, 46px)" }}>
              «Не просто факты и даты, а живые рассказы о детстве, любви, мечтах и людях, которые сформировали вашу историю»
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
