CREATE TABLE [dbo].[Item]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
    [ParentId] INT NULL, 
    [Name] VARCHAR(50) NOT NULL, 
	[FunnyName] VARCHAR(50) NULL,
    [SortOrder] INT NULL,
	[ImageId] INT NULL, 
    CONSTRAINT [PK_Item] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Item_Item_ParentId] FOREIGN KEY ([ParentId]) 
        REFERENCES [dbo].[Item] ([Id]),
	CONSTRAINT [FK_Item_File_ImageId] FOREIGN KEY ([ImageId]) 
        REFERENCES [dbo].[File] ([Id])
)
