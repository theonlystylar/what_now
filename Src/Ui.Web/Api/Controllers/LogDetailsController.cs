using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using WhatNow.Core;
using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class LogDetailsController
	{
		private readonly WhatNowDataEntities _dbContext;

		public LogDetailsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// GET api/logdetails
		[HttpGet]
		public IEnumerable<LogDetail> GetNodes()
		{
			var maxRows = Startup.Configuration["Reports:MaxRows"].ToInt(50);
			return _dbContext
				.LogDetails
				.OrderByDescending(x => x.Logged)
				.Take(maxRows);
		}

		[HttpDelete("{logId}/{controlLogId}")]
		public void Delete(int logId, int controlLogId)
		{
			if (controlLogId > 0)
			{
				var controlLog = _dbContext.ControlLogs.FirstOrDefault(x => x.Id == controlLogId);
				if (controlLog == null) return;
				_dbContext.ControlLogs.Remove(controlLog);
				_dbContext.SaveChanges();
			}
			else
			{
				var log = _dbContext.Logs.FirstOrDefault(x => x.Id == logId);
				if (log == null) return;
				_dbContext.Logs.Remove(log);
				_dbContext.SaveChanges();
			}
		}
	}
}