using Microsoft.AspNet.Http;

namespace WhatNow.Ui.Web.Api.Models
{
	public class ItemEditRequest
	{
		public int? Id { get; set; }
		public IFormFile ImageFile { get; set; }
		public string Name { get; set; }
		public string FunnyName { get; set; }
		public int? ParentId { get; set; }
	}
}