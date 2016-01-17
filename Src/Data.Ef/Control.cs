//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Control
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Control()
        {
            this.ControlOptions = new HashSet<ControlOption>();
            this.ControlLogs = new HashSet<ControlLog>();
        }
    
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int ControlTypeId { get; set; }
        public string Name { get; set; }
        public string FunnyName { get; set; }
    
        public virtual ControlType ControlType { get; set; }
        public virtual Item Item { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ControlOption> ControlOptions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ControlLog> ControlLogs { get; set; }
    }
}
