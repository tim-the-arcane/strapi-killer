import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "posts_locales" ADD COLUMN "excerpt" varchar;
ALTER TABLE "posts" DROP COLUMN IF EXISTS "excerpt";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "excerpt";`);

};
