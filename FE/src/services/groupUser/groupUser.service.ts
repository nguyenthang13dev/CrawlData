import {
  searchGroupUserData,
  tableGroupUserDataType,
  createEditType,
} from "@/types/groupUser/groupUser";
import { apiService } from "../index";
import { PagedList, ApiResponse } from "@/types/general";

class GroupUserService {
  public async getDataByPage(
    searchData: searchGroupUserData
  ): Promise<ApiResponse<PagedList<tableGroupUserDataType>>> {
    try {
      const response = await apiService.post<PagedList<tableGroupUserDataType>>(
        "/GroupUser/GetData",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/GroupUser/Create", formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/GroupUser/Update",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/GroupUser/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDropdown(): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/GroupUser/GetDropdown/");
      return response;
    } catch (er) {
      throw er;
    }
  }

  public async getDropdownByDepartment(): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        "/GroupUser/GetDropdownByDepartment/"
      );
      return response;
    } catch (er) {
      throw er;
    }
  }

  public async exportExcel(): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/GroupUser/export");
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const groupUserService = new GroupUserService();
