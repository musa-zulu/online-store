using System;
using System.ComponentModel.DataAnnotations;

namespace DontWaste.DB.Domain
{
    public class FoodItem : EntityBase
    {
        [Key]
        public Guid FoodItemId { get; set; }
        public string FoodItemDescription { get; set; }

        public Guid ImageFileId { get; set; }
        public virtual ImageFile Image { get; set; }
    }
}
