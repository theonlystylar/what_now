CREATE TABLE [dbo].[LogPreset]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
    [ItemPresetId] INT NOT NULL,
	[LogGroup] INT NOT NULL,
    [ControlId] INT NOT NULL,  
    [ControlOptionId] INT NULL, 
    [Value] VARCHAR(2000) NULL, 
    CONSTRAINT [PK_LogPreset] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_LogPreset_ItemPreset_ItemPresetId] FOREIGN KEY ([ItemPresetId]) 
        REFERENCES [dbo].[ItemPreset] ([Id]),
	CONSTRAINT [FK_LogPreset_Control_ControlId] FOREIGN KEY ([ControlId]) 
        REFERENCES [dbo].[Control] ([Id]),
	CONSTRAINT [FK_LogPreset_ControlOption_ControlOptionId] FOREIGN KEY ([ControlOptionId]) 
        REFERENCES [dbo].[ControlOption] ([Id])
)
