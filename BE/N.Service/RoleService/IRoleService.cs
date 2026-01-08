using N.Model.Entities;
using N.Service.RoleService.Dto;
using N.Service.Common;
using N.Service.Dto;
using N.Service.RoleService.Request;
using N.Service.Service;

namespace N.Service.RoleService
{
    public interface IRoleService : IService<Role>
    {
        Task<PagedList<RoleDto>> GetData(RoleSearch search);

        Task<RoleDto> GetDto(Guid id);

        Task<List<RoleDto>> GetRole(Guid userId);

        Task<List<DropdownOption>> GetDropDown(string? selected);

        Role GetByCode(string code);

        Task<List<RoleDto>> GetRolesOfUser(Guid? userId);

        Task<List<DropdownOption>> GetDropDownVaiTroIds(string? selected);
        Task<List<DropdownOption>> GetDropDownByUserDepartment(string? selected, Guid? departmentId);
        Task<List<DropdownOption>> GetDropDownIdByUserDepartment(string? selected, Guid? departmentId);
    }
}