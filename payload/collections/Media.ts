import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
      {
        name: "hero",
        width: 1920,
        height: 600,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "video/*"],
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};
