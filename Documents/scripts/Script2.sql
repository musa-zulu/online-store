DECLARE @GUID1 UNIQUEIDENTIFIER
DECLARE @GUID2 UNIQUEIDENTIFIER
DECLARE @GUID3 UNIQUEIDENTIFIER

SET @GUID1 = NEWID()
SET @GUID2 = NEWID()
SET @GUID3 = NEWID()

insert into [DontWaste].[dbo].[FoodItems]
values (@GUID1, GETDATE(), GETDATE(),'KRAAL BREAKFAST', 'Two poached eggs, freshly sliced tomato, avocado, basil cream cheese, toast', 66,(select FoodCategoryId from FoodCategories where [Description] like 'BREAKFAST'));

insert into [DontWaste].[dbo].[FoodItems]
values (@GUID2, GETDATE(), GETDATE(),'CHICKEN','Toasted home-made bun, fancy lettuce, tomatoes, gherkins, caramelised onion. All burgers served with a side salad or home-made chips', 86, (select FoodCategoryId from FoodCategories where [Description] like 'LUNCH'));

insert into [DontWaste].[dbo].[FoodItems]
values (@GUID3, GETDATE(), GETDATE(),'BEEF RIBS','Rich crispy,  beer and coca cola slow baked beef short rib served with flavourful samp, complimented by a beer, honey and onion jus, onion puree with a carrot and mango achaar side accompaniment', 168, (select FoodCategoryId from FoodCategories where [Description] like 'DINNER'));