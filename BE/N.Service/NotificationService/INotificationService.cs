using N.Model.Entities;
using N.Service.NotificationService.Dto;
using N.Service.Common;
using N.Service.NotificationService.Request;
using N.Service.Service;

namespace N.Service.NotificationService
{
    public interface INotificationService : IService<Notification>
    {
        Task<bool> CreateNhacNho(Notification newNoTi);

        Task<PagedList<NotificationDto>> GetData(NotificationSearch search);

        Task<NotificationDto> GetDto(Guid id);

        Task<PagedList<NotificationDto>> GetNotification(Guid? id, int size = 10);

        Task<PagedList<NotificationDto>> GetDataDoanhNghiep(NotificationSearch search);

        Task<PagedList<NotificationDto>> GetDataSanPham(NotificationSearch search);
    }
}