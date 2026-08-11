using Microsoft.EntityFrameworkCore;
using ProjetoToGrow.Models;

namespace ProjetoToGrow.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas { get; set; }

    public DbSet<Cargo> Cargos { get; set; }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pessoa>()
            .HasOne(p => p.Cargo)
            .WithMany()
            .HasForeignKey(p => p.CargoId);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        base.OnModelCreating(modelBuilder);
    }
}
