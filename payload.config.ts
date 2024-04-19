import { postgresAdapter } from "@payloadcms/db-postgres";
// @ts-expect-error - Typings are missing for this package
import formBuilder from "@payloadcms/plugin-form-builder";
import { seo } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload/config";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { EventLocations } from "@/payload/collections/EventLocations";
import { Events } from "@/payload/collections/Events";
import { Media } from "@/payload/collections/Media";
import { Pages } from "@/payload/collections/Pages";
import { Posts } from "@/payload/collections/Posts";
import { Users } from "@/payload/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      url: "http://localhost:3000",
    },
  },
  collections: [Users, Posts, Media, Events, EventLocations, Pages],
  editor: lexicalEditor({}),
  plugins: [
    seo({
      collections: [Posts.slug, Events.slug, Pages.slug],
      uploadsCollection: Media.slug,
    }),
    formBuilder({
      // redirectRelationships: ["pages"],
    }),
  ],
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL!,
    },
    migrationDir: "./migrations",
  }),
  localization: {
    locales: ["en", "de"],
    defaultLocale: "de",
  },
  // Seed the database with a default admin user if no users are found
  onInit: async (payload) => {
    const users = await payload.find<"users">({
      collection: "users",
    });

    if (users.docs.length === 0) {
      console.info("No users found, creating default admin user.");
      console.warn(
        "Please change the default admin user's credentials directly after login!"
      );

      await payload.create<"users">({
        collection: "users",
        data: {
          roles: ["admin"],
          email: "admin@example.com",
          password: "admin",
        },
      });

      console.info("Default admin user created.");
    }
  },
  sharp,
});
