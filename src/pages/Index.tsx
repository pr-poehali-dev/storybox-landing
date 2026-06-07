import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookingPopup from "./BookingPopup";
import GiftPopup from "./GiftPopup";
import ConsultPopup from "./ConsultPopup";
import PaymentSuccessPopup from "./PaymentSuccessPopup";
import TariffsSection from "./TariffsSection";
import FaqSection from "./FaqSection";
import SiteHeader from "./SiteHeader";
import HeroSection from "./HeroSection";
import BookFeaturesSection from "./BookFeaturesSection";
import AboutSection from "./AboutSection";

export default function Index() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTariff, setPopupTariff] = useState("");
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftTariff, setGiftTariff] = useState("");
  const [consultOpen, setConsultOpen] = useState(false);
  const [activeTariff, setActiveTariff] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paymentSuccessOpen, setPaymentSuccessOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      setPaymentSuccessOpen(true);
      params.delete("payment");
      params.delete("OutSum");
      params.delete("InvId");
      params.delete("SignatureValue");
      params.delete("Culture");
      const newUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const openPopup = (tariff = "") => { setPopupTariff(tariff); setPopupOpen(true); };
  const openGiftPopup = (tariff = "") => { setGiftTariff(tariff); setGiftOpen(true); };
  const openConsult = () => setConsultOpen(true);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <BookingPopup open={popupOpen} onClose={() => setPopupOpen(false)} initialTariff={popupTariff} />
      <GiftPopup open={giftOpen} onClose={() => setGiftOpen(false)} initialTariff={giftTariff} />
      <ConsultPopup open={consultOpen} onClose={() => setConsultOpen(false)} />
      <PaymentSuccessPopup open={paymentSuccessOpen} onClose={() => setPaymentSuccessOpen(false)} />

      <SiteHeader mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <HeroSection openConsult={openConsult} />

      <BookFeaturesSection />

      <TariffsSection
        activeTariff={activeTariff}
        setActiveTariff={setActiveTariff}
        openPopup={openPopup}
        openGiftPopup={openGiftPopup}
        openConsult={openConsult}
      />

      <AboutSection openPopup={openPopup} />

      <FaqSection openConsult={openConsult} />

      {/* FOOTER */}
      <footer style={{ background: "#0F1419" }} className="border-t border-white/10 pt-12 pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="text-[22px] text-white mb-3">
              <span style={{ fontWeight: 400 }}>Story</span><span style={{ fontWeight: 700 }}>Box</span>
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Превращаем воспоминания в книги
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Тарифы</h4>
            <ul className="space-y-2">
              {["Электронная книга", "Книга Light", "Книга Standard", "Книга Premium"].map((name) => (
                <li key={name}>
                  <button onClick={() => openPopup(name)} className="text-[14px] hover:text-white transition-colors text-left" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Разделы</h4>
            <ul className="space-y-2">
              {[["Тарифы", "#tariffs"], ["FAQ", "#faq"]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[14px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Контакты</h4>
            <ul className="space-y-2 text-[14px] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li><a href="tel:+79031932725" className="hover:text-white transition-colors">+7 903 193 27 25</a></li>
              <li>Работаем во всех крупных городах</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-2">
              <a href="https://wa.me/79031932725" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "#25D366", color: "#fff" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.529 5.845L0 24l6.335-1.509A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.977.994-3.634-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
                WhatsApp
              </a>
              <a href="https://t.me/StoryBox_support" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "#2AABEE", color: "#fff" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>
                Telegram
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[15px]">Мы в соцсетях</h4>
            <ul className="space-y-2">
              {[
                { label: "ВКонтакте", href: "https://vk.com/club239010528" },
                { label: "Дзен", href: "https://dzen.ru/user/oirptu9saqakc6dcdz8weitgz8m?share_to=link" },
                { label: "Telegram канал", href: "https://t.me/+V5oog1-jZNZiNzNi" },
                { label: "RuTube", href: "https://rutube.ru/channel/65993772/" },
                { label: "YouTube", href: "https://www.youtube.com/@StoryBox_interviews" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] hover:text-white transition-colors"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-[13px]"
          style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>© 2026 StoryBox. Все права защищены.</span>
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            <Link to="/legal/privacy" className="hover:text-white/60 transition-colors">Политика конфиденциальности</Link>
            <span>·</span>
            <Link to="/legal/offer" className="hover:text-white/60 transition-colors">Договор оферты</Link>
            <span>·</span>
            <Link to="/legal/data-consent" className="hover:text-white/60 transition-colors">Согласие на обработку данных</Link>
            <span>·</span>
            <Link to="/legal/marketing-consent" className="hover:text-white/60 transition-colors">Политика и согласие на рассылки</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}