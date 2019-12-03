import db from '../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'DELETE') {
    res.status(404)

    return
  }

  // TODO: Validate
  try {
    const id = req.query.id.toString()

    const encryptedSecret = await db.get(id)

    if (encryptedSecret) {
      await db.unlink(id)

      res.status(200).json({ encryptedSecret })
    } else {
      res.status(404)
    }
  } catch (err) {
    console.log(err)

    res.status(422)
  }
}
