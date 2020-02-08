using System;

namespace DontWaste.Contracts.V1.Requests
{
    public class UpdateFoodCategoryRequest
    {
        public string Description { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }
    }
}
