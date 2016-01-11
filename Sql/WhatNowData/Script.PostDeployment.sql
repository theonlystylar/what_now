/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
DELETE [ItemLog];
GO
DELETE [ItemOption]
GO
DELETE [Item];
GO

SET IDENTITY_INSERT ItemOptionType ON;
MERGE INTO ItemOptionType AS Target 
USING (VALUES 
        (1, 'Checkbox'),
		(2, 'Text')
) 
AS Source (Id, Name) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, Name) 
VALUES (Id, Name);
SET IDENTITY_INSERT ItemOptionType OFF;

SET IDENTITY_INSERT Item ON;
MERGE INTO Item AS Target 
USING (VALUES 
        (1, NULL, 'Vomiting/Regurgitation', NULL, 1),
		(2, 1, 'Little bit of mucus', NULL, 1),
		(3, 1, 'Lot of mucus', NULL, 2),
		(4, 1, 'Little bit of food', NULL, 3),
		(5, 1, 'Lot of food', NULL, 4),
		(6, 1, 'Dry heaving', NULL, 5)
) 
AS Source (Id, ParentId, Name, FunnyName, SortOrder) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, ParentId, Name, FunnyName, SortOrder) 
VALUES (Id, ParentId, Name, FunnyName, SortOrder);
SET IDENTITY_INSERT Item OFF;

SET IDENTITY_INSERT ItemOption ON;
MERGE INTO ItemOption AS Target 
USING (VALUES 
        (1, 2, 1, 'Dry heaving', NULL),
		(2, 2, 1, 'Cramping', NULL),
		(3, 2, 1, 'Chest pain', NULL),
		(4, 2, 1, 'Close together, hard to breathe', NULL),
		(5, 2, 2, 'Comment', NULL),

		(6, 3, 1, 'Dry heaving', NULL),
		(7, 3, 1, 'Cramping', NULL),
		(8, 3, 1, 'Chest pain', NULL),
		(9, 3, 1, 'Close together, hard to breathe', NULL),
		(10, 3, 2, 'Comment', NULL),

		(11, 4, 1, 'Dry heaving', NULL),
		(12, 4, 1, 'Cramping', NULL),
		(13, 4, 1, 'Chest pain', NULL),
		(14, 4, 1, 'Close together, to breathe', NULL),
		(15, 4, 2, 'Comment', NULL),

		(16, 5, 1, 'Dry heaving', NULL),
		(17, 5, 1, 'Cramping', NULL),
		(18, 5, 1, 'Chest pain', NULL),
		(19, 5, 1, 'Close together, hard to breathe', NULL),
		(20, 5, 2, 'Comment', NULL),

		(21, 6, 1, 'Dry heaving', NULL),
		(22, 6, 1, 'Cramping', NULL),
		(23, 6, 1, 'Chest pain', NULL),
		(24, 6, 1, 'Close together, hard to breathe', NULL),
		(25, 6, 2, 'Comment', NULL)
) 
AS Source (Id, ItemId, TypeId, Name, FunnyName) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, ItemId, TypeId, Name, FunnyName) 
VALUES (Id, ItemId, TypeId, Name, FunnyName);
SET IDENTITY_INSERT ItemOption OFF;

MERGE INTO [User] AS Target 
USING (VALUES 
        (1, 'Speedy', 'kaya@global.com', '123', '1/8/2016', '1/8/2016')
) 
AS Source (Id, Handle, UserName, [Password], FirstLogin, LastLogin) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, Handle, UserName, [Password], FirstLogin, LastLogin) 
VALUES (Id, Handle, UserName, [Password], FirstLogin, LastLogin);