using N.Model.Entities;
using N.Service.CourseService.Dto;
using N.Service.Common;
using Microsoft.EntityFrameworkCore;
using N.Service.Dto;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Reflection;
using N.Service.Service;
using N.Model;

namespace N.Service.CourseService
{
    public class CourseService : Service<Course>, ICourseService
    {

        private readonly AppDbContext _context;

        public CourseService(
            AppDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<Course> GetCourseTitle(string Title)
        {
            return await _context.Course.Where(t => t.Title.Contains(Title.Trim())).FirstOrDefaultAsync();
        }

        public async Task<bool> CheckCourseTitle(string Title)
        {
            return _context.Course.Any(t => t.Title.Contains(Title.Trim()));
        }

        public async Task<PagedList<CourseDto>> GetData(CourseSearchVM search)
        {
            try
            {
                var query = from q in GetQueryable()
                            select new CourseDto
                            {
                                CreatedId = q.CreatedId,
                                UpdatedId = q.UpdatedId,
                                Id = q.Id,
                                CreatedBy = q.CreatedBy,
                                UpdatedBy = q.UpdatedBy,
                                CreatedDate = q.CreatedDate,
                                UpdatedDate = q.UpdatedDate,
                            };

                if (search != null)
                {
                   
                }

                query = query.OrderByDescending(x => x.CreatedDate);
                return await PagedList<CourseDto>.CreateAsync(query, search);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve data: " + ex.Message);
            }
        }

        public async Task<CourseDto> GetDto(Guid id)
        {
            try
            {
                var item = await (from q in GetQueryable().Where(x => x.Id == id)
                                  select new CourseDto
                                  {
                                      CreatedId = q.CreatedId,
                                      UpdatedId = q.UpdatedId,
                                      Id = q.Id,
                                      CreatedBy = q.CreatedBy,
                                      UpdatedBy = q.UpdatedBy,
                                      CreatedDate = q.CreatedDate,
                                      UpdatedDate = q.UpdatedDate,
                                  }).FirstOrDefaultAsync();

                return item ?? throw new Exception("Data not found for ID: " + id);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve DTO: " + ex.Message);
            }
        }
    }
}