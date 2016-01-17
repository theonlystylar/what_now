using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Microsoft.AspNet.Mvc;
using WhatNow.Data.Ef;
using WhatNow.Ui.Web.Api.Models;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class ItemsController : Controller
	{
		private readonly WhatNowDataEntities _dbContext;

		public ItemsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// GET: api/items/children/5
		[HttpGet("children/{parentId?}")]
		public IEnumerable<ItemModel> GetChildren(int? parentId = null)
		{
			return _dbContext
				.Items
				.Where(x => x.ParentId == parentId)
				.Include(x => x.Parent)
				.Include(x => x.Children)
				.ToList()
				.Select(x => x.ToModel());
		}

		// GET api/items/5
		[HttpGet("{id}")]
		public ItemModel Get(int id)
		{
			var item = _dbContext
				.Items
				.Include(x => x.Parent)
				.Include(x => x.Children)
				.FirstOrDefault(x => x.Id == id);

			return item?.ToModel();
		}
	}
}