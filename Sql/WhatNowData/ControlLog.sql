CREATE TABLE [dbo].[ControlLog]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
    [LogId] INT NOT NULL,
    [ControlId] INT NOT NULL,  
    [ControlOptionId] INT NULL, 
    [Value] VARCHAR(2000) NULL, 
    CONSTRAINT [PK_ControlLog] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_ControlLog_Log_LogId] FOREIGN KEY ([LogId]) 
        REFERENCES [dbo].[Log] ([Id]),
	CONSTRAINT [FK_ControlLog_Control_ControlId] FOREIGN KEY ([ControlId]) 
        REFERENCES [dbo].[Control] ([Id]),
	CONSTRAINT [FK_ControlLog_ControlOption_ControlOptionId] FOREIGN KEY ([ControlOptionId]) 
        REFERENCES [dbo].[ControlOption] ([Id])
)