namespace WhatNow.Core
{
	public static class StringExtensions
	{
		public static int ToInt(this string input, int defaultValue)
		{
			int value;
			return int.TryParse(input, out value) ? value : defaultValue;
		}
	}
}
