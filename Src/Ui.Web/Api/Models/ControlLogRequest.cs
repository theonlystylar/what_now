namespace WhatNow.Ui.Web.Api.Models
{
	public class ControlLogRequest
	{
		public int ControlId { get; set; }
		public int? ControlOptionId { get; set; }
		public string Value { get; set; }
	}
}