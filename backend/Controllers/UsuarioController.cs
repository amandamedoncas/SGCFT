using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SGCFT.Models;

namespace SGCFT.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsuarioController : ControllerBase
  {
    private readonly ApiDbContext _context;

    public UsuarioController(ApiDbContext context)
    {
        _context = context;
    }

    // GET: Usuarios/
        [HttpGet]
        public IActionResult Index()
        {
            List<Usuario> usuarios = _context.Usuarios.ToList();
            return Ok(usuarios);
        }

     // GET: Usuarios/1
        [HttpGet("{id}")]
        public IActionResult IndexId(int id)
        {
            try
            {
                Usuario usuario = _context.Usuarios.Where(x => x.Id == id).Single();
                return Ok(usuario);
            }
            catch(System.Exception)
            {
                return BadRequest();
                throw;
            }
        }


    //POST: Usuarios/
    [HttpPost]
    public IActionResult inserirUsuario([FromBody]Usuario usuario)
    {

      try
      {
        _context.Usuarios.Add(usuario);
        _context.SaveChanges();
        return Ok();
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

    //PUT: Usuarios/
    [HttpPut]
    public IActionResult alterarUsuario([FromBody]Usuario usuario)
    {

      try
      {

            _context.Usuarios.Update(usuario);
            _context.SaveChanges();
            return Ok();

      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

	// DELETE: Usuarios/1
	[HttpDelete("{id}")]
	public IActionResult deletarUsuario(int id)
	{
	    try
	    {
		Usuario usuario;
		usuario = _context.Usuarios.Find(id);
		_context.Usuarios.Remove(usuario);

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