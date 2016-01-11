CREATE TABLE [dbo].[ItemLogOption]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
    [ItemLogId] INT NOT NULL, 
    [ItemOptionId] INT NOT NULL, 
    [Value] VARCHAR(500) NULL, 
    CONSTRAINT [PK_ItemLogOption] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_ItemLogOption_ItemLog_ItemLogId] FOREIGN KEY ([ItemLogId]) 
        REFERENCES [dbo].[ItemLog] ([Id]),
	CONSTRAINT [FK_ItemLogOption_ItemOption_ItemOptionId] FOREIGN KEY ([ItemOptionId]) 
        REFERENCES [dbo].[ItemOption] ([Id])
)
