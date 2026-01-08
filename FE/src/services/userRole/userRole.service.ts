import { tableUserDataType } from "@/types/auth/User";
import { apiService } from "../index";
import { ApiResponse, PagedList } from "@/types/general";
import {
  createEditType,
  searchUserRole,
  tableUserRoleVMData,
} from "@/types/userRole/userRole";

class UserRoleService {
  public async getDataByPage(
    searchData: searchUserRole
  ): Promise<ApiResponse<PagedList<tableUserDataType>>> {
    try {
      const response = await apiService.post<PagedList<tableUserDataType>>(
        "/UserRole/GetData",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/UserRole/Create", formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/UserRole/Update",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/UserRole/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async SetupRole(
    id: string
  ): Promise<ApiResponse<tableUserRoleVMData>> {
    try {
      const response = await apiService.post<tableUserRoleVMData>(
        `/UserRole/SetupRole?id=${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const userRoleService = new UserRoleService();
