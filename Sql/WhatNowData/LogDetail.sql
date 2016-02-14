CREATE VIEW [dbo].[LogDetail]
	AS select Log.Id 'LogId',
		case when ControlLog.Id is not null then ControlLog.Id
		else 0 end 'ControlLogId',
		Log.UserId,
		Log.Logged,
		Item.Name 'Item',
		Control.Name 'Control',
		case when ControlOption.Name is not null then ControlOption.Name
		else ControlLog.Value end 'Value'
		from Log
		join Item on Log.ItemId = Item.Id
		left outer join ControlLog on Log.Id = ControlLog.LogId
		left outer join Control on ControlLog.ControlId = Control.Id
		left outer join ControlOption on ControlLog.ControlOptionId = ControlOption.Id
