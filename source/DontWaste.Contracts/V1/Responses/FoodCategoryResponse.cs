using System;
using System.Collections.Generic;

namespace DontWaste.Contracts.V1.Responses
{
    public class FoodCategoryResponse
    {
        public Guid FoodCategoryId { get; set; }
        public string Description { get; set; }

        public virtual List<FoodItemResponse> FoodItems { get; set; }
    }
}
