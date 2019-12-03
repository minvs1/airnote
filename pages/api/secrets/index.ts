import nanoid from 'nanoid'
import db from '../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

// TODO: add tests

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST') {
    res.status(404)

    return
  }

  try {
    // TODO: Add validations

    const id = nanoid(16)
    const body = JSON.parse(req.body)

    const encryptedSecret = body.encrypted_secret

    await db.set(id, encryptedSecret)

    res.status(200).json({ id })
  } catch (err) {
    console.log(err)

    res.status(422)
  }
}
