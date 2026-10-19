import { useState } from "react";
import OthersLeadForm from "@/pages/others/OthersLeadForm";
import TierCalculator from "./TierCalculator";
import { tierLeadFormProps } from "./leadFormProps";
import { BookTier } from "./priceCalc";

interface PriceSectionProps {
  hours: number;
  setHours: (h: number) => void;
}

const FORM_ID = "price-lead-form";

export default function PriceSection({ hours, setHours }: PriceSectionProps) {
  const [tier, setTier] = useState<BookTier>("premium");
  const [isGift, setIsGift] = useState(false);

  const scrollToForm = () => {
    document.getElementById(FORM_ID)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const form = tierLeadFormProps(hours, tier, isGift);

  return (
    <section id="tariffs" className="py-12 md:py-20" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-3">Рассчитайте стоимость книги</h2>
          <p className="text-[15px] md:text-[17px] text-[#666] max-w-2xl mx-auto">
            Выберите вариант оформления и сколько часов интервью вам нужно: от 3 до 25. Истории и работа биографа
            одинаковые, отличаются бумага, вёрстка и дизайн.
          </p>
        </div>

        <TierCalculator hours={hours} setHours={setHours} tier={tier} setTier={setTier} isGift={isGift} setIsGift={setIsGift} onOrder={scrollToForm} />

        <div className="max-w-xl mx-auto mt-10 md:mt-14">
          <OthersLeadForm formId={FORM_ID} {...form} />
        </div>
      </div>
    </section>
  );
}