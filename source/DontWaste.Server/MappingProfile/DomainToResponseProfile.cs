using AutoMapper;
using DontWaste.Contracts.V1.Responses;
using DontWaste.DB.Domain;

namespace DontWaste.Server.MappingProfile
{
    public class DomainToResponseProfile : Profile
    {
        public DomainToResponseProfile()
        {
            CreateMap<FoodCategory, FoodCategoryResponse>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.MapFrom(src => src.FoodItems)).ReverseMap();
            
            CreateMap<FoodItem, FoodItemResponse>();
            CreateMap<Order, OrderResponse>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.MapFrom(src => src.FoodItems)).ReverseMap();
            
            CreateMap<OrderResponse, Order>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.MapFrom(src => src.FoodItems)).ReverseMap();
            CreateMap<OrderResponse, Order>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.MapFrom(src => src.FoodItems)).ReverseMap();
        }
    }
}