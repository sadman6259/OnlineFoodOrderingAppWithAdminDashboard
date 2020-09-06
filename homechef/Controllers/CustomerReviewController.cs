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
    public class CustomerReviewController : ControllerBase
    {
        private readonly HomeChefContext _context;

        public CustomerReviewController(HomeChefContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public IEnumerable<CustomerReviewTbl> GetCustomerReviewTbl()
        {
            return _context.CustomerReviewTbl;
        }

        // GET: api/CustomerReview/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerReviewTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerReviewTbl = await _context.CustomerReviewTbl.FindAsync(id);

            if (customerReviewTbl == null)
            {
                return NotFound();
            }

            return Ok(customerReviewTbl);
        }

        // PUT: api/CustomerReview/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerReviewTbl([FromRoute] int id, [FromBody] CustomerReviewTbl customerReviewTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerReviewTbl.Id)
            {
                return BadRequest();
            }

            _context.Entry(customerReviewTbl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerReviewTblExists(id))
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

        // POST: api/CustomerReview
        [HttpPost]
        public async Task<IActionResult> PostCustomerReviewTbl([FromBody] CustomerReviewTbl customerReviewTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CustomerReviewTbl.Add(customerReviewTbl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerReviewTbl", new { id = customerReviewTbl.Id }, customerReviewTbl);
        }

        // DELETE: api/CustomerReview/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerReviewTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerReviewTbl = await _context.CustomerReviewTbl.FindAsync(id);
            if (customerReviewTbl == null)
            {
                return NotFound();
            }

            _context.CustomerReviewTbl.Remove(customerReviewTbl);
            await _context.SaveChangesAsync();

            return Ok(customerReviewTbl);
        }

        private bool CustomerReviewTblExists(int id)
        {
            return _context.CustomerReviewTbl.Any(e => e.Id == id);
        }
    }
}