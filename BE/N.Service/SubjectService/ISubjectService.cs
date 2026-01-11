using N.Model.Entities;
using N.Service.SubjectService.Dto;
using N.Service.Common;
using N.Service.Dto;
using N.Service.Service;

namespace N.Service.SubjectService
{
    public interface ISubjectService : IService<Subject>
    {
        Task<PagedList<SubjectDto>> GetData(SubjectSearchVM search);

        Task<SubjectDto> GetDto(Guid id);
        Subject SubjectCheck(string text);
    }
}