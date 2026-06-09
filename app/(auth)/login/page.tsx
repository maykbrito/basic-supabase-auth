'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLogin } from '@/hooks/use-login'

const LoginFormSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(1, 'Digite sua senha'),
})

type LoginForm = z.infer<typeof LoginFormSchema>

export default function LoginPage() {
  const { mutate, isPending, error, reset } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
  })

  function onSubmit(data: LoginForm) {
    reset()
    mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Entrar</h1>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full border rounded p-2"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="w-full border rounded p-2"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white rounded p-2 disabled:opacity-50"
        >
          {isPending ? 'Entrando...' : 'Entrar'}
        </button>

        <div className="flex justify-between text-sm">
          <Link href="/forgot-password">Esqueci minha senha</Link>
          <Link href="/signup">Criar conta</Link>
        </div>
      </form>
    </div>
  )
}
