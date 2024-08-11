import React, { useContext, useState } from "react"
import IOrder from "../interface/IOrder"
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { OrderContext } from "../context/order.contex";
import { CurrentPizzasContext } from "../context/pizza.context";
import AdminLoginModal from "../components/adminLogin";
import PizzaTable from "../components/currentPizzasTable";

export const NewOrder: React.FC = () => {

    const { addOrder, order, setOrder } = useContext(OrderContext)
    const { setPizzas, pizzas } = useContext(CurrentPizzasContext);
    const navigate = useNavigate();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrder({ ...order, name: e.target.value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (pizzas.length > 0) {
            const newOrder: IOrder = { ...order, id: Math.random().toString(36).substr(2, 9), pizzaList: pizzas }
            addOrder(newOrder)
            setPizzas([])
            setOrder({ id: '', name: '', pizzaList: [] })
        } else {
            alert("No pizza was ordered");
        }

    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        defaultValue={order.name}
                        onChange={handleInputChange}
                        required
                    />

                    <br />
                    <br />
                    <Button type="button" variant="contained" color="primary" onClick={() => navigate('/editPizza')}>
                        Add Pizza
                    </Button>
                    <br />
                    <br />
                    <Button type="submit" variant="contained" color="primary" >
                        Submit
                    </Button>
                </form>
                {pizzas.length > 0 ? (
                    <div >

                        <h2>'you already selected!</h2>
                        <PizzaTable />
                    </div>
                ) : null}
            </div>

            <AdminLoginModal />

        </div>

    )
}
