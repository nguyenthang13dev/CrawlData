using N.Service.Core.Mapper;
using Microsoft.AspNetCore.Mvc;
using N.Model.Entities;
using N.Service.SubjectService;
using N.Service.SubjectService.Dto;
using N.Service.SubjectService.ViewsModels;
using N.Service.Common;
using N.Service.Dto;
using N.Service.AppUserService.Dto;
using N.Api.Dto;
using Microsoft.AspNetCore.Authorization;
using N.Api.Controllers;

namespace N.Controllers
{
    [Route("api/[controller]")]
    public class SubjectController : HinetController
    {
        private readonly ISubjectService _SubjectService;
        private readonly IMapper _mapper;
        private readonly ILogger<SubjectController> _logger;

        public SubjectController(
            ISubjectService SubjectService,
            IMapper mapper,
            ILogger<SubjectController> logger
            )
        {
            this._SubjectService = SubjectService;
            this._mapper = mapper;
            _logger = logger;
        }






        [HttpPost("Create")]
        public async Task<DataResponse<Subject>> Create([FromBody] SubjectCreateVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = _mapper.Map<SubjectCreateVM, Subject>(model);
                    await _SubjectService.CreateAsync(entity);
                    return new DataResponse<Subject>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    return DataResponse<Subject>.False("Error", new string[] { ex.Message });
                }
            }
            return DataResponse<Subject>.False("Some properties are not valid", ModelStateError);
        }

        [HttpPut("Update")]
        public async Task<DataResponse<Subject>> Update([FromBody] SubjectEditVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = await _SubjectService.GetByIdAsync(model.Id);
                    if (entity == null)
                        return DataResponse<Subject>.False("Không tìm thấy nhóm danh mục để sửa");
                    entity = _mapper.Map(model, entity);
                    await _SubjectService.UpdateAsync(entity);
                    return new DataResponse<Subject>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    DataResponse<Subject>.False(ex.Message);
                }
            }
            return DataResponse<Subject>.False("Some properties are not valid", ModelStateError);
        }

        [HttpGet("Get/{id}")]
        public async Task<DataResponse<SubjectDto>> Get(Guid id)
        {
            var result = await _SubjectService.GetDto(id);
            return new DataResponse<SubjectDto>
            {
                Data = result,
                Message = "Get SubjectDto thành công",
                Status = true
            };
        }

        [HttpPost("GetData")]
        public async Task<DataResponse<PagedList<SubjectDto>>> GetData([FromBody] SubjectSearchVM search)
        {
            var result = await _SubjectService.GetData(search);
            return new DataResponse<PagedList<SubjectDto>>
            {
                Data = result,
                Message = "GetData PagedList<SubjectDto> thành công",
                Status = true
            };
        }

        [HttpDelete("Delete/{id}")]
        public async Task<DataResponse> Delete(Guid id)
        {
            try
            {
                var entity = await _SubjectService.GetByIdAsync(id);
                await _SubjectService.DeleteAsync(entity);
                return DataResponse.Success(null);
            }
            catch (Exception ex)
            {
                return DataResponse.False(ex.Message);
            }
        }

     

       
    }
}