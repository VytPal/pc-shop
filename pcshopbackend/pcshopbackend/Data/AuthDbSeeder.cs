using Microsoft.AspNetCore.Identity;
using pcshopbackend.Models;

namespace pcshopbackend.Data
{
    public class AuthDbSeeder
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthDbSeeder(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            await AddDefaultRoles();
            await AddAdminUser();
        }
        
        private async Task AddDefaultRoles()
        {
            foreach(var role in PCShopRoles.All)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);
                if (!roleExists)
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }

        private async Task AddAdminUser()
        {
            var newAdminUser = new ApplicationUser()
            {
                UserName = "admin",
                Email = "admin@admin.com"
            };
            var exsitingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);
            if(exsitingAdminUser == null)
            {
                var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "Password123.");
                if (createAdminUserResult.Succeeded) 
                { 
                    await _userManager.AddToRolesAsync(newAdminUser, PCShopRoles.All);
                }
            }
        }
    }
}
