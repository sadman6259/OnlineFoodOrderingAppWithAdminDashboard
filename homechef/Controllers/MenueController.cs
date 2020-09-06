using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using homechef.Model;
using System.IO;
using static System.Net.WebRequestMethods;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Net;
using Microsoft.AspNetCore.Cors;

namespace homechef.Controllers
{
  //  [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class MenueController : ControllerBase
    {
        private readonly string[] ACCEPTED_FILE_TYPES = new[] { ".jpg", ".jpeg", ".png" };
        private IHostingEnvironment host;
        private readonly HomeChefContext _context;

        public MenueController(HomeChefContext context, IHostingEnvironment host)
        {
            this.host = host;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<MenueTbl> GetMenueTbl()
        {
            return _context.MenueTbl;
        }

        [Route("GetAllMenue")]

        [HttpGet]
        public IQueryable<String> GetAllMenue()
        {


            var menueTbl = _context.MenueTbl.OrderBy(x => x.Id).Select(x => x.Name);



            return menueTbl;
        }
        // GET: api/Menue/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMenueTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var menueTbl = await _context.MenueTbl.FindAsync(id);

            if (menueTbl == null)
            {
                return NotFound();
            }

            return Ok(menueTbl);
        }

        // PUT: api/Menue/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenueTbl([FromRoute] int id, [FromBody] MenueTbl menueTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != menueTbl.Id)
            {
                return BadRequest();
            }

            _context.Entry(menueTbl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenueTblExists(id))
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

        [Route("UploadFile")]
        [HttpPost]
        [HttpOptions]
            public ActionResult UploadFile()
             {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
          //  return NoContent();
        }
        // POST: api/Menue
        [HttpPost]
        public async Task<IActionResult> PostMenueTbl([FromBody] MenueTbl menueTbl)
        {
            /*
             *try {
                  var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Upload", file.FileName);
                  var stream = new FileStream(path, FileMode.Create);
                  file.CopyToAsync(stream);
                 menueTbl.Image = file.FileName;
                  var length = file.Length;

                // return Ok (new {length  = file.Length, name = file.FileName});

              }
              catch 
              {
                  return BadRequest();

              }
              */
         

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // return Ok (new {length  = file.Length, name = file.FileName});

            _context.MenueTbl.Add(menueTbl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMenueTbl", new { id = menueTbl.Id }, menueTbl);
        }

        // DELETE: api/Menue/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenueTbl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var menueTbl = await _context.MenueTbl.FindAsync(id);
            if (menueTbl == null)
            {
                return NotFound();
            }

            _context.MenueTbl.Remove(menueTbl);
            await _context.SaveChangesAsync();

            return Ok(menueTbl);
        }

        private bool MenueTblExists(int id)
        {
            return _context.MenueTbl.Any(e => e.Id == id);
        }
    }
}