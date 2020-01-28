import nanoid from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../lib/db'
import { expireTime } from '../../../utils'

// TODO: add tests

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST') {
    res.status(404).end('Bad HTTP method')

    return
  }

  try {
    const id = nanoid(16)
    const dbKey = `id_${id}`
    const body = JSON.parse(req.body)

    const encryptedSecret = body.encrypted_secret

    if (!encryptedSecret) {
      res.status(422).end('Encrypted secret not found')

      return
    }

    const expire = expireTime.find(e => e.value == body.settings.selfDestruct)

    if (expire && expire.seconds) {
      await db.setex(dbKey, expire.seconds, encryptedSecret)
    } else {
      await db.set(dbKey, encryptedSecret)
    }

    res.status(200).json({ id })
  } catch (err) {
    console.log(err)

    res.status(422).end()
  }
}
