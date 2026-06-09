'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSignup } from '@/hooks/use-signup'

const SignupFormSchema = z.object({
  full_name: z.string().min(2, 'Nome muito curto'),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  terms: z.literal(true, { message: 'Aceite os termos para continuar' }),
})

type SignupForm = z.infer<typeof SignupFormSchema>

export default function SignupPage() {
  const { mutate, isPending, error, reset } = useSignup()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupFormSchema),
  })

  function onSubmit(data: SignupForm) {
    reset() // limpa erro anterior
    mutate({
      email: data.email,
      password: data.password,
      full_name: data.full_name,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Criar conta</h1>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        <div>
          <label htmlFor="full_name">Nome completo</label>
          <input
            id="full_name"
            type="text"
            {...register('full_name')}
            className="w-full border rounded p-2"
          />
          {errors.full_name && (
            <span className="text-red-500 text-sm">
              {errors.full_name.message}
            </span>
          )}
        </div>

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

        <div className="flex items-center gap-2">
          <input id="terms" type="checkbox" {...register('terms')} />
          <label htmlFor="terms" className="text-sm">
            Aceito os <Link href="/termos-de-uso">termos de uso</Link>
          </label>
          {errors.terms && (
            <span className="text-red-500 text-sm">{errors.terms.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white rounded p-2 disabled:opacity-50"
        >
          {isPending ? 'Criando...' : 'Criar conta'}
        </button>

        <p className="text-center text-sm">
          Já tem conta? <Link href="/login">Entrar</Link>
        </p>
      </form>
    </div>
  )
}
