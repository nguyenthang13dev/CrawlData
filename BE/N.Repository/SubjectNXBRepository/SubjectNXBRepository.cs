using Microsoft.EntityFrameworkCore;
using N.Model.Entities;


namespace N.Repository.SubjectNXBRepository
{
    public class SubjectNXBRepository : Repository<SubjectNXB>, ISubjectNXBRepository
    {
        public SubjectNXBRepository(DbContext context) : base(context)
        {
        }
    }
}