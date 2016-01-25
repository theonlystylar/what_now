CREATE TABLE [dbo].[Log]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
    [UserId] INT NOT NULL, 
    [ItemId] INT NOT NULL, 
    [Logged] DATETIME NOT NULL, 
    [CreateDate] DATETIME NOT NULL DEFAULT GETUTCDATE(), 
    CONSTRAINT [PK_Log] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Log_User_UserId] FOREIGN KEY ([UserId]) 
        REFERENCES [dbo].[User] ([Id]),
	CONSTRAINT [FK_Log_Item_ItemId] FOREIGN KEY ([ItemId]) 
        REFERENCES [dbo].[Item] ([Id])
)
