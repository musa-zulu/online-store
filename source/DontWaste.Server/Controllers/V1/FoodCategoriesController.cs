using System;
using System.Collections.Generic;
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
    public class FoodCategoriesController : Controller
    {
        private readonly IFoodCategoryService _foodCategoryService;
        private readonly IMapper _mapper;
        private readonly IUriService _uriService;
        private IDateTimeProvider _dateTimeProvider;

        public FoodCategoriesController(IFoodCategoryService foodCategoryService, IMapper mapper, IUriService uriService)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _uriService = uriService ?? throw new ArgumentNullException(nameof(uriService));
            _foodCategoryService = foodCategoryService ?? throw new ArgumentNullException(nameof(foodCategoryService));
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

        [HttpGet(ApiRoutes.FoodCategories.GetAll)]
        public async Task<IActionResult> GetAll([FromQuery]PaginationQuery paginationQuery)
        {
            var pagination = _mapper.Map<PaginationFilter>(paginationQuery);

            var foodCategories = await _foodCategoryService.GetFoodCategoriesAsync(pagination);
            var foodCategoryResponse = _mapper.Map<List<FoodCategoryResponse>>(foodCategories);

            if (pagination == null || pagination.PageNumber < 1 || pagination.PageSize < 1)
            {
                return Ok(new PagedResponse<FoodCategoryResponse>(foodCategoryResponse));
            }

            var paginationResponse = PaginationHelpers.CreatePaginatedResponse(_uriService, pagination, foodCategoryResponse);
            return Ok(paginationResponse);
        }

        [HttpGet(ApiRoutes.FoodCategories.Get)]
        public async Task<IActionResult> Get([FromRoute]Guid categoryId)
        {
            var foodCategory = await _foodCategoryService.GetFoodCategoryByIdAsync(categoryId);

            if (foodCategory == null)
                return NotFound();

            return Ok(new Response<FoodCategoryResponse>(_mapper.Map<FoodCategoryResponse>(foodCategory)));
        }

        [HttpPost(ApiRoutes.FoodCategories.Create)]
        public async Task<IActionResult> Create([FromBody] CreateFoodCategoryRequest postRequest)
        {
            SetDefaultFieldsFor(postRequest);

            var foodCategory = _mapper.Map<CreateFoodCategoryRequest, FoodCategory>(postRequest);

            await _foodCategoryService.CreateFoodCategoryAsync(foodCategory);

            var locationUri = _uriService.GetFoodCategoryUri(foodCategory.FoodCategoryId.ToString());
            return Created(locationUri, new Response<FoodCategoryResponse>(_mapper.Map<FoodCategoryResponse>(foodCategory)));
        }

        [HttpPut(ApiRoutes.FoodCategories.Update)]
        public async Task<IActionResult> Update([FromRoute]Guid categoryId, [FromBody] UpdateFoodCategoryRequest request)
        {
            if (categoryId == Guid.Empty)
            {
                return BadRequest(new ErrorResponse(new ErrorModel { Message = "The food category does not exist, or the id is empty." }));
            }
            
            UpdateBaseFieldsOn(request);
            
            var foodCategory = _mapper.Map<UpdateFoodCategoryRequest, FoodCategory>(request);
            foodCategory.FoodCategoryId = categoryId;
            
            var isUpdated = await _foodCategoryService.UpdateFoodCategoryAsync(foodCategory);

            if (isUpdated)
                return Ok(new Response<FoodCategoryResponse>(_mapper.Map<FoodCategoryResponse>(foodCategory)));

            return NotFound();
        }

        [HttpDelete(ApiRoutes.FoodCategories.Delete)]
        public async Task<IActionResult> Delete([FromRoute] Guid categoryId)
        {
            if (categoryId == Guid.Empty)
                return NoContent();

            var deleted = await _foodCategoryService.DeleteFoodCategoryAsync(categoryId);

            if (deleted)
                return NoContent();

            return NotFound();
        }
        
        private void SetDefaultFieldsFor(CreateFoodCategoryRequest postRequest)
        {
            postRequest.FoodCategoryId = Guid.NewGuid();
            postRequest.DateCreated = DateTimeProvider.Now;
            postRequest.DateLastModified = DateTimeProvider.Now;
        }

        private void UpdateBaseFieldsOn(UpdateFoodCategoryRequest request)
        {
            request.DateLastModified = DateTimeProvider.Now;
        }
    }
}