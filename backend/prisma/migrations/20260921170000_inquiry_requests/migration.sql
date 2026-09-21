-- CreateTable
CREATE TABLE "inquiry_requests" (
    "id" TEXT NOT NULL,
    "referenceCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiry_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inquiry_requests_referenceCode_key" ON "inquiry_requests"("referenceCode");

-- CreateIndex
CREATE INDEX "inquiry_requests_status_createdAt_idx" ON "inquiry_requests"("status", "createdAt");

-- CreateIndex
CREATE INDEX "inquiry_requests_createdAt_idx" ON "inquiry_requests"("createdAt");
