using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using homechef.Model;
using Microsoft.AspNetCore.SignalR;

namespace homechef.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderTblsController : ControllerBase
    {
        private readonly HomeChefContext _context;
        private IHubContext<NotifyHub, ITypedHubClient> _hubContext;

        public OrderTblsController(HomeChefContext context, IHubContext<NotifyHub, ITypedHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;

        }

        // GET: api/OrderTbls
        [HttpGet]
        public IEnumerable<OrderTbl> GetOrderTbl()
        {
            OrderTbl order = new OrderTbl();
       //     _context.OrderTbl.Include(e => e.Menue.Id).ToList();
        //    _context.OrderTbl.Include(e => e.Customer.Id).ToList();

            IQueryable<OrderTbl> comments = null;
            comments = from b in _context.OrderTbl
                       join std in _context.MenueTbl on b.MenueId equals std.Id
                       join cmp in _context.CustomerTbl on b.CustomerId equals cmp.Id
                       //join ctg in _context.CategoryTbl on b.CategoryId equals ctg.Id
                       orderby b.OrderTime descending
                       

                       select new OrderTbl
                       {
                           Id = b.Id,
                           OrderTime = b.OrderTime ,
                           Quantity = b.Quantity,
                           TotalPrice = b.TotalPrice,
                           PaymentType = b.PaymentType,
                           Subtotal = b.Subtotal,
                           Menue = new MenueTbl()
                           {
                               Id = std.Id,
                               Name = std.Name,
                              
                           },
                           Customer = new CustomerTbl()
                           {
                               Id = cmp.Id,
                              Name = cmp.Name,
                              ContactNo = cmp.ContactNo,
                              Address = cmp.Address
                           },
                           //Category = new CategoryTbl()
                           //{
                           //    Id = ctg.Id,
                           //    Name = ctg.Name
                           //}
                       }
                    ; 

            return comments.ToList();
           // return _context.OrderTbl;
        }

        [Route("GetTodaysOrder")]
        [HttpGet]
        public IActionResult GetTodaysOrder()
        {
            DateTime date = DateTime.Today;
            DateTime until = date.AddDays(1);
            var count = (from row in _context.OrderTbl
                         where row.OrderTime >= date &&
                               row.OrderTime < until
                         select row).Count();
            // orderTbl.OrderTime = DateTime.Now;

            return Ok(count);
        }

        [Route("GetTodaysItemSold")]
        [HttpGet]
        public IActionResult GetTodaysItemSold()
        {
            DateTime date = DateTime.Today;
            DateTime until = date.AddDays(1);
            var sum = (from row in _context.OrderTbl
                       where row.OrderTime >= date &&
                             row.OrderTime < until
                       select row.Quantity).Sum();
            // orderTbl.OrderTime = DateTime.Now;

            return Ok(sum);
        }
        [Route("GetMenueDetailsChart")]
        [HttpGet]
        public IEnumerable<OrderTbl> GetMenueDetailsChart()
        {
            DateTime date = DateTime.Today;
            DateTime until = date.AddDays(1);
            var sum = (from row in _context.OrderTbl
                       where row.OrderTime >= date &&
                             row.OrderTime < until
                       select row.Quantity).Sum();

            IQueryable<OrderTbl> gmdc = null;

            gmdc =  _context.OrderTbl.Where(ac => ac.OrderTime >= date && ac.OrderTime <until)
                 
     .GroupBy(ac => new
      {
          ac.Menue.Name
          //   dateOnlyString

      })

     .Select(ac => new OrderTbl
     {

         //  OrderTime = ac.OrderTime,
         Quantity = ac.Sum(acs => acs.Quantity),
         PaymentType = ac.FirstOrDefault().Menue.Name
     })
     
     ;


            return gmdc.ToList();
            // return Ok(sum);
        }
        [Route("GetItemSoldChart")]
        [HttpGet]
        public IEnumerable<OrderTbl> GetItemSoldChart()
        {
            
            IQueryable<OrderTbl> gisc = null;
            //var latest = _context.OrderTbl.OrderByDescending(f => f.OrderTime).FirstOrDefault();
         //   DateTime date = DateTime.Today;
            DateTime lastday = DateTime.Now.Date.AddDays(-6);
            gisc = _context.OrderTbl

      .GroupBy(ac => new
      {
         ac.OrderTime
       //   dateOnlyString
       
      })
      
     .Select(ac => new OrderTbl
     {
        
       //  OrderTime = ac.OrderTime,
         Quantity = ac.Sum(acs => acs.Quantity),
         OrderTime = ac.FirstOrDefault().OrderTime
     })
      .OrderByDescending(ac => ac.OrderTime)
                     //.ThenBy(ac => ac.OrderTime.Month)
                     //.ThenBy(ac => ac.OrderTime.Year)
                     .Where(ac => ac.OrderTime >= lastday)
                     
                     
                     
                     ; 


            return gisc.ToList();
        }


        [Route("GetSellingAmountChart")]
        [HttpGet]
        public IEnumerable<OrderTbl> GetSellingAmountChart()
        {
          
            IQueryable<OrderTbl> gsac = null;
            DateTime lastday = DateTime.Now.Date.AddDays(-6);

            gsac = _context.OrderTbl

      .GroupBy(ac => new
      {
          ac.OrderTime

      })
      
     .Select(ac => new OrderTbl
     {

         //  OrderTime = ac.OrderTime,
         Id = ac.FirstOrDefault().Id,
         TotalPrice = ac.Sum( acs => acs.TotalPrice),
         OrderTime = ac.FirstOrDefault().OrderTime
     })
     .OrderByDescending(ac => ac.OrderTime)
                     //.ThenBy(ac => ac.OrderTime.Month)
                     //.ThenBy(ac => ac.OrderTime.Year)
                     .Where(ac => ac.OrderTime >= lastday)
                                             ;


            return gsac.ToList();
        }


        [Route("GetTodaysSellingAmount")]
        [HttpGet]
        public IActionResult GetTodaysSellingAmount()
        {
            DateTime date = DateTime.Today;
            DateTime until = date.AddDays(1);
            var sum = (from row in _context.OrderTbl
                       where row.OrderTime >= date &&
                             row.OrderTime < until
                       select row.TotalPrice).Sum();
            // orderTbl.OrderTime = DateTime.Now;

            return Ok(sum);
        }

        [Route("GetLastWeekSellingAmount")]
        [HttpGet]
        public IActionResult GetLastWeekSellingAmount()
        {
            DateTime date = DateTime.Today;
            DateTime lastday = DateTime.Now.Date.AddDays(-7);
            var sum = (from row in _context.OrderTbl

                       where row.OrderTime >= lastday
                       select row.TotalPrice).Sum();
            // orderTbl.OrderTime = DateTime.Now;

            return Ok(sum);
        }
        // GET: api/OrderTbls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderTbl = await _context.OrderTbl.FindAsync(id);

            if (orderTbl == null)
            {
                return NotFound();
            }

            return Ok(orderTbl);
        }
      
        [Route("getyourOrder")]

        [HttpGet]
        public IEnumerable<OrderTbl> GetyourOrder()
        {
            OrderTbl order = new OrderTbl();
            //     _context.OrderTbl.Include(e => e.Menue.Id).ToList();
            //    _context.OrderTbl.Include(e => e.Customer.Id).ToList();

            IQueryable<OrderTbl> orders = null;
            orders = from b in _context.OrderTbl
                       join std in _context.MenueTbl on b.MenueId equals std.Id
                       join cmp in _context.CustomerTbl on b.CustomerId equals cmp.Id
                       where b.CustomerId == Global.UserID
                       //join ctg in _context.CategoryTbl on b.CategoryId equals ctg.Id
                       orderby b.OrderTime descending


                       select new OrderTbl
                       {
                           Id = b.Id,
                           OrderTime = b.OrderTime,
                           Quantity = b.Quantity,
                           TotalPrice = b.TotalPrice,
                           PaymentType = b.PaymentType,
                           Subtotal = b.Subtotal,
                           Menue = new MenueTbl()
                           {
                               Id = std.Id,
                               Name = std.Name,

                           },
                           Customer = new CustomerTbl()
                           {
                               Id = cmp.Id,
                               Name = cmp.Name,
                               ContactNo = cmp.ContactNo,
                               Address = cmp.Address
                           },
                           //Category = new CategoryTbl()
                           //{
                           //    Id = ctg.Id,
                           //    Name = ctg.Name
                           //}
                       }
                    ;

            return orders.ToList();
            // return _context.OrderTbl;
        }
        // PUT: api/OrderTbls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderTbl([FromRoute] int id, [FromBody] OrderTbl orderTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderTbl.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderTbl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderTblExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderTbls
        [HttpPost]
        public async Task<IActionResult> PostOrderTbl([FromBody] OrderTbl orderTbl )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (orderTbl.PaymentType =="1")
            {
                orderTbl.PaymentType = "Cash On Delivery";
            }
            if (orderTbl.PaymentType == "2")
            {
                orderTbl.PaymentType = "Bkash";

            }
            orderTbl.OrderTime = DateTime.Now;
            orderTbl.CustomerId = Global.UserID;

            //orderTbl.CustomerId = TempData["userid"] as string;
            _context.OrderTbl.Add(orderTbl);

            NotificationTbl notification = new NotificationTbl();
            notification.Message = "New Order placed by "+ Global.UserName + " at "+ orderTbl.OrderTime.Value.ToString("yyyy-MM-dd hh:mm:ss tt") ;
            Global.Counter++;
            _context.NotificationTbl.Add(notification);


            await _context.SaveChangesAsync();

           // return CreatedAtAction("GetOrderTbl", new { id = orderTbl.Id }, orderTbl);

            // signalR notification
            string retMessage;
            try
            {
               
                    await _hubContext.Clients.All.BroadcastMessage(orderTbl.Id, orderTbl.Quantity, orderTbl.Subtotal, orderTbl.TotalPrice, orderTbl.PaymentType, orderTbl.CustomerId, orderTbl.MenueId,orderTbl.OrderTime);
                    retMessage = "Success";
                
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }
            // return retMessage;
             return CreatedAtAction("GetOrderTbl", new { id = orderTbl.Id }, orderTbl);

        }
        [Route("GetUnreadNotification")]
        [HttpGet]
        public IActionResult GetUnreadNotification()
        {

            var count = Global.Counter;

            return Ok(count);
        }
        [Route("SetUnreadNotification")]
        [HttpGet]
        public IActionResult SetUnreadNotification()
        {
            Global.Counter = 0;
            var count = Global.Counter;

            return Ok(count);
        }
        // DELETE: api/OrderTbls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderTbl = await _context.OrderTbl.FindAsync(id);
            if (orderTbl == null)
            {
                return NotFound();
            }

            _context.OrderTbl.Remove(orderTbl);
            await _context.SaveChangesAsync();

            return Ok(orderTbl);
        }
        [Route("DeleteOrder")]

        [HttpDelete]
        public async Task<IActionResult> Delete20Order()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
           var del = GetOrderTbl();
            
          var order = (from p in _context.OrderTbl
                       select p).Take(2);

            if (del.Count() >2)
            {
                foreach(var item in order)
                {
                    _context.OrderTbl.Remove(item);
                }


             
            }
            else
            {
                return NotFound();
            }


            await _context.SaveChangesAsync();

            return Ok(order);
        }
        private bool OrderTblExists(int id)
        {
            return _context.OrderTbl.Any(e => e.Id == id);
        }
    }
}