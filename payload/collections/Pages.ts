import { HeroBlock } from "@/components/blocks/Hero";
import type { CollectionConfig } from "payload/types";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: {
      de: "Seite",
      en: "Page",
    },
    plural: {
      de: "Seiten",
      en: "Pages",
    },
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: {
        de: "Titel",
        en: "Title",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      label: {
        de: "Slug",
        en: "Slug",
      },
      type: "text",
      required: true,
      localized: true,
      unique: true,
      hooks: {
        beforeChange: [
          ({ value, siblingData }) => {
            if (!value && siblingData?.title) {
              return siblingData.title.toLowerCase().replace(/\s+/g, "-");
            }
          },
        ],
      },
    },
    {
      name: "content",
      label: {
        de: "Inhalt",
        en: "Content",
      },
      type: "blocks",
      localized: true,
      blocks: [HeroBlock],
    },
  ],
};
