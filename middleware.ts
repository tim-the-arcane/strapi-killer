import { locales } from "@/i18n/config";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales,
  defaultLocale: "de",
  localePrefix: "as-needed",
  localeDetection: false,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
