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

    // GET api/Usuario
    [HttpGet]
    public ActionResult Get()
    {
        return Ok(_context.Usuarios);
    }

    //POST api/Usuario
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

    //PUT api/Usuario
    [HttpPut]
    public IActionResult alterarUsuario([FromBody]Usuario usuario)
    {
      Usuario user = new Usuario();
      
      user = _context.Usuarios.Find(usuario.Id);
      try
      {
        if(usuario != user)
        {
            _context.Usuarios.Update(usuario);
            _context.SaveChanges();
            return Ok();
        }
        else
          return BadRequest("Usuario não alterado");
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }


  }
}
