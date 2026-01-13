using N.Service.SubjectNXBService.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace N.Service.SubjectService.Dto
{
    public class GradeSubjectDtos
    {
        public List<SubjectNXBDto> SubjectNXBS { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string CodeObject { get; set; }
    }
}
