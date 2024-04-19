import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "posts_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"locale" "_locales",
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"event_start" timestamp(3) with time zone NOT NULL,
	"event_end" timestamp(3) with time zone NOT NULL,
	"location_is_online" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "events_locales" (
	"title" varchar NOT NULL,
	"excerpt" varchar,
	"content" jsonb,
	"meta_title" varchar,
	"meta_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "events_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "events_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"locale" "_locales",
	"media_id" integer,
	"event_locations_id" integer
);

CREATE TABLE IF NOT EXISTS "event_locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"location_address" varchar,
	"location_zip" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "event_locations_locales" (
	"name" varchar NOT NULL,
	"description" varchar,
	"location_city" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "event_locations_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "event_locations_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

ALTER TABLE "posts_locales" ADD COLUMN "meta_title" varchar;
ALTER TABLE "posts_locales" ADD COLUMN "meta_description" varchar;
CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" ("order");
CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" ("path");
CREATE INDEX IF NOT EXISTS "posts_rels_locale_idx" ON "posts_rels" ("locale");
CREATE UNIQUE INDEX IF NOT EXISTS "events_slug_idx" ON "events" ("slug");
CREATE INDEX IF NOT EXISTS "events_created_at_idx" ON "events" ("created_at");
CREATE INDEX IF NOT EXISTS "events_rels_order_idx" ON "events_rels" ("order");
CREATE INDEX IF NOT EXISTS "events_rels_parent_idx" ON "events_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "events_rels_path_idx" ON "events_rels" ("path");
CREATE INDEX IF NOT EXISTS "events_rels_locale_idx" ON "events_rels" ("locale");
CREATE INDEX IF NOT EXISTS "event_locations_created_at_idx" ON "event_locations" ("created_at");
CREATE INDEX IF NOT EXISTS "event_locations_rels_order_idx" ON "event_locations_rels" ("order");
CREATE INDEX IF NOT EXISTS "event_locations_rels_parent_idx" ON "event_locations_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "event_locations_rels_path_idx" ON "event_locations_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales__parent_id_events_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_event_locations_id_event_locations_id_fk" FOREIGN KEY ("event_locations_id") REFERENCES "event_locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "event_locations_locales" ADD CONSTRAINT "event_locations_locales__parent_id_event_locations_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "event_locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "event_locations_rels" ADD CONSTRAINT "event_locations_rels_parent_id_event_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "event_locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "event_locations_rels" ADD CONSTRAINT "event_locations_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "posts_rels";
DROP TABLE "events";
DROP TABLE "events_locales";
DROP TABLE "events_rels";
DROP TABLE "event_locations";
DROP TABLE "event_locations_locales";
DROP TABLE "event_locations_rels";
ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "meta_title";
ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "meta_description";`);

};
