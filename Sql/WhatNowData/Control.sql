CREATE TABLE [dbo].[Control]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
    [ItemId] INT NOT NULL, 
    [ControlTypeId] INT NOT NULL,
    [Name] VARCHAR(50) NOT NULL, 
	[FunnyName] VARCHAR(50) NULL,
    CONSTRAINT [PK_Control] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Control_Item_ItemId] FOREIGN KEY ([ItemId]) 
        REFERENCES [dbo].[Item] ([Id]),
	CONSTRAINT [FK_Control_ControlType_ControlTypeId] FOREIGN KEY ([ControlTypeId]) 
        REFERENCES [dbo].[ControlType] ([Id])
)
