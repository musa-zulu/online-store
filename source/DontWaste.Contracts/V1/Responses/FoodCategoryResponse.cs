using System;
using System.Collections.Generic;

namespace OnlineStore.Contracts.V1.Responses
{
    public class FoodCategoryResponse
    {
        public Guid FoodCategoryId { get; set; }
        public string Description { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }

        public virtual List<FoodItemResponse> FoodItems { get; set; }
    }
}
