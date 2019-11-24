import db from '../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: Validate
  const uuid = req.query.uuid.toString()

  const secret = await db.get(uuid)

  console.log(secret)

  res.status(200).json({})
}
