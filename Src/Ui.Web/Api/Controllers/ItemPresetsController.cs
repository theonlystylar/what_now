using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using WhatNow.Data.Ef;
using WhatNow.Ui.Web.Api.Models;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class ItemPresetsController : Controller
	{
		private readonly WhatNowDataEntities _dbContext;

		public ItemPresetsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// GET api/itempresets/nodes
		[HttpGet("nodes")]
		public IEnumerable<ItemPresetNodeModel> GetNodes()
		{
			var itemPresets = _dbContext
				.ItemPresets
				.OrderBy(x => x.Name)
				.ThenBy(x => x.FunnyName);

			return itemPresets.ToNodeModels();
		}
	}
}