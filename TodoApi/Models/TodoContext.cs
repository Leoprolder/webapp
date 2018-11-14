using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        //конструктор
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        //метод добавления в бд
        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
