import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("errors.NotFound");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function NotFound() {
  const t = await getTranslations("errors.NotFound");

  return (
    <main className="grid place-items-center">
      <div className="container">
        <div className="flex flex-col gap-8">
          <h1 className="text-6xl">
            {t("code")} &mdash; {t("title")}
          </h1>
          <p>{t("description")}</p>
        </div>
      </div>
    </main>
  );
}
