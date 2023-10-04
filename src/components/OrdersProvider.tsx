import { ReactNode, createContext, useState } from 'react'

export interface Order {
  id: string;
  quantity: number;
}

interface OrdersContextType {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OrdersContext = createContext<OrdersContextType | undefined>(undefined);


interface Props {
  children: ReactNode
}

export default function OrdersProvider({ children }: Props) {
  const [orders, setOrders] = useState<Order[]>([])

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  )
}
