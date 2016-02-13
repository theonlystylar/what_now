using System.Collections.Generic;
using System.Linq;
using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web.Api.Models
{
	public class ItemModel
	{
		public int Id { get; set; }
		public int? ParentId { get; set; }
		public ItemModel Parent { get; set; }
		public string Name { get; set; }
		public string FunnyName { get; set; }
		public int? SortOrder { get; set; }
		public bool HasChildren { get; set; }
		public IList<ItemModel> Children { get; set; }
	}

	public static class ItemModelExtensions
	{
		public static ItemModel ToModel(this Item entity)
		{
			var model = entity.ToModelBase();
			model.Parent = entity.Parent?.ToModelBase();
			model.Children = entity.Children.Select(x => x.ToModelBase()).ToList();
			return model;
		}

		private static ItemModel ToModelBase(this Item entity)
		{
			return new ItemModel()
			{
				Id = entity.Id,
				ParentId = entity.ParentId,
				Name = entity.Name,
				FunnyName = entity.FunnyName,
				SortOrder = entity.SortOrder,
				HasChildren = entity.Children.Any()
			};
		}
	}
}