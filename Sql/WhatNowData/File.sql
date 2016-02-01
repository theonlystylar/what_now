CREATE TABLE [dbo].[File]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
	[Name] VARCHAR(255) NOT NULL, 
    [ContentType] VARCHAR(100) NOT NULL, 
    [Content] VARBINARY(MAX) NOT NULL, 
    [FileType] INT NOT NULL, 
    CONSTRAINT [PK_File] PRIMARY KEY ([Id])
)
