import { useMutation } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

type SignupInput = {
  email: string
  password: string
  full_name: string
}

type SignupError = {
  code: 'USER_ALREADY_EXISTS' | 'VALIDATION_ERROR' | 'LOGIN_FAILED' | 'UNKNOWN'
  message: string
}

async function signup(input: SignupInput): Promise<void> {
  // 1. Cria o usuário via API (service role)
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    const err = await res.json()
    if (err.error === 'USER_ALREADY_EXISTS') {
      throw {
        code: 'USER_ALREADY_EXISTS',
        message: 'Esse email já está cadastrado.',
      }
    }
    throw {
      code: 'VALIDATION_ERROR',
      message: err.error || 'Erro ao criar conta',
    }
  }

  // 2. Faz login automático após criar
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  })

  if (error) {
    throw {
      code: 'LOGIN_FAILED',
      message: 'Conta criada, mas falha no login automático.',
    }
  }
}

export function useSignup() {
  return useMutation<void, SignupError, SignupInput>({
    mutationFn: signup,
    onSuccess: () => {
      // Full reload para atualizar sessão no middleware
      window.location.href = '/'
    },
  })
}
