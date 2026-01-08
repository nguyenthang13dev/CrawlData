import { SearchBase } from "../general";

export interface FuelConsumptionType {
    id: string;
    scheduleName: string;
    projectType: string;
    volumeM3: number;
    tripCount: number;
    consumedFuel: number;
    distanceKm: number;
    fuelRate: number;
    plateNumber: string;
    createDateStr?: string;
    actionDate: Date;
    actionDateStr: string;
    typeConst: string;
}

export interface FuelConsumptionCreate {
    id?: string;
    scheduleName: string;
    projectType: string;
    volumeM3: number;
    tripCount: number;
    consumedFuel: number;
    distanceKm: number;
    plateNumber: string;
    actionDate: string;
}

export interface FuelConsumptionSearch extends SearchBase {
    plateNumber?: string;
    scheduleName?: string;
    projectType?: string;
    actionDate?: string;
    month?: number;
    year?: number;
}
