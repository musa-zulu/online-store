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
    public class OrdersController : Controller
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        private readonly IUriService _uriService;
        private IDateTimeProvider _dateTimeProvider;

        public OrdersController(IOrderService orderService, IMapper mapper, IUriService uriService)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _uriService = uriService ?? throw new ArgumentNullException(nameof(uriService));
            _orderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
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

        [HttpGet(ApiRoutes.Orders.GetAll)]
        public async Task<IActionResult> GetAll([FromQuery]PaginationQuery paginationQuery)
        {
            var pagination = _mapper.Map<PaginationFilter>(paginationQuery);

            var orders = await _orderService.GetAllOrdersAsync(pagination);
            var ordersResponse = _mapper.Map<List<OrderResponse>>(orders);

            if (pagination == null || pagination.PageNumber < 1 || pagination.PageSize < 1)
            {
                return Ok(new PagedResponse<OrderResponse>(ordersResponse));
            }

            var paginationResponse = PaginationHelpers.CreatePaginatedResponse(_uriService, pagination, ordersResponse);
            return Ok(paginationResponse);
        }

        [HttpGet(ApiRoutes.Orders.Get)]
        public async Task<IActionResult> Get([FromRoute]Guid orderId)
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);

            if (order == null)
                return NotFound();

            return Ok(new Response<OrderResponse>(_mapper.Map<OrderResponse>(order)));
        }

        [HttpPost(ApiRoutes.Orders.Create)]
        public async Task<IActionResult> Create([FromBody] CreateOrderRequest postRequest)
        {
            SetDefaultFieldsFor(postRequest);

            var order = _mapper.Map<CreateOrderRequest, Order>(postRequest);

            await _orderService.CreateOrderAsync(order);

            var locationUri = _uriService.GetFoodItemUri(order.OrderId.ToString());
            return Created(locationUri, new Response<OrderResponse>(_mapper.Map<OrderResponse>(order)));
        }

        [HttpPut(ApiRoutes.Orders.Update)]
        public async Task<IActionResult> Update([FromRoute]Guid orderId, [FromBody] UpdateOrderRequest request)
        {
            if (orderId == Guid.Empty)
            {
                return BadRequest(new ErrorResponse(new ErrorModel { Message = "The order does not exist, or the id is empty." }));
            }

            UpdateBaseFieldsOn(request);

            var order = _mapper.Map<UpdateOrderRequest, Order>(request);
            order.OrderId = orderId;

            var isUpdated = await _orderService.UpdateOrderAsync(order);

            if (isUpdated)
                return Ok(new Response<OrderResponse>(_mapper.Map<OrderResponse>(order)));

            return NotFound();
        }

        [HttpDelete(ApiRoutes.Orders.Delete)]
        public async Task<IActionResult> Delete([FromRoute] Guid orderId)
        {
            if (orderId == Guid.Empty)
                return NoContent();

            var deleted = await _orderService.DeleteOrderAsync(orderId);

            if (deleted)
                return NoContent();

            return NotFound();
        }

        private void SetDefaultFieldsFor(CreateOrderRequest postRequest)
        {
            postRequest.OrderId = Guid.NewGuid();
            postRequest.DateCreated = DateTimeProvider.Now;
            postRequest.DateLastModified = DateTimeProvider.Now;
        }

        private void UpdateBaseFieldsOn(UpdateOrderRequest request)
        {
            request.DateLastModified = DateTimeProvider.Now;
        }
    }
}