using System.Collections.Generic;
using System.Linq;
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

    // GET: Perguntas/
	 [HttpGet]
	public IActionResult Index()
		{
			List<Pergunta> perguntas = _context.Perguntas.ToList();
			return Ok(perguntas);
		}

      // GET: Perguntas/1
        [HttpGet("{id}")]
      
		public ActionResult IndexId(int id)
		{
			 try
            {
                Pergunta pergunta= _context.Perguntas.Where(x => x.Id == id).Single();
                return Ok(pergunta);
            }
            catch (System.Exception)
            {
                return BadRequest();
                throw;
            }
			
		}


    //POST: Perguntas/
    [HttpPost]
    public IActionResult inserirPergunta([FromBody]Pergunta pergunta)
    {

      try
      {
        _context.Perguntas.Add(pergunta);
        _context.SaveChanges();
        return Ok();
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

    //PUT: Perguntas/
    [HttpPut]
    public IActionResult alterarPergunta([FromBody]Pergunta pergunta)
    {
      Pergunta per = new Pergunta();
      
      per = _context.Perguntas.Find(pergunta.Id);
      try
      {
        if(pergunta != per)
        {
            _context.Perguntas.Update(pergunta);
            _context.SaveChanges();
            return Ok();
        }
        else
          return BadRequest("Pergunta não alterada");
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }
    
    
    // DELETE: Perguntas/
        [HttpDelete ("{id}")]
        public IActionResult deletarPergunta(int id)
        {
            try
            {
                Pergunta pergunta;
                pergunta = _context.Perguntas.Find(id);
                _context.Perguntas.Remove(pergunta);

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
