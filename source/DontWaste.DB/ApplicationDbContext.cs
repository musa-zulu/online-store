using System.Threading.Tasks;
using DontWaste.DB.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

namespace DontWaste.DB
{
    public interface IApplicationDbContext
    {
        DbSet<FoodItem> FoodItems { get; set; }
        DbSet<FoodCategory> FoodCategories { get; set; }
        DbSet<Order> Orders { get; set; }
        DbSet<OrderItem> OrderItems { get; set; }
        Task<int> SaveChangesAsync();
    }

    public sealed class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        private readonly IConfiguration _config;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration config)
            : base(options)
        {
            _config = config;
        }

        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<FoodCategory> FoodCategories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        public Task<int> SaveChangesAsync() => base.SaveChangesAsync();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer(_config.GetConnectionString("DefaultConnection"));

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<FoodCategory>()
                .ToTable("FoodCategories");

            builder.Entity<FoodItem>()
                .ToTable("FoodItems");

            builder.Entity<FoodItem>()
                .Property(f => f.FoodCategoryId)
                .IsRequired();
      
            builder.Entity<Order>()
                .ToTable("Orders");

            builder.Entity<OrderItem>()
                .ToTable("OrderItems");

            builder.Entity<FoodCategory>()
                .Property(f => f.Description)
                .IsRequired();
            
            builder.Entity<FoodItem>()
                .Property(f => f.FoodItemDescription)
                .IsRequired();
        }
    }
}