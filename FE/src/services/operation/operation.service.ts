import { PagedList, ApiResponse } from "@/types/general";

import { apiService } from "..";
import {
  tableOperationType,
  searchOperation,
  createEditType,
} from "@/types/opearation/operation";

class OperationService {
  public async getDataByPage(
    searchData: searchOperation
  ): Promise<ApiResponse<PagedList<tableOperationType>>> {
    try {
      const response = await apiService.post<PagedList<tableOperationType>>(
        "/Operation/GetData",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/Operation/Create", formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/Operation/Update",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/Operation/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async GetBreadcrumb(url: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        `/Operation/GetBreadcrumb?url=${encodeURIComponent(url)}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const operationService = new OperationService();
