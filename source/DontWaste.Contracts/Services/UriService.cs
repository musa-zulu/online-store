using System;
using Microsoft.AspNetCore.WebUtilities;
using DontWaste.Contracts.Interfaces.Services;
using DontWaste.Contracts.V1;
using DontWaste.Contracts.V1.Requests;

namespace DontWaste.Contracts.Services
{
    public class UriService : IUriService
    {
        private readonly string _baseUri;

        public UriService(string baseUri)
        {
            _baseUri = baseUri;
        }

        public Uri GetFoodItemUri(string itemId)
        {
            return new Uri(_baseUri + ApiRoutes.FoodItems.Get.Replace("{itemId}", itemId));
        }

        public Uri GetAllUri(PaginationQuery pagination = null)
        {
            var uri = new Uri(_baseUri);

            if (pagination == null)
            {
                return uri;
            }

            var modifiedUri = QueryHelpers.AddQueryString(_baseUri, "pageNumber", pagination.PageNumber.ToString());
            modifiedUri = QueryHelpers.AddQueryString(modifiedUri, "pageSize", pagination.PageSize.ToString());

            return new Uri(modifiedUri);
        }

        public Uri GetFoodCategoryUri(string categoryId)
        {
            return new Uri(_baseUri + ApiRoutes.FoodCategories.Get.Replace("{categoryId}", categoryId));
        }

        public Uri GetOrderUri(string orderId)
        {
            return new Uri(_baseUri + ApiRoutes.Orders.Get.Replace("{orderId}", orderId));
        }
    }
}