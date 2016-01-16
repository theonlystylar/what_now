using System.Collections.Generic;
using System.Linq;
using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web.Api.Models
{
	public class ControlModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string FunnyName { get; set; }

		public ControlTypeModel ControlType { get; set; }
		public ICollection<ControlOptionModel> ControlOptions { get; set; }
	}

	public static class ControlModelExtensions
	{
		public static ControlModel ToModel(this Control controlEntity)
		{
			return new ControlModel()
			{
				Id = controlEntity.Id,
				Name = controlEntity.Name,
				FunnyName = controlEntity.FunnyName,
				ControlType = controlEntity.ControlType.ToModel(),
				ControlOptions = controlEntity.ControlOptions.Select(x => x.ToModel()).ToList()
			};
		}
	}
}