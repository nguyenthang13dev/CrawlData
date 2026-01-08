import { ApiResponse, PagedList } from "@/types/general";
import { searchModule, tableModuleType } from "@/types/menu/menu";
import { apiService } from "..";

class ModuleService {
  public async getDataByPage(
    searchData: searchModule
  ): Promise<ApiResponse<PagedList<tableModuleType>>> {
    try {
      const response = await apiService.post<PagedList<tableModuleType>>(
        "/Module/GetData",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: FormData): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/Module/Create", formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: FormData): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/Module/Update",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/Module/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDropDown(selected: string): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/Module/GetDropModule", selected);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getModuleGroupData(roleId: string, ObjectCode?: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        `/Module/GetModuleGroupData?roleId=${roleId}&ObjectCode=${ObjectCode ?? ""}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async GetModuleGroupDataObjects(roleId: string, ObjectCode?: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        `/Module/GetModuleGroupDataObjects?roleId=${roleId}&ObjectCode=${ObjectCode ?? ""}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const moduleService = new ModuleService();
