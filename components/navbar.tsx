'use client'

import Link from 'next/link'
import { useLogout } from '@/hooks/use-logout'

type NavbarProps = {
  user: { name: string } | null
}

export function Navbar({ user }: NavbarProps) {
  const { mutate: signOut, isPending } = useLogout()

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="font-bold text-lg">
        MeuApp
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.name}</span>
            <button
              type="button"
              onClick={() => signOut()}
              disabled={isPending}
              className="text-sm text-red-600 hover:underline disabled:opacity-50"
            >
              {isPending ? 'Saindo...' : 'Sair'}
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm bg-black text-white px-4 py-2 rounded"
          >
            Entrar
          </Link>
        )}
      </div>
    </nav>
  )
}
