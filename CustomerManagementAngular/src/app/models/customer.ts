import { CustomerAddress } from "./customerAddress";

export class Customer {
    id: number = 0;
    countryId: number = 0;
    customerName: string = "";
    fatherName: string = "";
    motherName: string = "";
    maritalStatus?: number;
    customerPhoto: any;
    customerAddresses: CustomerAddress[] = [];
}