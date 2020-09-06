using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using homechef.Model;

namespace homechef.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationTblsController : ControllerBase
    {
        private readonly HomeChefContext _context;

        public NotificationTblsController(HomeChefContext context)
        {
            _context = context;
        }

        // GET: api/NotificationTbls
        [HttpGet]
        public IEnumerable<NotificationTbl> GetNotificationTbl()
        {
            return _context.NotificationTbl;
        }

        [Route("GetTop4NotificationTbl")]
        [HttpGet]
        public IEnumerable<NotificationTbl> GetTop4NotificationTbl()
        {
            return _context.NotificationTbl.OrderByDescending(x => x.Id).Take(4);
        }
        // GET: api/NotificationTbls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNotificationTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var notificationTbl = await _context.NotificationTbl.FindAsync(id);

            if (notificationTbl == null)
            {
                return NotFound();
            }

            return Ok(notificationTbl);
        }

        // PUT: api/NotificationTbls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotificationTbl([FromRoute] int id, [FromBody] NotificationTbl notificationTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != notificationTbl.Id)
            {
                return BadRequest();
            }

            _context.Entry(notificationTbl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotificationTblExists(id))
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

        // POST: api/NotificationTbls
        [HttpPost]
        public async Task<IActionResult> PostNotificationTbl([FromBody] NotificationTbl notificationTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.NotificationTbl.Add(notificationTbl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotificationTbl", new { id = notificationTbl.Id }, notificationTbl);
        }

        // DELETE: api/NotificationTbls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotificationTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var notificationTbl = await _context.NotificationTbl.FindAsync(id);
            if (notificationTbl == null)
            {
                return NotFound();
            }

            _context.NotificationTbl.Remove(notificationTbl);
            await _context.SaveChangesAsync();

            return Ok(notificationTbl);
        }

        private bool NotificationTblExists(int id)
        {
            return _context.NotificationTbl.Any(e => e.Id == id);
        }
    }
}