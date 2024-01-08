using Azure;
using Microsoft.JSInterop;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Text.Json.Serialization;

namespace pcshopbackend.Models
{
    public class Part
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        [Required]
        public string Description { get; set; } = null!;
        public int? PrebuildID { get; set; }
        public Prebuild? Prebuild { get; set; }
        public int PartCategoryID { get; set; }
        public PartCategory? PartCategory { get; set; } = null!;

    }
}
