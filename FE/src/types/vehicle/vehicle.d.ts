import { DropdownOption, SearchBase } from "../general";

export interface VehicleType {
    name: string;
    typeCategory: string;
    plateNumber: string;
    id: string;
    consumerFuel: number;
}


export interface VehicleTypeCreate {
    name: string;
    typeCategory: string;
    plateNumber: string;
    id?: string;
    consumerFuel: number;
}
export interface VehicleTypeSearch extends SearchBase {
    name: string;
    typeCategory: string;
    plateNumber: string;
    id?: string;
}

export interface VehicleDropdownOption extends DropdownOption {
    actionDate: string;
}