import {
  ApiResponse,
  PagedList,
  DropdownOption,
  Dictionary,
} from "@/types/general";
import { apiService } from "../index";
import { VehicleType, VehicleTypeCreate, VehicleTypeSearch, VehicleDropdownOption } from "@/types/vehicle/vehicle";

class VehicleService {
  private static _instance: VehicleService;

  public static get instance(): VehicleService {
    if (!VehicleService._instance) {
      VehicleService._instance = new VehicleService();
    }
    return VehicleService._instance;
  }
  public async create(model: VehicleTypeCreate): Promise<ApiResponse<VehicleType>> {
    try {
      const response = await apiService.post<VehicleType>(`/Vehicle/Create`, model);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async update(model: VehicleTypeCreate): Promise<ApiResponse<VehicleType>> {
    try {
      const response = await apiService.put<VehicleType>(`/Vehicle/Update`, model);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async get(id: string): Promise<ApiResponse<VehicleType>> {
    try {
      const response = await apiService.get<VehicleType>(`/Vehicle/Get/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getData(
    search: VehicleTypeSearch
  ): Promise<ApiResponse<PagedList<VehicleType>>> {
    try {
      const response = await apiService.post<PagedList<VehicleType>>(
        `/Vehicle/GetData`,
        search
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete(`/Vehicle/Delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDropVehicle(
  ): Promise<ApiResponse<VehicleDropdownOption[]>> {
    try {
      const response = await apiService.get<VehicleDropdownOption[]>(
        `/Vehicle/GetDropVehicle`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const vehicleService = VehicleService.instance;
export default vehicleService;
