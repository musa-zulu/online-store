using System;
using System.Collections.Generic;
using System.Linq;

namespace DontWaste.DB.Domain
{
    public class Order : EntityBase
    {
        public Guid OrderId { get; set; }

        public virtual List<FoodItem> FoodItems { get; set; } = new List<FoodItem>();

        public decimal TotalPrice => GetTotalPrice();

        public decimal GetTotalPrice() => FoodItems.Sum(p => p.Price);

        public string GetFormattedTotalPrice() => GetTotalPrice().ToString("0.00");
    }
}
