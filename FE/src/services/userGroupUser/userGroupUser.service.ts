import { tableUserDataType } from "@/types/auth/User";
import { apiService } from "../index";
import { ApiResponse, PagedList } from "@/types/general";
import { createEditType } from "@/types/userGroupUser/userGroupUser";

class UserGroupUserService {
  public async Create(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/User_GroupUser/Create",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/User_GroupUser/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const userGroupUserService = new UserGroupUserService();
