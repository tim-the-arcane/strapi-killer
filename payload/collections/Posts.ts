import {
  HTMLConverterFeature,
  HeadingFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload/types";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: {
      de: "Beitrag",
      en: "Post",
    },
    plural: {
      de: "Beiträge",
      en: "Posts",
    },
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      type: "row",
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
          admin: {
            width: "70%",
          },
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
          admin: {
            width: "30%",
          },
        },
      ],
    },
    {
      type: "textarea",
      name: "excerpt",
      label: {
        de: "Auszug",
        en: "Excerpt",
      },
      localized: true,
    },
    {
      name: "content",
      label: {
        de: "Inhalt",
        en: "Content",
      },
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        // @ts-expect-error
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers. If you do not pass any arguments to it, it will use the default serializers.
          HeadingFeature({
            enabledHeadingSizes: ["h2", "h3", "h4"],
          }),
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML("content", {
      name: "content_html",
    }),
  ],
};
