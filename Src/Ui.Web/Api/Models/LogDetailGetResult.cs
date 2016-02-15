using System.Collections.Generic;
using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web.Api.Models
{
	public class LogDetailGetResult
	{
		public ICollection<LogDetail> Logs { get; set; }
		public ICollection<ControlLogDetail> ControlLogs { get; set; }
	}
}