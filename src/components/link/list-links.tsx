import { getLinks } from '@/actions/links/link.actions'
import { Rows3Icon, TableIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import LoggedOutScreen from '../user/logged-out-screen'
import { CreateLinkButton } from './create-link-button'
import { ListLinksRows } from './list-links-rows'
import { ListLinksTable } from './list-links-table'

export async function ListLinks() {
  const links = await getLinks()

  if (!links || !links.data || links.serverError) {
    return <LoggedOutScreen />
  }

  return (
    <Tabs className='flex flex-col gap-4 h-full' defaultValue='rows'>
      <div className='flex items-center gap-2 px-4 pt-4'>
        <h1 className='text-2xl font-bold flex-1'>Seus Links</h1>

        <TabsList className=''>
          <TabsTrigger value='rows'>
            <Rows3Icon />
          </TabsTrigger>
          <TabsTrigger value='table'>
            <TableIcon />
          </TabsTrigger>
        </TabsList>

        <CreateLinkButton />
      </div>
      <TabsContent value='rows' className='h-full flex min-h-0 '>
        <ListLinksRows links={links.data} />
      </TabsContent>
      <TabsContent value='table' className='h-full flex min-h-0 '>
        <ListLinksTable links={links.data} />
      </TabsContent>
    </Tabs>
  )
}
