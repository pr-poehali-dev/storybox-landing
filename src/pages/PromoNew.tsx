import { useState } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_HOURS } from "./indexdouble/priceCalc";
import PromoHeader from "./promo/PromoHeader";
import PromoHero from "./promo/PromoHero";
import PromoQuality from "./promo/PromoQuality";
import PromoSteps from "./promo/PromoSteps";
import PromoPrice from "./promo/PromoPrice";
import PromoFaq from "./promo/PromoFaq";
import PromoLead from "./promo/PromoLead";

export default function PromoNew() {
  const [hours, setHours] = useState(DEFAULT_HOURS);
  const [isGift, setIsGift] = useState(false);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", background: "#FDF9F3" }}>
      <PromoHeader />
      <PromoHero />
      <PromoQuality />
      <PromoSteps />
      <PromoPrice hours={hours} setHours={setHours} isGift={isGift} setIsGift={setIsGift} />
      <PromoFaq />
      <PromoLead hours={hours} isGift={isGift} />

      <footer className="px-5 md:px-10 py-10" style={{ background: "#1F1711", color: "rgba(255,255,255,0.45)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-[13px]">
          <div>
            <p className="text-[20px] text-white mb-2">
              <span className="font-normal">Story</span><span className="font-bold">Box</span>
            </p>
            <p>© 2026 StoryBox. Превращаем воспоминания в книги</p>
            <a href="tel:+79031932725" className="hover:text-white transition-colors">+7 903 193 27 25</a>
          </div>
          <div className="flex flex-col gap-1.5 md:text-right">
            <Link to="/legal/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link to="/legal/offer" className="hover:text-white transition-colors">Договор оферты</Link>
            <Link to="/legal/data-consent" className="hover:text-white transition-colors">Согласие на обработку данных</Link>
            <Link to="/legal/marketing-consent" className="hover:text-white transition-colors">Политика и согласие на рассылки</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
