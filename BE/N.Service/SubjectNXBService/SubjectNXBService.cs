using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Office.Interop.Word;
using N.Model;
using N.Model.Entities;
using N.Service.Common;
using N.Service.CourseService.Dto;
using N.Service.Dto;
using N.Service.LessionService.Dto;
using N.Service.Service;
using N.Service.SubjectNXBService.Dto;
using System.Reflection;

namespace N.Service.SubjectNXBService
{
    public class SubjectNXBService : Service<SubjectNXB>, ISubjectNXBService
    {
        private readonly AppDbContext _context;

        public SubjectNXBService(
            AppDbContext context) : base(context)
        {
            this._context = context;
        }


        public async Task<SubjectNXB> SubjectCheck(string text)
        {
            return await _context.SubjectNXBs.Where(t => t.Name.Contains(text)).FirstOrDefaultAsync();
        }



        public async Task<List<ListCourseBySubjetDtos>> GetListCourseBySubjetDtos(string href)
        {

            href = "/" + href;

            var query = from q in GetQueryable().Where(t => t.Href.Equals(href))
                        join course in _context.Course on q.Id equals course.IdSub into courseGroup
                        from course in courseGroup.DefaultIfEmpty()

                        let lessons = course != null ?
                            _context.Lession
                                .Where(l => l.CourseId == course.Id)
                                .Select(x => new LessionDto
                                {
                                    CourseId = x.CourseId,
                                    Title = x.Title,
                                    Grade = x.Grade,
                                    Id = x.Id,
                                    Href = x.Href
                                }).ToList() :
                            new List<LessionDto>()

                        group new { course, lessons } by q into g

                        select new ListCourseBySubjetDtos
                        {
                            IdPubSub = g.Key.Id,
                            Title = g.Key.Name,
                            Href = g.Key.Href,
                            Courses = g.Where(x => x.course != null)
                                      .Select(x => new CourseDto
                                      {
                                          CodeSubJect = x.course.CodeSubJect,
                                          Href = x.course.Href,
                                          Title = x.course.Title,
                                          Id = x.course.Id,
                                          IdSub = x.course.IdSub,
                                          LessionDtos = x.lessons
                                      })
                                      .ToList()
                        };

            return await query.ToListAsync();

        }

        public async Task<PagedList<SubjectNXBDto>> GetData(SubjectNXBSearchVM search)
        {
            try
            {
                var query = from q in GetQueryable()
                            select new SubjectNXBDto
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
                return await PagedList<SubjectNXBDto>.CreateAsync(query, search);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve data: " + ex.Message);
            }
        }

        public async Task<SubjectNXBDto> GetDto(Guid id)
        {
            try
            {
                var item = await (from q in GetQueryable().Where(x => x.Id == id)
                                  select new SubjectNXBDto
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