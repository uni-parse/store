import fs from 'fs'
import path from 'path'

const itemsPath = path.join(process.cwd(), 'db', 'items.json')

interface Item {
  name: string
  price: number
  quantity: number
}

interface Items {
  [id: string]: Item
}

export function getItems() {
  const itemsJson = fs.readFileSync(itemsPath, 'utf8')
  const items = JSON.parse(itemsJson)
  return items as Items
}

export function getItem(id: string) {
  const items = getItems()
  const item = items[id]
  return item
}

export function hasItem(id: string) {
  const items = getItems()
  const item = items[id]
  if (!item) return false
  const availability = item.quantity
  return availability
}

export function addItem(item: Item) {
  const items = getItems()
  const id = crypto.randomUUID()
  items[id] = item
  updateItems(items)
}

export function setItem(id: string, quantity: number) {
  const items = getItems()
  const item = items[id]

  if (!item) throw new Error(`undefined item with id: ${id}`)

  item.quantity = quantity
  updateItems(items)
}

export function adjustItem(id: string, quantity: number) {
  const items = getItems()
  const item = items[id]

  if (!item) throw new Error(`undefined item with id: ${id}`)

  const prevQuantity = item.quantity
  item.quantity += quantity

  if (item.quantity < 0)
    throw Error(`can't decrease more than ${prevQuantity}`)

  updateItems(items)
}

export function deleteItem(id: string) {
  const items = getItems()
  delete items[id]

  updateItems(items)
}

function updateItems(items: Items) {
  const itemsJson = JSON.stringify(items, null, 2)
  fs.writeFileSync(itemsPath, itemsJson)
}
