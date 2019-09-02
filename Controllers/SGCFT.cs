using Microsoft.AspNetCore.Mvc;
using SGCFT.Models;

namespace SGCFT.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsuariosController : ControllerBase
  {
    private readonly ApiDbContext _context;

    public UsuariosController(ApiDbContext context)
    {
        _context.Usuarios = context;
    }

    // GET api/tarefas
    [HttpGet]
    public ActionResult Get()
    {
        return Ok(_context.Usuarios);
    }
  }
}
