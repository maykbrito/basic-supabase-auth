#!/bin/bash

mkdir -p app/\(auth\)/login
mkdir -p app/\(auth\)/signup
mkdir -p app/\(main\)
mkdir -p app/auth/callback
mkdir -p app/api/auth/signup
mkdir -p components
mkdir -p hooks
mkdir -p lib/supabase
mkdir -p lib/env
mkdir -p scripts

touch_if_missing() {
  [ ! -f "$1" ] && touch "$1"
}

touch_if_missing "app/layout.tsx"
touch_if_missing "app/providers.tsx"
touch_if_missing "app/(auth)/login/page.tsx"
touch_if_missing "app/(auth)/signup/page.tsx"
touch_if_missing "app/(auth)/layout.tsx"
touch_if_missing "app/(main)/layout.tsx"
touch_if_missing "app/(main)/page.tsx"
touch_if_missing "app/auth/callback/route.ts"
touch_if_missing "app/api/auth/signup/route.ts"
touch_if_missing "components/navbar.tsx"
touch_if_missing "hooks/use-signup.ts"
touch_if_missing "hooks/use-login.ts"
touch_if_missing "hooks/use-logout.ts"
touch_if_missing "lib/supabase/client.ts"
touch_if_missing "lib/supabase/server.ts"
touch_if_missing "lib/supabase/service.ts"
touch_if_missing "lib/supabase/middleware.ts"
touch_if_missing "lib/env/client.ts"
touch_if_missing "lib/env/server.ts"
touch_if_missing "lib/either.ts"
touch_if_missing "proxy.ts"
touch_if_missing ".env.local"
touch_if_missing "scripts/trigger-profile.sql"
touch_if_missing "scripts/basic-tables.sql"

echo "✅ Estrutura criada com sucesso!"
