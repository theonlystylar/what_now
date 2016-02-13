﻿using System.Collections.Generic;
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
		public static ItemNodeModel ToNodeModel(this Item entity)
		{
			return new ItemNodeModel
			{
				Id = entity.Id,
				ParentId = entity.ParentId,
				Name = entity.Name,
				FunnyName = entity.FunnyName,
				SortOrder = entity.SortOrder,
				ImageId = entity.ImageId
			};
		}

		public static IEnumerable<ItemNodeModel> ToNodeModels(this IEnumerable<Item> entities)
		{
			return entities.Select(x => x.ToNodeModel());
		}
	}
}