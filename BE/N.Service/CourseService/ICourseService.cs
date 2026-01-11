using N.Model.Entities;
using N.Service.CourseService.Dto;
using N.Service.Common;
using N.Service.Dto;
using N.Service.Service;

namespace N.Service.CourseService
{
    public interface ICourseService : IService<Course>
    {
        Task<bool> CheckCourseTitle(string Title);
        Task<Course> GetCourseTitle(string Title);
        Task<PagedList<CourseDto>> GetData(CourseSearchVM search);
        Task<CourseDto> GetDto(Guid id);
    }
}