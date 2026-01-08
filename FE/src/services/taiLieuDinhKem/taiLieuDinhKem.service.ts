import { ApiResponse } from "@/types/general";
import { apiService } from "..";

class TaiLieuDinhKemService {
  public static async AddPdfPath(AttachId: string): Promise<ApiResponse> {
    const response = await apiService.get(
      `TaiLieuDinhKem/AddPathPdf?AttachId=${AttachId}`
    );
    return response;
  }
  public static async GetByIdsAsync(ids: string): Promise<ApiResponse> {
    const response = await apiService.get(`TaiLieuDinhKem/GetByIds/${ids}`);
    return response;
  }
  public static async delete(id: string): Promise<ApiResponse> {
    const response = await apiService.delete("/TaiLieuDinhKem/delete/" + id);
    return response;
  }
}
export default TaiLieuDinhKemService;
