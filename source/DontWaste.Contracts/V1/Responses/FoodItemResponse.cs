using System;

namespace DontWaste.Contracts.V1.Responses
{
    public class FoodItemResponse
    {
        public Guid FoodItemId { get; set; }
        public string FoodItemDescription { get; set; }
        public ImageFileResponse Image { get; set; }
    }
}
