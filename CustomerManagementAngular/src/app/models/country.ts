import { Customer } from "./customer";

export class Country {
    id: number = 0;
    countryName: string = "";
    customers: Customer[] = [];
}