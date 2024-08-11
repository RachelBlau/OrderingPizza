import { createContext, ReactNode, useState } from "react"
import IOrder from "../interface/IOrder";
import { IOType } from "child_process";

interface orderContext {
    orders: IOrder[],
    order: IOrder,
    currentOrder: IOrder,
    addOrder: (order: IOrder) => void,
    deleteOrder: (orderId: string) => void,
    setCurrentOrder: (order: IOrder) => void,
    setCurrentOrderById: (orderId: string) => void,
    setOrder: (order: IOrder) => void,
}

export const OrderContext = createContext<orderContext>({
    currentOrder: { id: "", name: "", pizzaList: [] },
    order: { id: "", name: "", pizzaList: [] },
    orders: [],
    addOrder: (order: IOrder) => { },
    setCurrentOrder: (order: IOrder) => { },
    deleteOrder: (orderId: string) => { },
    setCurrentOrderById: (orderId: string) => { },
    setOrder: (order: IOrder) => { },
})


const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [order, setOrder] = useState<IOrder>({ id: '', name: '', pizzaList: [] })
    const [currentOrder, setCurrentOrder] = useState<IOrder>({ id: '', name: '', pizzaList: [] });

    const addOrder = (order: IOrder) => {
        let updetedOrder = [...orders, order];
        setOrders(updetedOrder)
    }

    const deleteOrder = (orderId: string) => {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
    }

    const setCurrentOrderById = (orderId: string) => {
        const order = orders.find((o) => orderId === o.id);
        if (order)
            setCurrentOrder(order);
    }

    return <OrderContext.Provider value={{ currentOrder, orders, order, setOrder, addOrder, setCurrentOrder, deleteOrder, setCurrentOrderById }}>
        {children}</OrderContext.Provider>
}

export default OrderProvider;