using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pcshopbackend.Models
{
    public class PartCategory
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }



        public ICollection<Part> Parts { get; set; } = new List<Part>();


    }
}
