-- AlterTable
ALTER TABLE "site_settings"
ADD COLUMN "supportPhones" JSONB NOT NULL DEFAULT '["+1 877 702 9887"]'::jsonb;
