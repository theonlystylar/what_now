using Microsoft.AspNet.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Ui.Web.Controllers
{
	[Route("api/[controller]")]
	public class ItemsController : Controller
	{
		private IList<Item> _items = new List<Item>() {
			new Item {Id = 1, Name = "Blowing Chunks", ImageUrl="" },
			new Item {Id = 2, Name = "Eating", ImageUrl="" },
			new Item {Id = 3, Name = "Pooping", ImageUrl="" },
			new Item {Id = 4, Name = "Peeing", ImageUrl="" },
			new Item {Id = 5, Name = "Farting", ImageUrl="" },
			new Item {Id = 6, Name = "Medication", ImageUrl="" }
		};

		// GET: api/items
		[HttpGet]
		public IEnumerable<Item> Get()
		{
			return _items;
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

	public class Item
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string ImageUrl { get; set; }
	}
}