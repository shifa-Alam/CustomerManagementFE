import { CustomerAddress } from "./customerAddress";

export class Customer {
    id: number = 0;
    customerName: string = "";
    fatherName: string = "";
    motherName: string = "";
    maritalStatus?: number;
    // public byte[] CustomerPhoto { get; set; }
    customerAddresses: CustomerAddress[] = [];
}