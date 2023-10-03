CREATE TABLE IF NOT EXISTS "tables" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"columns" json DEFAULT 'null'::json,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
