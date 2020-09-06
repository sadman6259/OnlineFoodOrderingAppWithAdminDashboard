using System;
using System.Collections.Generic;

namespace homechef.Model
{
    public partial class MenueTbl
    {
        public MenueTbl()
        {
            OrderTbl = new HashSet<OrderTbl>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public double? Price { get; set; }
        public string Category { get; set; }
        public string Details { get; set; }

        public ICollection<OrderTbl> OrderTbl { get; set; }
    }
}
