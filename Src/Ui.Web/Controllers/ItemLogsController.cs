using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WhatNow.Data.Ef;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WhatNow.Ui.Web.Controllers
{
	[Route("api/[controller]")]
	public class ItemLogsController : Controller
	{
		private WhatNowDataEntities _dbContext;

		public ItemLogsController(WhatNowDataEntities dbContext)
		{
			_dbContext = dbContext;
		}

		// GET: api/values
		[HttpGet]
		public IEnumerable<ItemLog> Get()
		{
			return _dbContext.ItemLogs.ToList();
		}

		// GET api/values/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody]ItemLogEditRequest value)
		{
			_dbContext.ItemLogs.Add(new ItemLog
			{
				ItemId = value.ItemId,
				UserId = 1,
				Logged = DateTime.Now
			});
			_dbContext.SaveChanges();
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

	public class ItemLogEditRequest
	{
		public int ItemId { get; set; }
	}
}