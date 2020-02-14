using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DontWaste.DB.Domain;

namespace DontWaste.Contracts.Interfaces.Services
{
    public interface IOrderService
    {
        Task<List<Order>> GetAllOrdersAsync(PaginationFilter paginationFilter = null);
        Task<bool> CreateOrderAsync(Order order, List<FoodItem> items);
        Task<bool> UpdateOrderAsync(Order order);
        Task<bool> DeleteOrderAsync(Guid orderId);
        Task<Order> GetOrderByIdAsync(Guid orderId);
    }
}
