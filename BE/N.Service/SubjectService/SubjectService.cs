using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using N.Model;
using N.Model.Entities;
using N.Service.Common;
using N.Service.Dto;
using N.Service.Service;
using N.Service.SubjectNXBService.Dto;
using N.Service.SubjectService.Dto;
using System.Reflection;

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


        public async Task<List<GradeSubjectDtos>> GetGradeSubjectNXBDtos()
        {
            var query = from q in GetQueryable()

                        join subject in _context.SubjectNXBs.AsQueryable()
                        on q.Id equals subject.Subject into ListSubjects

                        select new GradeSubjectDtos
                        {
                            CodeObject = q.Code,
                            Name = q.SubjectName,
                            Id = q.Id,
                            SubjectNXBS = ListSubjects.Select(t => new SubjectNXBDto { 
                                Href = t.Href,
                                Name = t.Name,
                                Subject = t.Subject,
                            }).ToList()
                        };
            return await query.ToListAsync();
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