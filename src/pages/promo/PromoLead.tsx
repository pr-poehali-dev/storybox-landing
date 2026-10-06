import OthersLeadForm from "@/pages/others/OthersLeadForm";
import { leadFormProps } from "@/pages/indexdouble/leadFormProps";
import Reveal from "./Reveal";
import { IMG } from "./promoData";

interface PromoLeadProps {
  hours: number;
  isGift: boolean;
}

export default function PromoLead({ hours, isGift }: PromoLeadProps) {
  const form = leadFormProps(hours, isGift, "Промо /new");

  return (
    <section id="lead" className="relative py-20 md:py-32 overflow-hidden" style={{ background: "#2A1F17" }}>
      <img src={IMG.coversCollection} alt="" aria-hidden loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(42,31,23,0.97) 25%, rgba(42,31,23,0.7) 100%)" }} />

      <div className="relative max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal effect="left">
          <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#F3D9B1" }}>
            {isGift ? "Подарок, который останется навсегда" : "Начните с разговора"}
          </p>
          <h2 className="promo-serif text-white font-semibold leading-tight mb-6" style={{ fontSize: "clamp(32px, 4.4vw, 58px)" }}>
            Истории не ждут. <span className="italic font-medium" style={{ color: "#F3D9B1" }}>Сохраните их сейчас</span>
          </h2>
          <p className="text-[16px] md:text-[18px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
            Оставьте заявку — свяжемся, ответим на вопросы и вместе подберём объём книги. Консультация бесплатная и ни к
            чему не обязывает.
          </p>
          <ul className="space-y-3">
            {["Бесплатная консультация", "Интервью в студии, онлайн или у вас дома", "Доставка в любую точку мира"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[15px] md:text-[16px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F3D9B1" }} />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal effect="right" delay={150}>
          <OthersLeadForm formId="promo-lead-form" {...form} />
        </Reveal>
      </div>
    </section>
  );
}
