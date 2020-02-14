--A. We would like to run a report for a given day which should include all orders for the day as well as the items ordered.  It’s okay if the order is repeated per item.
CREATE PROCEDURE ALL_ORDERS_FOR_THE_DAY @day DATE
AS

SELECT [Orders].[OrderNumber], [OrderItems].DateCreated, FoodItems.DishName AS ItemsOrdered 
FROM [OrderItems]
LEFT JOIN [FoodItems] on [FoodItems].[FoodItemId] = [OrderItems].[FoodItemId]
LEFT JOIN [Orders] on [Orders].[OrderId] = [OrderItems].[OrderId]
WHERE (SELECT CONVERT(DATE, OrderItems.DateCreated, 103)) =  @day
GROUP BY [OrderItems].DateCreated, FoodItems.DishName, [Orders].[OrderNumber]
GO

