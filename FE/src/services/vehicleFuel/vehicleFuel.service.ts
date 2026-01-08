import
    {
        ApiResponse,
        PagedList,
    } from "@/types/general";
import { VehicleFuelCreate, VehicleFuelSearch, VehicleFuelType } from "@/types/vehicleFuel/vehicleFuel";
import { apiService } from "../index";

class VehicleFuelService {
    private static _instance: VehicleFuelService;

    public static get instance(): VehicleFuelService {
        if (!VehicleFuelService._instance) {
            VehicleFuelService._instance = new VehicleFuelService();
        }
        return VehicleFuelService._instance;
    }
    public async create(model: VehicleFuelCreate): Promise<ApiResponse<VehicleFuelType>> {
        try {
            const response = await apiService.post<VehicleFuelType>(`/VehicleFuel/Create`, model);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async update(model: VehicleFuelCreate): Promise<ApiResponse<VehicleFuelType>> {
        try {
            const response = await apiService.put<VehicleFuelType>(`/VehicleFuel/Update`, model);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async get(id: string): Promise<ApiResponse<VehicleFuelType>> {
        try {
            const response = await apiService.get<VehicleFuelType>(`/VehicleFuel/Get/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async getData(
        search: VehicleFuelSearch
    ): Promise<ApiResponse<PagedList<VehicleFuelType>>> {
        try {
            const response = await apiService.post<PagedList<VehicleFuelType>>(
                `/VehicleFuel/GetData`,
                search
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<ApiResponse> {
        try {
            const response = await apiService.delete(`/VehicleFuel/Delete/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }


     public async exportExcel(search: VehicleFuelSearch): Promise<Blob> {
            try {
                const response = await apiService.post<Blob>(
                    `/VehicleFuel/Export`,
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

const vehicleFuelService = VehicleFuelService.instance;
export default vehicleFuelService;
