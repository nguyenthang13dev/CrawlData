import { SearchBase } from "../general";

export interface VehicleFuelType {
    idVehile: string; // Guid in C# maps to string in TS usually
    plateNumber: string;
    quanlity: number;
    dateInput?: string;
    id: string; // for frontend keys
    createDateStr: string;
    type: string;
    actionDate: Date;
}

export interface VehicleFuelCreate {
    idVehile: string;
    plateNumber: string;
    quanlity: number;
    dateInput?: string;
    id?: string;
    type: string;
    actionDate: string;
}

export interface VehicleFuelSearch extends SearchBase {
    plateNumber: string;
    month?: number;
    year?: number;
    actionDate?: string;
}
