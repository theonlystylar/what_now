using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Microsoft.AspNet.Mvc;
using WhatNow.Data.Ef;
using WhatNow.Ui.Web.Api.Models;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class ControlsController : Controller
	{
		private readonly WhatNowDataEntities _dbContext;

		public ControlsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// GET api/controls/5
		[HttpGet("{itemId?}")]
		public IEnumerable<ControlModel> Get(int? itemId)
		{
			return _dbContext
				.Controls
				.Where(x => itemId == null || x.ItemId == itemId)
				.Include(x => x.ControlType)
				.Include(x => x.ControlOptions)
				.ToList()
				.Select(x => x.ToModel());
		}
	}
}