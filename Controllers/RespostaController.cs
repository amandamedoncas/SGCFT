using System.Collections.Generic;
using System.Linq;
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

        // GET: Respostas/
	 [HttpGet]
	public IActionResult Index()
		{
			List<Resposta> respostas = _context.Respostas.ToList();
			return Ok(respostas);
		}

      // GET: Respostas/1
        [HttpGet("{id}")]
      
		public ActionResult IndexId(int id)
		{
			 try
            {
                Resposta resposta= _context.Respostas.Where(x => x.Id == id).Single();
                return Ok(resposta);
            }
            catch (System.Exception)
            {
                return BadRequest();
                throw;
            }
			
		}


    //POST: Respostas/
    [HttpPost]
    public IActionResult inserirResposta([FromBody]Resposta resposta)
    {

      try
      {
        _context.Respostas.Add(resposta);
        _context.SaveChanges();
        return Ok();
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }

    //PUT: Respostas/
    [HttpPut]
    public IActionResult alterarResposta([FromBody]Resposta resposta)
    {
      Resposta res = new Resposta();
      
      res = _context.Respostas.Find(resposta.Id);
      try
      {
        if(resposta != res)
        {
            _context.Respostas.Update(resposta);
            _context.SaveChanges();
            return Ok();
        }
        else
          return BadRequest("Resposta não alterada");
      }
      catch(System.Exception)
      {
          return BadRequest();
          throw;
      }
    }
    
    
    // DELETE: Respostas/
        [HttpDelete ("{id}")]
        public IActionResult deletarResposta(int id)
        {
            try
            {
                Resposta resposta;
                resposta = _context.Respostas.Find(id);
                _context.Respostas.Remove(resposta);

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
