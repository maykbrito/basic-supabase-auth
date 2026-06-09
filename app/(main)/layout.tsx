import { Navbar } from '@/components/navbar'
import { createClient } from '@/lib/supabase/server'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { left: error, right: supabase } = await createClient()

  let user = null

  if (!error) {
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      // Busca o nome do profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', data.user.id)
        .single()

      user = { name: profile?.name || 'Usuário' }
    }
  }

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
    </>
  )
}
