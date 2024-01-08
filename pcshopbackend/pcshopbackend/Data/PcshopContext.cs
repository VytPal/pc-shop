using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using pcshopbackend.Models;

namespace pcshopbackend.Data;

public partial class PcshopContext : IdentityDbContext<ApplicationUser>
{

    public DbSet<Part> Parts { get; set; }

    public DbSet<PartCategory> PartCategories { get; set; }

    public DbSet<Prebuild> Prebuilds { get; set; }

    public PcshopContext()
    {}

    public PcshopContext(DbContextOptions<PcshopContext> options)
        : base(options)
    {}
    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PartCategory>()
      .HasMany(e => e.Parts)
      .WithOne(e => e.PartCategory)
      .HasForeignKey(e => e.PartCategoryID)
      .IsRequired();

       modelBuilder.Entity<Prebuild>()
      .HasMany(e => e.parts)
      .WithOne(e => e.Prebuild)
      .HasForeignKey(e => e.PrebuildID)
      .IsRequired(false);
    }



}
