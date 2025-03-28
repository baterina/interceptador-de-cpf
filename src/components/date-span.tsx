'use client'

export function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}

export function formatFullDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

type Props = {
  format?: 'date' | 'fulldate'
  date: Date
}

export function DateSpan({ format = 'date', date }: Props) {
  if (format === 'date') {
    return formatDate(date)
  }

  if (format === 'fulldate') {
    return formatFullDate(date)
  }

  return null
}
