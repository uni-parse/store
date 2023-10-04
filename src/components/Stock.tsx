import type { Items } from '../../db/items'
import Card from './Card'

interface Props {
  items: Items
}

export default function Stock({ items }: Props) {
  const itemsEntries = Object.entries(items)

  return (
    <div className='border-solid rounded-xl border-[thin]'>
      <h2 className='text-center'>Stock</h2>

      {itemsEntries.map(([id, item]) => (
        <Card key={id} id={id} item={item} />
      ))}
    </div>
  )
}
