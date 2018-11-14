using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class DotContext : DbContext
    {
        public DotContext(DbContextOptions<DotContext> options) : base(options) { }
        public DbSet<Dot> Dots { get; set; }
    }
}
