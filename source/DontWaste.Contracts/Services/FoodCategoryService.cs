using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DontWaste.Contracts.Interfaces.Services;
using DontWaste.DB;
using DontWaste.DB.Domain;

namespace DontWaste.Contracts.Services
{
    public class FoodCategoryService : IFoodCategoryService
    {
        private readonly IApplicationDbContext _dataContext;

        public FoodCategoryService(IApplicationDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<FoodCategory>> GetFoodCategoriesAsync(PaginationFilter paginationFilter = null)
        {
            var queryable = _dataContext.FoodCategories.AsQueryable();

            if (paginationFilter == null)
            {
                return await queryable.Include(x => x.FoodItems).ToListAsync();
            }

            var skip = (paginationFilter.PageNumber - 1) * paginationFilter.PageSize;
            return await queryable.Include(x => x.FoodItems)
                .Skip(skip).Take(paginationFilter.PageSize).ToListAsync();
        }

        public async Task<bool> CreateFoodCategoryAsync(FoodCategory foodCategory)
        {
            _dataContext.FoodCategories.Add(foodCategory);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<FoodCategory> GetFoodCategoryByIdAsync(Guid foodCategoryId)
        {
            return await _dataContext.FoodCategories
                .Include(x => x.FoodItems)
                .SingleOrDefaultAsync(x => x.FoodCategoryId == foodCategoryId);
        }

        public async Task<bool> UpdateFoodCategoryAsync(FoodCategory foodCategoryToUpdate)
        {
            _dataContext.FoodCategories.Update(foodCategoryToUpdate);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteFoodCategoryAsync(Guid foodCategoryId)
        {
            var foodCategory = await GetFoodCategoryByIdAsync(foodCategoryId);

            if (foodCategory == null)
                return false;

            _dataContext.FoodCategories.Remove(foodCategory);
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}
