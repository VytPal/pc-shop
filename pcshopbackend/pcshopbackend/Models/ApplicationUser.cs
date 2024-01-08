using Microsoft.AspNetCore.Identity;

namespace pcshopbackend.Models
{
    public class ApplicationUser : IdentityUser
    {
        public bool ForceRelogin { get; set; }
    }
}
