using N.Model.Entities;
using N.Service.DetailLessionService.Dto;
using N.Service.Common;
using N.Service.Dto;
using N.Service.Service;

namespace N.Service.DetailLessionService
{
    public interface IDetailLessionService : IService<DetailLession>
    {
        Task<PagedList<DetailLessionDto>> GetData(DetailLessionSearchVM search);

        Task<DetailLessionDto> GetDto(Guid id);
    }
}