using DontWaste.DB;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace DontWaste.Server.Installers
{
    public class DbInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
