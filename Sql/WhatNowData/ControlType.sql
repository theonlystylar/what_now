﻿CREATE TABLE [dbo].[ControlType]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
	[Name] VARCHAR(15) NOT NULL,
	CONSTRAINT [PK_ControlType] PRIMARY KEY ([Id])
)