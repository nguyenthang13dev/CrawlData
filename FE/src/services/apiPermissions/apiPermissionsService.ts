import { apiService } from "@/services";
import {
  DataToSend,
  Dictionary,
  DropdownOption,
  ApiResponse,
  PagedList,
} from "@/types/general";
import {
  ApiPermissionGroupDataType,
  ApiPermissionsSaveType,
  ApiPermissionsSearchType,
  ApiPermissionsType,
} from "@/types/apiPermissions/apiPermissions";

class ApiPermissionsService {
  private static _instance: ApiPermissionsService;
  public static get instance(): ApiPermissionsService {
    if (!ApiPermissionsService._instance) {
      ApiPermissionsService._instance = new ApiPermissionsService();
    }
    return ApiPermissionsService._instance;
  }

  public async getByRoleId(
    roleId: string
  ): Promise<ApiResponse<ApiPermissionGroupDataType[]>> {
    const response = await apiService.get<ApiPermissionGroupDataType[]>(
      `/apiPermissions/getByRoleId/${roleId}`
    );
    return response;
  }

  public async save(formData: ApiPermissionsSaveType): Promise<ApiResponse> {
    const response = await apiService.post("/apiPermissions/save", formData);
    return response;
  }

  public async delete(id: string): Promise<ApiResponse> {
    const response = await apiService.delete("/apiPermissions/delete/" + id);
    return response;
  }
  public async getDropdowns(): Promise<
    ApiResponse<Dictionary<DropdownOption[]>>
  > {
    const response = await apiService.get<Dictionary<DropdownOption[]>>(
      "/apiPermissions/getDropDowns"
    );
    return response;
  }

  public async exportExcel(
    search: ApiPermissionsSearchType
  ): Promise<ApiResponse<string>> {
    const response = await apiService.post<string>(
      "/apiPermissions/exportExcel",
      search
    );
    return response;
  }

  public async exportTemplateImport(): Promise<ApiResponse> {
    const response = await apiService.get(
      "/apiPermissions/exportTemplateImport"
    );
    return response;
  }

  public async getDataImportView(): Promise<ApiResponse> {
    const response = await apiService.get("/ApiPermissions/import");
    return response;
  }

  public async saveImport(form: DataToSend): Promise<ApiResponse> {
    const response = await apiService.post("/apiPermissions/importExcel", form);
    return response;
  }
}

const apiPermissionsService = ApiPermissionsService.instance;
export default apiPermissionsService;
