import { useState, useContext } from 'react'
import { OrdersContext } from './OrdersProvider'

export default function CardButtons({
  id,
  stock,
}: {
  id: string
  stock: number
}) {
  const [quantity, setQuantity] = useState(1)
  const { orders, setOrders } = useContext(OrdersContext)!
  const stockRange = createRange(1, stock)
  return (
    <>
      <label>
        Qnt:{' '}
        <select
          onChange={e => setQuantity(+e.target.value)}
          disabled={stock <= 1}>
          {stockRange.map(i => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </label>
      <br />

      <button onClick={addOrder} disabled={!stock}>
        Add To Cart
      </button>
    </>
  )

  function addOrder() {
    const newOrders = [...orders]

    const order = newOrders.find(o => o.id === id)
    if (order) order.quantity = quantity
    else {
      const newOrder = { id, quantity }
      newOrders.push(newOrder)
    }

    setOrders(newOrders)
  }
}

function createRange(from: number, to: number) {
  const length = to - from + 1
  return Array.from({ length }, (_, i) => from + i)
}
