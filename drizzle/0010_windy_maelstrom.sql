CREATE TABLE IF NOT EXISTS "table_records" (
	"id" text PRIMARY KEY NOT NULL,
	"table_id" text NOT NULL,
	"data" json DEFAULT 'null'::json,
	"created_at" timestamp DEFAULT now()
);
