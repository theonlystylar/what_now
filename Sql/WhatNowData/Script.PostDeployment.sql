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

--
-- Only uncomment deletes if clearing all data

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

--
-- Added CreateDate to table Log.  Need to update default value with Logged column datetime
-- Also, need to convert time to UTC.  All entrees were in PST time (-8), so adding 8 hours to 
-- all times.

--UPDATE Log SET Logged = DATEADD(HOUR, 8, Logged)
--GO

--UPDATE Log SET CreateDate = Logged
--GO

SET IDENTITY_INSERT ControlType ON;
MERGE INTO ControlType AS Target 
USING (VALUES 
        (1, 'Checkbox'),
		(2, 'Textbox'),
		(3, 'Radio'),
		(4, 'Pain Scale')
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
		(1, NULL, N'Vomiting/Regurgitation', NULL, 2),
		(7, NULL, N'Queasy', NULL, 3),
		(8, NULL, N'Potty Talk', NULL, 4),
		(9, 8, N'Shi Shi', N'Urination', 1),
		(10, 8, N'Shit', N'Poop', 2),
		(11, 8, N'Fart Chart', N'Flatulence', 3),
		(12, 11, N'I Think I Farted', N'Gassy', 1),
		(13, 11, N'Shart (Poop Fart)', N'Flatulence With Defecation', 1),
		(14, NULL, N'Medication', NULL, 5),
		(15, 14, N'Over-The-Counter Meds', NULL, 1),
		(16, 15, N'Tums', NULL, 1),
		(17, 15, N'Gas-X', NULL, 2),
		(18, 15, N'Ibuprofen', NULL, 3),
		(19, 15, N'Acetaminophen', NULL, 4),
		(20, 15, N'Lactaid', NULL, 5),
		(21, 15, N'Other', NULL, 6),
		(22, 14, N'Prescription Meds', NULL, 2),
		(23, 22, N'Pepcid Complete', NULL, 1),
		(24, 22, N'Cyproheptadine Hcl', NULL, 2),
		(25, 22, N'Amitriptyline', NULL, 3),
		(26, 22, N'Zofran', NULL, 4),
		(27, 22, N'Hyoscyamine', NULL, 5),
		(28, 22, N'Miralax', NULL, 6),
		(29, 22, N'Other', NULL, 7),
		(30, NULL, N'Pain', NULL, 1),
		(31, NULL, N'School', NULL, 1),
		(32, NULL, N'Other', NULL, 1),
		(33, NULL, N'Daily Log / Comments', NULL, 1),
		(34, NULL, N'Eating / Drinking', NULL, 1),
		(35, NULL, N'Acupuncture', NULL, 1)
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
		(1, 1, 3, N'Type', NULL),
		(2, 1, 1, N'Detail', NULL),
		(3, 1, 2, N'Comments', NULL),
		(11, 7, 1, N'Detail', NULL),
		(12, 9, 3, N'Amount', NULL),
		(13, 9, 3, N'Hydration', NULL),
		(14, 9, 2, N'Comments', NULL),
		(15, 10, 3, N'Amount', NULL),
		(16, 10, 3, N'Type', NULL),
		(17, 10, 2, N'Comments', NULL),
		(18, 12, 3, N'Type', NULL),
		(19, 12, 2, N'Comments', NULL),
		(20, 13, 3, N'Amount', NULL),
		(21, 13, 2, N'Comments', NULL),
		(22, 16, 3, N'Quantity', NULL),
		(23, 17, 3, N'Quantity', NULL),
		(24, 18, 2, N'Dosage', NULL),
		(25, 19, 2, N'Dosage', NULL),
		(26, 20, 3, N'Quantity', NULL),
		(27, 21, 3, N'Quantity', NULL),
		(28, 21, 2, N'Dosage', NULL),
		(29, 23, 3, N'Dosage', NULL),
		(30, 23, 2, N'Comments', NULL),
		(31, 24, 3, N'Dosage', NULL),
		(32, 24, 2, N'Comments', NULL),
		(33, 25, 3, N'Dosage', NULL),
		(34, 25, 3, N'Prep', NULL),
		(35, 25, 2, N'Comments', NULL),
		(36, 26, 3, N'Dosage', NULL),
		(37, 26, 2, N'Comments', NULL),
		(38, 27, 3, N'Dosage', NULL),
		(39, 27, 2, N'Comments', NULL),
		(40, 28, 2, N'Dosage', NULL),
		(41, 28, 2, N'Prep', NULL),
		(42, 28, 2, N'Comments', NULL),
		(43, 30, 3, N'Pain', NULL),
		(44, 31, 3, N'Attendance', NULL),
		(45, 32, 3, N'Category', NULL),
		(46, 32, 2, N'Comments', NULL),
		(47, 33, 2, N'Comments', NULL),
		(48, 34, 1, N'Drinks', NULL),
		(49, 34, 2, N'Drink Other', NULL),
		(50, 34, 2, N'Meal', NULL),
		(51, 34, 2, N'Snack', NULL),
		(52, 35, 1, N'Type', NULL),
		(53, 35, 2, N'Comments', NULL)
) 
AS Source (Id, ItemId, ControlTypeId, Name, FunnyName) 
ON Target.Id = Source.Id 
WHEN MATCHED THEN
UPDATE SET Target.ItemId = Source.ItemId,
	Target.ControlTypeId = Source.ControlTypeId,
	Target.Name = Source.Name,
	Target.FunnyName = Source.FunnyName
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, ItemId, ControlTypeId, Name, FunnyName) 
VALUES (Id, ItemId, ControlTypeId, Name, FunnyName);
SET IDENTITY_INSERT [Control] OFF;

SET IDENTITY_INSERT ControlOption ON;
MERGE INTO ControlOption AS Target 
USING (VALUES 
		(1, 1, N'Little Bit Of Mucus', NULL),
		(3, 1, N'Lot Of Mucus', NULL),
		(4, 1, N'Little Bit Of Food', NULL),
		(5, 1, N'Lot Of Food', NULL),
		(6, 1, N'Dry Heaving', NULL),
		(7, 2, N'Dry Heaving', NULL),
		(8, 2, N'Cramping', NULL),
		(9, 2, N'Chest Pain', NULL),
		(10, 2, N'Close Together And Hard To Breathe', NULL),
		(25, 11, N'With Cramping', NULL),
		(26, 11, N'Empty Stomach?', NULL),
		(27, 12, N'A Little', NULL),
		(28, 12, N'Normal Amount', NULL),
		(29, 12, N'A Lot', NULL),
		(30, 12, N'Austin Powers', N'A Lot'),
		(31, 13, N'1) Hydrated', NULL),
		(32, 13, N'2) Hydrated', NULL),
		(33, 13, N'3) Hydrated', NULL),
		(34, 13, N'4) Dehydrated', NULL),
		(35, 13, N'5) Dehydrated', NULL),
		(36, 13, N'6) Dehydrated', NULL),
		(37, 13, N'7) Dehydrated', NULL),
		(38, 13, N'8) Dehydrated', NULL),
		(39, 15, N'A Little', NULL),
		(40, 15, N'Normal Amount', NULL),
		(41, 15, N'A Lot', NULL),
		(42, 15, N'I Don''t Remember Eating That!', N'A Lot'),
		(43, 15, N'Holy S*** I Filled The Bowl', N'A Lot'),
		(44, 16, N'Type 1) Separate Hard Lumps Like Nuts (Hard To Pass)', NULL),
		(45, 16, N'Type 2) Sausage-Shaped But Lumpy', NULL),
		(46, 16, N'Type 3) Like A Sausage But With Cracks On The Surface', NULL),
		(47, 16, N'Type 4) Like A Sausage Or Snake, Smooth And Soft', NULL),
		(48, 16, N'Type 5) Soft Blobs With Clear-Cut Edges', NULL),
		(49, 16, N'Type 6) Fluffy Pieces With Ragged Edges, A Mushy Stool', NULL),
		(50, 16, N'Type 7) Watery, No Solid Pieces (Entirely Liquid)', NULL),
		(51, 18, N'Church House Creeper', N'Mild Flatulence'),
		(52, 18, N'Farticles', N'Mild Flatulence'),
		(53, 18, N'Wasn''t Me!', N'Mild Flatulence'),
		(54, 18, N'Scared The Animals', N'Mild Flatulence'),
		(55, 18, N'Made Daddy Proud', N'Mild Flatulence'),
		(57, 18, N'Holy S***, What Was That!!', N'Mild Flatulence'),
		(58, 18, N'HorrendASS', N'Mild Flatulence'),
		(59, 18, N'Bloated And Painful', NULL),
		(60, 20, N'A Little', NULL),
		(61, 20, N'A Lot', NULL),
		(62, 20, N'Wardrobe Change', N'A Lot'),
		(63, 20, N'Bad Grandpa', N'A Lot'),
		(64, 22, N'1', NULL),
		(65, 22, N'2', NULL),
		(66, 22, N'3', NULL),
		(67, 23, N'1', NULL),
		(68, 23, N'2', NULL),
		(69, 23, N'3', NULL),
		(70, 26, N'1', NULL),
		(71, 26, N'2', NULL),
		(72, 26, N'3', NULL),
		(73, 27, N'1', NULL),
		(74, 27, N'2', NULL),
		(75, 27, N'3', NULL),
		(76, 29, N'10mg Famotidine', NULL),
		(77, 29, N'Other', NULL),
		(78, 31, N'4mg/10ml Liquid', NULL),
		(80, 31, N'Other', NULL),
		(81, 33, N'20mg', NULL),
		(82, 33, N'Other', NULL),
		(83, 34, N'Crushed And Mixed With Applesauce', NULL),
		(84, 34, N'Other', NULL),
		(85, 36, N'Ondansetron 4mg ODT', NULL),
		(86, 36, N'Other', NULL),
		(87, 38, N'.125mg ODT', NULL),
		(88, 38, N'Other', NULL),
		(89, 43, N'0 - No Hurt', NULL),
		(90, 43, N'1', NULL),
		(91, 43, N'2 - Hurts Little Bit', NULL),
		(92, 43, N'3', NULL),
		(93, 43, N'4 - Hurts Little More', NULL),
		(94, 43, N'5', NULL),
		(95, 43, N'6 - Hurts Even More', NULL),
		(96, 43, N'7', NULL),
		(97, 43, N'8 - Hurts Whole Lot', NULL),
		(98, 43, N'9', NULL),
		(99, 43, N'10 - Hurts Worst', NULL),
		(100, 44, N'Missed School', NULL),
		(101, 44, N'Few Hours - AM', NULL),
		(102, 44, N'Few Hours - PM', NULL),
		(103, 44, N'Half Day - AM', NULL),
		(104, 44, N'Half Day - PM', NULL),
		(105, 44, N'Full Day', NULL),
		(106, 45, N'Food', NULL),
		(107, 45, N'Other', NULL),
		(108, 45, N'Medication', NULL),
		(109, 45, N'Physical', NULL),
		(110, 48, N'Water', NULL),
		(111, 48, N'Propel', NULL),
		(112, 48, N'Gatorade', NULL),
		(113, 48, N'Snapple', NULL),
		(114, 48, N'Apple Juice', NULL),
		(115, 48, N'Orange Juice', NULL),
		(116, 48, N'Chocolate Milk', NULL),
		(117, 48, N'Berry Smoothie', NULL),
		(118, 48, N'Hot Apple Cider', NULL),
		(119, 48, N'Pediasure Grow & Gain', NULL),
		(120, 52, N'Acupuncture Appointment', NULL),
		(122, 52, N'Moxa @ Home', NULL),
		(123, 52, N'Acupressure @ Home', NULL)
) 
AS Source (Id, ControlId, Name, FunnyName) 
ON Target.Id = Source.Id 
WHEN MATCHED THEN
UPDATE SET Target.ControlId = Source.ControlId,
	Target.Name = Source.Name,
	Target.FunnyName = Source.FunnyName
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