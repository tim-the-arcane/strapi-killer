import { Hero } from "@/components/blocks/Hero";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import React from "react";

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
    title: page.title,
    description: "This is a dynamic page.",
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
          page.content.map((block, index) => {
            return (
              <React.Fragment key={`block-${index}`}>
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
