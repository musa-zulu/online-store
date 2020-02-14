--B. We would like to run a report that shows us all the menu items available, with the total number of items ordered for the week.

SELECT DISTINCT DishName, FoodItemDescription, Price, Count(*) as Items_Ordered FROM [FoodItems]
LEFT JOIN [OrderItems] ON
[OrderItems].[FoodItemId] = [FoodItems].[FoodItemId]
LEFT JOIN [Orders] on [Orders].[OrderId] = [OrderItems].[OrderId]
WHERE (SELECT CONVERT(DATE, OrderItems.DateCreated, 103)) >=   (select  dateadd(day, 2-datepart(dw, getdate()), CONVERT(date,getdate())))
and (SELECT CONVERT(DATE, OrderItems.DateCreated, 103)) <  (select  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())))
GROUP BY FoodItems.DishName, FoodItemDescription, Price


