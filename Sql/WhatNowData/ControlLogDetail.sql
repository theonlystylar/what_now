CREATE VIEW [dbo].[ControlLogDetail]
	AS SELECT ControlLog.Id 'ControlLogId',
		ControlLog.LogId ,
		CASE WHEN Control.FunnyName IS NOT NULL THEN Control.FunnyName
		ELSE Control.Name END 'ControlName',
		CASE WHEN ControlOption.FunnyName IS NOT NULL THEN ControlOption.FunnyName
		WHEN ControlOption.Name IS NOT NULL THEN ControlOption.Name
		ELSE ControlLog.Value END 'Value'
		FROM ControlLog 
		JOIN Control ON ControlLog.ControlId = Control.Id
		LEFT OUTER JOIN ControlOption ON ControlLog.ControlOptionId = ControlOption.Id

