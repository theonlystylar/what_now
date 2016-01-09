using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Newtonsoft.Json.Serialization;
using WhatNow.Data.Ef;

namespace WhatNow.Ui.Web
{
	public class Startup
	{
		public static IConfigurationRoot Configuration;

		public Startup(IApplicationEnvironment appEnv)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(appEnv.ApplicationBasePath)
				.AddJsonFile("config.json")
				.AddEnvironmentVariables();

			Configuration = builder.Build();
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc().AddJsonOptions(opts =>
			{
				// converts property names to camel case when returning data in api calls
				opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
			});
			services.AddScoped((x) => new WhatNowDataEntities("metadata=res://*/WhatNowModel.csdl|res://*/WhatNowModel.ssdl|res://*/WhatNowModel.msl;provider=System.Data.SqlClient;provider connection string=\";data source=(localdb)\\ProjectsV12;initial catalog=WhatNowData;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework\""));
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app)
		{
			app.UseStaticFiles();
			app.UseMvc(config =>
			{
				config.MapRoute(
					name: "Default",
					template: "{controller}/{action}/{id?}",
					defaults: new { controller = "Client", action = "Index" }
					);
			});
		}

		// Entry point for the application.
		public static void Main(string[] args) => WebApplication.Run<Startup>(args);
	}
}