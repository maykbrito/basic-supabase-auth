import { useMutation } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

type LoginInput = {
  email: string
  password: string
}

type LoginError = {
  code: 'INVALID_CREDENTIALS' | 'UNKNOWN'
  message: string
}

async function login(input: LoginInput): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  })

  if (error) {
    throw { code: 'INVALID_CREDENTIALS', message: 'Email ou senha incorretos.' }
  }

  window.location.href = '/'
}

export function useLogin() {
  return useMutation<void, LoginError, LoginInput>({
    mutationFn: login,
  })
}
