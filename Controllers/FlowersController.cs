using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kwiaciarnia.Models;

namespace Kwiaciarnia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlowersController : ControllerBase
    {
        private readonly FlowerContext _context;

        public FlowersController(FlowerContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flower>>> GetFlowers()
        {
            return await _context.Flowers.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Flower>> GetFlower(int id)
        {
            var product = await _context.Flowers.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }


        [HttpGet("byname/{name}")]
        public async Task<ActionResult<Flower>> GetFlowerByName(string name)
        {
            var flower = await _context.Flowers
                .FirstOrDefaultAsync(p => p.Name.ToLower() == name.ToLower());

            if (flower == null)
            {
                return NotFound();
            }

            return flower;
        }


        [HttpPost]
        public async Task<ActionResult<Flower>> PostFlower(Flower flower)
        {
            if (string.IsNullOrEmpty(flower.Name))
            {
                return BadRequest("Flower name is required");
            }
            flower.Id = 0;
            _context.Flowers.Add(flower);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFlower), new { id = flower.Id }, flower);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlower(int id, Flower flower)
        {
            if (id != flower.Id)
            {
                return BadRequest();
            }

            // Sprawdzenie czy produkt istnieje
            var existingFlower = await _context.Flowers.FindAsync(id);
            if (existingFlower == null)
            {
                return NotFound();
            }

            // Ustawienie stanu encji na zmodyfikowaną
            _context.Entry(existingFlower).State = EntityState.Detached;
            _context.Flowers.Update(flower);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await FlowerExists(id))
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
        // Pomocnicza metoda do sprawdzenia czy produkt istnieje
        private async Task<bool> FlowerExists(int id)
        {
            return await _context.Flowers.AnyAsync(e => e.Id == id);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlower(int id)
        {
            var flower = await _context.Flowers.FindAsync(id);

            if (flower == null)
            {
                return NotFound();
            }

            _context.Flowers.Remove(flower);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Flower>>> FilterFlowers(
        [FromQuery] bool? inStock,
        [FromQuery] bool sort = false)
        {
            // Tworzymy zapytanie, jeszcze nie wykonujemy
            var query = _context.Flowers.AsQueryable();

            // Jeśli inStock ma wartość (true/false), filtrujemy
            if (inStock.HasValue)
            {
                query = query.Where(f => f.Quantity > 0 == inStock.Value);
            }

            // Jeśli sort = true, sortujemy po nazwie
            if (sort)
            {
                query = query.OrderBy(f => f.Name);
            }

            // Wykonujemy zapytanie i zwracamy wyniki
            var result = await query.ToListAsync();

            return result;
        }

    }
}