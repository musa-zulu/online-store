using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DontWaste.DB
{
    public interface IDontWasteDbContext
    {
        int SaveChanges();
    }
    public class DontWasteDbContext : DbContext, IDontWasteDbContext
    {
        static DontWasteDbContext()
        {
            Database.SetInitializer<DontWasteDbContext>(null);
        }

        public DontWasteDbContext(string nameOrConnectionString = null)
            : base(nameOrConnectionString ?? "Name=DontWasteDbContext")
        {
            // Data Source=MUSA;Initial Catalog=DontWaste;User ID=sa
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var config = modelBuilder.Configurations;
        }
    }
}