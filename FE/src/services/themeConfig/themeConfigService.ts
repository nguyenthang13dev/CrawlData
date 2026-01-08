import { apiService } from "@/services";
import {
  DataToSend,
  Dictionary,
  DropdownOption,
  ApiResponse,
  PagedList,
} from "@/types/general";
import {
  ThemeConfigCreateOrUpdateType,
  ThemeConfigSearchType,
  ThemeConfigType,
} from "@/types/themeConfig/themeConfig";

class ThemeConfigService {
  public async getData(
    searchData: ThemeConfigSearchType
  ): Promise<ApiResponse<PagedList<ThemeConfigType>>> {
    const response = await apiService.post<PagedList<ThemeConfigType>>(
      "/themeConfig/getData",
      searchData
    );
    return response;
  }

  public async create(formData: FormData): Promise<ApiResponse> {
    const response = await apiService.post<ApiResponse>(
      "/themeConfig/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }

  public async update(formData: FormData): Promise<ApiResponse> {
    const response = await apiService.put<ApiResponse>(
      "/themeConfig/update",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }

  public async delete(id: string): Promise<ApiResponse> {
    const response = await apiService.delete<ApiResponse>(
      "/themeConfig/delete/" + id
    );
    return response;
  }

  public async getCurrentTheme(): Promise<ApiResponse> {
    const response = await apiService.get<ApiResponse>(
      "/themeConfig/getCurrentTheme"
    );
    return response;
  }

  public async toggleConfig(id: string): Promise<ApiResponse> {
    const response = await apiService.get<ApiResponse>(
      "/themeConfig/toggleConfig/" + id
    );
    return response;
  }
}

export const themeConfigService = new ThemeConfigService();
