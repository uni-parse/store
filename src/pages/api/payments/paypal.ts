import { NextApiRequest, NextApiResponse } from 'next'
import { getItem, type Order } from '../../../../db/items'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).end('Method Not Allowed')

  // const orders = req.body.orders as Order[]
}
