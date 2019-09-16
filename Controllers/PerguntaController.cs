using Microsoft.AspNetCore.Mvc;
using SGCFT.Models;

namespace SGCFT.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PerguntaController : ControllerBase
  {
    private readonly ApiDbContext _context;

    public PerguntaController(ApiDbContext context)
    {
        _context = context;
    }

    // GET api/tarefas
    [HttpGet]
    public ActionResult Get()
    {
        return Ok(_context.Perguntas);
    }
  }
}
