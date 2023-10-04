import Stock from '@/components/Stock'
import Cart from '@/components/Cart'
import OrdersProvider from '@/components/OrdersProvider'
import { getItems, type Items } from '../../../db/items'

export const getServerSideProps = () => {
  const items = getItems()
  const props = { items }
  return { props }
}

interface Props {
  items: Items
}

export default function Store({ items }: Props) {
  return (
    <main>
      <OrdersProvider>
        <Cart />

        <h1 className='text-center'>Store</h1>
        <Stock items={items} />
      </OrdersProvider>
    </main>
  )
}
