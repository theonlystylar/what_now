using System.Data.Entity;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Mvc;
using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web.Api.Controllers
{
	[Route("api/[controller]")]
	public class ImagesController : Controller
	{
		private readonly WhatNowDataEntities _dbContext;

		public ImagesController(WhatNowDataEntities dbContext, IHostingEnvironment hostingEnvironment)
		{
			_dbContext = dbContext;
			HostingEnvironment = hostingEnvironment;
		}

		public IHostingEnvironment HostingEnvironment { get; set; }

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
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