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

--DELETE [ControlLog]
--GO
--DELETE [Log];
--GO
--DELETE [ControlOption]
--GO
--DELETE [Control]
--GO
--DELETE [ControlType]
--GO
--DELETE [Item];
--GO

SET IDENTITY_INSERT ControlType ON;
MERGE INTO ControlType AS Target 
USING (VALUES 
        (1, 'Checkbox'),
		(2, 'Textbox'),
		(3, 'Radio')
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
		(6, 1, 'Dry heaving', NULL, 5),
		(7, NULL, 'Quesy', NULL, 2),
		(8, NULL, 'Potty Talk', NULL, 3),
		(9, 8, 'shi shi', 'Urination', 1),
		(10, 8, 'shit', 'poop', 2),
		(11, 8, 'fart chart', 'flatulence', 3),
		(12, 11, 'I think I farted', 'gassy', 1),
		(13, 11, 'shart', 'flatulence with defecation', 1)
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
		(10, 6, 2, 'Comments', null),
		(11, 7, 1, 'Detail', null),
		(12, 9, 3, 'Amount', null),
		(13, 9, 3, 'Hydration', null),
		(14, 9, 2, 'Comments', null),
		(15, 10, 3, 'Amount', null),
		(16, 10, 3, 'Type', null),
		(17, 10, 2, 'Comments', null),
		(18, 12, 3, 'Type', null),
		(19, 12, 2, 'Comments', null),
		(20, 13, 3, 'Amount', null),
		(21, 13, 2, 'Comments', null)
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

		(6, 3, 'Dry heaving', NULL),
		(7, 3, 'Cramping', NULL),
		(8, 3, 'Chest pain', NULL),
		(9, 3, 'Close together, hard to breathe', NULL),

		(11, 5, 'Dry heaving', NULL),
		(12, 5, 'Cramping', NULL),
		(13, 5, 'Chest pain', NULL),
		(14, 5, 'Close together, to breathe', NULL),

		(16, 7, 'Dry heaving', NULL),
		(17, 7, 'Cramping', NULL),
		(18, 7, 'Chest pain', NULL),
		(19, 7, 'Close together, hard to breathe', NULL),

		(21, 9, 'Dry heaving', NULL),
		(22, 9, 'Cramping', NULL),
		(23, 9, 'Chest pain', NULL),
		(24, 9, 'Close together, hard to breathe', NULL),

		(25, 11, 'With cramping', NULL),
		(26, 11, 'Empty stomach?', NULL),

		(27, 12, 'a little', NULL),
		(28, 12, 'normal aount', NULL),
		(29, 12, 'a lot', NULL),
		(30, 12, 'Austin Powers', 'a lot'),

		(31, 13, '1) hydrated', NULL),
		(32, 13, '2) hydrated', NULL),
		(33, 13, '3) hydrated', NULL),
		(34, 13, '4) dehydrated', NULL),
		(35, 13, '5) dehydrated', NULL),
		(36, 13, '6) dehydrated', NULL),
		(37, 13, '7) dehydrated', NULL),
		(38, 13, '8) dehydrated', NULL),

		(39, 15, 'a little', NULL),
		(40, 15, 'normal amount', NULL),
		(41, 15, 'a lot', NULL),
		(42, 15, 'I don''t remember eating that!', 'a lot'),
		(43, 15, 'holy s*** I filled the bowl', 'a lot'),

		(44, 16, 'Type 1) Separate hard lumps like nuts (hard to pass)', NULL),
		(45, 16, 'Type 2) Sausage-shaped but lumpy', NULL),
		(46, 16, 'Type 3) Like a sausage but with cracks on teh surface', NULL),
		(47, 16, 'Type 4) Like a sausage or snake, smooth and soft', NULL),
		(48, 16, 'Type 5) Soft blobs with clear-cut edges', NULL),
		(49, 16, 'Type 6) Fluffy pieces with ragged edges, a mushy stool', NULL),
		(50, 16, 'Type 7) Watery, no solid pieces (entirely liquid)', NULL),

		(51, 18, 'church hous creeper', 'mild flatulence'),
		(52, 18, 'farticles', 'mild flatulence'),
		(53, 18, 'wasn''t me!', 'mild flatulence'),
		(54, 18, 'scared the animals', 'mild flatulence'),
		(55, 18, 'made daddy proud', 'mild flatulence'),
		(57, 18, 'holy s***, what was that!!', 'mild flatulence'),
		(58, 18, 'horrendASS', 'mild flatulence'),
		(59, 18, 'bloated and painful', NULL),

		(60, 20, 'a little', NULL),
		(61, 20, 'a lot', NULL),
		(62, 20, 'wardrobe change', 'a lot'),
		(63, 20, 'bad grandpa', 'a lot')
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