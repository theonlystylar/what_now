CREATE TABLE [dbo].[ItemOption]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
	[ItemId] INT NOT NULL,
	[TypeId] INT NOT NULL,
	[Name] VARCHAR(50) NOT NULL,
	[FunnyName] VARCHAR(50) NULL,
	CONSTRAINT [PK_ItemOption] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_ItemOption_Item_ItemId] FOREIGN KEY ([ItemId]) 
        REFERENCES [dbo].[Item] ([Id]),
	CONSTRAINT [FK_ItemOption_ItemOptionType_TypeId] FOREIGN KEY ([TypeId]) 
        REFERENCES [dbo].[ItemOptionType] ([Id])
)
