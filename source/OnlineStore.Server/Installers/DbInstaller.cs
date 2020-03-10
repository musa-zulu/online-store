using OnlineStore.Contracts.Interfaces.Services;
using OnlineStore.Contracts.Services;
using OnlineStore.DB;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace OnlineStore.Server.Installers
{
    public class DbInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
            services.AddScoped<IFoodCategoryService, FoodCategoryService>();
            services.AddScoped<IFoodItemsService, FoodItemsService>();
            services.AddScoped<IOrderService, OrderService>();
        }
    }
}
