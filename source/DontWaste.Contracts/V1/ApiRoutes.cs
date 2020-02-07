namespace DontWaste.Contracts.V1
{
    public static class ApiRoutes
    {
        public const string Root = "api";

        public const string Version = "v1";

        public const string Base = Root + "/" + Version;

        public static class FoodItems
        {
            public const string GetAll = Base + "/foodItems";

            public const string Update = Base + "/foodItems/{itemId}";

            public const string Delete = Base + "/foodItems/{itemId}";

            public const string Get = Base + "/foodItems/{itemId}";

            public const string Create = Base + "/foodItems";
        }

        public static class Categories
        {
            public const string GetAll = Base + "/categories";

            public const string Get = Base + "/categories/{categoryName}";

            public const string Create = Base + "/categories";

            public const string Delete = Base + "/categories/{categoryName}";
        }
    }
}