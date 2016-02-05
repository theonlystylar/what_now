using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Net.Http.Headers;
using WhatNow.Data.Ef;
using WhatNow.Ui.Web.Api.Models;
using File = WhatNow.Data.Ef.File;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class ItemsController : Controller
	{
		private readonly WhatNowDataEntities _dbContext;

		public ItemsController(WhatNowDataEntities dbContext, IHostingEnvironment hostingEnvironment)
		{
			_dbContext = dbContext;
			HostingEnvironment = hostingEnvironment;
		}

		public IHostingEnvironment HostingEnvironment { get; set; }

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

			return items.ToNodeModels();
		}

		// POST api/items/
		[HttpPost]
		public async Task<IActionResult> Post(ItemEditRequest request)
		{
			//http://damienbod.com/2015/12/05/asp-net-5-mvc-6-file-upload-with-ms-sql-server-filetable/

			//TODO: need to send parent ID as well.

			Item item;

			if (request.Id == null)
			{
				item = new Item();
				_dbContext.Items.Add(item);
			}
			else
			{
				item = await _dbContext
					.Items
					.FirstOrDefaultAsync(x => x.Id == request.Id);
			}

			if (item == null)
			{
				return HttpNotFound();
			}

			item.Name = request.Name;
			item.FunnyName = request.FunnyName;
			// parent id

			//TODO: delete file if is empty

			// read stream
			var file = request.File;

			if(file != null)
			{
				var fileBytes = new byte[file.Length];
				await file.OpenReadStream().ReadAsync(fileBytes, 0, (int) file.Length);

				// get file name
				var parsedContentDisposition = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
				var fileName = parsedContentDisposition.FileName;

				if (item.File == null)
				{
					// create new file

					item.File = new File
					{
						Content = fileBytes,
						ContentType = request.File.ContentType,
						Name = fileName,
						FileType = FileType.Thumbnail
					};
				}
				else
				{
					// update file

					item.File.Content = fileBytes;
					item.File.ContentType = request.File.ContentType;
					item.File.Name = fileName;
				}
			}


			await _dbContext.SaveChangesAsync();
			return Ok(item.ToNodeModel());
		}

		[HttpGet("icon/{id}")]
		public async Task<IActionResult> GetImage(int id)
		{
			var file = await _dbContext
				.Files
				.FirstOrDefaultAsync(x => x.Id == id);

			if (file != null)
			{
				return File(file.Content, file.ContentType);
			}

			// return default image
			var path = Path.Combine(HostingEnvironment.WebRootPath, @"images\default_icon.png");
			var stream = new FileStream(path, FileMode.Open, FileAccess.Read);
			return File(stream, "image/png");
		}
	}
}