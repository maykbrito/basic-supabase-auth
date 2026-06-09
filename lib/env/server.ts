import { z } from 'zod'

if (typeof window !== 'undefined') {
  throw new Error(
    'server env imported on client: this exposes secrets to the browser',
  )
}

const schema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
})

// env.SUPABASE_SERVICE_ROLE_KEY
export const env = schema.parse(process.env)
