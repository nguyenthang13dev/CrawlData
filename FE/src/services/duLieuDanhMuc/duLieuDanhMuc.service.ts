import {
  createEditType,
  searchDuLieuDanhMucData,
} from "@/types/duLieuDanhMuc/duLieuDanhMuc";
import { apiService } from "../index";
import { ApiResponse } from "@/types/general";

class DuLieuDanhMucService {
  public async getDataByPage(
    searchData: searchDuLieuDanhMucData
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/DM_DuLieuDanhMuc/GetData",
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
        "/DM_DuLieuDanhMuc/Create",
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
        "/DM_DuLieuDanhMuc/Update",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete(
        "/DM_DuLieuDanhMuc/Delete/" + id
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Export(
    searchData: searchDuLieuDanhMucData
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/DM_DuLieuDanhMuc/Export",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetDropdown(groupCode: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        `/DM_DuLieuDanhMuc/GetDropdown/${groupCode}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetDropdownCode(groupCode: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        `/DM_DuLieuDanhMuc/GetDropdownCode/${groupCode}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetListDataByGroupCode(groupCode: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        `/DM_DuLieuDanhMuc/GetListDataByGroupCode/${groupCode}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetListDataByGroupCodes(
    groupCodes: string[]
  ): Promise<ApiResponse> {
    try {
      const queryParams = groupCodes
        .map((code) => `GroupCode=${encodeURIComponent(code)}`)
        .join("&");
      const response = await apiService.get(
        `/DM_DuLieuDanhMuc/GetListDataByGroupCodes?${queryParams}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetDropdownTreeOption(groupCode: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        `/DM_DuLieuDanhMuc/GetDropdownTreeOption/${groupCode}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetDropdownCodeAndNote(
    groupCode: string,
    note: string
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        `/DM_DuLieuDanhMuc/GetDropdownCodeAndNote/${groupCode}/${note}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const duLieuDanhMucService = new DuLieuDanhMucService();
