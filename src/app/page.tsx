import { ListLinks } from '@/components/list-links'
import LoggedOutScreen from '@/components/user/logged-out-screen'
import { isActionError } from '@/lib/utils'
import { getSession } from './actions'

export default async function Home() {
  const session = await getSession()

  if (isActionError(session)) {
    return <LoggedOutScreen />
  }

  return <ListLinks />
}
