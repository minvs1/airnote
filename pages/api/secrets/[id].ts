import db from '../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id.toString()
  const encryptedSecret = await db.get(`id_${id}`)

  if (!encryptedSecret) {
    res.status(404)
    return
  }

  switch (req.method) {
    case 'DELETE':
      // @ts-ignore // del does not have args in types
      db.del(id)
      res.status(200).json({ encryptedSecret })
      break
    case 'GET':
      res.status(204)
      break
    default:
      res.status(404)
  }
}
