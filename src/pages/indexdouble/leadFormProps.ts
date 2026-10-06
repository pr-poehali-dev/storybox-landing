import { calcPrice, formatRub, hoursLabel } from "./priceCalc";

export function leadFormProps(hours: number, isGift: boolean, source = "Калькулятор") {
  const p = calcPrice(hours);
  const summary = `${hoursLabel(p.hours)}, ${formatRub(p.total)}`;
  return isGift
    ? {
        title: "Оформим подарочный сертификат",
        subtitle: `Сертификат на ${hoursLabel(p.hours)} интервью — ${formatRub(p.total)}. Свяжемся, уточним имя получателя и пришлём сертификат, готовый к вручению.`,
        buttonText: "Оформить сертификат",
        tariff: `${source}, в подарок: ${summary}`,
        goal: "calc_gift_lead_submit",
        successTitle: "Спасибо, скоро будет подарок",
        successText: "уточним имя получателя и пришлём сертификат.",
      }
    : {
        title: "Обсудим вашу книгу",
        subtitle: `Вы выбрали ${hoursLabel(p.hours)} — ${formatRub(p.total)}. Свяжемся, ответим на вопросы и поможем подобрать объём.`,
        buttonText: "Оставить заявку",
        tariff: `${source}: ${summary}`,
        goal: "calc_lead_submit",
        successTitle: "Спасибо, заявка у нас",
        successText: "ответим на вопросы и уточним детали книги.",
      };
}
