using N.Model.Entities;
using N.Service.SubjectService.Dto;
using N.Service.Common;
using Microsoft.EntityFrameworkCore;
using N.Service.Dto;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Reflection;
using N.Service.Service;
using N.Model;

namespace N.Service.SubjectService
{
    public class SubjectService : Service<Subject>, ISubjectService
    {

        private readonly AppDbContext _context;
      
        public SubjectService(
            AppDbContext context) : base(context)
        {
            _context = context;
        }

        public Subject SubjectCheck(string text)
        {
            return _context.Subjects.Where(t => t.SubjectName.Contains(text)).FirstOrDefault();
        }


        public async Task<PagedList<SubjectDto>> GetData(SubjectSearchVM search)
        {
            try
            {
                var query = from q in GetQueryable()
                            select new SubjectDto
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
                return await PagedList<SubjectDto>.CreateAsync(query, search);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve data: " + ex.Message);
            }
        }

        public async Task<SubjectDto> GetDto(Guid id)
        {
            try
            {
                var item = await (from q in GetQueryable().Where(x => x.Id == id)
                                  select new SubjectDto
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