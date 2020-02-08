using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DontWaste.Contracts.Helpers;
using DontWaste.Contracts.Interfaces.Services;
using DontWaste.Contracts.V1;
using DontWaste.Contracts.V1.Requests;
using DontWaste.Contracts.V1.Responses;
using DontWaste.DB.Domain;
using DontWaste.Server.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace DontWaste.Server.Controllers.V1
{
    public class FoodItemsController : Controller
    {
        private readonly IFoodItemsService _foodItemsService;
        private readonly IMapper _mapper;
        private readonly IUriService _uriService;
        private IDateTimeProvider _dateTimeProvider;

        public FoodItemsController(IFoodItemsService foodItemsService, IMapper mapper, IUriService uriService)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _uriService = uriService ?? throw new ArgumentNullException(nameof(uriService));
            _foodItemsService = foodItemsService ?? throw new ArgumentNullException(nameof(foodItemsService));
        }
        public IDateTimeProvider DateTimeProvider
        {
            get { return _dateTimeProvider ??= new DefaultDateTimeProvider(); }
            set
            {
                if (_dateTimeProvider != null) throw new InvalidOperationException("DateTimeProvider is already set");
                _dateTimeProvider = value;
            }
        }

        [HttpGet(ApiRoutes.FoodItems.GetAll)]
        public async Task<IActionResult> GetAll([FromQuery]PaginationQuery paginationQuery)
        {
            var pagination = _mapper.Map<PaginationFilter>(paginationQuery);

            var foodItems = await _foodItemsService.GetAllFoodItemsAsync(pagination);
            var foodItemResponse = _mapper.Map<List<FoodItemResponse>>(foodItems);

            if (pagination == null || pagination.PageNumber < 1 || pagination.PageSize < 1)
            {
                return Ok(new PagedResponse<FoodItemResponse>(foodItemResponse));
            }

            var paginationResponse = PaginationHelpers.CreatePaginatedResponse(_uriService, pagination, foodItemResponse);
            return Ok(paginationResponse);
        }

    }
}