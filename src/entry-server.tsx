import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppRoutes from "./AppRoutes";
import { TARIFFS } from "./pages/data";

export { ROUTES_SEO, SITE_URL } from "./seo/routes";
export { TARIFFS };

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
}
