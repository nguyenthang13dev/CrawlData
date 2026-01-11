
using System.ComponentModel.DataAnnotations;

namespace N.Service.SubjectNXBService.ViewsModels
{
    public class SubjectNXBEditVM : SubjectNXBCreateVM
    {
        public Guid? Id { get; set; }
    }
}