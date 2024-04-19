// import { isAdmin } from "@/payload/access/isAdmin";
// import { isAdminOrSelf } from "@/payload/access/isAdminOrSelf";
import type { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  auth: true,
  fields: [
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: "editor",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: {
            en: "Author",
            de: "Autor",
          },
          value: "author",
        },
        {
          label: "Event Manager",
          value: "event-manager",
        },
      ],
      access: {
        read: () => true,
        update: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
        create: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === "update") {
              if (value.includes("admin")) {
                return [
                  "admin",
                  value.filter((role: string) => role !== "admin"),
                ];
              }
            }

            return value;
          },
        ],
      },
    },
  ],
};
