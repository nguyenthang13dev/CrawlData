using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Model.Entities
{
    [Table("Subject")]
    public class Subject : AuditableEntity
    {
        public string SubjectName { get; set; }
        public string Code { get; set; }
    }
}
