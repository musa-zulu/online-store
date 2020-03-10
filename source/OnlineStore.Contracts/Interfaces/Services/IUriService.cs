using System;
using OnlineStore.Contracts.V1.Requests;

namespace OnlineStore.Contracts.Interfaces.Services
{
    public interface IUriService
    {
        Uri GetFoodItemUri(string itemId);
        Uri GetAllUri(PaginationQuery pagination = null);
        Uri GetFoodCategoryUri(string categoryId);
        Uri GetOrderUri(string orderId);
    }
}
