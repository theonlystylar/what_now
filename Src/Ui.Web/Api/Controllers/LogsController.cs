using System;
using Microsoft.AspNet.Mvc;
using WhatNow.Data.Ef;
using WhatNow.Ui.Web.Api.Models;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class LogsController : Controller
	{
		private readonly WhatNowDataEntities _dbContext;

		public LogsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody] LogRequest value)
		{
			var log = new Log
			{
				ItemId = value.ItemId,
				UserId = 1,
				Logged = value.DateTimeOverride ?? DateTime.UtcNow
			};

			foreach (var controlLog in value.ControlLogs)
			{
				log.ControlLogs.Add(new ControlLog
				{
					ControlId = controlLog.ControlId,
					ControlOptionId = controlLog.ControlOptionId,
					Value = controlLog.Value
				});
			}

			_dbContext.Logs.Add(log);
			_dbContext.SaveChanges();
		}
	}
}