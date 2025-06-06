using System.ComponentModel.DataAnnotations;

namespace Kwiaciarnia.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string OrderName { get; set; } = string.Empty;

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public decimal Price { get; set; }
        public string? Client { get; set; }
        public int Status { get; set; }
        public string? ImageOfOrder { get; set; }
    }
}
