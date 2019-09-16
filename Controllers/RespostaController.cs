using Microsoft.AspNetCore.Mvc;
using SGCFT.Models;

namespace SGCFT.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RespostaController : ControllerBase
  {
    private readonly ApiDbContext _context;

    public RespostaController(ApiDbContext context)
    {
        _context = context;
    }

    // GET api/tarefas
    [HttpGet]
    public ActionResult Get()
    {
        return Ok(_context.Respostas);
    }
  }
}
