using N.Model.Entities;
using N.Service.SubjectNXBService.Dto;
using N.Service.Common;
using Microsoft.EntityFrameworkCore;
using N.Service.Dto;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Reflection;
using N.Service.Service;
using N.Model;

namespace N.Service.SubjectNXBService
{
    public class SubjectNXBService : Service<SubjectNXB>, ISubjectNXBService
    {
      

        public SubjectNXBService(
            AppDbContext context) : base(context)
        {
       
        }


        public async Task<SubjectNXB> SubjectCheck(string text)
        {
            return await _context.SubjectNXBs.Where(t => t.Name.Contains(text)).FirstOrDefaultAsync();
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