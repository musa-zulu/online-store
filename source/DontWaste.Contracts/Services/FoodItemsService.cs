using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DontWaste.Contracts.Interfaces.Services;
using DontWaste.DB;
using DontWaste.DB.Domain;
using Microsoft.EntityFrameworkCore;

namespace DontWaste.Contracts.Services
{
    public class FoodItemsService : IFoodItemsService
    {
        private readonly IApplicationDbContext _dataContext;

        public FoodItemsService(IApplicationDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<FoodItem>> GetAllFoodItemsAsync(PaginationFilter paginationFilter = null)
        {
            var queryable = _dataContext.FoodItems.AsQueryable();

            if (paginationFilter == null)
            {
                return await queryable
                    .Include(x => x.Image)
                    .Include(x => x.FoodCategory)
                    .ToListAsync();
            }

            var skip = (paginationFilter.PageNumber - 1) * paginationFilter.PageSize;
            return await queryable
                .Include(x => x.Image)
                .Include(x => x.FoodCategory)
                .Skip(skip).Take(paginationFilter.PageSize).ToListAsync();
        }

        public async Task<bool> CreateFoodItemAsync(FoodItem foodItem)
        {
            var existingFoodItem = await _dataContext.FoodItems
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.FoodItemId == foodItem.FoodItemId);
            if (existingFoodItem != null)
                return false;

            _dataContext.FoodItems.Add(foodItem);
            var created = await _dataContext.SaveChangesAsync();
            return created > 0;
        }

        public async Task<FoodItem> GetFoodItemByDescriptionAsync(string foodItemDescription)
        {
            return await _dataContext.FoodItems
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.FoodItemDescription == foodItemDescription.ToLower());
        }

        public async Task<bool> UpdateFoodItemAsync(FoodItem foodItemToUpdate)
        {
            _dataContext.FoodItems.Update(foodItemToUpdate);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<FoodItem> GetFoodItemByIdAsync(Guid foodItemId)
        {
            return await _dataContext.FoodItems
                .Include(x => x.Image)
                .Include(x => x.FoodCategory)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.FoodItemId == foodItemId);
        }

        public async Task<bool> DeleteFoodItemAsync(Guid foodItemId)
        {
            var foodItem = await GetFoodItemByIdAsync(foodItemId);

            if (foodItem == null)
                return false;

            _dataContext.FoodItems.Remove(foodItem);
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}
