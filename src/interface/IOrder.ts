import Ipizza from "./IPizza";

export default interface IOrder {
    id: string,
    name: string,
    pizzaList?: Array<Ipizza>,
}