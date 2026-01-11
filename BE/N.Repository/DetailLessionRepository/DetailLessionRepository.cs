using Microsoft.EntityFrameworkCore;
using N.Model.Entities;


namespace N.Repository.DetailLessionRepository
{
    public class DetailLessionRepository : Repository<DetailLession>, IDetailLessionRepository
    {
        public DetailLessionRepository(DbContext context) : base(context)
        {
        }
    }
}