using System;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Castle.Windsor;

namespace DontWaste.Web
{
    public class WindsorControllerFactory : DefaultControllerFactory
    {
        private readonly IWindsorContainer _container;

        public WindsorControllerFactory(IWindsorContainer container) : base()
        {
            _container = container;
        }

        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            if (controllerType == null)
            {
                throw new HttpException((int)HttpStatusCode.NotFound,
                    $"The controller for path '{requestContext.HttpContext.Request.Path}' could not be found.");
            }
            return _container.Resolve(controllerType) as IController;
        }

        public override void ReleaseController(IController controller)
        {
            _container.Release(controller);
        }
    }
}