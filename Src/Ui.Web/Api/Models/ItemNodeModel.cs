using System.Collections.Generic;
using System.Linq;
using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web.Api.Models
{
	public class ItemNodeModel
	{
		public int Id { get; set; }
		public int? ParentId { get; set; }
		public string Name { get; set; }
		public string FunnyName { get; set; }
		public int? SortOrder { get; set; }
		public int? ImageId { get; set; }
	}

	public static class ItemNodeModelExtensions
	{
		public static ItemNodeModel ToNodeModel(this Item itemEntity)
		{
			return new ItemNodeModel
			{
				Id = itemEntity.Id,
				ParentId = itemEntity.ParentId,
				Name = itemEntity.Name,
				FunnyName = itemEntity.FunnyName,
				SortOrder = itemEntity.SortOrder,
				ImageId = itemEntity.ImageId
			};
		}

		public static IEnumerable<ItemNodeModel> ToNodeModels(this IEnumerable<Item> itemEntitys)
		{
			return itemEntitys.Select(x => x.ToNodeModel());
		}
	}
}