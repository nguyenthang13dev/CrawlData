
using System.ComponentModel.DataAnnotations;

namespace N.Service.DetailLessionService.ViewsModels
{
    public class DetailLessionEditVM : DetailLessionCreateVM
    {
        public Guid? Id { get; set; }
    }
}