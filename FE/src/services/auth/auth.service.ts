import
  {
    ForgotPasswordType,
    LoginResponseType,
    LoginType,
    ResetPasswordType,
    UserType,
    createEditType,
  } from "@/types/auth/User";
import { duLieuDanhMucType } from "@/types/duLieuDanhMuc/duLieuDanhMuc";
import { ApiResponse, DropdownOption } from "@/types/general";
import { apiService } from "../index";

class AuthService {
  async getCauHinhHeThong(): Promise<ApiResponse<duLieuDanhMucType[]>> {
    try {
      const response = await apiService.get<duLieuDanhMucType[]>(
        "/Account/GetCauHinhHeThong"
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async login(
    formData: LoginType
  ): Promise<ApiResponse<LoginResponseType>> {
    try {
      const response = await apiService.post<LoginResponseType>(
        "/Account/Login",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async loginTelegram(
    formData: LoginType
  ): Promise<ApiResponse<LoginResponseType>> {
    try {
      const response = await apiService.post<LoginResponseType>(
        "/Account/loginTelegram",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async requestLoginTelegram(
    formData: LoginType
  ): Promise<ApiResponse<LoginResponseType>> {
    try {
      const response = await apiService.post<LoginResponseType>(
        "/Account/requestLoginTelegram",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async loginRedirect(
    formData: LoginType
  ): Promise<ApiResponse<LoginResponseType>> {
    try {
      const response = await apiService.get<LoginResponseType>(
        `/Account/LoginRedirect?username=${formData.username}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async getInfo(): Promise<ApiResponse<UserType>> {
    try {
      const response = await apiService.get<UserType>("/Account/GetInfo");
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async register(
    formData: createEditType
  ): Promise<ApiResponse<UserType>> {
    try {
      const response = await apiService.post<UserType>(
        "/Account/Register",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async forgotPassword(
    formData: ForgotPasswordType
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/Account/ForgotPassword",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async resetPassword(
    formData: ResetPasswordType
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        "/Account/ResetPassword",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }



}

export const authService = new AuthService();
