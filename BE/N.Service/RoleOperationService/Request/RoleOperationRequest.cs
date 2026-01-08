
using System.ComponentModel.DataAnnotations;

namespace N.Service.RoleOperationService.Request
{
    public class RoleOperationRequest
    {
        public Guid? Id { get; set; }
        public Guid RoleId { get; set; }
        public List<OperationIdRequest> listOperationCreateVM { get; set; } = new List<OperationIdRequest>();
    }

	public class OperationIdRequest
	{
        public int IsAccess { get; set; }
        public Guid OperationId { get; set; }
    }
}