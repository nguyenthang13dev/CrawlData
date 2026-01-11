
using System.ComponentModel.DataAnnotations;

namespace N.Service.SubjectService.ViewsModels
{
    public class SubjectEditVM : SubjectCreateVM
    {
        public Guid? Id { get; set; }
    }
}