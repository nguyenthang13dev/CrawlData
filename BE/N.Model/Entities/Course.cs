using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Model.Entities
{
    [Table("Course")]
    public class Course : AuditableEntity
    {
        public string  CodeSubJect   { get; set; }
        public string Subject { get; set; }
        public int Grade { get; set; }
        public int Index { get; set; }
        public string Title { get; set; }
        public string Href { get; set; }
        public Guid? IdSub { get; set; }
    }
}
