using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace DontWaste.Web.Bootstrappers.Installers
{
    public class RepositoryInstallers : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            /*container.Register(Component.For<IRepository>()
                .ImplementedBy<Repository>()
                .LifestylePerWebRequest());*/
        }
    }
}