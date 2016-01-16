CREATE TABLE [dbo].[ControlOption]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
	[ControlId] INT NOT NULL,
	[Name] VARCHAR(50) NOT NULL,
	[FunnyName] VARCHAR(50) NULL,
	CONSTRAINT [PK_ControlOption] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_ControlOption_Control_ControlId] FOREIGN KEY ([ControlId]) 
        REFERENCES [dbo].[Control] ([Id])
)
