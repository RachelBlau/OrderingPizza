import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useContext, useEffect } from 'react';
import Ipizza from '../interface/IPizza';
import { CurrentPizzasContext } from '../context/pizza.context';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';



export default function PizzaTable() {

  const navigate = useNavigate();
  const { pizzas, deletePizza, SetCurrentPizzaById } = useContext(CurrentPizzasContext);
  const columns: GridColDef[] = [
    { field: 'index', headerName: '', width: 70 },
    { field: 'size', headerName: 'size', width: 150 },
    { field: 'kind', headerName: 'kind', width: 180 },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handlePizzaSelect(params.row.id)}>edit</Button>
      )
    },
    {
      field: 'delete',
      headerName: 'delete',
      width: 100,
      renderCell: (params) => (
        <Button onClick={(e) => deletePizza(params.row.id)}>delete</Button>
      )
    }
  ];

  const mapPizzasToRows = (pizzas: Ipizza[]) => {
    return pizzas.map((pizza, index) => ({
      id: pizza.id,
      index: index + 1,
      size: pizza.size,
      kind: pizza.kind,
    }));
  };
  const rows = mapPizzasToRows(pizzas);

  const handlePizzaSelect = (pizzaId: string) => {
    navigate('/editPizza');
    SetCurrentPizzaById(pizzaId);
    deletePizza(pizzaId)
  }


  return (
    <div >
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ margin: 'auto', width: '55%' }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
