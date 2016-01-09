using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using System.Linq;
using WhatNow.Data.Ef;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WhatNow.Ui.Web.Controllers
{
	[Route("api/[controller]")]
	public class ItemsController : Controller
	{
		private WhatNowDataEntities _dbContext;

		public ItemsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// GET: api/items
		[HttpGet]
		public IEnumerable<Item> Get()
		{
			var items = _dbContext.Items.ToList();
			return items;
		}

		// GET: api/items/children/5
		[HttpGet("children/{parentId?}")]
		public IEnumerable<Item> GetChildren(int? parentId = null)
		{
			var items = _dbContext.Items.Where(x => x.ParentId == parentId).ToList();
			return items;
		}

		// GET api/items/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
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