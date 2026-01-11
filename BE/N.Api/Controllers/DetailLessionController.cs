using N.Service.Core.Mapper;
using Microsoft.AspNetCore.Mvc;
using N.Model.Entities;
using N.Service.DetailLessionService;
using N.Service.DetailLessionService.Dto;
using N.Service.DetailLessionService.ViewsModels;
using N.Service.Common;
using N.Service.Dto;
using N.Service.AppUserService.Dto;
using N.Api.Dto;
using Microsoft.AspNetCore.Authorization;
using N.Api.Controllers;

namespace N.Controllers
{
    [Route("api/[controller]")]
    public class DetailLessionController : HinetController
    {
        private readonly IDetailLessionService _DetailLessionService;
        private readonly IMapper _mapper;
        private readonly ILogger<DetailLessionController> _logger;

        public DetailLessionController(
            IDetailLessionService DetailLessionService,
            IMapper mapper,
            ILogger<DetailLessionController> logger
            )
        {
            this._DetailLessionService = DetailLessionService;
            this._mapper = mapper;
            _logger = logger;
        }


        [HttpPost("Create")]
        public async Task<DataResponse<DetailLession>> Create([FromBody] DetailLessionCreateVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = _mapper.Map<DetailLessionCreateVM, DetailLession>(model);
                    await _DetailLessionService.CreateAsync(entity);
                    return new DataResponse<DetailLession>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    return DataResponse<DetailLession>.False("Error", new string[] { ex.Message });
                }
            }
            return DataResponse<DetailLession>.False("Some properties are not valid", ModelStateError);
        }

        [HttpPut("Update")]
        public async Task<DataResponse<DetailLession>> Update([FromBody] DetailLessionEditVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = await _DetailLessionService.GetByIdAsync(model.Id);
                    if (entity == null)
                        return DataResponse<DetailLession>.False("Không tìm thấy nhóm danh mục để sửa");
                    entity = _mapper.Map(model, entity);
                    await _DetailLessionService.UpdateAsync(entity);
                    return new DataResponse<DetailLession>() { Data = entity, Status = true };
                }
                catch (Exception ex)
                {
                    DataResponse<DetailLession>.False(ex.Message);
                }
            }
            return DataResponse<DetailLession>.False("Some properties are not valid", ModelStateError);
        }

        [HttpGet("Get/{id}")]
        public async Task<DataResponse<DetailLessionDto>> Get(Guid id)
        {
            var result = await _DetailLessionService.GetDto(id);
            return new DataResponse<DetailLessionDto>
            {
                Data = result,
                Message = "Get DetailLessionDto thành công",
                Status = true
            };
        }

        [HttpPost("GetData")]
        public async Task<DataResponse<PagedList<DetailLessionDto>>> GetData([FromBody] DetailLessionSearchVM search)
        {
            var result = await _DetailLessionService.GetData(search);
            return new DataResponse<PagedList<DetailLessionDto>>
            {
                Data = result,
                Message = "GetData PagedList<DetailLessionDto> thành công",
                Status = true
            };
        }

        [HttpDelete("Delete/{id}")]
        public async Task<DataResponse> Delete(Guid id)
        {
            try
            {
                var entity = await _DetailLessionService.GetByIdAsync(id);
                await _DetailLessionService.DeleteAsync(entity);
                return DataResponse.Success(null);
            }
            catch (Exception ex)
            {
                return DataResponse.False(ex.Message);
            }
        }

     

       
    }
}