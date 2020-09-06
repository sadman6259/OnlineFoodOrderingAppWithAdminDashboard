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
    class Global
    {
        public static int UserID = 0;
        public static string UserName;
        public static string adminname;
        public static string adminpass;
        public static int Counter = 0;

    }

    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
       

     

        private readonly HomeChefContext _context;
        private IHubContext<NotifyHub, ITypedHubClient> _hubContext;
        public CustomerController(HomeChefContext context, IHubContext<NotifyHub, ITypedHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/Customer
        [HttpGet]
        public IEnumerable<CustomerTbl> GetCustomerTbl()
        {
            return _context.CustomerTbl;
        }
        [Route("CustomerLogin")]
        [HttpPost]
        public String CustomerLogin([FromBody] CustomerTbl customerTbl)
        {
            var cus = from x in _context.CustomerTbl.Where(x => x.Name == customerTbl.Name &&
                        x.Password == customerTbl.Password) select x;
          
          
            if (cus != null && cus.Count() > 0)
            {
                Global.UserName = cus.FirstOrDefault().Name;

                Global.UserID = cus.FirstOrDefault().Id;

               

                return "true";
            }
            return "false";     
            
                      

        }
        [Route("WelcomeMessage")]
        [HttpGet]
        public string WelcomeMessage()
        {
            if (String.IsNullOrEmpty(Global.UserName))
            {
                return "Please Login For Process Further";
            }
            return "Welcome " + Global.UserName;
        }
        [Route("Logout")]
        [HttpGet]
        public String CustomerLogOut()
        {
            Global.UserID = 0;
            return "true";           
        }
        [Route("SaveLoginInfo")]
        [HttpGet]
        public String SaveAdminLoginInfo()
        {
            Global.adminname = "admin";
            Global.adminpass = "admin";

            return "true";
        }
        [Route("CheckAdminLoggedIn")]
        [HttpGet]
        public String CheckAdminLoggedIn()
        {
           if(Global.adminname =="admin" && Global.adminpass == "admin")
            {
                return "true";
            }

            return "false";
        }
        [Route("CheckCustomerLoggedIn")]
        [HttpGet]
        public String CheckCustomerLoggedIn()
        {
            if (Global.UserID !=0)
            {
                return "true";
            }

            return "false";
        }
        [Route("AdminLogout")]
        [HttpGet]
        public String AdminLogout()
        {
            Global.adminname = "";
            Global.adminpass = "";

                return "true";
            

        }
        

        // GET: api/Customer/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerTbl = await _context.CustomerTbl.FindAsync(id);

            if (customerTbl == null)
            {
                return NotFound();
            }

            return Ok(customerTbl);
        }

        // PUT: api/Customer/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerTbl([FromRoute] int id, [FromBody] CustomerTbl customerTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerTbl.Id)
            {
                return BadRequest();
            }

            _context.Entry(customerTbl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerTblExists(id))
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

        // POST: api/Customer
        [HttpPost]
        public async Task<IActionResult> PostCustomerTbl([FromBody] CustomerTbl customerTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CustomerTbl.Add(customerTbl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerTbl", new { id = customerTbl.Id }, customerTbl);
        }

        // DELETE: api/Customer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerTbl = await _context.CustomerTbl.FindAsync(id);
            if (customerTbl == null)
            {
                return NotFound();
            }

            _context.CustomerTbl.Remove(customerTbl);
            await _context.SaveChangesAsync();

            return Ok(customerTbl);
        }

        private bool CustomerTblExists(int id)
        {
            return _context.CustomerTbl.Any(e => e.Id == id);
        }
    }
}