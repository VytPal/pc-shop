using System;
using System.Collections.Generic;
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
    public class PrebuildsController : ControllerBase
    {
        private readonly PcshopContext _context;

        public PrebuildsController(PcshopContext context)
        {
            _context = context;
        }

        // GET: api/Prebuilds
        [HttpGet]
        [Authorize(Roles = PCShopRoles.BasicUser)]
        public async Task<ActionResult<IEnumerable<Prebuild>>> GetPrebuilds()
        {
          if (_context.Prebuilds == null)
          {
              return NotFound();
          }
           List<Prebuild> prebuilds = _context.Prebuilds.Include(p => p.parts).ToList();

            return prebuilds;
        }

        // GET: api/Prebuilds/5
        [HttpGet("{id}")]
        [Authorize(Roles = PCShopRoles.BasicUser)]
        public async Task<ActionResult<Prebuild>> GetPrebuild(int id)
        {
          if (_context.Prebuilds == null)
          {
              return NotFound();
          }
            var prebuild = await _context.Prebuilds.Include(p => p.parts)
                             .FirstOrDefaultAsync(p => p.Id == id);

            if (prebuild == null)
            {
                return NotFound();
            }

            return prebuild;
        }

        // PUT: api/Prebuilds/5

        [HttpPut("{id}")]
        [Authorize(Roles = PCShopRoles.Admin)]
        public async Task<IActionResult> PutPrebuild(int id, Prebuild prebuild)
        {
            var oldPrebuild = _context.Prebuilds.FirstOrDefault(p => p.Id == id);
            if (oldPrebuild != null)
            {
                oldPrebuild.Id = id;
                oldPrebuild.Name = prebuild.Name;
                oldPrebuild.Price = prebuild.Price;
                oldPrebuild.Description = prebuild.Description; 
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrebuildExists(id))
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

        // POST: api/Prebuilds
        [HttpPost]
        [Authorize(Roles = PCShopRoles.Admin)]
        public async Task<ActionResult<Prebuild>> PostPrebuild(Prebuild prebuild)
        {
          if (_context.Prebuilds == null)
          {
              return Problem("Entity set 'PcshopContext.Prebuilds'  is null.");
          }
            _context.Prebuilds.Add(prebuild);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrebuild", new { id = prebuild.Id }, prebuild);
        }

        // DELETE: api/Prebuilds/5
        [HttpDelete("{id}")]
        [Authorize(Roles = PCShopRoles.Admin)]
        public async Task<IActionResult> DeletePrebuild(int id)
        {
            if (_context.Prebuilds == null)
            {
                return NotFound();
            }
            var prebuild = await _context.Prebuilds.FindAsync(id);
            if (prebuild == null)
            {
                return NotFound();
            }

            _context.Prebuilds.Remove(prebuild);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [Route("api/Prebuild/{PrebuildID}/PostPart/[controller]")]
        [HttpPost]
        [Authorize(Roles = PCShopRoles.Admin)]
        public async Task<ActionResult<Part>> PostPart(Part part, int PrebuildID)
        {
            if (_context.Parts == null)
            {
                return Problem("Entity set 'PcshopContext.Parts'  is null.");
            }
            var prebuildRes = _context.Prebuilds.FirstOrDefault(p => p.Id == PrebuildID);
            part.PrebuildID = PrebuildID;

            _context.Parts.Add(part);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetPrebuild", new {id = PrebuildID }, prebuildRes);
        }

        private bool PrebuildExists(int id)
        {
            return (_context.Prebuilds?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
