import db from '../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'DELETE') {
    res.status(404)

    return
  }

  try {
    const id = req.query.id.toString()

    const encryptedSecret = await db.get(`id_${id}`)

    if (encryptedSecret) {
      // @ts-ignore // del does not have args
      db.del(id)

      res.status(200).json({ encryptedSecret })
    } else {
      res.status(404)
    }
  } catch (err) {
    console.log(err)

    res.status(422)
  }
}
