using Microsoft.EntityFrameworkCore;

namespace IS_413_Final.Data;

public class EntertainerDbContext : DbContext
{
    public EntertainerDbContext(DbContextOptions<EntertainerDbContext> options) : base(options)
    {
        
    }
    
    // these are the tables in the database
    public DbSet<Entertainer> Entertainers { get; set; } 
    public DbSet<Engagement> Engagements { get; set; }
    
}