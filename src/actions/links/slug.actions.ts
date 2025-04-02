'use server'

import { actionClient } from '@/actions/safe-action'
import fs from 'node:fs/promises'
import { z } from 'zod'

import { generateNumber, normalizeSlug } from '@/lib/utils'

export const getData = actionClient
  .metadata({
    name: 'getData',
  })
  .schema(z.string().describe('fileName'))
  .outputSchema(z.array(z.string()))
  .action(async ({ parsedInput: fileName }) => {
    const path = process.cwd() + `/data/${fileName}.txt`
    const file = await fs.readFile(path, 'utf8')

    return file
      .toString()
      .split('\n')
      .filter(line => line.trim() !== '')
  })

export const generateSlug = actionClient
  .metadata({
    name: 'generateSlug',
  })
  .outputSchema(z.string())
  .action(async () => {
    const { data: names } = (await getData('names'))!
    const { data: adjectives } = (await getData('adjectives'))!
    const { data: objects } = (await getData('objects'))!

    if (!names || !adjectives || !objects) {
      throw new Error('Failed to load data')
    }

    const name = names[generateNumber({ max: names.length - 1 })]
    const adjective = adjectives[generateNumber({ max: adjectives.length - 1 })]
    const object = objects[generateNumber({ max: objects.length - 1 })]

    return normalizeSlug(`${name} ${adjective} ${object}`)
  })
