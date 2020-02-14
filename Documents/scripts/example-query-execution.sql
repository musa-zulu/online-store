USE [DontWaste]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[ALL_ORDERS_FOR_THE_DAY]
		@day = '2020-02-14'

SELECT	'Return Value' = @return_value

GO
