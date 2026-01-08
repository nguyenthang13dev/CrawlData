import { FuelConsumptionCreate, FuelConsumptionSearch, FuelConsumptionType } from "@/types/fuelConsumption/fuelConsumption";
import
    {
        ApiResponse,
        PagedList,
    } from "@/types/general";
import { apiService } from "../index";

class FuelConsumptionService {
    private static _instance: FuelConsumptionService;

    public static get instance(): FuelConsumptionService {
        if (!FuelConsumptionService._instance) {
            FuelConsumptionService._instance = new FuelConsumptionService();
        }
        return FuelConsumptionService._instance;
    }
    public async create(model: FuelConsumptionCreate): Promise<ApiResponse<FuelConsumptionType>> {
        try {
            const response = await apiService.post<FuelConsumptionType>(`/FuelConsumption/Create`, model);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async update(model: FuelConsumptionCreate): Promise<ApiResponse<FuelConsumptionType>> {
        try {
            const response = await apiService.put<FuelConsumptionType>(`/FuelConsumption/Update`, model);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async get(id: string): Promise<ApiResponse<FuelConsumptionType>> {
        try {
            const response = await apiService.get<FuelConsumptionType>(`/FuelConsumption/Get/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async getData(
        search: FuelConsumptionSearch
    ): Promise<ApiResponse<PagedList<FuelConsumptionType>>> {
        try {
            const response = await apiService.post<PagedList<FuelConsumptionType>>(
                `/FuelConsumption/GetData`,
                search
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<ApiResponse> {
        try {
            const response = await apiService.delete(`/FuelConsumption/Delete/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async exportExcel(search: FuelConsumptionSearch): Promise<Blob> {
        try {
            const response = await apiService.post<Blob>(
                `/FuelConsumption/Export`,
                search,
                {
                    responseType: 'blob'
                }
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const fuelConsumptionService = FuelConsumptionService.instance;
export default fuelConsumptionService;
