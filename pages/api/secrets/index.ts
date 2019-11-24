import uuidv1 from 'uuid/v1'
import db from '../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST') {
    return
  }

  const key = uuidv1()
  const body = JSON.parse(req.body)

  const encryptedSecret = body.encrypted_secret

  await db.set(key, encryptedSecret)

  res.status(200).json({ uuid: uuidv1() })
}
