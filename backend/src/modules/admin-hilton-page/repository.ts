import type { DatabaseClient } from '../../database/prisma.js'
import { toHiltonPageDto, hiltonPageInclude } from '../hilton-page/mapper.js'
import type { HiltonPageDto } from '../hilton-page/types.js'
import type { AdminHiltonPageBody } from './validator.js'

export class AdminHiltonPageRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getPage(): Promise<HiltonPageDto | null> {
    const row = await this.db.hiltonPage.findUnique({
      where: { id: 'default' },
      include: hiltonPageInclude,
    })
    return row ? toHiltonPageDto(row, false) : null
  }

  async updatePage(input: AdminHiltonPageBody): Promise<HiltonPageDto> {
    const row = await this.db.hiltonPage.update({
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
      include: hiltonPageInclude,
    })
    return toHiltonPageDto(row, false)
  }

  async findSlot(slotKey: string) {
    return this.db.hiltonMediaSlot.findUnique({
      where: { pageId_slotKey: { pageId: 'default', slotKey } },
    })
  }

  async updateSlot(
    slotKey: string,
    data: { mediaUrl?: string; alt?: string; focalX?: number; focalY?: number },
  ) {
    return this.db.hiltonMediaSlot.update({
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
    return this.db.hiltonPrinciple.create({ data: { ...data, pageId: 'default' } })
  }

  async updatePrinciple(
    id: string,
    data: { numberLabel: string; title: string; description: string; isEnabled: boolean },
  ) {
    return this.db.hiltonPrinciple.update({ where: { id }, data })
  }

  async deletePrinciple(id: string) {
    await this.db.hiltonPrinciple.delete({ where: { id } })
  }

  async listPrinciples() {
    return this.db.hiltonPrinciple.findMany({
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
    return this.db.hiltonRailCard.create({ data: { ...data, pageId: 'default' } })
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
    return this.db.hiltonRailCard.update({ where: { id }, data })
  }

  async deleteRailCard(id: string) {
    return this.db.hiltonRailCard.delete({ where: { id } })
  }

  async findRailCard(id: string) {
    return this.db.hiltonRailCard.findFirst({ where: { id, pageId: 'default' } })
  }

  async listRailCards() {
    return this.db.hiltonRailCard.findMany({
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
    return this.db.hiltonPropertyHighlight.create({ data: { ...data, pageId: 'default' } })
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
    return this.db.hiltonPropertyHighlight.update({ where: { id }, data })
  }

  async deleteProperty(id: string) {
    return this.db.hiltonPropertyHighlight.delete({ where: { id } })
  }

  async findProperty(id: string) {
    return this.db.hiltonPropertyHighlight.findFirst({ where: { id, pageId: 'default' } })
  }

  async listProperties() {
    return this.db.hiltonPropertyHighlight.findMany({
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
    return this.db.hiltonClientLogo.create({ data: { ...data, pageId: 'default' } })
  }

  async updateLogo(
    id: string,
    data: { name: string; href?: string | null; mediaUrl?: string; isEnabled: boolean },
  ) {
    return this.db.hiltonClientLogo.update({ where: { id }, data })
  }

  async deleteLogo(id: string) {
    return this.db.hiltonClientLogo.delete({ where: { id } })
  }

  async findLogo(id: string) {
    return this.db.hiltonClientLogo.findFirst({ where: { id, pageId: 'default' } })
  }

  async listLogos() {
    return this.db.hiltonClientLogo.findMany({
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
      const first = await this.db.hiltonPrinciple.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      })
      const second = await this.db.hiltonPrinciple.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      })
      await this.db.$transaction([
        this.db.hiltonPrinciple.update({
          where: { id: firstId },
          data: { sortOrder: second.sortOrder },
        }),
        this.db.hiltonPrinciple.update({
          where: { id: secondId },
          data: { sortOrder: first.sortOrder },
        }),
      ])
      return
    }

    if (model === 'rail') {
      const first = await this.db.hiltonRailCard.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      })
      const second = await this.db.hiltonRailCard.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      })
      await this.db.$transaction([
        this.db.hiltonRailCard.update({
          where: { id: firstId },
          data: { sortOrder: second.sortOrder },
        }),
        this.db.hiltonRailCard.update({
          where: { id: secondId },
          data: { sortOrder: first.sortOrder },
        }),
      ])
      return
    }

    if (model === 'property') {
      const first = await this.db.hiltonPropertyHighlight.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      })
      const second = await this.db.hiltonPropertyHighlight.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      })
      await this.db.$transaction([
        this.db.hiltonPropertyHighlight.update({
          where: { id: firstId },
          data: { sortOrder: second.sortOrder },
        }),
        this.db.hiltonPropertyHighlight.update({
          where: { id: secondId },
          data: { sortOrder: first.sortOrder },
        }),
      ])
      return
    }

    const first = await this.db.hiltonClientLogo.findUniqueOrThrow({
      where: { id: firstId },
      select: { sortOrder: true },
    })
    const second = await this.db.hiltonClientLogo.findUniqueOrThrow({
      where: { id: secondId },
      select: { sortOrder: true },
    })
    await this.db.$transaction([
      this.db.hiltonClientLogo.update({
        where: { id: firstId },
        data: { sortOrder: second.sortOrder },
      }),
      this.db.hiltonClientLogo.update({
        where: { id: secondId },
        data: { sortOrder: first.sortOrder },
      }),
    ])
  }
}
