import { HeroBlockInterface } from "@/payload-types";
import clsx from "clsx";
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

interface HeroProps {
  block: HeroBlockInterface;
  className?: string;
}

export const Hero = ({ block, className }: HeroProps) => (
  <div className={clsx("py-12 bg-black text-white", className)}>
    <div className="container">
      <h2>{block.title}</h2>
    </div>
  </div>
);
