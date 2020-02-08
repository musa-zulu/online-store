using AutoMapper;
using DontWaste.Contracts.V1.Requests;
using DontWaste.DB.Domain;

namespace DontWaste.Server.MappingProfile
{
    public class RequestToDomainProfile : Profile
    {
        public RequestToDomainProfile()
        {
            CreateMap<PaginationQuery, PaginationFilter>();
            CreateMap<CreateFoodItemRequest, FoodItem>();
            CreateMap<CreateFoodCategoryRequest, FoodCategory>();
            CreateMap<UpdateFoodCategoryRequest, FoodCategory>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.Ignore());
            
        }
    }
}