import {
  AlignFeature,
  BlockQuoteFeature,
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload/types";

export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Event",
    plural: "Events",
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (!value) {
              return siblingData.title.toLowerCase().replace(/\s+/g, "-");
            }

            return value;
          },
        ],
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      localized: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "eventStart",
          type: "date",
          required: true,
          admin: {
            date: {
              timeFormat: "HH:mm",
              displayFormat: "dd. MMMM YYYY, HH:mm 'Uhr'",
              pickerAppearance: "dayAndTime",
              timeIntervals: 5,
              overrides: {
                locale: "de-DE",
              },
            },
          },
        },
        {
          name: "eventEnd",
          type: "date",
          required: true,
          admin: {
            date: {
              timeFormat: "HH:mm",
              displayFormat: "dd. MMMM YYYY HH:mm",
              pickerAppearance: "dayAndTime",
              timeIntervals: 5,
              overrides: {
                locale: "de-DE",
              },
            },
          },
        },
      ],
    },
    {
      name: "excerpt",
      label: "Optional Excerpt",
      type: "textarea",
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: [
          BoldFeature({}),
          ItalicFeature({}),
          UnderlineFeature({}),
          ParagraphFeature({}),
          HeadingFeature({
            enabledHeadingSizes: ["h2", "h3", "h4", "h5", "h6"],
          }),
          AlignFeature({}),
          UnorderedListFeature({}),
          OrderedListFeature({}),
          LinkFeature({}),
          BlockQuoteFeature({}),
          UploadFeature({
            collection: "media",
          }),
        ],
      }),
    },
    {
      name: "location",
      type: "group",
      fields: [
        {
          name: "isOnline",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "location",
          type: "relationship",
          relationTo: "event-locations",
          admin: {
            condition: (_, siblingData) => !siblingData.isOnline,
          },
        },
      ],
    },
    // {
    //   name: "seoTitle",
    //   type: "text",
    //   localized: true,
    // },
    // {
    //   name: "seoDesc",
    //   type: "text",
    //   localized: true,
    // },
    // {
    //   name: "signupForm",
    //   type: "relationship",
    //   relationTo: "forms",
    // },
  ],
};
