import type { Prisma } from '@prisma/client'
import type { WyndhamPageDto } from './types.js'

export const wyndhamPageInclude = {
  mediaSlots: { orderBy: { slotKey: 'asc' as const } },
  principles: { orderBy: [{ sortOrder: 'asc' as const }, { createdAt: 'asc' as const }] },
  railCards: { orderBy: [{ sortOrder: 'asc' as const }, { createdAt: 'asc' as const }] },
  properties: { orderBy: [{ sortOrder: 'asc' as const }, { createdAt: 'asc' as const }] },
  clientLogos: { orderBy: [{ sortOrder: 'asc' as const }, { createdAt: 'asc' as const }] },
  faqs: { orderBy: [{ sortOrder: 'asc' as const }, { createdAt: 'asc' as const }] },
} satisfies Prisma.WyndhamPageInclude

export type WyndhamPageRow = Prisma.WyndhamPageGetPayload<{ include: typeof wyndhamPageInclude }>

export function toWyndhamPageDto(row: WyndhamPageRow, publishedOnly = false): WyndhamPageDto {
  const principles = publishedOnly
    ? row.principles.filter((item) => item.isEnabled)
    : row.principles
  const railCards = publishedOnly
    ? row.railCards.filter((item) => item.isEnabled)
    : row.railCards
  const properties = publishedOnly
    ? row.properties.filter((item) => item.isEnabled)
    : row.properties
  const clientLogos = publishedOnly
    ? row.clientLogos.filter((item) => item.isEnabled)
    : row.clientLogos
  const faqs = publishedOnly ? row.faqs.filter((item) => item.isEnabled) : row.faqs

  return {
    id: row.id,
    status: row.status,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    ogTitle: row.ogTitle,
    ogDescription: row.ogDescription,
    heroHeading: row.heroHeading,
    heroIntroduction: row.heroIntroduction,
    storyLabel: row.storyLabel,
    storyParagraphs: row.storyParagraphs,
    storyCtaLabel: row.storyCtaLabel,
    storyCtaHref: row.storyCtaHref,
    principlesHeading: row.principlesHeading,
    clientsEnabled: row.clientsEnabled,
    clientsHeading: row.clientsHeading,
    clientsIntroduction: row.clientsIntroduction,
    railLabel: row.railLabel,
    contactEmailOverride: row.contactEmailOverride,
    mediaSlots: row.mediaSlots.map((slot) => ({
      id: slot.id,
      slotKey: slot.slotKey,
      mediaUrl: slot.mediaUrl,
      alt: slot.alt,
      focalX: slot.focalX,
      focalY: slot.focalY,
    })),
    principles: principles.map((item) => ({
      id: item.id,
      numberLabel: item.numberLabel,
      title: item.title,
      description: item.description,
      sortOrder: item.sortOrder,
      isEnabled: item.isEnabled,
    })),
    railCards: railCards.map((item) => ({
      id: item.id,
      cardType: item.cardType,
      title: item.title,
      body: item.body,
      linkLabel: item.linkLabel,
      linkHref: item.linkHref,
      factValue: item.factValue,
      mediaUrl: item.mediaUrl,
      mediaAlt: item.mediaAlt,
      sortOrder: item.sortOrder,
      isEnabled: item.isEnabled,
    })),
    properties: properties.map((item) => ({
      id: item.id,
      title: item.title,
      blurb: item.blurb,
      mediaUrl: item.mediaUrl,
      mediaAlt: item.mediaAlt,
      sortOrder: item.sortOrder,
      isEnabled: item.isEnabled,
    })),
    clientLogos: clientLogos.map((item) => ({
      id: item.id,
      name: item.name,
      mediaUrl: item.mediaUrl,
      href: item.href,
      sortOrder: item.sortOrder,
      isEnabled: item.isEnabled,
    })),
    faqs: faqs.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      sortOrder: item.sortOrder,
      isEnabled: item.isEnabled,
    })),
    updatedAt: row.updatedAt.toISOString(),
  }
}
