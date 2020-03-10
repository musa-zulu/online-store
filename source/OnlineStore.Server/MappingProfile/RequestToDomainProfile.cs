using AutoMapper;
using OnlineStore.Contracts.V1.Requests;
using OnlineStore.DB.Domain;

namespace OnlineStore.Server.MappingProfile
{
    public class RequestToDomainProfile : Profile
    {
        public RequestToDomainProfile()
        {
            CreateMap<PaginationQuery, PaginationFilter>();
            CreateMap<CreateFoodItemRequest, FoodItem>();
            CreateMap<CreateFoodCategoryRequest, FoodCategory>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.Ignore());
            CreateMap<UpdateFoodItemRequest, FoodItem>()
                .ForMember(dest => dest.FoodCategory, opt =>
                    opt.MapFrom(src => src.FoodCategory))
                .ReverseMap();
            CreateMap<UpdateFoodCategoryRequest, FoodCategory>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.Ignore());
            CreateMap<CreateOrderRequest, Order>().ReverseMap();
            CreateMap<UpdateOrderRequest, Order>().ReverseMap();
        }
    }
}