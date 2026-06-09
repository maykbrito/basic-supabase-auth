import { useMutation } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

async function logout(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = '/login'
    },
  })
}
