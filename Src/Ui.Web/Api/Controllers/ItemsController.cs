using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Filters;
using Microsoft.Extensions.Logging;
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

		// GET api/items/
		[HttpPost]
		public async Task Post(ItemEditRequest request)
		{
			//http://damienbod.com/2015/12/05/asp-net-5-mvc-6-file-upload-with-ms-sql-server-filetable/

			var file = request.File;

			var item = _dbContext
				.Items
				.FirstOrDefault(x => x.Id == request.Id);

			// read stream
			var fileBytes = new byte[file.Length];
			file.OpenReadStream().Read(fileBytes, 0, (int)file.Length);

			// get file name
			var parsedContentDisposition = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
			var fileName = parsedContentDisposition.FileName;

			//FileDetails fileDetails;
			//using (var reader = new StreamReader(file.OpenReadStream()))
			//{
			//	var fileContent = reader.ReadToEnd();
			//	var parsedContentDisposition = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
			//	fileDetails = new FileDetails
			//	{
			//		Filename = parsedContentDisposition.FileName,
			//		Content = fileContent
			//	};
			//}

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

			

			await _dbContext.SaveChangesAsync();

			//var file = Request.Form.Files[0];
			//var path = Path.Combine(HostingEnvironment.WebRootPath, "uploaded_pics");

			//path = Path.Combine(path, Guid.NewGuid() + ".png");
			//await file.SaveAsAsync(path);


			// Check if the request contains multipart/form-data.
			//if (!Request.Content.IsMimeMultipartContent("form-data"))
			//{
			//	return BadRequest("Unsupported media type");
			//}
			//try
			//{
			//	var provider = new CustomMultipartFormDataStreamProvider(workingFolder);

			//	await Request.Content.ReadAsMultipartAsync(provider);

			//	var photos =
			//	  provider.FileData
			//		 .Select(file => new FileInfo(file.LocalFileName))
			//		 .Select(fileInfo => new PhotoViewModel
			//		 {
			//			 Name = fileInfo.Name,
			//			 Created = fileInfo.CreationTime,
			//			 Modified = fileInfo.LastWriteTime,
			//			 Size = fileInfo.Length / 1024
			//		 }).ToList();
			//	return Ok(new { Message = "Photos uploaded ok", Photos = photos });
			//}
			//catch (Exception ex)
			//{
			//	return BadRequest(ex.GetBaseException().Message);
			//}
		}

		[HttpGet("icon/{id}")]
		public ActionResult GetImage(int id)
		{
			var item = _dbContext
				.Items
				.Include(x => x.File)
				.FirstOrDefault(x => x.Id == id);

			if (item?.File != null)
			{
				return File(item.File.Content, item.File.ContentType);
			}

			var path = Path.Combine(HostingEnvironment.WebRootPath, "images");
			path = Path.Combine(path, "default_icon.png");
			//return File(path, "image/png");

			var stream = new FileStream(path, FileMode.Open, FileAccess.Read);
			return File(stream, "image/png");


			//Response.StatusCode = StatusCodes.Status404NotFound;
			//return null;

			//Response.StatusCode = StatusCodes.Status404NotFound;
			//var stream = new FileStream(path, FileMode.Open);
			//result.Content = new StreamContent(stream);
			//result.Content.Headers.ContentType =
			//	 new MediaTypeHeaderValue("application/octet-stream");
			//return result;
		}

		public IHostingEnvironment HostingEnvironment { get; set; }

		[HttpPost("postpicture")]
		public async Task PostPicture(IList<IFormFile> files)
		{
		



			foreach (var f in files)
			{
				var path = Path.Combine(HostingEnvironment.WebRootPath, "uploaded_pics");
				path = Path.Combine(path, Guid.NewGuid() + ".png");
				await f.SaveAsAsync(path);
			}
		}
	}

	public class ValidateMimeMultipartContentFilter : ActionFilterAttribute
	{
		private readonly ILogger _logger;

		public ValidateMimeMultipartContentFilter(ILoggerFactory loggerFactory)
		{
			_logger = loggerFactory.CreateLogger("ctor ValidateMimeMultipartContentFilter");
		}

		public override void OnActionExecuting(ActionExecutingContext context)
		{
			if (!IsMultipartContentType(context.HttpContext.Request.ContentType))
			{
				context.Result = new HttpStatusCodeResult(415);
				return;
			}

			base.OnActionExecuting(context);
		}

		private static bool IsMultipartContentType(string contentType)
		{
			return !string.IsNullOrEmpty(contentType) && contentType.IndexOf("multipart/", StringComparison.OrdinalIgnoreCase) >= 0;
		}
	}

	public class ItemEditRequest
	{
		public int? Id { get; set; }
		public IFormFile File { get; set; }
		public string Name { get; set; }
		public string FunnyName { get; set; }

	}
}