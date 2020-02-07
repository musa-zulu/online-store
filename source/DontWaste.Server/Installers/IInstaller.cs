using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DontWaste.Server.Installers
{
    public interface IInstaller
    {
        void InstallServices(IServiceCollection services, IConfiguration configuration);
    }
}
