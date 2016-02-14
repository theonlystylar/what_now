CREATE VIEW [dbo].[LogPresetDetail]
	AS SELECT LogPreset.Id,
	LogPreset.ItemPresetId,
	Control.ItemId,
	LogPreset.LogGroup,
	LogPreset.ControlId,
	LogPreset.ControlOptionId,
	LogPreset.Value
	FROM LogPreset
	JOIN Control on LogPreset.ControlId = Control.Id
