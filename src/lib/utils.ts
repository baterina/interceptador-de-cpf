import { Link } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

const NUMBERS = '1234567890'
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const nanoid = customAlphabet([...NUMBERS, ...ALPHABET, ...ALPHABET.toUpperCase()].join(''), 9)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLinkFavicon(url: string) {
  const urlObj = new URL(url)
  return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`
}

export function getLink(link: Link) {
  const baseUrl = process.env.BETTER_AUTH_URL ?? window.location.origin

  return `${baseUrl}/${link.slug}-${link.id}`
}

export function parseLink(link: string) {
  const url = new URL(link)
  const slug = url.pathname.split('/').pop()

  const id = slug?.split('-').pop()

  return { url, slug, id }
}

export function generateId() {
  return nanoid()
}

export function plural(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural
}

export function generateNumber({ min, max }: { min?: number; max: number }) {
  let minNumber = min || 0

  return Math.floor(Math.random() * (max - minNumber + 1)) + minNumber
}

function replaceSpaces(text: string) {
  return text.replace(/\s/g, '-').toLowerCase()
}

export function normalizeSlug(slug: string) {
  return replaceSpaces(slug)
}

export type ActionError<E extends object = Record<string, unknown>> = {
  error: string
} & E
export type ServerActionResponse<T, E extends object = Record<string, unknown>> = ActionError<E> | T

export function isActionError(error: any): error is ActionError {
  return error && typeof error === 'object' && 'error' in error && error.error
}
