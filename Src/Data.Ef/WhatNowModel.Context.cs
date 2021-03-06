﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WhatNow.Data.Ef
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class WhatNowDataEntities : DbContext
    {
        public WhatNowDataEntities()
            : base("name=WhatNowDataEntities")
        {
        }
    
        public WhatNowDataEntities(string connectionString)
    			: base(connectionString)
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Control> Controls { get; set; }
        public virtual DbSet<ControlOption> ControlOptions { get; set; }
        public virtual DbSet<ControlType> ControlTypes { get; set; }
        public virtual DbSet<Log> Logs { get; set; }
        public virtual DbSet<ControlLog> ControlLogs { get; set; }
        public virtual DbSet<File> Files { get; set; }
        public virtual DbSet<ItemPreset> ItemPresets { get; set; }
        public virtual DbSet<LogPreset> LogPresets { get; set; }
        public virtual DbSet<ControlLogDetail> ControlLogDetails { get; set; }
        public virtual DbSet<LogDetail> LogDetails { get; set; }
        public virtual DbSet<LogPresetDetail> LogPresetDetails { get; set; }
    }
}
