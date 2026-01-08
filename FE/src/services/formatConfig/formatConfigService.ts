import { FormatConfig, FormatConfigCreateOrUpdate } from "@/types/formatConfig/formatConfig";
import { ApiResponse } from "@/types/general";
import { apiService } from "../index";

export class FormatConfigService {
  private baseUrl = "/FormatConfig";

  // Lấy danh sách format config
  async getAll(): Promise<ApiResponse<FormatConfig[]>> {
    return await apiService.get<FormatConfig[]>(`${this.baseUrl}`);
  }

  // Lấy format config theo ID
  async getById(id: string): Promise<ApiResponse<FormatConfig>> {
    return await apiService.get<FormatConfig>(`${this.baseUrl}/${id}`);
  }

  // Lấy format config theo field name
  async getByFieldName(fieldName: string): Promise<ApiResponse<FormatConfig>> {
    return await apiService.get<FormatConfig>(`${this.baseUrl}/field/${fieldName}`);
  }

  // Tạo mới format config
  async create(data: FormatConfigCreateOrUpdate): Promise<ApiResponse<FormatConfig>> {
    return await apiService.post<FormatConfig>(`${this.baseUrl}`, data);
  }

  // Cập nhật format config
  async update(id: string, data: FormatConfigCreateOrUpdate): Promise<ApiResponse<FormatConfig>> {
    return await apiService.put<FormatConfig>(`${this.baseUrl}/${id}`, data);
  }

  // Xóa format config
  async delete(id: string): Promise<ApiResponse<boolean>> {
    return await apiService.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  // Kiểm tra format có tồn tại cho field
  async checkExists(fieldName: string): Promise<ApiResponse<boolean>> {
    return await apiService.get<boolean>(`${this.baseUrl}/exists/${fieldName}`);
  }

  // Lấy dropdown options cho format types
  async getFormatTypeOptions(): Promise<ApiResponse<{ label: string; value: string }[]>> {
    return await apiService.get<{ label: string; value: string }[]>(`${this.baseUrl}/format-types`);
  }
}

export const formatConfigService = new FormatConfigService();
