import { sizeEnum, kindEnum } from "./config";


export default interface Ipizza {
    id: string,
    size: sizeEnum,
    kind: kindEnum,
    toppings: Set<{ [key: string]: string }>,
}
