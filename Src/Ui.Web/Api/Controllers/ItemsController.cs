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
				.OrderBy(x => x.Name)
				.ThenBy(x => x.FunnyName)
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
				.OrderBy(x => x.Name)
				.ThenBy(x => x.FunnyName)
				.FirstOrDefault(x => x.Id == id);

			return item?.ToModel();
		}

		// GET api/items/nodes
		[HttpGet("nodes")]
		public IEnumerable<ItemNodeModel> GetNodes()
		{
			var items = _dbContext
				.Items
				.OrderBy(x => x.Name)
				.ThenBy(x => x.FunnyName);

			return items?.ToNodeModels();
		}
	}
}