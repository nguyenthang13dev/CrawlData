using N.Service.Core.Mapper;
using Microsoft.AspNetCore.Mvc;
using N.Model.Entities;
using N.Service.LessionService;
using N.Service.LessionService.Dto;
using N.Service.LessionService.ViewsModels;
using N.Service.Common;
using N.Service.Dto;
using N.Service.AppUserService.Dto;
using N.Api.Dto;
using Microsoft.AspNetCore.Authorization;
using N.Api.Controllers;

namespace N.Controllers
{
    [Route("api/[controller]")]
    public class LessionController : HinetController
    {
        private readonly ILessionService _LessionService;
        private readonly IMapper _mapper;
        private readonly ILogger<LessionController> _logger;

        public LessionController(
            ILessionService LessionService,
            IMapper mapper,
            ILogger<LessionController> logger
            )
        {
            this._LessionService = LessionService;
            this._mapper = mapper;
            _logger = logger;
        }


        [HttpPost("Create")]
        public async Task<DataResponse<Lession>> Create([FromBody] LessionCreateVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = _mapper.Map<LessionCreateVM, Lession>(model);
                    await _LessionService.CreateAsync(entity);
                    return new DataResponse<Lession>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    return DataResponse<Lession>.False("Error", new string[] { ex.Message });
                }
            }
            return DataResponse<Lession>.False("Some properties are not valid", ModelStateError);
        }

        [HttpPut("Update")]
        public async Task<DataResponse<Lession>> Update([FromBody] LessionEditVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = await _LessionService.GetByIdAsync(model.Id);
                    if (entity == null)
                        return DataResponse<Lession>.False("Không tìm thấy nhóm danh mục để sửa");
                    entity = _mapper.Map(model, entity);
                    await _LessionService.UpdateAsync(entity);
                    return new DataResponse<Lession>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    DataResponse<Lession>.False(ex.Message);
                }
            }
            return DataResponse<Lession>.False("Some properties are not valid", ModelStateError);
        }

        [HttpGet("Get/{id}")]
        public async Task<DataResponse<LessionDto>> Get(Guid id)
        {
            var result = await _LessionService.GetDto(id);
            return new DataResponse<LessionDto>
            {
                Data = result,
                Message = "Get LessionDto thành công",
                Status = true
            };
        }

        [HttpPost("GetData")]
        public async Task<DataResponse<PagedList<LessionDto>>> GetData([FromBody] LessionSearchVM search)
        {
            var result = await _LessionService.GetData(search);
            return new DataResponse<PagedList<LessionDto>>
            {
                Data = result,
                Message = "GetData PagedList<LessionDto> thành công",
                Status = true
            };
        }

        [HttpDelete("Delete/{id}")]
        public async Task<DataResponse> Delete(Guid id)
        {
            try
            {
                var entity = await _LessionService.GetByIdAsync(id);
                await _LessionService.DeleteAsync(entity);
                return DataResponse.Success(null);
            }
            catch (Exception ex)
            {
                return DataResponse.False(ex.Message);
            }
        }
     

    }
}