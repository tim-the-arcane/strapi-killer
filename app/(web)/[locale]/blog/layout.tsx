import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async () => {
  const t = await getTranslations("pages.Blog");

  return {
    title: t("title"),
    description: t("description"),
  };
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("pages.Blog");

  return (
    <div className="h-full container grid grid-cols-[1fr,minmax(250px,_auto)] gap-8">
      <main className="flex flex-col gap-8">
        <div className="bg-black text-white p-8 rounded-xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl">{t("title")}</h1>
            <p>{t("description")}</p>
          </div>
        </div>

        <div>{children}</div>
      </main>

      <aside className="h-full p-8 border bg-zinc-200 rounded-xl"></aside>
    </div>
  );
}
