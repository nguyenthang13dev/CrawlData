using N.Model.Entities;
using N.Service.LessionService.Dto;
using N.Service.Common;
using N.Service.Dto;
using N.Service.Service;

namespace N.Service.LessionService
{
    public interface ILessionService : IService<Lession>
    {
        Task<bool> CheckLession(string title);
        Task<PagedList<LessionDto>> GetData(LessionSearchVM search);

        Task<LessionDto> GetDto(Guid id);
    }
}