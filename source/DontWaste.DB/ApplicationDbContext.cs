using System.Data.Entity;
using DontWaste.DB.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

namespace DontWaste.DB
{
    public interface IApplicationDbContext
    {
        IDbSet<FoodItem> FoodItems { get; set; }
        IDbSet<FoodCategory> FoodCategories { get; set; }
        IDbSet<ImageFile> ImageFiles { get; set; }
    }

    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        private readonly IConfiguration _config;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration config)
            : base(options)
        {
            _config = config;
        }

        public IDbSet<FoodItem> FoodItems { get; set; }
        public IDbSet<FoodCategory> FoodCategories { get; set; }
        public IDbSet<ImageFile> ImageFiles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer(_config.GetConnectionString("DefaultConnection"));

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<FoodItem>()
                .Property(f => f.FoodItemDescription)
                .IsRequired();

            builder.Entity<FoodCategory>()
                .Property(f => f.Description)
                .IsRequired();

            builder.Entity<ImageFile>()
                .Property(f => f.Description)
                .IsRequired();
        }
    }
}