using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineStore.DB.Domain;

namespace OnlineStore.Contracts.Interfaces.Services
{
    public interface IFoodItemsService
    {
        Task<List<FoodItem>> GetAllFoodItemsAsync(PaginationFilter paginationFilter = null);
        Task<bool> CreateFoodItemAsync(FoodItem foodItem);
        Task<FoodItem> GetFoodItemByDescriptionAsync(string foodItemDescription);
        Task<bool> UpdateFoodItemAsync(FoodItem foodItemToUpdate);
        Task<bool> DeleteFoodItemAsync(Guid foodItemId);
        Task<FoodItem> GetFoodItemByIdAsync(Guid foodItemId);
    }
}
