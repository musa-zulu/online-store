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
        DbSet<ImageFile> ImageFiles { get; set; }
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
        public DbSet<ImageFile> ImageFiles { get; set; }

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

            builder.Entity<ImageFile>()
                .ToTable("ImageFiles");

            builder.Entity<FoodCategory>()
                .Property(f => f.Description)
                .IsRequired();
            
            builder.Entity<FoodItem>()
                .Property(f => f.FoodItemDescription)
                .IsRequired();

            builder.Entity<ImageFile>()
                .Property(f => f.Description)
                .IsRequired();

        }
    }
}