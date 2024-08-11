import React, { useContext, useEffect } from "react";
import { OrderContext } from "../context/order.contex";
import IOrder from "../interface/IOrder";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";

export const AllOrders: React.FC = () => {

    const navigate = useNavigate();
    const { orders, currentOrder, setCurrentOrder, setCurrentOrderById } = useContext(OrderContext);

    const columns: GridColDef[] = [
        { field: 'index', headerName: '', width: 70 },
        { field: 'name', headerName: 'name', width: 150 },
        { field: 'sumPizzas', headerName: 'amount of pizzas', width: 180 },
    ];

    const mapPizzasToRows = () => {
        return orders.map((order, index) => ({
            id: order.id,
            index: index + 1,
            name: order.name,
            sumPizzas: order.pizzaList?.length,
        }));
    };
    const rows = mapPizzasToRows();


    const handleRowClick = (params: GridRowParams) => {
        navigate("/orderDisplay")
        setCurrentOrderById(params.row.id)
    }
    const handleOrderClick = (order: IOrder) => {
        navigate("/orderDisplay")
        setCurrentOrder(order)
    }

    return (


        <div>
            <h2> Unconfirmed orders</h2>
            {orders.length > 0 ? (
                <div >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        style={{ margin: 'auto', width: '40%' }}
                        onRowClick={handleRowClick}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
            ) : 'There are no valid orders'}
        </div>
    )
}