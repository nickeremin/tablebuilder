ALTER TABLE "record" ALTER COLUMN "amount" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "record_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "record" DROP COLUMN IF EXISTS "act_number";--> statement-breakpoint
ALTER TABLE "record" DROP COLUMN IF EXISTS "account_number";