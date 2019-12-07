import nanoid from 'nanoid'

import db from '../lib/db'

describe('Database', () => {
  it('Successfully sets value on key', async () => {
    const key = `id_${nanoid(10)}`
    const value = nanoid(40)

    await db.set(key, value)

    expect(await db.get(key)).toEqual(value)
  })

  it('Successfully deletes value on key', async () => {
    const key = `id_${nanoid(10)}`
    const value = nanoid(40)

    await db.set(key, value)
    // @ts-ignore
    await db.del(key)

    expect(await db.get(key)).toEqual(null)
  })
})
