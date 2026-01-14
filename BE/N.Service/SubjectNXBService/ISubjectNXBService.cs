
using N.Model.Entities;
using N.Service.SubjectNXBService.Dto;
using N.Service.Common;
using N.Service.Dto;
using N.Service.Service;

namespace N.Service.SubjectNXBService
{
    public interface ISubjectNXBService : IService<SubjectNXB>
    {
        Task<PagedList<SubjectNXBDto>> GetData(SubjectNXBSearchVM search);

        Task<SubjectNXBDto> GetDto(Guid id);
        Task<List<ListCourseBySubjetDtos>> GetListCourseBySubjetDtos(string href);
        Task<SubjectNXB> SubjectCheck(string text);
    }
}