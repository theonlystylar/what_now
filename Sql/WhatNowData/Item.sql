CREATE TABLE [dbo].[Item]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [ParentId] INT NULL, 
    [Name] VARCHAR(50) NOT NULL, 
    [SortOrder] INT NULL,
	CONSTRAINT [FK_Item_Item_ParentId] FOREIGN KEY ([ParentId]) 
        REFERENCES [dbo].[Item] ([Id])
)
