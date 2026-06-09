// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type Either, makeLeft, makeRight } from '@/lib/either'

type ServerClientError = { message: string; cause?: unknown }
type ServerClient = ReturnType<typeof createServerClient>

export async function createClient(): Promise<
  Either<ServerClientError, ServerClient>
> {
  const cookieStore = await cookies()

  try {
    const client = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
              })
            } catch {
              // Em Server Components, o Next.js não permite setar cookies.
              // Isso é esperado quando o middleware está refreshing a sessão.
            }
          },
        },
      },
    )

    return makeRight(client)
  } catch (e) {
    return makeLeft({
      message: 'Failed to create Supabase server client',
      cause: e,
    })
  }
}
