using N.Service.Core.Mapper;
using Microsoft.AspNetCore.Mvc;
using N.Model.Entities;
using N.Service.CourseService;
using N.Service.CourseService.Dto;
using N.Service.CourseService.ViewsModels;
using N.Service.Common;
using N.Service.Dto;
using N.Service.AppUserService.Dto;
using N.Api.Dto;
using Microsoft.AspNetCore.Authorization;
using N.Api.Controllers;

namespace N.Controllers
{
    [Route("api/[controller]")]
    public class CourseController : HinetController
    {
        private readonly ICourseService _CourseService;
        private readonly IMapper _mapper;
        private readonly ILogger<CourseController> _logger;

        public CourseController(
            ICourseService CourseService,
            IMapper mapper,
            ILogger<CourseController> logger
            )
        {
            this._CourseService = CourseService;
            this._mapper = mapper;
            _logger = logger;
        }


        [HttpPost("Create")]
        public async Task<DataResponse<Course>> Create([FromBody] CourseCreateVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = _mapper.Map<CourseCreateVM, Course>(model);
                    await _CourseService.CreateAsync(entity);
                    return new DataResponse<Course>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    return DataResponse<Course>.False("Error", new string[] { ex.Message });
                }
            }
            return DataResponse<Course>.False("Some properties are not valid", ModelStateError);
        }

        [HttpPut("Update")]
        public async Task<DataResponse<Course>> Update([FromBody] CourseEditVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = await _CourseService.GetByIdAsync(model.Id);
                    if (entity == null)
                        return DataResponse<Course>.False("Không tìm thấy nhóm danh mục để sửa");
                    entity = _mapper.Map(model, entity);
                    await _CourseService.UpdateAsync(entity);
                    return new DataResponse<Course>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    DataResponse<Course>.False(ex.Message);
                }
            }
            return DataResponse<Course>.False("Some properties are not valid", ModelStateError);
        }

        [HttpGet("Get/{id}")]
        public async Task<DataResponse<CourseDto>> Get(Guid id)
        {
            var result = await _CourseService.GetDto(id);
            return new DataResponse<CourseDto>
            {
                Data = result,
                Message = "Get CourseDto thành công",
                Status = true
            };
        }

        [HttpPost("GetData")]
        public async Task<DataResponse<PagedList<CourseDto>>> GetData([FromBody] CourseSearchVM search)
        {
            var result = await _CourseService.GetData(search);
            return new DataResponse<PagedList<CourseDto>>
            {
                Data = result,
                Message = "GetData PagedList<CourseDto> thành công",
                Status = true
            };
        }

        [HttpDelete("Delete/{id}")]
        public async Task<DataResponse> Delete(Guid id)
        {
            try
            {
                var entity = await _CourseService.GetByIdAsync(id);
                await _CourseService.DeleteAsync(entity);
                return DataResponse.Success(null);
            }
            catch (Exception ex)
            {
                return DataResponse.False(ex.Message);
            }
        }
       
    }
}