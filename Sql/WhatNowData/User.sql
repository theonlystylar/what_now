CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL PRIMARY KEY,
	[Handle] VARCHAR(20) NOT NULL, 
    [UserName] VARCHAR(50) NOT NULL, 
    [Password] VARCHAR(50) NOT NULL, 
    [FirstLogin] DATETIME NOT NULL, 
    [LastLogin] DATETIME NOT NULL
)
