import { ListLinks } from '@/components/list-links'
import LoggedOutScreen from '@/components/user/logged-out-screen'
import { authClient } from '@/lib/auth-client'

export default async function Home() {
  const { error } = await authClient.getSession()

  if (error) {
    return <LoggedOutScreen />
  }

  return <ListLinks />
}
