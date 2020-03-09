using System;
using System.Collections.Generic;

namespace OnlineStore.Contracts.V1.Requests
{
    public class CreateOrderRequest
    {
        public Guid OrderId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }
        public decimal TotalPrice { get; set; }
        public virtual List<CreateFoodItemRequest> FoodItems { get; set; } = new List<CreateFoodItemRequest>();
    }
}
