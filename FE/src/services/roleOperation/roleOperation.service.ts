import { ApiResponse } from "@/types/general";

import { createEditType } from "@/types/roleOperation/roleOperation";
import { apiService } from "..";

class RoleOperationService {
  public async Create(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/RoleOperation/Create", formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/RoleOperation/Update",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const roleOperationService = new RoleOperationService();
