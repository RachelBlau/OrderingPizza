import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NewOrder } from './Pages/newOrder';
import { Routers } from './Routing/routs';
import OrderProvider from './context/order.contex';
import CurrentPizzasProvider from './context/pizza.context';

function App() {
  return (
    <div className='App'>
      <OrderProvider>
        <CurrentPizzasProvider>
                <Routers></Routers>
        </CurrentPizzasProvider>
      </OrderProvider>
    </div>
  );
}

export default App;
