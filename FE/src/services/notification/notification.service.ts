import { apiService } from "../index";
import { DropdownOption, ApiResponse, PagedList } from "@/types/general";
import Notification, {
  NotificationCreate,
  NotificationSearch,
} from "@/types/notification/notification";

class NotificationService {
  public async getDataByPage(
    searchData: NotificationSearch
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/Notification/GetData",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Create(form: NotificationCreate): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/Notification/Create", form);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(form: NotificationCreate): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/Notification/Update",
        form
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/Notification/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/Notification/export");
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDataDoanhNghiep(
    searchData: NotificationSearch
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/Notification/GetDataDoanhNghiep",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDataSanPham(
    searchData: NotificationSearch
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/Notification/GetDataSanPham",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getNotification(): Promise<
    ApiResponse<PagedList<Notification>>
  > {
    try {
      const response = await apiService.post<PagedList<Notification>>(
        "/Notification/GetNotification"
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async readAll(): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/Notification/ReadAll");
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async SendEmail(
    subject: string,
    body: string,
    toAddress: string,
    iditem: string
  ): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("body", body);
      formData.append("toAddress", toAddress);
      formData.append("iditem", iditem);
      const response = await apiService.post(
        "/Notification/SendEmail",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async ToggleLock(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/Notification/ToggleLock/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async markAsRead(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/Notification/markAsRead/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDataByUser(
    searchData: NotificationSearch
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/Notification/GetDataByUser",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const notificationService = new NotificationService();
