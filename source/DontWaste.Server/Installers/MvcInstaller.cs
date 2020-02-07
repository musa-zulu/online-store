using DontWaste.Contracts.Interfaces.Services;
using DontWaste.Contracts.Services;
using DontWaste.Server.Filters;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace DontWaste.Server.Installers
{
    public class MvcInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddMvc(options =>
                {
                    options.EnableEndpointRouting = false;
                    options.Filters.Add<ValidationFilter>();
                })
                .AddFluentValidation(mvcConfiguration => mvcConfiguration.RegisterValidatorsFromAssemblyContaining<Startup>())
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
           
            services.AddSingleton<IUriService>(provider =>
            {
                var accessor = provider.GetRequiredService<IHttpContextAccessor>();
                var request = accessor.HttpContext.Request;
                var absoluteUri = string.Concat(request.Scheme, "://", request.Host.ToUriComponent(), "/");
                return new UriService(absoluteUri);
            });
        }
    }
}