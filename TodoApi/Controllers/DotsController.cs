using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DotsController : ControllerBase
    {
        private readonly DotContext _context;

        public DotsController(DotContext context)
        {
            _context = context;
            /*if (_context.Dots.Count() == 0)
            {
                _context.Dots.Add(new Dot { x = 0, y = 0 });
                _context.SaveChanges();
            }*/
        }

        [HttpGet]
        public ActionResult<List<Dot>> GetAll()
        {
            return _context.Dots.ToList();
        }

        [HttpGet("{id}", Name = "GetDot")]
        public ActionResult<Dot> GetById(long id)
        {
            var item = _context.Dots.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public IActionResult Create(Dot item)
        {
            _context.Dots.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetDot", new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, Dot item)
        {
            var dot = _context.Dots.Find(id);
            if (dot == null)
                return NotFound();

            dot.x = item.x;
            dot.y = item.y;

            _context.Dots.Update(dot);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete]
        public IActionResult Delete(long id)
        {
            var dot = _context.Dots.Find(id);
            if (dot == null)
                return NotFound();

            _context.Dots.Remove(dot);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
