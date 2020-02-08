using System;
using DontWaste.Contracts.V1.Requests;

namespace DontWaste.Contracts.Interfaces.Services
{
    public interface IUriService
    {
        Uri GetFoodItemUri(string itemId);
        Uri GetAllUri(PaginationQuery pagination = null);
        Uri GetFoodCategoryUri(string categoryId);
    }
}
