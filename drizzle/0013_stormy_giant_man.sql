DO $$ BEGIN
 CREATE TYPE "notification_preferences_type" AS ENUM('web', 'email');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification_prefernces" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "notification_preferences_type" NOT NULL,
	"table_failures" boolean DEFAULT true NOT NULL,
	"new_updates" boolean DEFAULT true NOT NULL,
	"subscription_expiration" boolean DEFAULT true NOT NULL,
	"team_table_changes" boolean DEFAULT true NOT NULL,
	"team_join_requests" boolean DEFAULT true NOT NULL,
	"warnings" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tables" ALTER COLUMN "columns" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tables" ALTER COLUMN "columns" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "email_address";