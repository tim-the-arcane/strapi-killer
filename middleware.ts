import { localePrefix, locales, pathnames } from "@/i18n/config";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales,
  defaultLocale: "de",
  localePrefix,
  localeDetection: false,
  pathnames,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!admin|api|_next|_vercel|.*\\..*).*)"],
};
