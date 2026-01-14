using N.Service.Common;
using N.Service.Dto;
using N.Model.Entities;
using N.Service.LessionService.Dto;
namespace N.Service.CourseService.Dto
{
    public class CourseDto : Course
    {
        public List<LessionDto>? LessionDtos  { get; set; }
    }
}
