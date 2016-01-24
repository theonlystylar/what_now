﻿using System;
using System.Collections.Generic;

namespace WhatNow.Ui.Web.Api.Models
{
	public class LogRequest
	{
		public int ItemId { get; set; }
		public DateTime? DateTimeOverride { get; set; }
		public ICollection<ControlLogRequest> ControlLogs { get; set; }
	}
}