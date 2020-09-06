using System;
using System.Collections.Generic;

namespace homechef.Model
{
    public partial class CustomerTbl
    {
        public CustomerTbl()
        {
            OrderTbl = new HashSet<OrderTbl>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int ContactNo { get; set; }
        public string Password { get; set; }

        public ICollection<OrderTbl> OrderTbl { get; set; }
    }
}
