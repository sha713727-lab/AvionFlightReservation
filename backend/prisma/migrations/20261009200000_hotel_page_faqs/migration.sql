-- CreateTable
CREATE TABLE "wyndham_faqs" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL DEFAULT 'default',
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wyndham_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hilton_faqs" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL DEFAULT 'default',
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hilton_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "wyndham_faqs_pageId_sortOrder_idx" ON "wyndham_faqs"("pageId", "sortOrder");

-- CreateIndex
CREATE INDEX "hilton_faqs_pageId_sortOrder_idx" ON "hilton_faqs"("pageId", "sortOrder");

-- AddForeignKey
ALTER TABLE "wyndham_faqs" ADD CONSTRAINT "wyndham_faqs_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "wyndham_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hilton_faqs" ADD CONSTRAINT "hilton_faqs_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "hilton_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
