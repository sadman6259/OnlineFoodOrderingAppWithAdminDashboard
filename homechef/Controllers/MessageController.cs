using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using homechef.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace homechef.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private IHubContext<NotifyHub, ITypedHubClient> _hubContext;
        public MessageController(IHubContext<NotifyHub, ITypedHubClient> hubContext)
        {
            _hubContext = hubContext;
        }
        [HttpPost]
        public string Post([FromBody]OrderTbl ord)
        {
            string retMessage;
            try
            {
              //  _hubContext.Clients.All.BroadcastMessage(ord.Id,ord.OrderTime,ord.Quantity,ord.SubTotal,ord.TotalPrice,ord.PaymentType,ord.MenueId,ord.CustomerId);
                retMessage = "Success";
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }
            return retMessage;
        }
    }
}