using System;
using System.Collections.Generic;
using System.Linq;

namespace DontWaste.Contracts.V1.Responses
{
    public class OrderResponse
    {
        public Guid OrderId { get; set; }

        public virtual List<FoodItemResponse> FoodItems { get; set; } = new List<FoodItemResponse>();

        public decimal TotalPrice => GetTotalPrice();

        public decimal GetTotalPrice() => FoodItems.Sum(p => p.Price);

        public string GetFormattedTotalPrice() => GetTotalPrice().ToString("0.00");
    }
}
