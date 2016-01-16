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
BEGIN TRANSACTION

DROP TABLE [ItemLogOption]
GO
DROP TABLE [ItemLog]
GO
DROP TABLE [ItemOption]
GO
DROP TABLE [ItemOptionType]
GO

DELETE [LogOption]
GO
DELETE [Log];
GO
DELETE [ControlOption]
GO
DELETE [Control]
GO
DELETE [ControlType]
GO
DELETE [Item];
GO

SET IDENTITY_INSERT ControlType ON;
MERGE INTO ControlType AS Target 
USING (VALUES 
        (1, 'Checkbox'),
		(2, 'Textbox')
) 
AS Source (Id, Name) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, Name) 
VALUES (Id, Name);
SET IDENTITY_INSERT ControlType OFF;

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

SET IDENTITY_INSERT [Control] ON;
MERGE INTO [Control] AS Target 
USING (VALUES 
        (1, 2, 1, 'Detail', null),
		(2, 2, 2, 'Comments', null),
		(3, 3, 1, 'Detail', null),
		(4, 3, 2, 'Comments', null),
		(5, 4, 1, 'Detail', null),
		(6, 4, 2, 'Comments', null),
		(7, 5, 1, 'Detail', null),
		(8, 5, 2, 'Comments', null),
		(9, 6, 1, 'Detail', null),
		(10, 6, 2, 'Comments', null)
) 
AS Source (Id, ItemId, ControlTypeId, Name, FunnyName) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, ItemId, ControlTypeId, Name, FunnyName) 
VALUES (Id, ItemId, ControlTypeId, Name, FunnyName);
SET IDENTITY_INSERT [Control] OFF;

SET IDENTITY_INSERT ControlOption ON;
MERGE INTO ControlOption AS Target 
USING (VALUES 
        (1, 1, 'Dry heaving', NULL),
		(2, 1, 'Cramping', NULL),
		(3, 1, 'Chest pain', NULL),
		(4, 1, 'Close together, hard to breathe', NULL),
		(5, 1, 'Comment', NULL),

		(6, 3, 'Dry heaving', NULL),
		(7, 3, 'Cramping', NULL),
		(8, 3, 'Chest pain', NULL),
		(9, 3, 'Close together, hard to breathe', NULL),
		(10, 3, 'Comment', NULL),

		(11, 5, 'Dry heaving', NULL),
		(12, 5, 'Cramping', NULL),
		(13, 5, 'Chest pain', NULL),
		(14, 5, 'Close together, to breathe', NULL),
		(15, 5, 'Comment', NULL),

		(16, 7, 'Dry heaving', NULL),
		(17, 7, 'Cramping', NULL),
		(18, 7, 'Chest pain', NULL),
		(19, 7, 'Close together, hard to breathe', NULL),
		(20, 7, 'Comment', NULL),

		(21, 9, 'Dry heaving', NULL),
		(22, 9, 'Cramping', NULL),
		(23, 9, 'Chest pain', NULL),
		(24, 9, 'Close together, hard to breathe', NULL),
		(25, 9, 'Comment', NULL)
) 
AS Source (Id, ControlId, Name, FunnyName) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, ControlId, Name, FunnyName) 
VALUES (Id, ControlId, Name, FunnyName);
SET IDENTITY_INSERT ControlOption OFF;

MERGE INTO [User] AS Target 
USING (VALUES 
        (1, 'Speedy', 'kaya@global.com', '123', '1/8/2016', '1/8/2016')
) 
AS Source (Id, Handle, UserName, [Password], FirstLogin, LastLogin) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, Handle, UserName, [Password], FirstLogin, LastLogin) 
VALUES (Id, Handle, UserName, [Password], FirstLogin, LastLogin);

COMMIT TRANSACTION