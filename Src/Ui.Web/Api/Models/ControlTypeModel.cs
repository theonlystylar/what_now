using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web.Api.Models
{
	public class ControlTypeModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
	}

	public static class ControlTypeExtensions
	{
		public static ControlTypeModel ToModel(this ControlType entity)
		{
			return new ControlTypeModel()
			{
				Id = entity.Id,
				Name = entity.Name
			};
		}
	}
}