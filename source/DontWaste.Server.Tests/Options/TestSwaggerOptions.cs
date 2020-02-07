using System;
using DontWaste.Server.Options;
using NUnit.Framework;
using PeanutButter.TestUtils.Generic;

namespace DontWaste.Server.Tests.Options
{
    [TestFixture]
    public class TestSwaggerOptions
    {
        [Test]
        public void Construct()
        {
            //---------------Set up test pack-------------------

            //---------------Assert Precondition----------------

            //---------------Execute Test ----------------------
            Assert.DoesNotThrow(() => new SwaggerOptions());
            //---------------Test Result -----------------------
        }

        [TestCase("JsonRoute", typeof(string))]
        [TestCase("Description", typeof(string))]
        [TestCase("UiEndpoint", typeof(string))]
        public void SwaggerOptions_ShouldHaveProperty(string propertyName, Type propertyType)
        {
            //---------------Set up test pack-------------------
            var sut = typeof(SwaggerOptions);

            //---------------Assert Precondition----------------

            //---------------Execute Test ----------------------
            sut.ShouldHaveProperty(propertyName, propertyType);

            //---------------Test Result -----------------------
        }
    }
}