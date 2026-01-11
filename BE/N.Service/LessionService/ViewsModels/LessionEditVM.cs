
using System.ComponentModel.DataAnnotations;

namespace N.Service.LessionService.ViewsModels
{
    public class LessionEditVM : LessionCreateVM
    {
        public Guid? Id { get; set; }
    }
}