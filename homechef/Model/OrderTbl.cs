using System;
using System.Collections.Generic;

namespace homechef.Model
{
    public partial class OrderTbl
    {
        public int Id { get; set; }
        public int? MenueId { get; set; }
        public int? Quantity { get; set; }
        public double? Subtotal { get; set; }
        public double? TotalPrice { get; set; }
        public int? CustomerId { get; set; }
        public DateTime? OrderTime { get; set; }
        public string PaymentType { get; set; }

        public CustomerTbl Customer { get; set; }
        public MenueTbl Menue { get; set; }
    }
}
