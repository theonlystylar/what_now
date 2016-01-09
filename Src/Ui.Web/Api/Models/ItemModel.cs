namespace WhatNow.Ui.Web.Api.Models
{
	public class ItemModel
	{
		public int Id { get; set; }
		public int? ParentId { get; set; }
		public string Name { get; set; }
		public int? SortOrder { get; set; }
	}
}