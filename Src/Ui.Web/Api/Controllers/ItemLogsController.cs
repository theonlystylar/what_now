using Microsoft.AspNet.Mvc;
using System;
using WhatNow.Data.Ef;
using WhatNow.Ui.Web.Api.Models;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class ItemLogsController : Controller
	{
		private WhatNowDataEntities _dbContext;

		public ItemLogsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody]ItemLogEditRequest value)
		{
			_dbContext.Logs.Add(new Log
			{
				ItemId = value.ItemId,
				UserId = 1,
				Logged = DateTime.Now
			});
			_dbContext.SaveChanges();
		}
	}
}