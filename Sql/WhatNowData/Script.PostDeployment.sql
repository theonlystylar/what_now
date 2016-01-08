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
MERGE INTO Item AS Target 
USING (VALUES 
        (1, NULL, 'Blowing Chunks', NULL), 
        (2, NULL, 'Eating', NULL),  
        (3, NULL, 'Pooping', NULL),   
        (4, NULL, 'Peeing', NULL),  
        (5, NULL, 'Farting', NULL),  
        (6, NULL, 'Medication', NULL),  
        (7, 1, 'Mucus', NULL),  
        (8, 1, 'Food Stuff (yuck!)', NULL)
) 
AS Source (Id, ParentId, Name, SortOrder) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, ParentId, Name, SortOrder) 
VALUES (Id, ParentId, Name, SortOrder);

MERGE INTO [User] AS Target 
USING (VALUES 
        (1, 'Speedy', 'kaya@global.com', '123', '1/8/2016', '1/8/2016')
) 
AS Source (Id, Handle, UserName, [Password], FirstLogin, LastLogin) 
ON Target.Id = Source.Id 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Id, Handle, UserName, [Password], FirstLogin, LastLogin) 
VALUES (Id, Handle, UserName, [Password], FirstLogin, LastLogin);