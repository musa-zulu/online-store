using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using DontWaste.DB;

namespace DontWaste.Web.Bootstrappers.Installers
{
    public class EntityFrameworkInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Component.For<IDontWasteDbContext>()
                .ImplementedBy<DontWasteDbContext>()
                .LifestylePerWebRequest());
        }
    }
}