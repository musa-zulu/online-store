DECLARE @GUID1 UNIQUEIDENTIFIER
DECLARE @GUID2 UNIQUEIDENTIFIER
DECLARE @GUID3 UNIQUEIDENTIFIER

SET @GUID1 = NEWID()
SET @GUID2 = NEWID()
SET @GUID3 = NEWID()

insert into [DontWaste].[dbo].[FoodCategories]
values (@GUID1, GETDATE(), GETDATE(),'BREAKFAST');

insert into [DontWaste].[dbo].[FoodCategories]
values (@GUID2, GETDATE(), GETDATE(),'LUNCH');

insert into [DontWaste].[dbo].[FoodCategories]
values (@GUID3, GETDATE(), GETDATE(),'DINNER');