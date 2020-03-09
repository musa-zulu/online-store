using AutoMapper;
using OnlineStore.Contracts.V1.Responses;
using OnlineStore.DB.Domain;

namespace OnlineStore.Server.MappingProfile
{
    public class DomainToResponseProfile : Profile
    {
        public DomainToResponseProfile()
        {
            CreateMap<FoodCategory, FoodCategoryResponse>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.MapFrom(src => src.FoodItems)).ReverseMap();
            
            CreateMap<FoodItem, FoodItemResponse>();
            CreateMap<Order, OrderResponse>().ReverseMap();
        }
    }
}