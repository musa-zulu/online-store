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
            CreateMap<ImageFileRequest, ImageFile>().ReverseMap();
            CreateMap<CreateFoodItemRequest, FoodItem>();
            CreateMap<CreateFoodCategoryRequest, FoodCategory>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.Ignore());
            CreateMap<UpdateFoodItemRequest, FoodItem>()
                .ForMember(dest => dest.Image, opt =>
                    opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.FoodCategory, opt =>
                    opt.MapFrom(src => src.FoodCategory))
                .ReverseMap();
            CreateMap<UpdateFoodCategoryRequest, FoodCategory>()
                .ForMember(dest => dest.FoodItems, opt =>
                    opt.Ignore());
        }
    }
}