using System.Linq;
using Microsoft.AspNet.Mvc;
using WhatNow.Core;
using WhatNow.Data.Ef;
using WhatNow.Ui.Web.Api.Models;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class LogDetailsController : Controller
	{
		private readonly WhatNowDataEntities _dbContext;

		public LogDetailsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// GET api/logdetails
		[HttpGet]
		public LogDetailGetResult Get()
		{
			var maxRows = Startup.Configuration["Reports:MaxRows"].ToInt(50);
			var result = new LogDetailGetResult
			{
				Logs = _dbContext
					.LogDetails
					.OrderByDescending(x => x.Logged)
					.Where(x => x.UserId == 1)
					.Take(maxRows)
					.ToList()
			};

			var logIds = result.Logs.Select(y => y.LogId).ToList();

			result.ControlLogs = _dbContext
				.ControlLogDetails
				.Where(x => logIds.Contains(x.LogId))
				.ToList();

			return result;
		}

		[HttpDelete("DeleteLog/{logId}")]
		public void DeleteLog(int logId)
		{
			var log = _dbContext
				.Logs
				.FirstOrDefault(x => x.Id == logId);

			if (log == null)
			{
				HttpNotFound();
				return;
			}

			while (log.ControlLogs.Count > 0)
			{
				var controlLog = log.ControlLogs.First();
				log.ControlLogs.Remove(controlLog);
				_dbContext.ControlLogs.Remove(controlLog);
			}

			_dbContext.Logs.Remove(log);
			_dbContext.SaveChanges();
		}

		[HttpDelete("deletecontrollog/{controlLogId}")]
		public void DeleteControlLog(int controlLogId)
		{
			var controlLog = _dbContext
				.ControlLogs
				.FirstOrDefault(x => x.Id == controlLogId);

			if (controlLog == null)
			{
				HttpNotFound();
				return;
			}

			_dbContext.ControlLogs.Remove(controlLog);
			_dbContext.SaveChanges();
		}
	}
}