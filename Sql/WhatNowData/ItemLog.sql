CREATE TABLE [dbo].[ItemLog]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
    [UserId] INT NOT NULL, 
    [ItemId] INT NOT NULL, 
    [Logged] DATETIME NOT NULL, 
    CONSTRAINT [PK_ItemLog] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_ItemLog_User_UserId] FOREIGN KEY ([UserId]) 
        REFERENCES [dbo].[User] ([Id]),
	CONSTRAINT [FK_ItemLog_Item_ItemId] FOREIGN KEY ([ItemId]) 
        REFERENCES [dbo].[Item] ([Id])
)
