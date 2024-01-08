using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient.DataClassification;
using Microsoft.EntityFrameworkCore;
using pcshopbackend.Data;
using pcshopbackend.Models;

namespace pcshopbackend.Controllers
{
    [Route("api/PartCategories/{PartCategoriesID}/[controller]")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        private readonly PcshopContext _context;

        public PartsController(PcshopContext context)
        {
            _context = context;
        }

        // GET: api/Parts
        [HttpGet]
        [Authorize(Roles = PCShopRoles.BasicUser)]
        public async Task<ActionResult<IEnumerable<Part>>> GetParts(int PartCategoriesID)
        {
          if (_context.Parts == null)
          {
              return NotFound();
          }
            return await _context.Parts.Where(p => p.PartCategoryID == PartCategoriesID).Include(p => p.PartCategory).ToListAsync();
        }

        // GET: api/Parts/5
        [HttpGet("{id}")]
        [Authorize(Roles = PCShopRoles.BasicUser)]
        public async Task<ActionResult<Part>> GetPart(int id, int PartCategoriesID)
        {
          if (_context.Parts == null)
          {
              return NotFound();
          }
            var part =  _context.Parts.Include(p => p.PartCategory).ThenInclude(p=>p.Parts).FirstOrDefault(p => p.Id == id);

            if (part == null)
            {
                return NotFound();
            }

            return part;
        }

        // PUT: api/Parts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = PCShopRoles.BasicUser)]
        public async Task<IActionResult> PutPart(int id, Part part)
        {
            var oldPart = _context.Parts.FirstOrDefault(p => p.Id == id);
            if (oldPart != null)
            {
                oldPart.Name = part.Name;
                oldPart.Price = part.Price;
                oldPart.Description = part.Description;
                
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartExists(id))
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

        // POST: api/Parts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = PCShopRoles.BasicUser)]
        public async Task<ActionResult<Part>> PostPart(Part part, int PartCategoriesID)
        {
          if (_context.Parts == null)
          {
              return Problem("Entity set 'PcshopContext.Parts'  is null.");
          }

            part.PartCategoryID = PartCategoriesID;
           
            _context.Parts.Add(part);
            await _context.SaveChangesAsync();

           

            return CreatedAtAction("GetPart", new { id = part.Id, PartCategoriesID }, part);
        }

        // DELETE: api/Parts/5
        [HttpDelete("{id}")]
        [Authorize(Roles = PCShopRoles.Admin)]
        public async Task<IActionResult> DeletePart(int id)
        {
            if (_context.Parts == null)
            {
                return NotFound();
            }
            var part = await _context.Parts.FindAsync(id);
            if (part == null)
            {
                return NotFound();
            }

            _context.Parts.Remove(part);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PartExists(int id)
        {
            return (_context.Parts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
