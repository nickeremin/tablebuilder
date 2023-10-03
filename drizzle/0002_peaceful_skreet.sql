DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('act', 'account', 'joint');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "act_number" text;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "account_number" text;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "date" text NOT NULL;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "company_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "amount" real NOT NULL;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "type" "type" NOT NULL;--> statement-breakpoint
ALTER TABLE "table" ADD COLUMN "type" "type" NOT NULL;--> statement-breakpoint
ALTER TABLE "record" DROP COLUMN IF EXISTS "name";