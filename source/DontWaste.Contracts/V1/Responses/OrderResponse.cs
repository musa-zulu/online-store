using System;
using System.Collections.Generic;

namespace DontWaste.Contracts.V1.Responses
{
    public class OrderResponse
    {
        public Guid OrderId { get; set; }

        public virtual List<FoodItemResponse> FoodItems { get; set; } = new List<FoodItemResponse>();

        public decimal TotalPrice { get; set; }
        public int OrderNumber { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
