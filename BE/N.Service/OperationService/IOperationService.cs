using N.Model.Entities;
using N.Service.OperationService.Dto;
using N.Service.Common;
using N.Service.OperationService.Request;
using N.Service.Service;

namespace N.Service.OperationService
{
    public interface IOperationService : IService<Operation>
    {
        Task<PagedList<OperationDto>> GetData(OperationSearch search);

        Task<OperationDto> GetDto(Guid id);

        Task<List<MenuDataDto>> GetListOperationOfUser(Guid userId);

        Task<List<ModuleMenuDTO>> GetListOperationOfRole(Guid roleId);

        Task<List<MenuDataDto>> GetListMenu(Guid userId, List<string> RoleCodes);
        Task<dynamic> GetOperationWithModuleByUrl(string url);
    }
}