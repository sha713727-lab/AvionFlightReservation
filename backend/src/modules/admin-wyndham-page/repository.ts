import type { DatabaseClient } from '../../database/prisma.js'
import { toWyndhamPageDto, wyndhamPageInclude } from '../wyndham-page/mapper.js'
import type { WyndhamPageDto } from '../wyndham-page/types.js'
import type { AdminWyndhamPageBody } from './validator.js'

export class AdminWyndhamPageRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getPage(): Promise<WyndhamPageDto | null> {
    const row = await this.db.wyndhamPage.findUnique({
      where: { id: 'default' },
      include: wyndhamPageInclude,
    })
    return row ? toWyndhamPageDto(row, false) : null
  }

  async updatePage(input: AdminWyndhamPageBody): Promise<WyndhamPageDto> {
    const row = await this.db.wyndhamPage.update({
      where: { id: 'default' },
      data: {
        status: input.status,
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        ogTitle: input.ogTitle ?? null,
        ogDescription: input.ogDescription ?? null,
        heroHeading: input.heroHeading,
        heroIntroduction: input.heroIntroduction,
        storyLabel: input.storyLabel,
        storyParagraphs: input.storyParagraphs,
        storyCtaLabel: input.storyCtaLabel,
        storyCtaHref: input.storyCtaHref,
        principlesHeading: input.principlesHeading,
        clientsEnabled: input.clientsEnabled,
        clientsHeading: input.clientsHeading,
        clientsIntroduction: input.clientsIntroduction,
        railLabel: input.railLabel,
        contactEmailOverride: input.contactEmailOverride ?? null,
      },
      include: wyndhamPageInclude,
    })
    return toWyndhamPageDto(row, false)
  }

  async findSlot(slotKey: string) {
    return this.db.wyndhamMediaSlot.findUnique({
      where: { pageId_slotKey: { pageId: 'default', slotKey } },
    })
  }

  async updateSlot(
    slotKey: string,
    data: { mediaUrl?: string; alt?: string; focalX?: number; focalY?: number },
  ) {
    return this.db.wyndhamMediaSlot.update({
      where: { pageId_slotKey: { pageId: 'default', slotKey } },
      data,
    })
  }

  async createPrinciple(data: {
    numberLabel: string
    title: string
    description: string
    isEnabled: boolean
    sortOrder: number
  }) {
    return this.db.wyndhamPrinciple.create({ data: { ...data, pageId: 'default' } })
  }

  async updatePrinciple(
    id: string,
    data: { numberLabel: string; title: string; description: string; isEnabled: boolean },
  ) {
    return this.db.wyndhamPrinciple.update({ where: { id }, data })
  }

  async deletePrinciple(id: string) {
    await this.db.wyndhamPrinciple.delete({ where: { id } })
  }

  async listPrinciples() {
    return this.db.wyndhamPrinciple.findMany({
      where: { pageId: 'default' },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
  }

  async createRailCard(data: {
    cardType: string
    title: string
    body: string
    linkLabel?: string | null
    linkHref?: string | null
    factValue?: string | null
    mediaAlt?: string
    isEnabled: boolean
    sortOrder: number
  }) {
    return this.db.wyndhamRailCard.create({ data: { ...data, pageId: 'default' } })
  }

  async updateRailCard(
    id: string,
    data: {
      cardType: string
      title: string
      body: string
      linkLabel?: string | null
      linkHref?: string | null
      factValue?: string | null
      mediaAlt?: string
      mediaUrl?: string | null
      isEnabled: boolean
    },
  ) {
    return this.db.wyndhamRailCard.update({ where: { id }, data })
  }

  async deleteRailCard(id: string) {
    return this.db.wyndhamRailCard.delete({ where: { id } })
  }

  async findRailCard(id: string) {
    return this.db.wyndhamRailCard.findFirst({ where: { id, pageId: 'default' } })
  }

  async listRailCards() {
    return this.db.wyndhamRailCard.findMany({
      where: { pageId: 'default' },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
  }

  async createProperty(data: {
    title: string
    blurb: string
    mediaAlt?: string
    isEnabled: boolean
    sortOrder: number
  }) {
    return this.db.wyndhamPropertyHighlight.create({ data: { ...data, pageId: 'default' } })
  }

  async updateProperty(
    id: string,
    data: {
      title: string
      blurb: string
      mediaAlt?: string
      mediaUrl?: string | null
      isEnabled: boolean
    },
  ) {
    return this.db.wyndhamPropertyHighlight.update({ where: { id }, data })
  }

  async deleteProperty(id: string) {
    return this.db.wyndhamPropertyHighlight.delete({ where: { id } })
  }

  async findProperty(id: string) {
    return this.db.wyndhamPropertyHighlight.findFirst({ where: { id, pageId: 'default' } })
  }

  async listProperties() {
    return this.db.wyndhamPropertyHighlight.findMany({
      where: { pageId: 'default' },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
  }

  async createLogo(data: {
    name: string
    mediaUrl: string
    href?: string | null
    isEnabled: boolean
    sortOrder: number
  }) {
    return this.db.wyndhamClientLogo.create({ data: { ...data, pageId: 'default' } })
  }

  async updateLogo(
    id: string,
    data: { name: string; href?: string | null; mediaUrl?: string; isEnabled: boolean },
  ) {
    return this.db.wyndhamClientLogo.update({ where: { id }, data })
  }

  async deleteLogo(id: string) {
    return this.db.wyndhamClientLogo.delete({ where: { id } })
  }

  async findLogo(id: string) {
    return this.db.wyndhamClientLogo.findFirst({ where: { id, pageId: 'default' } })
  }

  async listLogos() {
    return this.db.wyndhamClientLogo.findMany({
      where: { pageId: 'default' },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
  }

  async swapSortOrder(
    model: 'principle' | 'rail' | 'property' | 'logo',
    firstId: string,
    secondId: string,
  ): Promise<void> {
    if (model === 'principle') {
      const first = await this.db.wyndhamPrinciple.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      })
      const second = await this.db.wyndhamPrinciple.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      })
      await this.db.$transaction([
        this.db.wyndhamPrinciple.update({
          where: { id: firstId },
          data: { sortOrder: second.sortOrder },
        }),
        this.db.wyndhamPrinciple.update({
          where: { id: secondId },
          data: { sortOrder: first.sortOrder },
        }),
      ])
      return
    }

    if (model === 'rail') {
      const first = await this.db.wyndhamRailCard.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      })
      const second = await this.db.wyndhamRailCard.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      })
      await this.db.$transaction([
        this.db.wyndhamRailCard.update({
          where: { id: firstId },
          data: { sortOrder: second.sortOrder },
        }),
        this.db.wyndhamRailCard.update({
          where: { id: secondId },
          data: { sortOrder: first.sortOrder },
        }),
      ])
      return
    }

    if (model === 'property') {
      const first = await this.db.wyndhamPropertyHighlight.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      })
      const second = await this.db.wyndhamPropertyHighlight.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      })
      await this.db.$transaction([
        this.db.wyndhamPropertyHighlight.update({
          where: { id: firstId },
          data: { sortOrder: second.sortOrder },
        }),
        this.db.wyndhamPropertyHighlight.update({
          where: { id: secondId },
          data: { sortOrder: first.sortOrder },
        }),
      ])
      return
    }

    const first = await this.db.wyndhamClientLogo.findUniqueOrThrow({
      where: { id: firstId },
      select: { sortOrder: true },
    })
    const second = await this.db.wyndhamClientLogo.findUniqueOrThrow({
      where: { id: secondId },
      select: { sortOrder: true },
    })
    await this.db.$transaction([
      this.db.wyndhamClientLogo.update({
        where: { id: firstId },
        data: { sortOrder: second.sortOrder },
      }),
      this.db.wyndhamClientLogo.update({
        where: { id: secondId },
        data: { sortOrder: first.sortOrder },
      }),
    ])
  }
}
