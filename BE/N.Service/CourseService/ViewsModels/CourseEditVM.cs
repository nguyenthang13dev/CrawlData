
using System.ComponentModel.DataAnnotations;

namespace N.Service.CourseService.ViewsModels
{
    public class CourseEditVM : CourseCreateVM
    {
        public Guid? Id { get; set; }
    }
}