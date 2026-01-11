using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Model.Entities
{
    [Table("DetailLession")]
    public class DetailLession : AuditableEntity
    {
        public int IndexBox { get; set; }
        public int Index { get; set; }
        public string? Content { get; set; }
        public string BlockType { get; set; }
        public bool IsHeader { get; set; }
        public string? LinkAudio { get; set; }
        public string? LinkVideo { get; set; }
        public string? LinkImage { get; set; }
        public Guid? Lession { get; set; }
    }
}
