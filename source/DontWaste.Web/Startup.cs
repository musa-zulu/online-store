using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DontWaste.Web.Startup))]
namespace DontWaste.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
