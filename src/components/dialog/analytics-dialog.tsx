'use client'

import { format, subDays } from 'date-fns'
import { BarChartIcon, Calendar, TrendingUp } from 'lucide-react'
import { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getLink } from '@/lib/utils'
import { Access, Prisma } from '@prisma/client'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useBoolean } from 'usehooks-ts'

function groupAccessesByDate(accesses: Access[], timeRange: string) {
  const currentDate = new Date()

  const groupedAccesses = accesses.reduce((acc, access) => {
    const date = format(access.createdAt, 'dd/MM')
    const existingDay = acc.find(day => day.date === date)

    if (timeRange === '7' && access.createdAt < subDays(currentDate, 7)) return acc
    if (timeRange === '14' && access.createdAt < subDays(currentDate, 14)) return acc
    if (timeRange === '30' && access.createdAt < subDays(currentDate, 30)) return acc
    if (timeRange === '90' && access.createdAt < subDays(currentDate, 90)) return acc

    if (existingDay) {
      existingDay.accesses++
    } else {
      acc.push({
        date,
        fullDate: format(access.createdAt, 'yyyy-MM-dd'),
        accesses: 1,
      })
    }

    return acc
  }, [] as { date: string; fullDate: string; accesses: number }[])

  return groupedAccesses
}

interface AnalyticsDialogProps {
  state: ReturnType<typeof useBoolean>
  link: Prisma.LinkGetPayload<{
    include: {
      accesses: true
    }
  }>
}

export default function AnalyticsDialog({ state, link }: AnalyticsDialogProps) {
  const [timeRange, setTimeRange] = useState('30')
  const analyticsData = groupAccessesByDate(link.accesses, timeRange)

  // Calculate total accesses and other stats
  const totalAccesses = analyticsData.reduce((sum, day) => sum + day.accesses, 0)
  const averageDaily = Math.round(totalAccesses / (analyticsData.length || 1))
  const maxDay = analyticsData.reduce((max, day) => (day.accesses > max.accesses ? day : max), analyticsData[0]) ?? {
    date: '',
    accesses: 0,
  }

  return (
    <Dialog open={state.value} onOpenChange={state.toggle}>
      <DialogContent className='sm:max-w-[800px] max-h-[90vh] p-0'>
        <DialogHeader className='px-6 pt-6 pb-4'>
          <DialogTitle>Estatísticas do link: {link.title}</DialogTitle>
          <DialogDescription>
            Vendo estatísticas sobre seu link: <br />
            <code>{getLink(link)}</code>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='max-h-[calc(90vh-120px)]'>
          <div className='px-6 pb-6 space-y-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-muted-foreground' />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Selecione um intervalo' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='7'>Últimos 7 dias</SelectItem>
                    <SelectItem value='14'>Últimos 14 dias</SelectItem>
                    <SelectItem value='30'>Últimos 30 dias</SelectItem>
                    <SelectItem value='90'>Últimos 90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <Card>
                <CardHeader className='pb-2'>
                  <CardDescription>Acessos totais</CardDescription>
                  <CardTitle className='text-2xl'>{totalAccesses.toLocaleString()}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardDescription>Média diária</CardDescription>
                  <CardTitle className='text-2xl'>{averageDaily.toLocaleString()}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardDescription>Maior pico</CardDescription>
                  <CardTitle className='text-2xl'>
                    {maxDay.accesses.toLocaleString()}
                    <span className='ml-2 text-sm text-muted-foreground'>em {maxDay.date || 'Nunca'}</span>
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Tabs defaultValue='area' className='w-full'>
              <TabsList className='grid w-full max-w-md grid-cols-2'>
                <TabsTrigger value='area'>Gráfico de área</TabsTrigger>
                <TabsTrigger value='bar'>Gráfico de barra</TabsTrigger>
              </TabsList>
              <TabsContent value='area' className='pt-4'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='flex items-center gap-2 text-lg'>
                      <TrendingUp className='w-5 h-5' />
                      Tendência de Acessos
                    </CardTitle>
                    <CardDescription>Número de acessos ao link ao longo do período selecionado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='w-full'>
                      <ChartContainer
                        config={{
                          accesses: {
                            label: 'Acessos',
                            color: 'hsl(var(--chart-1))',
                          },
                        }}
                      >
                        <ResponsiveContainer width='100%' height='100%'>
                          <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray='3 3' vertical={false} />
                            <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={10} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                            <ChartTooltip
                              content={
                                <ChartTooltipContent
                                  indicator='line'
                                  nameKey='accesses'
                                  labelFormatter={value => {
                                    const item = analyticsData.find(item => item.date === value)
                                    return item ? item.fullDate : value
                                  }}
                                />
                              }
                            />
                            <Area
                              type='monotone'
                              dataKey='accesses'
                              stroke='var(--color-accesses)'
                              strokeWidth={2}
                              fill='var(--color-accesses)'
                              fillOpacity={0.2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='bar' className='pt-4'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='flex items-center gap-2 text-lg'>
                      <BarChartIcon className='w-5 h-5' />
                      Acessos diários
                    </CardTitle>
                    <CardDescription>Número de acessos ao link por dia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='w-full'>
                      <ChartContainer
                        config={{
                          accesses: {
                            label: 'Acessos',
                            color: 'hsl(var(--chart-1))',
                          },
                        }}
                      >
                        <ResponsiveContainer width='100%' height='100%'>
                          <BarChart data={analyticsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray='3 3' vertical={false} />
                            <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={10} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                            <ChartTooltip
                              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                              content={
                                <ChartTooltipContent
                                  indicator='line'
                                  nameKey='accesses'
                                  labelFormatter={value => {
                                    const item = analyticsData.find(item => item.date === value)
                                    return item ? item.fullDate : value
                                  }}
                                />
                              }
                            />
                            <Bar dataKey='accesses' fill='var(--color-accesses)' radius={[4, 4, 0, 0]} barSize={30} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
