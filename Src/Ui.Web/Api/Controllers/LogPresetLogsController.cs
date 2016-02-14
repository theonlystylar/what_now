using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class LogPresetLogsController : Controller
	{
		private readonly WhatNowDataEntities _dbContext;

		public LogPresetLogsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// POST api/logpresetlogs
		[HttpPost]
		public async Task<IActionResult> Post([FromBody] int itemPresetId)
		{
			var logPresetDetails = await _dbContext
				.LogPresetDetails
				.Where(x => x.ItemPresetId == itemPresetId)
				.ToListAsync();

			if (!logPresetDetails.Any())
			{
				return HttpNotFound("preset does not exist");
			}

			// group presets by group and item id

			var groups = logPresetDetails
				.GroupBy(x => new {x.LogGroup, x.ItemId})
				.ToList();

			foreach (var @group in groups)
			{
				var itemId = @group.Key.ItemId;
				var log = new Log
				{
					ItemId = itemId,
					UserId = 1,
					Logged = DateTime.UtcNow,
					CreateDate = DateTime.UtcNow
				};

				foreach (var logPresetDetail in @group)
				{
					var controlLog = new ControlLog
					{
						ControlId = logPresetDetail.ControlId,
						ControlOptionId = logPresetDetail.ControlOptionId,
						Value = logPresetDetail.Value
					};

					_dbContext.ControlLogs.Add(controlLog);
					log.ControlLogs.Add(controlLog);
				}

				_dbContext.Logs.Add(log);
			}

			await _dbContext.SaveChangesAsync();
			return Ok();
		}
	}
}