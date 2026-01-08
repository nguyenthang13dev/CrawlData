import {
  Department,
  DepartmentDetail,
  DepartmentSearch,
} from "../../types/department/department";

import {
  ApiResponse,
  DropdownOption,
  DropdownTreeOptionAntd,
  PagedList,
} from "@/types/general";
import { TreeItem } from "@nosferatu500/react-sortable-tree";
import { apiService } from "../index";

class DepartmentService {
  public async getDataByPage(
    searchData: DepartmentSearch
  ): Promise<ApiResponse<PagedList<Department>>> {
    try {
      const response = await apiService.post<PagedList<Department>>(
        "/department/GetData",
        searchData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Create(params: Department): Promise<ApiResponse> {
    try {
      const response = await apiService.post("/department/Create", params);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Update(params: Department): Promise<ApiResponse> {
    try {
      const response = await apiService.put<ApiResponse>(
        "/department/Update",
        params
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Deactive(id: string): Promise<ApiResponse<Department>> {
    try {
      const response = await apiService.put<Department>(
        `department/deactive/${id}`,
        {}
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.delete(`/department/Delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async CheckDelete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiService.get(`/department/CheckDelete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async GetHierarchy(): Promise<ApiResponse<TreeItem[]>> {
    try {
      const response = await apiService.get<TreeItem[]>(
        `/department/GetDepartmentsWithHierarchy`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getDropDown(selected: string): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        `/department/GetDropDepartment`,
        selected
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async GetDropDepartmentOrDefault(): Promise<ApiResponse> {
    try {
      const response = await apiService.get(
        `/department/GetDropDepartmentOrDefault`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDropRolesInDepartment(
    departmentId: string,
    userId: string
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.post(
        `/department/GetDropRolesInDepartment?departmentId=${departmentId}&&userId=${userId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  //dùng để lưu thay đổi trong cơ cấu tổ chức
  public async saveDepartmentChanges(
    params: Department[]
  ): Promise<ApiResponse<Department[]>> {
    try {
      const response = await apiService.post<Department[]>(
        `/department/SaveDepartmentChanges`,
        params
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async getDetail(id: string): Promise<ApiResponse<DepartmentDetail>> {
    try {
      const response = await apiService.get<DepartmentDetail>(
        `/department/${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(
    type: "Organization" | "Department"
  ): Promise<ApiResponse> {
    try {
      const response = await apiService.get(`/department/export?type=${type}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
  //lấy dropdown có label theo cấp bậc và disable tổ chức value = Id
  async getHierarchicalDropdownList(
    disabledParent: boolean = true,
    coCapBac: boolean = false
  ): Promise<ApiResponse<DropdownTreeOptionAntd[]>> {
    try {
      const response = await apiService.get<DropdownTreeOptionAntd[]>(
        `/department/getHierarchicalDropdownList?disabledParent=${disabledParent}&coCapBac=${coCapBac}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  //lấy dropdown có label theo cấp bậc và disable tổ chức value = code
  async GetHierarchicalDropdownListCode(
    disabledParent: boolean = true
  ): Promise<ApiResponse<DropdownTreeOptionAntd[]>> {
    try {
      const response = await apiService.get<DropdownTreeOptionAntd[]>(
        `/department/GetHierarchicalDropdownListCode?disabledParent=${disabledParent}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // lấy dropdown tree value = id
  async GetHierarchicalDropdownListId(
    disabledParent: boolean = true
  ): Promise<ApiResponse<DropdownTreeOptionAntd[]>> {
    try {
      const response = await apiService.get<DropdownTreeOptionAntd[]>(
        `/department/GetHierarchicalDropdownListId?disabledParent=${disabledParent}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  //lấy dropdown có label theo cấp bậc và disable tổ chức theo đơn vị id của user
  async getHierarchicalDropdownListByUserDepartment(
    disabledParent: boolean = true
  ): Promise<ApiResponse<DropdownTreeOptionAntd[]>> {
    try {
      const response = await apiService.get<DropdownTreeOptionAntd[]>(
        `/department/GetDropdownListByUserDepartment?disabledParent=${disabledParent}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  //lấy dropdown có label theo cấp bậc và disable tổ chức theo đơn vị id của user
  async GetDropdownListDepartment(
    disabledParent: boolean = true
  ): Promise<ApiResponse<DropdownTreeOptionAntd[]>> {
    try {
      const response = await apiService.get<DropdownTreeOptionAntd[]>(
        `/department/GetDropdownListDepartment?disabledParent=${disabledParent}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetDropdownDepartment(): Promise<ApiResponse<DropdownOption[]>> {
    try {
      const response = await apiService.get<DropdownOption[]>(
        `/department/GetDepartmentCode`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }



      async GetDropdownDepartmentNotIn(
  ): Promise<ApiResponse<DropdownOption[]>> {
    try {
      const response = await apiService.get<DropdownOption[]>(
        `/department/GetDepartmentCodeNotIn`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }




  //lấy dropdown có label theo cấp bậc và disable tổ chức theo đơn vị id của user
  async GetSubAndCurrentUnitDropdown(
    disabledParent: boolean = false
  ): Promise<ApiResponse<DropdownTreeOptionAntd[]>> {
    try {
      const response = await apiService.get<DropdownTreeOptionAntd[]>(
        `/department/GetSubAndCurrentUnitDropdown?disabledParent=${disabledParent}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  //lấy cán bộ kèm phòng ban dropdown có label theo cấp bậc
  async getHierarchicalCanBoDropdownList(): Promise<
    ApiResponse<DropdownTreeOptionAntd[]>
  > {
    try {
      const response = await apiService.get<DropdownTreeOptionAntd[]>(
        `/department/GetHierarchicalCanBoDropdownList`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDropdownTypeDepartment(): Promise<ApiResponse<DropdownOption[]>> {
    try {
      const response = await apiService.get<DropdownOption[]>(
        `/department/GetDropdownTypeDepartment`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDropdownCapBac(): Promise<ApiResponse<DropdownOption[]>> {
    try {
      const response = await apiService.get<DropdownOption[]>(
        `/department/GetDropdownCapBac`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async generateQrCode(
    coSoId: string,
    amount: number
  ): Promise<ApiResponse<string>> {
    try {
      const response = await apiService.get<string>(
        `/department/generateQrCode?DepartmentId=${coSoId}&amount=${amount}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getAll(): Promise<ApiResponse<Department[]>> {
    try {
      const response = await apiService.get<Department[]>(`/department/getAll`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const departmentService = new DepartmentService();
