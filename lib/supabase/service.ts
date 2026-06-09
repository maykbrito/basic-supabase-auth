import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env/server'

export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    env.SUPABASE_SERVICE_ROLE_KEY,
  )
}
