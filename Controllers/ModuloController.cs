using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SGCFT.Models;

namespace SGCFT.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ModuloController : ControllerBase
  {
    private readonly ApiDbContext _context;

    public ModuloController(ApiDbContext context)
    {
        _context = context;
    }
	
	// GET: Modulos/
        [HttpGet]
        public IActionResult Index()
        {
            List<Modulo> modulos = _context.Modulos.ToList();
            return Ok(modulos);
        }

     // GET: Modulos/1
        [HttpGet("{id}")]
        public IActionResult IndexId(int id)
        {
            try
            {
                Modulo modulo = _context.Modulos.Where(x => x.Id == id).Single();
                return Ok(modulo);
            }
            catch (System.Exception)
            {
                return BadRequest();
                throw;
            }
        }


    //POST: Modulos/
    [HttpPost]
    public IActionResult inserirModulo([FromBody]Modulo modulo)
    {

      try
      {
        _context.Modulos.Add(modulo);
        _context.SaveChanges();
        return Ok();
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

    //PUT: Modulos/
    [HttpPut]
    public IActionResult alterarModulo([FromBody]Modulo modulo)
    {
      Modulo md = new Modulo();     
      md = _context.Modulos.Find(modulo.Id);

      try
      {
        if(modulo != md)
        {
            _context.Modulos.Update(modulo);
            _context.SaveChanges();
            return Ok();
        }
        else
          return BadRequest("Modulo não alterado");
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

	// DELETE: Modulos/1
	[HttpDelete("{id}")]
	public IActionResult deletarModulo(int id)
	{
	    try
	    {
		Modulo modulo;
		modulo = _context.Modulos.Find(id);
		_context.Modulos.Remove(modulo);

		try
		{
		    _context.SaveChanges();
		    return Ok();
		}
		catch (System.Exception)
		{

		    throw;
		}
	    }
	    catch (System.Exception)
	    {
		return BadRequest();
		throw;
	    }

	}


  }
}
