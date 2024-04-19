import { Hero } from "@/components/blocks/Hero";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import React from "react";

export const revalidate = 300;

const getPageBySlug = async (slug: string, locale: string) => {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find<"pages">({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as "de" | "en",
    limit: 1,
  });

  return pages.docs[0] ?? null;
};

interface DynamicPageParams {
  params: {
    slug: string;
    locale: string;
  };
}

export const generateMetadata = async ({
  params: { locale, slug },
}: DynamicPageParams) => {
  const page = await getPageBySlug(slug, locale);

  if (!page) {
    notFound();
  }

  return {
    title: page.meta?.title ?? page.title,
    description: page.meta?.description ?? undefined,
  };
};

export default async function DynamicPage({
  params: { slug, locale },
}: DynamicPageParams) {
  const page = await getPageBySlug(slug, locale);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <>
        {page?.content &&
          page.content.map((block) => {
            return (
              <React.Fragment key={block.id}>
                {block.blockType === "hero" && (
                  <Hero block={block} className="py-12 bg-black text-white" />
                )}
              </React.Fragment>
            );
          })}
      </>
    </main>
  );
}
