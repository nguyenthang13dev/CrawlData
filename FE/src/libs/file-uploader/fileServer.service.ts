import { ApiResponse } from '@/types/general';
import { TaiLieuDinhKem } from '@/types/taiLieuDinhKem/taiLieuDinhKem';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

class FileServerService {
  private static _instance: FileServerService;
  public static get instance(): FileServerService {
    if (!FileServerService._instance) {
      FileServerService._instance = new FileServerService();
    }
    return FileServerService._instance;
  }
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_FILE_SERVER_URL,
      timeout: 0, // Không giới hạn thời gian chờ
    });

    this.api.interceptors.request.use((config) => {
      config.headers['x-client-area'] = (window as any).__APP_AREA || 'dashboard';
      const token = localStorage.getItem('AccessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const area = (window as any).__APP_AREA || 'dashboard';
        if (area === 'dashboard' && error.response?.status === 401) {
          localStorage.removeItem('AccessToken');
          window.location.href = '/auth/login';
        }
        if (error.response?.status === 403) {
          window.location.href = '/forbidden';
          return Promise.reject(error);
        }
        console.log(error);
        return Promise.reject(error.response?.data?.title || error);
      }
    );
  }

  public async upload(
    formData: FormData
  ): Promise<ApiResponse<TaiLieuDinhKem[]>> {
    try {
      const response: AxiosResponse<ApiResponse<TaiLieuDinhKem[]>> =
        await this.api.post(`/api/fileserver/upload`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async get(id: string): Promise<ApiResponse<TaiLieuDinhKem>> {
    try {
      const response: AxiosResponse<ApiResponse<TaiLieuDinhKem>> =
        await this.api.get(`/api/fileserver/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async getByItemId(
    itemId: string
  ): Promise<ApiResponse<TaiLieuDinhKem[]>> {
    try {
      const response: AxiosResponse<ApiResponse<TaiLieuDinhKem[]>> =
        await this.api.get(`/api/fileserver/getByItemId/${itemId}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async delete(ids: string[]): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.api.post(
        `/api/fileserver/delete`,
        { ids }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public getUrl(taiLieu: TaiLieuDinhKem): string;
  public getUrl(id: string, fileName: string): string;
  public getUrl(param1: any, param2?: any): string {
    console.log(param1, param2);
    if (typeof param1 === 'object' && param1.id && param1.tenTaiLieu) {
      return `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/fileserver/${param1.id}/${param1.tenTaiLieu}`;
    }
    if (typeof param1 === 'string' && typeof param2 === 'string') {
      return `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/fileserver/${param1}/${param2}`;
    }
    throw new Error('Invalid arguments');
  }
}

const fileServerService = FileServerService.instance;
export default fileServerService;
