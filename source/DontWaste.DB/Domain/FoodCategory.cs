using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DontWaste.DB.Domain
{
    public class FoodCategory : EntityBase
    {
        [Key]
        public Guid FoodCategoryId { get; set; }
        public string Description { get; set; }

        public Guid ImageFileId { get; set; }
        public virtual ImageFile Image { get; set; }
        public virtual List<FoodItem> FoodItems { get; set; }
    }
}
