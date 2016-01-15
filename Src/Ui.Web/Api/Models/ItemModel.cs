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
		public static ItemModel ToModel(this Item itemEntity)
		{
			var model = itemEntity.ToModelBase();
			model.Parent = itemEntity.Parent != null ? itemEntity.Parent.ToModelBase() : null;
			model.Children = itemEntity.Children.Select(x => x.ToModelBase()).ToList();
			return model;
		}

		private static ItemModel ToModelBase(this Item itemEntity)
		{
			return new ItemModel()
			{
				Id = itemEntity.Id,
				ParentId = itemEntity.ParentId,
				Name = itemEntity.Name,
				FunnyName = itemEntity.FunnyName,
				SortOrder = itemEntity.SortOrder,
				HasChildren = itemEntity.Children.Any()
			};
		}
	}
}