using System;

namespace DontWaste.Contracts.V1.Responses
{
    public class FoodItemResponse
    {
        public Guid FoodItemId { get; set; }
        public string FoodItemDescription { get; set; }
        public string DishName { get; set; }
        public decimal Price { get; set; }
        public string ImagePath { get; set; }
    }
}
