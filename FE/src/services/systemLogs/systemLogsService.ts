import { apiService } from "@/services";
import {
  DataToSend,
  Dictionary,
  DropdownOption,
  ApiResponse,
  PagedList,
} from "@/types/general";
import {
  SystemLogsCreateOrUpdateType,
  SystemLogsSearchType,
  SystemLogsType,
} from "@/types/systemLogs/systemLogs";

class SystemLogsService {
  private static _instance: SystemLogsService;
  public static get instance(): SystemLogsService {
    if (!SystemLogsService._instance) {
      SystemLogsService._instance = new SystemLogsService();
    }
    return SystemLogsService._instance;
  }

  public async getData(
    searchData: SystemLogsSearchType
  ): Promise<ApiResponse<PagedList<SystemLogsType>>> {
    const response = await apiService.post<PagedList<SystemLogsType>>(
      "/systemLogs/getData",
      searchData
    );
    return response;
  }

  public async create(
    formData: SystemLogsCreateOrUpdateType
  ): Promise<ApiResponse> {
    const response = await apiService.post("/systemLogs/create", formData);
    return response;
  }

  public async update(
    formData: SystemLogsCreateOrUpdateType
  ): Promise<ApiResponse> {
    const response = await apiService.put<ApiResponse>(
      "/systemLogs/update",
      formData
    );
    return response;
  }

  public async delete(id: string): Promise<ApiResponse> {
    const response = await apiService.delete("/systemLogs/delete/" + id);
    return response;
  }
  public async getDropdowns(): Promise<
    ApiResponse<Dictionary<DropdownOption[]>>
  > {
    const response = await apiService.get<Dictionary<DropdownOption[]>>(
      "/systemLogs/getDropDowns"
    );
    return response;
  }

  public async exportExcel(
    search: SystemLogsSearchType
  ): Promise<ApiResponse<string>> {
    const response = await apiService.post<string>(
      "/systemLogs/Export",
      search
    );
    return response;
  }

  public async exportTemplateImport(): Promise<ApiResponse> {
    const response = await apiService.get("/systemLogs/exportTemplateImport");
    return response;
  }

  public async getDataImportView(): Promise<ApiResponse> {
    const response = await apiService.get("/SystemLogs/import");
    return response;
  }

  public async saveImport(form: DataToSend): Promise<ApiResponse> {
    const response = await apiService.post("/systemLogs/importExcel", form);
    return response;
  }
  public async exportPdf(
    search: SystemLogsSearchType
  ): Promise<ApiResponse<string>> {
    const response = await apiService.post<string>(
      "/systemLogs/ExportPdf",
      search
    );
    return response;
  }
  public async createLog(noiDung: string): Promise<ApiResponse> {
    const response = await apiService.get(
      "/systemLogs/createLog?noiDung=" + noiDung
    );
    return response;
  }
}

const systemLogsService = SystemLogsService.instance;
export default systemLogsService;
