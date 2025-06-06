using Microsoft.EntityFrameworkCore;

namespace Kwiaciarnia.Models
{
    public class OrderContext : DbContext
    {
        public DbSet<Order> Orders { get; set; } = null!;
        public OrderContext (DbContextOptions<OrderContext> options) : base(options)
        {

        }
    }
}
