import { ApiResponse, PagedList, DropdownOption } from '@/types/general';
import { 
  Subject, 
  SubjectSearch, 
  SubjectCreateOrUpdate,
  SubjectNXB,
  SubjectNXBSearch,
  SubjectNXBCreateOrUpdate,
  GradeSubjectDtos
} from '@/types/Subject/Subject';
import { apiService } from '../index';

class SubjectService {
  /**
   * Lấy danh sách Subject có phân trang
   */
  public async getDataByPage(
    searchData: SubjectSearch
  ): Promise<ApiResponse<PagedList<Subject>>> {
    try {
      const response = await apiService.post<PagedList<Subject>>(
        '/Subject/GetData',
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy tất cả Subject
   */
  public async getAll(): Promise<ApiResponse<Subject[]>> {
    try {
      const response = await apiService.get<Subject[]>('/Subject/getAll');
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy chi tiết Subject theo ID
   */
  public async getById(id: string): Promise<ApiResponse<Subject>> {
    try {
      const response = await apiService.get<Subject>(`/Subject/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tạo mới Subject
   */
  public async create(params: SubjectCreateOrUpdate): Promise<ApiResponse> {
    try {
      const response = await apiService.post('/Subject/Create', params);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật Subject
   */
  public async update(params: SubjectCreateOrUpdate): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        '/Subject/Update',
        params
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa Subject
   */
  public async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete(`/Subject/Delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kiểm tra có thể xóa Subject không
   */
  public async checkDelete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(`/Subject/CheckDelete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy dropdown danh sách Subject
   */
  public async getDropdown(): Promise<ApiResponse<DropdownOption[]>> {
    try {
      const response = await apiService.get<DropdownOption[]>(
        '/Subject/GetDropdown'
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // ========== SubjectNXB Methods ==========

  /**
   * Lấy danh sách SubjectNXB có phân trang
   */
  public async getSubjectNXBDataByPage(
    searchData: SubjectNXBSearch
  ): Promise<ApiResponse<PagedList<SubjectNXB>>> {
    try {
      const response = await apiService.post<PagedList<SubjectNXB>>(
        '/SubjectNXB/GetData',
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy tất cả SubjectNXB
   */
  public async getAllSubjectNXB(): Promise<ApiResponse<SubjectNXB[]>> {
    try {
      const response = await apiService.get<SubjectNXB[]>('/SubjectNXB/getAll');
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy SubjectNXB theo Subject ID
   */
  public async getSubjectNXBBySubjectId(subjectId: string): Promise<ApiResponse<SubjectNXB[]>> {
    try {
      const response = await apiService.get<SubjectNXB[]>(
        `/SubjectNXB/GetBySubjectId/${subjectId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy chi tiết SubjectNXB theo ID
   */
  public async getSubjectNXBById(id: string): Promise<ApiResponse<SubjectNXB>> {
    try {
      const response = await apiService.get<SubjectNXB>(`/SubjectNXB/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tạo mới SubjectNXB
   */
  public async createSubjectNXB(params: SubjectNXBCreateOrUpdate): Promise<ApiResponse> {
    try {
      const response = await apiService.post('/SubjectNXB/Create', params);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật SubjectNXB
   */
  public async updateSubjectNXB(params: SubjectNXBCreateOrUpdate): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        '/SubjectNXB/Update',
        params
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa SubjectNXB
   */
  public async deleteSubjectNXB(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete(`/SubjectNXB/Delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kiểm tra có thể xóa SubjectNXB không
   */
  public async checkDeleteSubjectNXB(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(`/SubjectNXB/CheckDelete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getGradeSubjectNXB(id: string): Promise<ApiResponse<GradeSubjectDtos[]>> {
    try {
      const response = await apiService.get<GradeSubjectDtos[]>(
        `/Subject/GetGradeSubjectNXBDtos?id=${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }





}

export const subjectService = new SubjectService();
