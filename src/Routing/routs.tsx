import React, { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { NewOrder } from "../Pages/newOrder"
import { OrderContext } from "../context/order.contex"
import EditPizza from "../Pages/editPizza"
import { AllOrders } from "../Pages/allOrders"
import { OrderDisplay } from "../Pages/orderDisplay"


export const Routers: React.FC = () => {
    const { addOrder, orders } = useContext(OrderContext)
    return (
        <Routes>
            <Route path="/" element={<NewOrder />}></Route>
            <Route path="/editPizza" element={<EditPizza />}></Route>
            <Route path="/allOrders" element={<AllOrders />}></Route>
            <Route path="/orderDisplay" element={<OrderDisplay />}></Route>
        </Routes>
    )
}

