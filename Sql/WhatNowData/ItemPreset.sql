CREATE TABLE [dbo].[ItemPreset]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
    [ParentId] INT NULL, 
    [Name] VARCHAR(50) NOT NULL, 
	[FunnyName] VARCHAR(50) NULL,
    [SortOrder] INT NULL,
	[ImageId] INT NULL, 
    CONSTRAINT [PK_ItemPreset] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_ItemPreset_ItemPreset_ParentId] FOREIGN KEY ([ParentId]) 
        REFERENCES [dbo].[ItemPreset] ([Id]),
	CONSTRAINT [FK_ItemPreset_File_ImageId] FOREIGN KEY ([ImageId]) 
        REFERENCES [dbo].[File] ([Id])
)
