import { getLinks } from '@/app/actions'
import { isActionError } from '@/lib/utils'
import { Rows3Icon, TableIcon } from 'lucide-react'
import { CreateLinkButton } from './create-link-button'
import { ListLinksRows } from './list-links-rows'
import { ListLinksTable } from './list-links-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export async function ListLinks() {
  const links = await getLinks()

  if (isActionError(links)) {
    return null
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
