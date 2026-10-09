-- CreateTable
CREATE TABLE "wyndham_pages" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "status" TEXT NOT NULL DEFAULT 'published',
    "metaTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "heroHeading" TEXT NOT NULL,
    "heroIntroduction" TEXT NOT NULL,
    "storyLabel" TEXT NOT NULL,
    "storyParagraphs" TEXT[],
    "storyCtaLabel" TEXT NOT NULL,
    "storyCtaHref" TEXT NOT NULL,
    "principlesHeading" TEXT NOT NULL,
    "clientsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "clientsHeading" TEXT NOT NULL DEFAULT '',
    "clientsIntroduction" TEXT NOT NULL DEFAULT '',
    "railLabel" TEXT NOT NULL,
    "contactEmailOverride" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wyndham_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wyndham_media_slots" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL DEFAULT 'default',
    "slotKey" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL DEFAULT '',
    "alt" TEXT NOT NULL DEFAULT '',
    "focalX" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "focalY" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wyndham_media_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wyndham_principles" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL DEFAULT 'default',
    "numberLabel" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wyndham_principles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wyndham_rail_cards" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL DEFAULT 'default',
    "cardType" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "body" TEXT NOT NULL DEFAULT '',
    "linkLabel" TEXT,
    "linkHref" TEXT,
    "factValue" TEXT,
    "mediaUrl" TEXT,
    "mediaAlt" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wyndham_rail_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wyndham_property_highlights" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL DEFAULT 'default',
    "title" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "mediaAlt" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wyndham_property_highlights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wyndham_client_logos" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL DEFAULT 'default',
    "name" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "href" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wyndham_client_logos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wyndham_media_slots_pageId_slotKey_key" ON "wyndham_media_slots"("pageId", "slotKey");

-- CreateIndex
CREATE INDEX "wyndham_principles_pageId_sortOrder_idx" ON "wyndham_principles"("pageId", "sortOrder");

-- CreateIndex
CREATE INDEX "wyndham_rail_cards_pageId_sortOrder_idx" ON "wyndham_rail_cards"("pageId", "sortOrder");

-- CreateIndex
CREATE INDEX "wyndham_property_highlights_pageId_sortOrder_idx" ON "wyndham_property_highlights"("pageId", "sortOrder");

-- CreateIndex
CREATE INDEX "wyndham_client_logos_pageId_sortOrder_idx" ON "wyndham_client_logos"("pageId", "sortOrder");

-- AddForeignKey
ALTER TABLE "wyndham_media_slots" ADD CONSTRAINT "wyndham_media_slots_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "wyndham_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wyndham_principles" ADD CONSTRAINT "wyndham_principles_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "wyndham_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wyndham_rail_cards" ADD CONSTRAINT "wyndham_rail_cards_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "wyndham_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wyndham_property_highlights" ADD CONSTRAINT "wyndham_property_highlights_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "wyndham_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wyndham_client_logos" ADD CONSTRAINT "wyndham_client_logos_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "wyndham_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
