using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Net.Http.Headers;
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

		// GET api/items
		[HttpGet]
		public IEnumerable<ItemModel> Get()
		{
			var items = _dbContext
				.Items
				.OrderBy(x => x.Name)
				.ThenBy(x => x.FunnyName);

			return items.ToNodeModels();
		}

		[HttpPost("withimage")]
		public async Task<IActionResult> PostWithImage(ItemEditRequest request)
		{
			//http://damienbod.com/2015/12/05/asp-net-5-mvc-6-file-upload-with-ms-sql-server-filetable/

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
			item.ParentId = request.ParentId;

			// read stream
			var file = request.ImageFile;

			if (file != null)
			{
				var fileBytes = new byte[file.Length];
				await file.OpenReadStream().ReadAsync(fileBytes, 0, (int) file.Length);

				// get file name
				var parsedContentDisposition = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
				var fileName = parsedContentDisposition.FileName;

				// drop existing file so new file has new id this is important so the url changes and the
				// new image is shown in the UI.
				if (item.File != null)
				{
					_dbContext.Files.Remove(item.File);
				}

				item.File = new File
				{
					Content = fileBytes,
					ContentType = request.ImageFile.ContentType,
					Name = fileName,
					FileType = FileType.Thumbnail
				};
			}


			await _dbContext.SaveChangesAsync();
			return Ok(item.ToNodeModel());
		}

		// POST api/items/
		[HttpPost]
		public async Task<IActionResult> Post([FromBody] ItemEditRequest request)
		{
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
			item.ParentId = request.ParentId;

			await _dbContext.SaveChangesAsync();
			return Ok(item.ToNodeModel());
		}
	}
}