import { postgresAdapter } from "@payloadcms/db-postgres";
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
  collections: [Users, Posts, Media, Events, EventLocations],
  editor: lexicalEditor({}),
  plugins: [
    seo({
      collections: [Posts.slug, Events.slug],
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
  sharp,
});
