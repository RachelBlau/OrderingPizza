import { createContext, ReactNode, useState } from "react"
import Ipizza from "../interface/IPizza";
import { kindEnum, sizeEnum } from "../interface/config";

interface currentPizzasContext {
    currentPizza: Ipizza
    pizzas: Ipizza[],
    editPizza: (pizzaId: string, updatePizza: Ipizza) => void;
    deletePizza: (pizzaId: string) => void;
    addPizza: (pizza: Ipizza) => void,
    setCurrentPizza: (pizza: Ipizza) => void,
    setPizzas: (pizzas: Ipizza[]) => void,
    SetCurrentPizzaById: (pizzaId: string) => void,
}

export const CurrentPizzasContext = createContext<currentPizzasContext>({
    currentPizza: {
        kind: kindEnum.NORMAL,
        size: sizeEnum.MEDIUM,
        toppings: new Set(), id: ''
    },
    pizzas: [],
    editPizza: (id: string, x: Ipizza) => { },
    deletePizza: (x: string) => { },
    addPizza: (x: Ipizza) => { },
    setCurrentPizza: (x: Ipizza) => { },
    setPizzas: (x: Ipizza[]) => { },
    SetCurrentPizzaById: (x: string) => { }
})

const CurrentPizzasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [pizzas, setPizzas] = useState<Ipizza[]>([]);

    const [currentPizza, setCurrentPizza] = useState<Ipizza>({
        kind: kindEnum.NORMAL,
        size: sizeEnum.MEDIUM,
        toppings: new Set(), id: ''
    });

    const SetCurrentPizzaById = (pizzaId: string) => {
        const pizza = pizzas.find((p) => pizzaId === p.id);
        if (pizza)
            setCurrentPizza(pizza);

    }
    const editPizza = (pizzaId: string, updatedPizza: Ipizza) => {
        deletePizza(pizzaId);
        setPizzas([...pizzas, updatedPizza])
    }

    const deletePizza = (pizzaId: string) => {
        const updatedPizzas = pizzas.filter((pizza) => pizza.id !== pizzaId);
        setPizzas(updatedPizzas);
    };

    const addPizza = (pizza: Ipizza) => {
        setPizzas([...pizzas, pizza])
    }


    return <CurrentPizzasContext.Provider value={{ SetCurrentPizzaById, setPizzas, setCurrentPizza, currentPizza, pizzas, addPizza, editPizza, deletePizza }}>
        {children}</CurrentPizzasContext.Provider>
}

export default CurrentPizzasProvider;