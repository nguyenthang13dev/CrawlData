using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Model.Entities
{
    [Table("Lession")]
    public class Lession : AuditableEntity
    {
        public Guid? CourseId { get; set; }
        public int Grade { get; set; }
        public string Title { get; set; }
    }
}
