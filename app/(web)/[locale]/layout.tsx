import "@/app/(web)/globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
          <Header />
          <div>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
