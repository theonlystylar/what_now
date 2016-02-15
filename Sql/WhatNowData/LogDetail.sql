CREATE VIEW [dbo].[LogDetail]
	AS SELECT Log.Id 'LogId',
		Log.UserId,
		CASE WHEN Item.FunnyName IS NOT NULL THEN Item.FunnyName
		ELSE Item.Name END 'ItemName',
		Log.Logged
		FROM Log
		JOIN Item ON Log.ItemId = Item.Id
