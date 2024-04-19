import { Block } from "payload/types";

/**
 * Hero Block Payload Config
 *
 * This is the configuration for the Hero block in the Payload CMS.
 */
export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlockInterface",
  fields: [
    {
      name: "title",
      label: {
        de: "Titel",
        en: "Title",
      },
      type: "text",
      required: true,
    },
  ],
};
