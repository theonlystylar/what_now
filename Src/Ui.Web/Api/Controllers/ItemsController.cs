using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WhatNow.Data.Ef;
using WhatNow.Ui.Web.Api.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class ItemsController : Controller
	{
		private WhatNowDataEntities _dbContext;

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

			if (item == null)
			{
				return null;
			}

			return item.ToModel();
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody]ItemModel value)
		{
			// todo
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]ItemModel value)
		{
			// todo
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			// todo
		}
	}
}