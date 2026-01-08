import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Import store để có thể dispatch logout action
let store: any = null;

// Function để set store từ bên ngoài
export const setApiStore = (storeInstance: any) => {
  store = storeInstance;
};

export class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL:
        process.env.NEXT_PUBLIC_API_URL + "/api" || "http://localhost:3000/api",
      timeout: 300000,
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("AccessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("AccessToken");
          window.location.href = "/auth/login";
        }
        if (error.response?.status === 402) {
          // Xử lý status code 402 - logout và bắt đăng nhập lại
          console.warn("Session expired or payment required (402). Logging out...");

          // Clear localStorage
          localStorage.removeItem("AccessToken");
          localStorage.clear();

          // Dispatch logout action nếu store có sẵn
          if (store) {
            try {
              const { setLogout } = require("@/store/auth/AuthSlice");
              store.dispatch(setLogout());
            } catch (error) {
              console.warn("Could not dispatch logout action:", error);
            }
          }

          // Thông báo cho user (nếu có thể)
          if (typeof window !== 'undefined') {
            // Có thể thêm toast notification ở đây
            console.info("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          }

          // Redirect về trang login
          window.location.href = "/auth/login";
          return;
        }
        if (error.response?.status === 403) {
          window.location.href = "/frobiden";
          return;
        }
        if (error.response?.status === 500) {
          const response = error.response.data as any;
          if (response) {
            // message.error(response.message || "Đã xảy ra lỗi không xác định!");
          }
        }
        return Promise.reject(error.response.data.title);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Các phương thức API với kiểu dữ liệu trả về
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(
      url,
      config
    );
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const response: AxiosResponse<any> = await this.api.put(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const response: AxiosResponse<any> = await this.api.delete(
      url,
      config
    );
    return response.data;
  }
}

export const apiService = ApiService.getInstance();

