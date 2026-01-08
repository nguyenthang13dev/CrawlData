import { createEditType, searchRole, tableRoleType } from "@/types/role/role";
import { apiService } from "../index";
import { PagedList, ApiResponse } from "@/types/general";

class RoleService {
  async getDropDown(selected: string): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/Role/GetDropVaiTro", selected);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDropDownAnt(selected: string): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/Role/GetDropVaiTroAnt",
        selected
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDataByPage(
    searchData: searchRole
  ): Promise<ApiResponse<PagedList<tableRoleType>>> {
    try {
      const response = await apiService.post<PagedList<tableRoleType>>(
        "/Role/GetData",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/Role/Create", formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/Role/Update",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/Role/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async SwitchActiveRole(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/Role/SwitchActiveRole/" + id
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDropDownVaiTroIds(selected: string): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/Role/GetDropDownVaiTroIds",
        selected
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetDropdownId(): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/Role/GetDropdownId");
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetDropdownByDepartment(): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/Role/GetDropdownByDepartment");
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(search: searchRole): Promise<ApiResponse<string>> {
    const response = await apiService.post<string>("/Role/ExportExcel", search);
    return response;
  }
}

export const roleService = new RoleService();
