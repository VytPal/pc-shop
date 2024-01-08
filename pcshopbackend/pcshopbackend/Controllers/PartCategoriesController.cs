using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pcshopbackend.Data;
using pcshopbackend.Models;

namespace pcshopbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartCategoriesController : ControllerBase
    {
        private readonly PcshopContext _context;

        public PartCategoriesController(PcshopContext context)
        {
            _context = context;
        }

        // GET: api/PartCategories
        [HttpGet]
        [Authorize(Roles = PCShopRoles.BasicUser)]
        public async Task<ActionResult<IEnumerable<PartCategory>>> GetPartCategories()
        {
          if (_context.PartCategories == null)
          {
              return NotFound();
          }
            return await _context.PartCategories.Include(p => p.Parts).ToListAsync();
        }

        // GET: api/PartCategories/5
        [HttpGet("{id}")]
        [Authorize(Roles = PCShopRoles.BasicUser)]
        public async Task<ActionResult<PartCategory>> GetPartCategory(int id)
        {
          if (_context.PartCategories == null)
          {
              return NotFound();
          }
            var partCategory =  _context.PartCategories.Include(p => p.Parts).FirstOrDefault(p => p.Id == id);

            if (partCategory == null)
            {
                return NotFound();
            }

            return partCategory;
        }

        // PUT: api/PartCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = PCShopRoles.Admin)]
        public async Task<IActionResult> PutPartCategory(int id, PartCategory partCategory)
        {

            var oldCategory = _context.PartCategories.FirstOrDefault(p => p.Id == id);
            if(oldCategory != null)
            {
                oldCategory.Id = id;
                oldCategory.Name = partCategory.Name;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartCategoryExists(id))
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

        // POST: api/PartCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = PCShopRoles.Admin)]
        public  async Task<ActionResult<PartCategory>> PostPartCategory(PartCategory partCategory)
        {
          if (_context.PartCategories == null)
          {
              return Problem("Entity set 'PcshopContext.PartCategories'  is null.");
          }
            _context.PartCategories.Add(partCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPartCategory", new { id = partCategory.Id }, partCategory);
        }

        // DELETE: api/PartCategories/5
        [HttpDelete("{id}")]
        [Authorize(Roles = PCShopRoles.Admin)]
        public async Task<IActionResult> DeletePartCategory(int id)
        {
            if (_context.PartCategories == null)
            {
                return NotFound();
            }
            var partCategory = await _context.PartCategories.FindAsync(id);
            if (partCategory == null)
            {
                return NotFound();
            }

            _context.PartCategories.Remove(partCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PartCategoryExists(int id)
        {
            return (_context.PartCategories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
