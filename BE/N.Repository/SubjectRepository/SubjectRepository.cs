using Microsoft.EntityFrameworkCore;
using N.Model.Entities;


namespace N.Repository.SubjectRepository
{
    public class SubjectRepository : Repository<Subject>, ISubjectRepository
    {
        public SubjectRepository(DbContext context) : base(context)
        {
        }
    }
}