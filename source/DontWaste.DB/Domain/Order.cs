using System;

namespace OnlineStore.DB.Domain
{
    public class Order : EntityBase
    {
        public Guid OrderId { get; set; }
        public int OrderNumber { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
