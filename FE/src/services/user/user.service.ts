import {
  anhChuKySoType,
  ChangePasswordType,
  createEditType,
  DataToSend,
  searchUserData,
  tableUserDataType,
} from "@/types/auth/User";
import { ApiResponse, DropdownOption, PagedList } from "@/types/general";
import { apiService } from "../index";

class UserService {
  public async getDataByPage(
    searchData: searchUserData
  ): Promise<ApiResponse<PagedList<tableUserDataType>>> {
    try {
      const response = await apiService.post<PagedList<tableUserDataType>>(
        "/User/GetData",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/User/Create", formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/User/Update",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/User/Delete/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Lock(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete("/User/Lock/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/User/export");
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async exportTemplateImport(): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/User/exportTemplateImport");
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDataImportView(): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/User/import");
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async saveImport(form: DataToSend): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/User/importExcel", form);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDropdownIdChat(): Promise<ApiResponse> {
    try {
      const response = await apiService.get<DropdownOption[]>(
        "/User/DropdownIdChat"
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async getDropdownNguoiNhanTien(): Promise<ApiResponse> {
    try {
      const response = await apiService.get<DropdownOption[]>(
        "/User/getDropdownNguoiNhanTien"
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDropdown(
    phongBanCode?: string
  ): Promise<ApiResponse<DropdownOption[]>> {
    try {
      let url = "/User/GetDropDown";
      if (phongBanCode) {
        url += `?phongBanCode=${phongBanCode}`;
      }
      const response = await apiService.get<DropdownOption[]>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async ganChuKy(form: anhChuKySoType): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/User/GanChuKy", form);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getChuKy(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/User/GetChuKy/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async ChangePassword(
    formData: ChangePasswordType
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/Account/ChangePassword",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async getDropdownByIdDonVi(
    id: string
  ): Promise<ApiResponse<DropdownOption[]>> {
    try {
      const response = await apiService.get<DropdownOption[]>(
        "/User/GetDropDownByIdDonVi?IdDonVi=" + id
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getDropDownCanBoTiepCongDan(
    id: string | null | undefined
  ): Promise<ApiResponse<DropdownOption[]>> {
    try {
      const response = await apiService.get<DropdownOption[]>(
        "/User/getDropDownCanBoTiepCongDan?IdDonVi=" + id
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetProfile(): Promise<ApiResponse> {
    try {
      const response = await apiService.get("/User/GetProfile");
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async UploadAvatar(file: File): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiService.post("/User/UploadAvatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async resetDefaultPassword(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        `/Account/ResetDefaultPassword/${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async UpdatePasswordSoHoa(model: {
    PasswordSoHoa: string;
    ConfirmPasswordSoHoa: string;
    Password: string;
  }): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/User/update-password-sohoa",
        model
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async CheckPasswordSoHoa(model: {
    PasswordSoHoa: string;
  }): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/User/check-password-sohoa",
        model
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
