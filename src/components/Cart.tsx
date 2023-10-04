import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useContext } from 'react'
import { OrdersContext } from './OrdersProvider'

export default function Cart() {
  const { orders } = useContext(OrdersContext)!

  const ordersNumber = orders.reduce((sum, order) => {
    const { quantity } = order
    return sum + quantity
  }, 0)

  return (
    <div className='select-none mt-1 flex justify-end items-center gap-2'>
      {ordersNumber}
      <Image
        onClick={submitOrder}
        className='inline-block hover:scale-105 hover:cursor-pointer'
        src='shopping_cart.svg'
        alt='shoping cart'
        width={40}
        height={40}
      />
    </div>
  )

  async function submitOrder() {
    if (!ordersNumber) return

    const res = await fetch('/api/payments/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orders }),
    })

    if (!res.ok) return console.log(res.status)

    const { url } = await res.json()

    // redirect to payment page
    window.location = url
  }
}
