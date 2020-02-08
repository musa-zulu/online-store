using System;
using System.Collections.Generic;
using System.Linq;

namespace DontWaste.Contracts.V1.Requests
{
    public class UpdateOrderRequest
    {
        public Guid OrderId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }

        public virtual List<CreateFoodItemRequest> FoodItems { get; set; } = new List<CreateFoodItemRequest>();

        public decimal TotalPrice => GetTotalPrice();

        public decimal GetTotalPrice() => FoodItems.Sum(p => p.Price);

        public string GetFormattedTotalPrice() => GetTotalPrice().ToString("0.00");
    }
}
