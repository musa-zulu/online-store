using System;

namespace DontWaste.DB.Domain
{
    public class OrderItem : EntityBase
    {
        public Guid OrderItemId { get; set; }
        public Guid FoodItemId { get; set; }
        public Guid OrderId { get; set; }
    }
}
