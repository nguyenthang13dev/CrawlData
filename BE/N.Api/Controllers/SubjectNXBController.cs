using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using N.Api.Controllers;
using N.Api.Dto;
using N.Model.Entities;
using N.Service.AppUserService.Dto;
using N.Service.Common;
using N.Service.Core.Mapper;
using N.Service.Dto;
using N.Service.SubjectNXBService;
using N.Service.SubjectNXBService.Dto;
using N.Service.SubjectNXBService.ViewsModels;

namespace N.Controllers
{
    [Route("api/[controller]")]
    public class SubjectNXBController : HinetController
    {
        private readonly ISubjectNXBService _SubjectNXBService;
        private readonly IMapper _mapper;
        private readonly ILogger<SubjectNXBController> _logger;

        public SubjectNXBController(
            ISubjectNXBService SubjectNXBService,
            IMapper mapper,
            ILogger<SubjectNXBController> logger
            )
        {
            this._SubjectNXBService = SubjectNXBService;
            this._mapper = mapper;
            _logger = logger;
        }


        [HttpGet("GetListCourseBySubjetDtos")]
        [AllowAnonymous]
        public async Task<DataResponse<List<ListCourseBySubjetDtos>>> GetListCourseBySubjetDtos([FromQuery] string href)
        {
            var res = await _SubjectNXBService.GetListCourseBySubjetDtos(href);
            return DataResponse<List<ListCourseBySubjetDtos>>.Success(res);
        }

        [HttpPost("Create")]
        public async Task<DataResponse<SubjectNXB>> Create([FromBody] SubjectNXBCreateVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = _mapper.Map<SubjectNXBCreateVM, SubjectNXB>(model);
                    await _SubjectNXBService.CreateAsync(entity);
                    return new DataResponse<SubjectNXB>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    return DataResponse<SubjectNXB>.False("Error", new string[] { ex.Message });
                }
            }
            return DataResponse<SubjectNXB>.False("Some properties are not valid", ModelStateError);
        }

        [HttpPut("Update")]
        public async Task<DataResponse<SubjectNXB>> Update([FromBody] SubjectNXBEditVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = await _SubjectNXBService.GetByIdAsync(model.Id);
                    if (entity == null)
                        return DataResponse<SubjectNXB>.False("Không tìm thấy nhóm danh mục để sửa");
                    entity = _mapper.Map(model, entity);
                    await _SubjectNXBService.UpdateAsync(entity);
                    return new DataResponse<SubjectNXB>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    DataResponse<SubjectNXB>.False(ex.Message);
                }
            }
            return DataResponse<SubjectNXB>.False("Some properties are not valid", ModelStateError);
        }

        [HttpGet("Get/{id}")]
        public async Task<DataResponse<SubjectNXBDto>> Get(Guid id)
        {
            var result = await _SubjectNXBService.GetDto(id);
            return new DataResponse<SubjectNXBDto>
            {
                Data = result,
                Message = "Get SubjectNXBDto thành công",
                Status = true
            };
        }

        [HttpPost("GetData")]
        public async Task<DataResponse<PagedList<SubjectNXBDto>>> GetData([FromBody] SubjectNXBSearchVM search)
        {
            var result = await _SubjectNXBService.GetData(search);
            return new DataResponse<PagedList<SubjectNXBDto>>
            {
                Data = result,
                Message = "GetData PagedList<SubjectNXBDto> thành công",
                Status = true
            };
        }

        [HttpDelete("Delete/{id}")]
        public async Task<DataResponse> Delete(Guid id)
        {
            try
            {
                var entity = await _SubjectNXBService.GetByIdAsync(id);
                await _SubjectNXBService.DeleteAsync(entity);
                return DataResponse.Success(null);
            }
            catch (Exception ex)
            {
                return DataResponse.False(ex.Message);
            }
        }

     

       
    }
}