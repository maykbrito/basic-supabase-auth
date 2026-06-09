import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/service'

const SignupSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  full_name: z.string().min(2, 'Nome muito curto'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, full_name } = SignupSchema.parse(body)

    const supabase = createServiceClient()

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // pula verificação de email
      user_metadata: { full_name },
    })

    if (error) {
      // Usuário já existe
      if (error.message?.includes('already been registered')) {
        return NextResponse.json(
          { error: 'USER_ALREADY_EXISTS' },
          { status: 409 },
        )
      }
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      { user: { id: data.user.id, email: data.user.email } },
      { status: 201 },
    )
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: err.issues },
        { status: 422 },
      )
    }
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
