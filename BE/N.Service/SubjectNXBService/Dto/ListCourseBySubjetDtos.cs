using N.Service.CourseService.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Service.SubjectNXBService.Dto
{
    public class ListCourseBySubjetDtos
    {
        public List<CourseDto> Courses { get; set; }
        public Guid IdPubSub { get; set; }
        public string Title { get; set; }
        public string Href { get; set; }
    }
}
