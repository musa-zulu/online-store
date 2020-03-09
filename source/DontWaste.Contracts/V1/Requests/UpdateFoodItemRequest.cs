using System;

namespace OnlineStore.Contracts.V1.Requests
{
    public class UpdateFoodItemRequest
    {
        public Guid FoodItemId { get; set; }
        public string FoodItemDescription { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }
        public Guid FoodCategoryId { get; set; }
        public virtual UpdateFoodCategoryRequest FoodCategory { get; set; }
    }
}
