import { TaiLieuDinhKem } from "@/types/taiLieuDinhKem/taiLieuDinhKem";
import { apiService } from "../index";
import { ApiResponse } from "@/types/general";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
class UploadFileService {
  public async deleteFilesById(
    fileId: string[]
  ): Promise<ApiResponse<TaiLieuDinhKem[]>> {
    try {
      const response = await apiService.post<TaiLieuDinhKem[]>(
        "/Common/removeFile",
        fileId
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async upload(form: FormData): Promise<ApiResponse<TaiLieuDinhKem[]>> {
    try {
      const response = await apiService.post<TaiLieuDinhKem[]>(
        "/common/upload",
        form
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async uploadMultiFile(
    form: FormData
  ): Promise<ApiResponse<TaiLieuDinhKem[]>> {
    try {
      const response = await apiService.post<TaiLieuDinhKem[]>(
        "/common/upload-multiple",
        form,
        {
          headers: {
            // Không cần thiết lập Content-Type khi gửi FormData
            // Browser sẽ tự động thêm boundary cho multipart/form-data
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteTemp(
    uploadedUrl: string
  ): Promise<ApiResponse<TaiLieuDinhKem[]>> {
    try {
      const response = await apiService.post<TaiLieuDinhKem[]>(
        "/common/deleteTempFile",
        {
          uploadedUrl,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getImage(filePath: string) {
    try {
      const response = await fetch(`${baseUrl}/common/${filePath}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getPdfPath(filePath: string) {
    try {
      const response = await apiService.get<ApiResponse<string>>(
        "/common/getPdfPath?filePath=" + filePath
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteFileByPath(filePath: string) {
    try {
      const response = await apiService.get<ApiResponse<string>>(
        "/common/deleteFileByPath?filePath=" + filePath
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getFilesByRecord(
    Itemid: string,
  ): Promise<ApiResponse<TaiLieuDinhKem[]>> {
    try {
      const response = await apiService.get<TaiLieuDinhKem[]>(
        `/common/GetLstUploadsFile?Itemid=${Itemid}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const uploadFileService = new UploadFileService();
