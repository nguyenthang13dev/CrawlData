import { apiService } from "../index";
import { ApiResponse } from "@/types/general";
import { createEditType } from "@/types/groupUserRole/groupUserRole";

class GroupUserRoleService {
  public async Create(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/GroupUserRole/Create", formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/GroupUserRole/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const groupUserRoleService = new GroupUserRoleService();
