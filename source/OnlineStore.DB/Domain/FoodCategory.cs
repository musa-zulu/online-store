using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnlineStore.DB.Domain
{
    public class FoodCategory : EntityBase
    {
        [Key]
        public Guid FoodCategoryId { get; set; }
        public string Description { get; set; }

        public virtual List<FoodItem> FoodItems { get; set; }
    }
}
