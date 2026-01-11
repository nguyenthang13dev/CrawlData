using Microsoft.EntityFrameworkCore;
using N.Model.Entities;


namespace N.Repository.CourseRepository
{
    public class CourseRepository : Repository<Course>, ICourseRepository
    {
        public CourseRepository(DbContext context) : base(context)
        {
        }
    }
}