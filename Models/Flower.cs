using System.ComponentModel.DataAnnotations;

namespace Kwiaciarnia.Models
{
    public class Flower
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public string? ImageFileName { get; set; }
    }
}
