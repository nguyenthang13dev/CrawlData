using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Model.Entities
{
    [Table("SubjectNXB")]
    public class SubjectNXB : AuditableEntity
    {
        public string Name { get; set; }
        public string Href { get; set; }
        public Guid? Subject { get; set; }
    }
}
