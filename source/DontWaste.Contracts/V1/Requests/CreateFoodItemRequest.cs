using System;

namespace DontWaste.Contracts.V1.Requests
{
    public class CreateFoodItemRequest
    {
        public Guid FoodItemId { get; set; }

        public string FoodItemDescription { get; set; }
       // public virtual ImageFileRequest Image { get; set; }
    }
}
