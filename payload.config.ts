import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload/config";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "@/collections/Media";
import { Posts } from "@/collections/Posts";
import { Users } from "@/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      url: "http://localhost:3000",
    },
  },
  collections: [Users, Posts, Media],
  editor: lexicalEditor({}),
  plugins: [],
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
