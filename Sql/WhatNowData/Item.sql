CREATE TABLE [dbo].[Item]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [ParentId] INT NULL, 
    [Name] VARCHAR(50) NOT NULL, 
    [SortOrder] INT NULL
)
