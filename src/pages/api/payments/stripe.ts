import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { getItem, type Order } from '../../../../db/items'

const stripe = new Stripe(
  process.env.STRIPE_PRIVATE_KEY as string,
  {
    apiVersion: '2023-08-16',
  }
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).end('Method Not Allowed')

  const orders = req.body.orders as Order[]

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: orders.map(formateOrders),
    success_url: `${process.env.SERVER_URL}/store`,
    cancel_url: `${process.env.SERVER_URL}/store`,
    payment_intent_data: {
      metadata: {
        ordersJson: JSON.stringify(orders),
      },
    },
  })

  const { url } = session
  res.json({ url })
}

function formateOrders(order: Order) {
  const { id, quantity } = order
  const item = getItem({ id })
  const { name, price } = item

  const formatedOrder = {
    price_data: {
      currency: 'usd',
      product_data: { name },
      unit_amount: price,
    },
    quantity,
  }

  return formatedOrder
}
