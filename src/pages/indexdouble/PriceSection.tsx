import OthersLeadForm from "@/pages/others/OthersLeadForm";
import PriceCalculator from "./PriceCalculator";
import { calcPrice, formatRub, hoursLabel } from "./priceCalc";

interface PriceSectionProps {
  hours: number;
  setHours: (h: number) => void;
}

const FORM_ID = "price-lead-form";

export default function PriceSection({ hours, setHours }: PriceSectionProps) {
  const p = calcPrice(hours);

  const scrollToForm = () => {
    document.getElementById(FORM_ID)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="tariffs" className="py-12 md:py-20" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-3">Рассчитайте стоимость книги</h2>
          <p className="text-[15px] md:text-[17px] text-[#666] max-w-2xl mx-auto">
            Цена зависит только от того, сколько часов интервью вы выберете: от 3 до 25. Чем больше часов, тем дешевле
            каждый час.
          </p>
        </div>

        <PriceCalculator hours={hours} setHours={setHours} onOrder={scrollToForm} />

        <div className="max-w-xl mx-auto mt-10 md:mt-14">
          <OthersLeadForm
            formId={FORM_ID}
            title="Обсудим вашу книгу"
            subtitle={`Вы выбрали ${hoursLabel(p.hours)} — ${formatRub(p.total)}. Свяжемся, ответим на вопросы и поможем подобрать объём.`}
            buttonText="Оставить заявку"
            tariff={`Калькулятор: ${hoursLabel(p.hours)}, ${formatRub(p.total)}`}
            goal="calc_lead_submit"
            successText="ответим на вопросы и уточним детали книги."
          />
        </div>
      </div>
    </section>
  );
}
