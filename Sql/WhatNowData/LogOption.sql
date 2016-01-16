CREATE TABLE [dbo].[LogOption]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
    [LogId] INT NOT NULL, 
    [ControlOptionId] INT NOT NULL, 
    [Value] VARCHAR(500) NULL, 
    CONSTRAINT [PK_LogOption] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_LogOption_Log_LogId] FOREIGN KEY ([LogId]) 
        REFERENCES [dbo].[Log] ([Id]),
	CONSTRAINT [FK_LogOption_ControlOption_ControlOptionId] FOREIGN KEY ([ControlOptionId]) 
        REFERENCES [dbo].[ControlOption] ([Id])
)
