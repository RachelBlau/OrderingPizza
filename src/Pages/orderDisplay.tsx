import React, { useContext } from "react";
import { OrderContext } from "../context/order.contex";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const OrderDisplay: React.FC = () => {

  const { currentOrder, deleteOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/allOrders")
    deleteOrder(currentOrder.id)
  }

  return (

    <div>
      <h2>Order Details</h2>
      <p><strong>Name:</strong> {currentOrder.name}</p>
      <h3>Pizza List:</h3>
      <ul>
        {currentOrder.pizzaList && currentOrder.pizzaList.map((pizza) => (
          <li key={pizza.id}>
            <strong>Size:</strong> {pizza.size} <br />
            <strong>Kind:</strong> {pizza.kind} <br />
            <strong>Toppings:</strong>
            <ul>
              {Object.entries(pizza.toppings).map(([topping, value]) => (
                <li key={topping}>{topping}: {value}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Button type="button" variant="contained" color="primary" onClick={handleConfirm}>
        confirm
      </Button>
      <Button type="button" variant="contained" color="primary" onClick={() => { navigate("/allOrders") }}>
        return
      </Button>
    </div>

  )
}