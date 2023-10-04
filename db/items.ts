import fs from 'fs'
import path from 'path'

const itemsPath = path.join(process.cwd(), 'db', 'items.json')

export interface Item {
  name: string
  price: number
  stock: number
  image: string | null
}

export interface Items {
  [id: string]: Item
}

export function getItems() {
  const itemsJson = fs.readFileSync(itemsPath, 'utf8')
  const items = JSON.parse(itemsJson)
  return items as Items
}

export function getItem({ id }: { id: string }) {
  const items = getItems()
  const item = items[id]
  return item
}

export function hasItem({ id }: { id: string }) {
  const items = getItems()
  const item = items[id]
  const availability = !!item?.stock
  return availability
}

export function insertItem(item: Item) {
  const items = getItems()
  const id = crypto.randomUUID()
  items[id] = item
  updateItems(items)
}

export function deleteItem({ id }: { id: string }) {
  const items = getItems()
  delete items[id]
  updateItems(items)
}
export interface Order {
  id: string
  quantity: number
}

export function setItemStock({ id, quantity }: Order) {
  const items = getItems()

  const item = items[id]
  if (!item) throw new Error(`undefined item with id: ${id}`)

  item.stock = quantity
  updateItems(items)
}

export function adjustItemStock({ id, quantity }: Order) {
  const items = getItems()

  const item = items[id]
  if (!item) throw new Error(`undefined item with id: ${id}`)

  if (item.stock < quantity)
    throw Error(`can't decrease more than ${item.stock}`)

  item.stock += quantity
  updateItems(items)
}

function updateItems(items: Items) {
  const itemsJson = JSON.stringify(items, null, 2)
  fs.writeFileSync(itemsPath, itemsJson)
}
