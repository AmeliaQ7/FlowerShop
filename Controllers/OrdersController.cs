using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kwiaciarnia.Models;

namespace Kwiaciarnia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderContext _context;

        public OrdersController(OrderContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }


        [HttpGet("byname/{Client}")]
        public async Task<ActionResult<Order>> GetOrderByName(string Client)
        {
            var Order = await _context.Orders
                .FirstOrDefaultAsync(p => p.Client.ToLower() == Client.ToLower());

            if (Order == null)
            {
                return NotFound();
            }

            return Order;
        }


        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            if (string.IsNullOrEmpty(order.OrderName))
            {
                return BadRequest("Order name is required");
            }
            if (string.IsNullOrEmpty(order.Client))
            {
                return BadRequest("Client is required");
            }
            order.Id = 0;
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            // Sprawdzenie czy produkt istnieje
            var existingOrder = await _context.Orders.FindAsync(id);
            if (existingOrder == null)
            {
                return NotFound();
            }

            // Ustawienie stanu encji na zmodyfikowaną
            _context.Entry(existingOrder).State = EntityState.Detached;
            _context.Orders.Update(order);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await OrderExists(id))
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
        private async Task<bool> OrderExists(int id)
        {
            return await _context.Orders.AnyAsync(e => e.Id == id);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}


        
       