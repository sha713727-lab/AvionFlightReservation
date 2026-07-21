-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "reservationEmail" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- Seed default contact email (matches current frontend constant)
INSERT INTO "site_settings" ("id", "reservationEmail", "updatedAt")
VALUES ('default', 'reservation@aviosupportdesk.com', CURRENT_TIMESTAMP);
