using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class Dot
    {
        public long Id { get; set; }
        public int x { get; set; }
        public int y { get; set; }
    }
}
