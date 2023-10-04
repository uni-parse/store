import type { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'
import { adjustItemStock, getItem } from '../../../../db/items'
import type { Order } from '@/components/OrdersProvider'
import getRawBody from 'raw-body'

// disable the build-in bodyParser
export const config = {
  api: { bodyParser: false },
}

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
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  const sig = req.headers['stripe-signature']
  if (!sig) return // handle error

  let event
  try {
    const rawBody = await getRawBody(req)
    event = stripe.webhooks.constructEvent(
      rawBody, // buffer
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err) {
    const { message } = err as Error
    res.status(400).send(`Webhook Error: ${message}`)
    console.error(err)
    return
  }

  const devEnv = process.env.NODE_ENV === 'development'
  const proEnv = !devEnv
  const devEvent = event.type === 'payment_intent.succeeded'
  const proEvent = event.type === 'checkout.session.completed'
  if (!(devEnv && devEvent) && !(proEnv && proEvent)) return

  const session = event.data.object as Stripe.Checkout.Session
  const { ordersJson } = session.metadata!
  const orders = JSON.parse(ordersJson) as Order[]

  // update database items stock
  orders.forEach(({ id, quantity }) =>
    adjustItemStock({ id, quantity: -quantity })
  )

  res.json({ received: true })
}
