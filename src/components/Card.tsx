import Image from 'next/image'
import { Item } from '../../db/items'
import CardButtons from './CardButtons'

interface ItemEntry {
  id: string
  item: Item
}

export default function Card({ id, item }: ItemEntry) {
  const { name, stock, price, image } = item

  return (
    <div className='text-center border-solid border-[thin] rounded-xl inline-block m-2 hover:scale-105 hover:cursor-pointer p-1'>
      <Image
        className='select-none bg-cover rounded-xl'
        src={image || 'no_image.svg'}
        alt={name}
        width={100}
        height={100}
      />
      <br />
      {name}
      <br />
      {formatPrice(price)} $
      <br />
      Stock: {stock}
      <br />
      <CardButtons id={id} stock={stock} />
    </div>
  )
}

function formatPrice(price: number) {
  const formattedPrice = (price / 100).toFixed(2)

  const parts = formattedPrice.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const commaSeparatedPrice = parts.join('.')
  return commaSeparatedPrice
}
