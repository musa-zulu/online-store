﻿using System;

namespace OnlineStore.Contracts.V1.Requests
{
    public class CreateFoodCategoryRequest
    {
        public Guid FoodCategoryId { get; set; }
        public string Description { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }
    }
}
