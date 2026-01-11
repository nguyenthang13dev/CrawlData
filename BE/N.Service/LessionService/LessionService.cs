using N.Model.Entities;
using N.Service.LessionService.Dto;
using N.Service.Common;
using Microsoft.EntityFrameworkCore;
using N.Service.Dto;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Reflection;
using N.Service.Service;
using N.Model;

namespace N.Service.LessionService
{
    public class LessionService : Service<Lession>, ILessionService
    {

        private readonly AppDbContext _context;

        public LessionService(
            AppDbContext context) : base(context)
        {
            _context = context;
        }


        public async Task<bool> CheckLession(string title)
        {
            return _context.Lession.Any(t => t.Title.Contains(title.Trim()));
        }

        


        public async Task<PagedList<LessionDto>> GetData(LessionSearchVM search)
        {
            try
            {
                var query = from q in GetQueryable()
                            select new LessionDto
                            {
                                CreatedId = q.CreatedId,
                                UpdatedId = q.UpdatedId,
                                Id = q.Id,
                                CreatedBy = q.CreatedBy,
                                UpdatedBy = q.UpdatedBy,
                                DeletedId = q.DeletedId,
                                CreatedDate = q.CreatedDate,
                                UpdatedDate = q.UpdatedDate,
                            };

                if (search != null)
                {
                   
                }

                query = query.OrderByDescending(x => x.CreatedDate);
                return await PagedList<LessionDto>.CreateAsync(query, search);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve data: " + ex.Message);
            }
        }

        public async Task<LessionDto> GetDto(Guid id)
        {
            try
            {
                var item = await (from q in GetQueryable().Where(x => x.Id == id)
                                  select new LessionDto
                                  {
                                      CreatedId = q.CreatedId,
                                      UpdatedId = q.UpdatedId,
                                      Id = q.Id,
                                      CreatedBy = q.CreatedBy,
                                      UpdatedBy = q.UpdatedBy,
                                      DeletedId = q.DeletedId,
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