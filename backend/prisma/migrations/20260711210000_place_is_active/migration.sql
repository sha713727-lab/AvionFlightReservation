-- AlterTable
ALTER TABLE "destination_places" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "destination_places_tierId_isActive_sortOrder_idx" ON "destination_places"("tierId", "isActive", "sortOrder");
