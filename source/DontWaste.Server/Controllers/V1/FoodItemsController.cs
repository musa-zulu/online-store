using System;
using System.Collections.Generic;
using System.IO;
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
using Microsoft.Net.Http.Headers;

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

        [HttpGet(ApiRoutes.FoodItems.Get)]
        public async Task<IActionResult> Get([FromRoute]Guid itemId)
        {
            var foodItem = await _foodItemsService.GetFoodItemByIdAsync(itemId);

            if (foodItem == null)
                return NotFound();

            return Ok(new Response<FoodItemResponse>(_mapper.Map<FoodItemResponse>(foodItem)));
        }

        [HttpPost(ApiRoutes.FoodItems.Create)]
        public async Task<IActionResult> Create([FromBody] CreateFoodItemRequest postRequest)
        {
            SetDefaultFieldsFor(postRequest);

            var foodItem = _mapper.Map<CreateFoodItemRequest, FoodItem>(postRequest);
            
            await _foodItemsService.CreateFoodItemAsync(foodItem);

            var locationUri = _uriService.GetFoodItemUri(foodItem.FoodItemId.ToString());
            return Created(locationUri, new Response<FoodItemResponse>(_mapper.Map<FoodItemResponse>(foodItem)));
        }

        [HttpPut(ApiRoutes.FoodItems.Update)]
        public async Task<IActionResult> Update([FromBody] UpdateFoodItemRequest request)
        {
            if (request.FoodItemId == Guid.Empty)
            {
                return BadRequest(new ErrorResponse(new ErrorModel { Message = "The food item does not exist, or the id is empty." }));
            }

            UpdateBaseFieldsOn(request);

            var foodItem = _mapper.Map<UpdateFoodItemRequest, FoodItem>(request);
            foodItem.FoodItemId = request.FoodItemId;
            
            var isUpdated = await _foodItemsService.UpdateFoodItemAsync(foodItem);

            if (isUpdated)
                return Ok(new Response<FoodItemResponse>(_mapper.Map<FoodItemResponse>(foodItem)));

            return NotFound();
        }

        [HttpDelete(ApiRoutes.FoodItems.Delete)]
        public async Task<IActionResult> Delete([FromRoute] Guid itemId)
        {
            if (itemId == Guid.Empty)
                return NoContent();

            var deleted = await _foodItemsService.DeleteFoodItemAsync(itemId);

            if (deleted)
                return NoContent();

            return NotFound();
        }
        
        private void SetDefaultFieldsFor(CreateFoodItemRequest postRequest)
        {
            postRequest.FoodItemId = Guid.NewGuid();
            postRequest.DateCreated = DateTimeProvider.Now;
            postRequest.DateLastModified = DateTimeProvider.Now;
        }

        private void UpdateBaseFieldsOn(UpdateFoodItemRequest request)
        {
            request.DateLastModified = DateTimeProvider.Now;
        }

    }
}