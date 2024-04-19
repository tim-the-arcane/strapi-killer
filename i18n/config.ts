import {
  Pathnames,
  createLocalizedPathnamesNavigation,
} from "next-intl/navigation";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "de"];
export const localePrefix = "as-needed" as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

export const pathnames = {
  "/": "/",
  "/blog": "/blog",
  "/blog/page/[page]": {
    en: "/blog/page/[page]",
    de: "/blog/seite/[page]",
  },
  "/blog/[slug]": "/blog/[slug]",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
