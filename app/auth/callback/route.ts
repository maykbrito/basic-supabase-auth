import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  const { left: error, right: supabase } = await createClient()

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=internal`)
  }

  const { error: authError } = await supabase.auth.exchangeCodeForSession(code)

  if (authError) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
