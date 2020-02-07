using Microsoft.EntityFrameworkCore;

namespace DontWaste.DB
{
    public interface IApplicationDbContext
    {
        int SaveChanges();
    }

    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}