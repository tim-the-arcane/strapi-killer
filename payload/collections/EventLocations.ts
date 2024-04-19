import { CollectionConfig } from "payload/types";

export const EventLocations: CollectionConfig = {
  slug: "event-locations",
  labels: {
    singular: "Event Location",
    plural: "Event Locations",
  },
  admin: {
    useAsTitle: "title",
    hidden: true,
  },
  access: {
    // Define your access control here
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "locationPhoto",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "locationAddress",
      type: "text",
    },
    {
      name: "locationZip",
      type: "number",
    },
    {
      name: "locationCity",
      type: "text",
      localized: true,
    },
  ],
};
