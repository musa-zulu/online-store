using System;

namespace DontWaste.Contracts.V1.Requests
{
    public class CreateFoodItemRequest
    {
        public Guid FoodItemId { get; set; }
        public string FoodItemDescription { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }

        public Guid ImageFileId { get; set; }
        public virtual ImageFileRequest Image { get; set; }
        public Guid FoodCategoryId { get; set; }
        public virtual CreateFoodCategoryRequest FoodCategory { get; set; }
    }
}
