import { ApiResponse } from '@/types/general';
import { ListCourseBySubjectDtos } from '@/types/Subject/Subject';
import { apiService } from '../index';

class SubjectNXBService {
  /**
   * Lấy danh sách Courses theo Subject ID
   */
  public async getListCourseBySubject(
    subjectId: string
  ): Promise<ApiResponse<ListCourseBySubjectDtos[]>> {
    try {
      const response = await apiService.get<ListCourseBySubjectDtos[]>(
        `/SubjectNXB/GetListCourseBySubject/${subjectId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy danh sách Courses theo Subject ID với query params
   */
  public async getListCourseBySubjectWithQuery(
    subjectId: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<ListCourseBySubjectDtos[]>> {
    try {
      let url = `/SubjectNXB/GetListCourseBySubject/${subjectId}`;
      
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      const response = await apiService.get<ListCourseBySubjectDtos[]>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const subjectNXBService = new SubjectNXBService();
