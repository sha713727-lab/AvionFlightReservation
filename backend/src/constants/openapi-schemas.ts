/** Shared OpenAPI response fragments for catalog + health routes. */

const errorDetailSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    field: { type: 'string' },
    message: { type: 'string' },
    code: { type: 'string' },
  },
  required: ['message'],
} as const

export const apiErrorResponseSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    success: { type: 'boolean', const: false },
    message: { type: 'string' },
    data: { type: 'null' },
    errors: { type: 'array', items: errorDetailSchema },
    errorCode: { type: 'string' },
  },
  required: ['success', 'message', 'data', 'errors', 'errorCode'],
} as const

export const paginationMetaSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    page: { type: 'integer' },
    pageSize: { type: 'integer' },
    total: { type: 'integer' },
    totalPages: { type: 'integer' },
  },
  required: ['page', 'pageSize', 'total', 'totalPages'],
} as const

export function successEnvelopeSchema(dataSchema: Record<string, unknown>) {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      success: { type: 'boolean', const: true },
      message: { type: 'string' },
      data: dataSchema,
      errors: { type: 'null' },
    },
    required: ['success', 'message', 'data', 'errors'],
  }
}

export function paginatedDataSchema(itemSchema: Record<string, unknown>) {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      items: { type: 'array', items: itemSchema },
      pagination: paginationMetaSchema,
    },
    required: ['items', 'pagination'],
  }
}

export const serviceItemSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    slug: { type: 'string' },
    title: { type: 'string' },
    tagline: { type: 'string' },
    description: { type: 'string' },
    features: { type: 'array', items: { type: 'string' } },
    iconKey: { type: 'string' },
    imageKey: { type: 'string' },
    imageAlt: { type: 'string' },
    sortOrder: { type: 'integer' },
  },
  required: [
    'id',
    'slug',
    'title',
    'tagline',
    'description',
    'features',
    'iconKey',
    'imageKey',
    'imageAlt',
    'sortOrder',
  ],
} as const

export const destinationPlaceSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    alt: { type: 'string' },
    imageUrl: { type: 'string' },
    sortOrder: { type: 'integer' },
  },
  required: ['id', 'name', 'alt', 'imageUrl', 'sortOrder'],
} as const

export const destinationTierSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    slug: { type: 'string' },
    title: { type: 'string' },
    points: { type: 'integer' },
    sortOrder: { type: 'integer' },
    places: { type: 'array', items: destinationPlaceSchema },
  },
  required: ['id', 'slug', 'title', 'points', 'sortOrder', 'places'],
} as const

export const faqItemSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    slug: { type: 'string' },
    question: { type: 'string' },
    answer: { type: 'string' },
    sortOrder: { type: 'integer' },
  },
  required: ['id', 'slug', 'question', 'answer', 'sortOrder'],
} as const

export const healthDataSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    status: { type: 'string', enum: ['ok', 'degraded'] },
    uptimeSeconds: { type: 'integer' },
    database: { type: 'string', enum: ['up', 'down'] },
    rateLimitStore: { type: 'string', enum: ['redis', 'memory'] },
    catalogCacheStore: { type: 'string', enum: ['redis', 'memory'] },
    catalogCacheHits: { type: 'integer' },
    catalogCacheMisses: { type: 'integer' },
    timestamp: { type: 'string' },
  },
  required: [
    'status',
    'uptimeSeconds',
    'database',
    'rateLimitStore',
    'catalogCacheStore',
    'catalogCacheHits',
    'catalogCacheMisses',
    'timestamp',
  ],
} as const

export const paginationQuerystringSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    page: { type: 'integer', minimum: 1 },
    pageSize: { type: 'integer', minimum: 1 },
  },
} as const

export const slugParamsSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['slug'],
  properties: {
    slug: { type: 'string' },
  },
} as const
