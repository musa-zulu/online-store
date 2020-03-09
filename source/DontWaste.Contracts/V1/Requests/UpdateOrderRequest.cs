using System;

namespace OnlineStore.Contracts.V1.Requests
{
    public class UpdateOrderRequest
    {
        public Guid OrderId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }
        public int OrderNumber { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
