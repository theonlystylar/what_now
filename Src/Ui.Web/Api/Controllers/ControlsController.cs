using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WhatNow.Data.Ef;
using WhatNow.Ui.Web.Api.Models;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class ControlsController : Controller
	{
		private WhatNowDataEntities _dbContext;

		public ControlsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// GET api/controls/5
		[HttpGet("{itemId}")]
		public IEnumerable<ControlModel> Get(int itemId)
		{
			return _dbContext
				.Controls
				.Where(x => x.ItemId == itemId)
				.Include(x => x.ControlType)
				.Include(x => x.ControlOptions)
				.ToList()
				.Select(x => x.ToModel());
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody]string value)
		{
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}