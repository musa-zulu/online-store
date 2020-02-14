-- C. We would also need to run a report showing each menu category and the number of food items in each one.

SELECT [FoodCategories].[Description],COUNT([FoodItems].DishName) AS FoodItemsCount 
FROM [FoodCategories] LEFT JOIN [FoodItems]  
ON [FoodItems].FoodCategoryId = [FoodCategories].FoodCategoryId
GROUP BY [FoodCategories].[Description]
