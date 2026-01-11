using Microsoft.EntityFrameworkCore;
using N.Model.Entities;


namespace N.Repository.LessionRepository
{
    public class LessionRepository : Repository<Lession>, ILessionRepository
    {
        public LessionRepository(DbContext context) : base(context)
        {
        }
    }
}