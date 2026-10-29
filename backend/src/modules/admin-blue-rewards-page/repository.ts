import type { DatabaseClient } from '../../database/prisma.js'
import { toBlueRewardsPageDto, blueRewardsPageInclude } from '../blue-rewards-page/mapper.js'
import type { BlueRewardsPageDto } from '../blue-rewards-page/types.js'
import type { AdminBlueRewardsPageBody } from './validator.js'

export class AdminBlueRewardsPageRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getPage(): Promise<BlueRewardsPageDto | null> {
    const row = await this.db.blueRewardsPage.findUnique({
      where: { id: 'default' },
      include: blueRewardsPageInclude,
    })
    return row ? toBlueRewardsPageDto(row, false) : null
  }

  async updatePage(input: AdminBlueRewardsPageBody): Promise<BlueRewardsPageDto> {
    const row = await this.db.blueRewardsPage.update({
      where: { id: 'default' },
      data: {
        status: input.status,
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        ogTitle: input.ogTitle ?? null,
        ogDescription: input.ogDescription ?? null,
        heroHeading: input.heroHeading,
        heroIntroduction: input.heroIntroduction,
        heroPrimaryCtaLabel: input.heroPrimaryCtaLabel,
        heroSecondaryCtaLabel: input.heroSecondaryCtaLabel,
        heroSecondaryCtaHref: input.heroSecondaryCtaHref,
        officialLinkLabel: input.officialLinkLabel,
        officialLinkHref: input.officialLinkHref,
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
      include: blueRewardsPageInclude,
    })
    return toBlueRewardsPageDto(row, false)
  }

  async findSlot(slotKey: string) {
    return this.db.blueRewardsMediaSlot.findUnique({
      where: { pageId_slotKey: { pageId: 'default', slotKey } },
    })
  }

  async updateSlot(
    slotKey: string,
    data: { mediaUrl?: string; alt?: string; focalX?: number; focalY?: number },
  ) {
    return this.db.blueRewardsMediaSlot.update({
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
    return this.db.blueRewardsPrinciple.create({ data: { ...data, pageId: 'default' } })
  }

  async updatePrinciple(
    id: string,
    data: { numberLabel: string; title: string; description: string; isEnabled: boolean },
  ) {
    return this.db.blueRewardsPrinciple.update({ where: { id }, data })
  }

  async deletePrinciple(id: string) {
    await this.db.blueRewardsPrinciple.delete({ where: { id } })
  }

  async listPrinciples() {
    return this.db.blueRewardsPrinciple.findMany({
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
    return this.db.blueRewardsRailCard.create({ data: { ...data, pageId: 'default' } })
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
    return this.db.blueRewardsRailCard.update({ where: { id }, data })
  }

  async deleteRailCard(id: string) {
    return this.db.blueRewardsRailCard.delete({ where: { id } })
  }

  async findRailCard(id: string) {
    return this.db.blueRewardsRailCard.findFirst({ where: { id, pageId: 'default' } })
  }

  async listRailCards() {
    return this.db.blueRewardsRailCard.findMany({
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
    return this.db.blueRewardsPropertyHighlight.create({ data: { ...data, pageId: 'default' } })
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
    return this.db.blueRewardsPropertyHighlight.update({ where: { id }, data })
  }

  async deleteProperty(id: string) {
    return this.db.blueRewardsPropertyHighlight.delete({ where: { id } })
  }

  async findProperty(id: string) {
    return this.db.blueRewardsPropertyHighlight.findFirst({ where: { id, pageId: 'default' } })
  }

  async listProperties() {
    return this.db.blueRewardsPropertyHighlight.findMany({
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
    return this.db.blueRewardsClientLogo.create({ data: { ...data, pageId: 'default' } })
  }

  async updateLogo(
    id: string,
    data: { name: string; href?: string | null; mediaUrl?: string; isEnabled: boolean },
  ) {
    return this.db.blueRewardsClientLogo.update({ where: { id }, data })
  }

  async deleteLogo(id: string) {
    return this.db.blueRewardsClientLogo.delete({ where: { id } })
  }

  async findLogo(id: string) {
    return this.db.blueRewardsClientLogo.findFirst({ where: { id, pageId: 'default' } })
  }

  async listLogos() {
    return this.db.blueRewardsClientLogo.findMany({
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
      const first = await this.db.blueRewardsPrinciple.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      })
      const second = await this.db.blueRewardsPrinciple.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      })
      await this.db.$transaction([
        this.db.blueRewardsPrinciple.update({
          where: { id: firstId },
          data: { sortOrder: second.sortOrder },
        }),
        this.db.blueRewardsPrinciple.update({
          where: { id: secondId },
          data: { sortOrder: first.sortOrder },
        }),
      ])
      return
    }

    if (model === 'rail') {
      const first = await this.db.blueRewardsRailCard.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      })
      const second = await this.db.blueRewardsRailCard.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      })
      await this.db.$transaction([
        this.db.blueRewardsRailCard.update({
          where: { id: firstId },
          data: { sortOrder: second.sortOrder },
        }),
        this.db.blueRewardsRailCard.update({
          where: { id: secondId },
          data: { sortOrder: first.sortOrder },
        }),
      ])
      return
    }

    if (model === 'property') {
      const first = await this.db.blueRewardsPropertyHighlight.findUniqueOrThrow({
        where: { id: firstId },
        select: { sortOrder: true },
      })
      const second = await this.db.blueRewardsPropertyHighlight.findUniqueOrThrow({
        where: { id: secondId },
        select: { sortOrder: true },
      })
      await this.db.$transaction([
        this.db.blueRewardsPropertyHighlight.update({
          where: { id: firstId },
          data: { sortOrder: second.sortOrder },
        }),
        this.db.blueRewardsPropertyHighlight.update({
          where: { id: secondId },
          data: { sortOrder: first.sortOrder },
        }),
      ])
      return
    }

    const first = await this.db.blueRewardsClientLogo.findUniqueOrThrow({
      where: { id: firstId },
      select: { sortOrder: true },
    })
    const second = await this.db.blueRewardsClientLogo.findUniqueOrThrow({
      where: { id: secondId },
      select: { sortOrder: true },
    })
    await this.db.$transaction([
      this.db.blueRewardsClientLogo.update({
        where: { id: firstId },
        data: { sortOrder: second.sortOrder },
      }),
      this.db.blueRewardsClientLogo.update({
        where: { id: secondId },
        data: { sortOrder: first.sortOrder },
      }),
    ])
  }
}
