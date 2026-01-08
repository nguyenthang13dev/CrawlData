import {
  createEditType,
  nhomDanhMucType,
  searchNhomDanhMucData,
} from "@/types/nhomDanhMuc/nhomDanhMuc";
import { apiService } from "../index";
import { ApiResponse } from "@/types/general";

class NhomDanhMucService {
  public async getDataByPage(
    searchData: searchNhomDanhMucData
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/DM_NhomDanhMuc/GetData",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/DM_NhomDanhMuc/Create",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/DM_NhomDanhMuc/Update",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/DM_NhomDanhMuc/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Export(searchData: searchNhomDanhMucData): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/DM_NhomDanhMuc/Export",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDtoByCode(
    code: string
  ): Promise<ApiResponse<nhomDanhMucType>> {
    try {
      const response = await apiService.get<nhomDanhMucType>(
        `/DM_NhomDanhMuc/GetDtoByCode/${code}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const nhomDanhMucService = new NhomDanhMucService();
