using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace homechef
{
  public  interface ITypedHubClient
    {
        Task BroadcastMessage( int Id , int? Quantity , double? SubTotal , double? TotalPrice, string PaymentType, int? CustomerId ,int? MenueId ,DateTime? OrderTime );
    }
}
