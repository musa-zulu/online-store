using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineStore.DB.Domain
{
    public class FoodItem : EntityBase
    {
        [Key] public Guid FoodItemId { get; set; }

        public string DishName { get; set; }
        public string FoodItemDescription { get; set; }
        public decimal Price { get; set; }
        public Guid FoodCategoryId { get; set; }
        public virtual FoodCategory FoodCategory { get; set; }
    }
}
