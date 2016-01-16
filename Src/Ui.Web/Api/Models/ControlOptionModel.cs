using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web.Api.Models
{
	public class ControlOptionModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string FunnyName { get; set; }
	}

	public static class ControlOptionExtensions
	{
		public static ControlOptionModel ToModel(this ControlOption entity)
		{
			return new ControlOptionModel()
			{
				Id = entity.Id,
				Name = entity.Name,
				FunnyName = entity.FunnyName
			};
		}
	}
}