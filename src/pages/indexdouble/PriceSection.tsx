import { useState } from "react";
import OthersLeadForm from "@/pages/others/OthersLeadForm";
import PriceCalculator from "./PriceCalculator";
import { calcPrice, formatRub, hoursLabel } from "./priceCalc";

interface PriceSectionProps {
  hours: number;
  setHours: (h: number) => void;
}

const FORM_ID = "price-lead-form";

export default function PriceSection({ hours, setHours }: PriceSectionProps) {
  const [isGift, setIsGift] = useState(false);
  const p = calcPrice(hours);
  const summary = `${hoursLabel(p.hours)}, ${formatRub(p.total)}`;

  const scrollToForm = () => {
    document.getElementById(FORM_ID)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const form = isGift
    ? {
        title: "Оформим подарочный сертификат",
        subtitle: `Сертификат на ${hoursLabel(p.hours)} интервью — ${formatRub(p.total)}. Свяжемся, уточним имя получателя и пришлём сертификат, готовый к вручению.`,
        buttonText: "Оформить сертификат",
        tariff: `Калькулятор, в подарок: ${summary}`,
        goal: "calc_gift_lead_submit",
        successTitle: "Спасибо, скоро будет подарок",
        successText: "уточним имя получателя и пришлём сертификат.",
      }
    : {
        title: "Обсудим вашу книгу",
        subtitle: `Вы выбрали ${hoursLabel(p.hours)} — ${formatRub(p.total)}. Свяжемся, ответим на вопросы и поможем подобрать объём.`,
        buttonText: "Оставить заявку",
        tariff: `Калькулятор: ${summary}`,
        goal: "calc_lead_submit",
        successTitle: "Спасибо, заявка у нас",
        successText: "ответим на вопросы и уточним детали книги.",
      };

  return (
    <section id="tariffs" className="py-12 md:py-20" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-3">
            {isGift ? "Рассчитайте сумму подарка" : "Рассчитайте стоимость книги"}
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] max-w-2xl mx-auto">
            {isGift
              ? "Выберите, сколько часов интервью подарить: от 3 до 25. Мы пришлём именной сертификат, а получатель сам выберет удобное время."
              : "Цена зависит только от того, сколько часов интервью вы выберете: от 3 до 25. Чем больше часов, тем дешевле каждый час."}
          </p>
        </div>

        <PriceCalculator
          hours={hours}
          setHours={setHours}
          isGift={isGift}
          setIsGift={setIsGift}
          onOrder={scrollToForm}
        />

        <div className="max-w-xl mx-auto mt-10 md:mt-14">
          <OthersLeadForm formId={FORM_ID} {...form} />
        </div>
      </div>
    </section>
  );
}
