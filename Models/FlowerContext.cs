using Microsoft.EntityFrameworkCore;

namespace Kwiaciarnia.Models
{
    public class FlowerContext : DbContext
    {
        public DbSet<Flower> Flowers { get; set; } = null!;
        public FlowerContext (DbContextOptions<FlowerContext> options) : base(options)
        {

        }
    }
}
