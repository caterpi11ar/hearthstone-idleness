import { z } from 'zod'

export const IdlenessSchema = z
  .object({
    logging: z
      .object({
        level: z
          .union([
            z.literal('silent'),
            z.literal('fatal'),
            z.literal('error'),
            z.literal('warn'),
            z.literal('info'),
            z.literal('debug'),
            z.literal('trace'),
          ])
          .optional(),
      }),
  })
