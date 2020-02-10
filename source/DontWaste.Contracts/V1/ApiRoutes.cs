namespace DontWaste.Contracts.V1
{
    public static class ApiRoutes
    {
        public const string Root = "api";

        public const string Version = "v1";

        public const string Base = Root + "/" + Version;

        public static class FoodCategories
        {
            public const string GetAll = Base + "/foodCategories";

            public const string Get = Base + "/foodCategories/{categoryId}";

            public const string Create = Base + "/foodCategories";

            public const string Update = Base + "/foodCategories";

            public const string Delete = Base + "/foodCategories/{categoryId}";
        }

        public static class FoodItems
        {
            public const string GetAll = Base + "/foodItems";

            public const string Update = Base + "/foodItems";

            public const string Delete = Base + "/foodItems/{itemId}";

            public const string Get = Base + "/foodItems/{itemId}";

            public const string Create = Base + "/foodItems";
            
            public const string Upload = Base + "/foodItems/Upload";
        }

        public static class Orders
        {
            public const string GetAll = Base + "/orders";

            public const string Get = Base + "/orders/{orderId}";

            public const string Create = Base + "/orders";

            public const string Update = Base + "/orders";

            public const string Delete = Base + "/orders/{orderId}";
        }
    }
}