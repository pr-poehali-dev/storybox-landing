import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ParentsIndex from "./pages/ParentsIndex";
import IndexDouble from "./pages/IndexDouble";
import PromoNew from "./pages/PromoNew";
import OthersView from "./pages/OthersView";
import FatherDayView from "./pages/FatherDayView";
import FatherStoryView from "./pages/FatherStoryView";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import DataConsent from "./pages/legal/DataConsent";
import PublicOffer from "./pages/legal/PublicOffer";
import MarketingConsent from "./pages/legal/MarketingConsent";

import SeoHead from "./seo/SeoHead";

export default function AppRoutes() {
  return (
    <>
      <SeoHead />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/parents" element={<ParentsIndex />} />
        <Route path="/index_double" element={<IndexDouble />} />
        <Route path="/new" element={<PromoNew />} />
        <Route path="/others" element={<OthersView />} />
        <Route path="/den-otca" element={<FatherDayView />} />
        <Route path="/den-otca-istoriya" element={<FatherStoryView />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        <Route path="/legal/data-consent" element={<DataConsent />} />
        <Route path="/legal/offer" element={<PublicOffer />} />
        <Route path="/legal/marketing-consent" element={<MarketingConsent />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
